# SQL 学习指南 — 基于 landz-client-domain 项目实战

> 所有示例均使用项目真实表（`client_biz_opp` schema），可直接在 DataGrip 中执行。
> 对应的 Mapper XML 位于 `landz-client-infrastructure/src/main/resources/mybatis/postgresql/`。

---

## 核心表速查

| 表名 | 用途 | 关键字段 |
|------|------|---------|
| `t_client` | 私客表（客户基本信息） | `pk_id`、`name`、`sex`、`type`、`status`、`one_id` |
| `t_client_biz_opportunity` | 客商机表 | `pk_id`、`client_id`（关联 t_client）、`stage`、`status`、`oppo_type` |
| `t_client_contact` | 客户联系方式 | `client_id`、`phone_number`、`wx_id`、`number_type` |
| `t_agent_role_on_client` | 客户角色关系（维护人/共享池等） | `client_id`、`role_id`、`role_type` |
| `t_cust_client_table_relation` | 客源-客户表关联 | `cust_table_id`、`client_table_id`、`table_type` |
| `t_client_cust_relation` | 客户-客源关系 | `client_id`、`cust_del_id`、`cust_type` |

常用状态码：
- `status = '100200000001'` → 有效
- `type = '990100000001'` → 私客类型
- `role_type = '906400000002'` → 维护人

---

## 第一阶段：基础查询（SELECT / WHERE / ORDER BY / LIMIT）

### 1.1 认识数据

```sql
-- 看私客表有什么数据
SELECT * FROM client_biz_opp.t_client LIMIT 5;

-- 看客商机表有什么数据
SELECT * FROM client_biz_opp.t_client_biz_opportunity LIMIT 5;
```

### 1.2 只查需要的列

```sql
SELECT pk_id, client_id, status, stage, oppo_type, created_time
FROM client_biz_opp.t_client_biz_opportunity
LIMIT 20;
```

### 1.3 WHERE 条件过滤

```sql
-- 只查有效的客商机
SELECT pk_id, client_id, status, stage, oppo_type, created_time
FROM client_biz_opp.t_client_biz_opportunity
WHERE status = '100200000001'
LIMIT 20;

-- 阶段 >= 100 的高阶段商机
SELECT *
FROM client_biz_opp.t_client_biz_opportunity
WHERE stage >= 100 AND status = '100200000001'
LIMIT 20;
```

> **对应 Mapper**：`TClientBizOpportunityDOMapper.xml` 第 66-72 行
> ```xml
> <select id="selectValidOpportunitiesWithHighStage">
>     select * from client_biz_opp.t_client_biz_opportunity o
>     join client_biz_opp.t_client c on o.client_id = c.pk_id and c.type = '990100000001'
>     where stage >= 100 and o.status = '100200000001'
> </select>
> ```

### 1.4 ORDER BY 排序

```sql
-- 按创建时间倒序
SELECT pk_id, client_id, stage, created_time
FROM client_biz_opp.t_client_biz_opportunity
WHERE status = '100200000001'
ORDER BY created_time DESC
LIMIT 20;
```

### 1.5 时间范围查询

```sql
SELECT pk_id, client_id, stage, created_time
FROM client_biz_opp.t_client_biz_opportunity
WHERE created_time >= '2025-01-01'
  AND created_time <= '2025-06-01'
ORDER BY created_time DESC
LIMIT 20;
```

> **对应 Mapper**：`TClientBizOpportunityDOMapper.xml` 第 121-134 行（`queryListByTime`）

### 语法小结

```
SELECT   要查哪些列
FROM     从哪张表
WHERE    过滤条件
ORDER BY 排序（ASC 升序 / DESC 降序）
LIMIT    只返回几条
```

---

## 第二阶段：多表关联（JOIN）

### 2.1 为什么需要 JOIN

数据分散在多张表里。商机表只有 `client_id`，没有客户姓名。要同时看两张表的数据，就需要 JOIN。

### 2.2 JOIN（内连接）— 两边都要有数据才返回

```sql
SELECT c.name, c.sex, b.pk_id AS biz_opp_id, b.stage, b.status
FROM client_biz_opp.t_client_biz_opportunity b
JOIN client_biz_opp.t_client c ON b.client_id = c.pk_id
LIMIT 10;
```

拆解：

| 部分 | 含义 |
|------|------|
| `FROM ... b` | 从商机表查，别名 `b` |
| `JOIN ... c` | 拼上私客表，别名 `c` |
| `ON b.client_id = c.pk_id` | 拼接条件：商机的 client_id = 私客的 pk_id |

> **别名的作用**：两张表都有 `pk_id`，必须用 `b.pk_id` 和 `c.pk_id` 区分。

### 2.3 JOIN + WHERE 组合

```sql
SELECT c.name, b.stage, b.status
FROM client_biz_opp.t_client_biz_opportunity b
JOIN client_biz_opp.t_client c ON b.client_id = c.pk_id
WHERE c.type = '990100000001'       -- 只要私客
  AND b.status = '100200000001'     -- 只看有效商机
  AND b.stage >= 50                 -- 阶段 >= 50
LIMIT 10;
```

> **对应 Mapper**：`TClientBizOpportunityDOMapper.xml` 第 42-48 行
> ```xml
> select o.client_id, o.pk_id
> from client_biz_opp.t_client_biz_opportunity o
>     join client_biz_opp.t_client c on o.client_id = c.pk_id and c.type = '990100000001'
> ```

### 2.4 LEFT JOIN（左连接）— 左表全部返回，右表没有的填 NULL

```sql
SELECT c.name, c.pk_id, b.pk_id AS biz_id, b.stage
FROM client_biz_opp.t_client c
LEFT JOIN client_biz_opp.t_client_biz_opportunity b ON b.client_id = c.pk_id
LIMIT 10;
```

没有商机的客户也会出现，但 `biz_id` 和 `stage` 为 NULL。

### 2.5 LEFT JOIN 找"没有 xxx 的数据"

```sql
-- 找没有商机的客户
SELECT c.name, c.pk_id
FROM client_biz_opp.t_client c
LEFT JOIN client_biz_opp.t_client_biz_opportunity b ON b.client_id = c.pk_id
WHERE b.pk_id IS NULL    -- 右表为 NULL = 没匹配上 = 没有商机
LIMIT 10;
```

> **对应 Mapper**：`TClientBizOpportunityDOMapper.xml` 第 40-55 行
> ```xml
> select o.client_id, o.pk_id
> from client_biz_opp.t_client_biz_opportunity o
>     join client_biz_opp.t_client c on o.client_id = c.pk_id and c.type = '990100000001'
>     left join client_biz_opp.t_cust_client_table_relation r
>         on o.pk_id = r.client_table_id
>         and r.table_type = 'cust.t_cust_basic_del/t_client_biz_opportunity'
> where r.client_table_id is null    -- 没有关联客源关系的商机
>     and o.stage >= 20
>     and o.status = '100200000001'
> ```

### JOIN 对比图

```
JOIN（内连接）:
  表A  ○──────○  表B        只返回两边都匹配的

LEFT JOIN（左连接）:
  表A  ●──────○  表B        左表全返回，右表没有的填 NULL

LEFT JOIN + WHERE 右表 IS NULL:
  表A  ●      ○  表B        只返回"左表有、右表没有"的
```

---

## 第三阶段：聚合统计（GROUP BY / HAVING / COUNT）

### 3.1 COUNT — 数数

```sql
-- 总共有多少条商机
SELECT COUNT(*) FROM client_biz_opp.t_client_biz_opportunity;

-- 有效商机有多少条
SELECT COUNT(*) 
FROM client_biz_opp.t_client_biz_opportunity
WHERE status = '100200000001';
```

### 3.2 GROUP BY — 分组统计

```sql
-- 每个客户有几条有效商机
SELECT client_id, COUNT(*) AS opp_count
FROM client_biz_opp.t_client_biz_opportunity
WHERE status = '100200000001'
GROUP BY client_id
LIMIT 20;
```

**GROUP BY 做了什么：**

```
原始数据                        分组后
┌─────────┬───────┐           ┌─────────┬──────────┐
│client_id│ stage │           │client_id│ 这一组    │
├─────────┼───────┤           ├─────────┼──────────┤
│    1    │  30   │ ─┐        │    1    │ {30, 50} │ → COUNT = 2
│    1    │  50   │ ─┘        │    2    │ {80}     │ → COUNT = 1
│    2    │  80   │ ─         │    3    │ {60}     │ → COUNT = 1
│    3    │  60   │ ─         └─────────┴──────────┘
└─────────┴───────┘
```

### 3.3 常用聚合函数

```sql
SELECT client_id,
       COUNT(*)    AS opp_count,   -- 几条商机
       MAX(stage)  AS max_stage,   -- 最高阶段
       MIN(stage)  AS min_stage,   -- 最低阶段
       AVG(stage)  AS avg_stage    -- 平均阶段
FROM client_biz_opp.t_client_biz_opportunity
WHERE status = '100200000001'
GROUP BY client_id
LIMIT 20;
```

| 函数 | 作用 |
|------|------|
| `COUNT(*)` | 数行数 |
| `MAX(字段)` | 取最大值 |
| `MIN(字段)` | 取最小值 |
| `AVG(字段)` | 取平均值 |
| `SUM(字段)` | 求和 |

### 3.4 HAVING — 对分组结果再过滤

**WHERE 过滤行（分组前），HAVING 过滤组（分组后）。**

```sql
-- 只看有多个有效商机的客户
SELECT client_id, COUNT(1) AS cnt
FROM client_biz_opp.t_client_biz_opportunity
WHERE status = '100200000001'          -- ① 分组前：只留有效商机
GROUP BY client_id                     -- ② 分组
HAVING COUNT(1) > 1                    -- ③ 分组后：只留数量 > 1 的组
LIMIT 20;
```

> **对应 Mapper**：`TClientBizOpportunityDOMapper.xml` 第 74-81 行
> ```xml
> <select id="selectClientsWithMultipleValidOpportunities">
>     select client_id as clientId, count(1) as count
>     from client_biz_opp.t_client_biz_opportunity o
>         join client_biz_opp.t_client c on c.pk_id = o.client_id and c.type = '990100000001'
>     where o.status = '100200000001'
>     group by client_id
>     having count(1) > 1;
> </select>
> ```

执行顺序图：

```
原始数据（5 条）
  │
  ▼ ① WHERE status = '有效'
剩 3 条
  │
  ▼ ② GROUP BY client_id
  client_id=1 → 2条
  client_id=2 → 1条
  │
  ▼ ③ HAVING COUNT > 1
  client_id=1 → 2条  ✓ 留下
  client_id=2 → 1条  ✗ 去掉
```

### 3.5 GROUP BY + ORDER BY 组合

```sql
-- 按阶段统计商机数量分布，从多到少
SELECT stage, COUNT(*) AS cnt
FROM client_biz_opp.t_client_biz_opportunity
WHERE status = '100200000001'
GROUP BY stage
ORDER BY cnt DESC;
```

### 3.6 按月统计

```sql
-- 按月统计新增商机数
SELECT TO_CHAR(created_time, 'YYYY-MM') AS month, COUNT(*) AS cnt
FROM client_biz_opp.t_client_biz_opportunity
WHERE created_time >= '2025-01-01'
GROUP BY TO_CHAR(created_time, 'YYYY-MM')
ORDER BY month;
```

### SQL 完整执行顺序

```
SELECT   要显示什么（分组字段 + 聚合函数）    ⑤
FROM     从哪张表                           ①
WHERE    先过滤哪些行（分组前）               ②
GROUP BY 按什么分组                          ③
HAVING   再过滤哪些组（分组后）               ④
ORDER BY 结果怎么排序                        ⑥
LIMIT    只看几条                            ⑦
```

> 注意：写的顺序和执行顺序不同！FROM 最先执行，SELECT 倒数第二。

---

## 第四阶段：子查询

### 4.1 子查询用在 WHERE IN 里

**思路：先查出一批 ID，再用这批 ID 去过滤。**

```sql
-- 查有效商机的客户叫什么名字
SELECT pk_id, name
FROM client_biz_opp.t_client
WHERE pk_id IN (
    SELECT client_id 
    FROM client_biz_opp.t_client_biz_opportunity 
    WHERE status = '100200000001'
)
LIMIT 10;
```

执行过程（从里到外）：

```
┌─────────────────────────────────────┐
│ 内层（先执行）                        │
│ SELECT client_id FROM 商机表         │
│ WHERE status = '有效'                │
│ → 结果：[1, 2, 5, 8]                │
└──────────────┬──────────────────────┘
               ▼
┌─────────────────────────────────────┐
│ 外层（后执行）                        │
│ SELECT pk_id, name FROM 私客表       │
│ WHERE pk_id IN (1, 2, 5, 8)         │
└─────────────────────────────────────┘
```

> **对应 Mapper**：`TClientDOMapper.xml` 第 328-335 行
> ```xml
> <select id="oneIdRepeatList">
>     select pk_id from client_biz_opp.t_client
>     where one_id in (
>         select one_id from client_biz_opp.t_client
>         where type = #{privateType}
>         group by one_id having count(1) > 1
>     )
> </select>
> ```
> 业务含义：找出 one_id 重复的客户。

### 4.2 子查询当"临时表"用在 JOIN 里

```sql
-- 查共享池客户的联系方式
SELECT tc.client_id, tc.phone_number
FROM client_biz_opp.t_client_contact tc
JOIN (
    SELECT client_id 
    FROM client_biz_opp.t_agent_role_on_client
    WHERE role_type IN ('906400000004','906400000005','906400000006')
) pool ON tc.client_id = pool.client_id
WHERE tc.number_type = '1'
LIMIT 10;
```

括号里的 SELECT 被当作一张"临时表"（别名 `pool`），然后跟联系方式表 JOIN。

> **对应 Mapper**：`TClientDOMapper.xml` 第 277-283 行
> ```xml
> select count(1) from client_biz_opp.t_client_contact tc
> join (
>     select client_id from client_biz_opp.t_agent_role_on_client
>     where role_type in ('906400000004','906400000005','906400000006')
> ) tt on tc.client_id = tt.client_id
> ```

### 4.3 多层嵌套子查询

```sql
-- 找出手机号重复的客户（三层嵌套）
SELECT pk_id FROM client_biz_opp.t_client
WHERE pk_id IN (
    -- 第②层：这些手机号属于哪些客户
    SELECT client_id FROM client_biz_opp.t_client_contact 
    WHERE phone_number IN (
        -- 第①层（最里面）：哪些手机号出现了不止一次
        SELECT phone_number FROM client_biz_opp.t_client_contact 
        WHERE number_type = '1' 
          AND phone_number IS NOT NULL 
        GROUP BY phone_number 
        HAVING COUNT(1) > 1
    )
)
AND type = '990100000001'
LIMIT 20;
```

从里往外读：找重复手机号 → 找对应客户 ID → 查出客户信息。

> **对应 Mapper**：`TClientDOMapper.xml` 第 337-345 行（`phoneRepeatList`）

---

## 第五阶段：CTE（WITH）— 子查询的更好写法

### 5.1 为什么要用 CTE

子查询嵌套多了可读性很差。CTE 就是**先给子查询起名字，再当"临时表"用**。

语法：

```sql
WITH 名字 AS (
    子查询
)
SELECT ... FROM 名字 ...;
```

### 5.2 用 CTE 改写子查询

```sql
-- 子查询写法（嵌套，难读）
SELECT pk_id, name FROM client_biz_opp.t_client
WHERE pk_id IN (
    SELECT client_id FROM client_biz_opp.t_client_biz_opportunity 
    WHERE status = '100200000001'
)
LIMIT 10;

-- CTE 写法（从上到下，好读）
WITH valid_biz_clients AS (
    SELECT client_id 
    FROM client_biz_opp.t_client_biz_opportunity 
    WHERE status = '100200000001'
)
SELECT pk_id, name
FROM client_biz_opp.t_client
WHERE pk_id IN (SELECT client_id FROM valid_biz_clients)
LIMIT 10;
```

效果完全一样，但 CTE 版本像写作文，一步一步。

### 5.3 多个 CTE 组合

```sql
-- 找出既没有有效商机、又不在共享池里的私客
WITH biz_client AS (
    SELECT client_id
    FROM client_biz_opp.t_client_biz_opportunity
    WHERE status = '100200000001'
    GROUP BY client_id
),
pool_client AS (
    SELECT DISTINCT client_id
    FROM client_biz_opp.t_agent_role_on_client
    WHERE role_type IN ('906400000004', '906400000005', '906400000006')
)
SELECT DISTINCT t.pk_id, t.name
FROM client_biz_opp.t_client t
LEFT JOIN biz_client opp ON opp.client_id = t.pk_id
LEFT JOIN pool_client pool ON pool.client_id = t.pk_id
WHERE t.type = '990100000001'
  AND t.status = '100200000001'
  AND opp.client_id IS NULL     -- 没有有效商机
  AND pool.client_id IS NULL    -- 不在共享池
LIMIT 10;
```

逐步翻译：

```
WITH biz_client AS (...)       ← 第一张临时表：有有效商机的客户 ID
     pool_client AS (...)      ← 第二张临时表：在共享池里的客户 ID

SELECT ...
FROM t_client t                ← 所有私客
LEFT JOIN biz_client           ← 左拼"有商机的"
LEFT JOIN pool_client          ← 左拼"在共享池的"
WHERE ...
  AND opp.client_id IS NULL    ← 没有商机
  AND pool.client_id IS NULL   ← 不在共享池

= 找出"既没商机、也不在共享池"的客户
```

图解：

```
所有私客
┌───────────────────────────────────────┐
│                                       │
│          ┌─────────┐  ┌─────────┐     │
│          │ 有商机   │  │ 在共享池 │     │
│          └─────────┘  └─────────┘     │
│                                       │
│  ← 我们要的就是这块空白区域              │
└───────────────────────────────────────┘
```

> **对应 Mapper**：`TClientBizOpportunityDOMapper.xml` 第 83-100 行
> ```xml
> <select id="selectClientsWithoutValidOpportunities">
>     with biz_client as (select client_id
>                         from client_biz_opp.t_client_biz_opportunity opp
>                         where opp.status = '100200000001'
>                         group by client_id),
>          pool_client as (select distinct client_id
>                          from client_biz_opp.t_agent_role_on_client
>                          where role_type in ('906400000004', '906400000005', '906400000006'))
>     select distinct pk_id as clientId
>     from client_biz_opp.t_client t
>         left join biz_client opp on opp.client_id = t.pk_id and t.type = '990100000001'
>         left join pool_client pool on pool.client_id = t.pk_id and t.type = '990100000001'
>     where t.type = '990100000001'
>       and t.status = '100200000001'
>       and opp.client_id is null
>       and pool.client_id is null
> </select>
> ```

### 子查询 vs CTE 对比

| | 子查询 | CTE（WITH） |
|--|--------|------------|
| 写法 | 嵌套在括号里 | 先定义名字，再使用 |
| 可读性 | 嵌套多了难读 | 从上到下像写作文 |
| 复用 | 同一个查询要写多次 | 定义一次，可多次引用 |
| 功能 | 完全相同 | 完全相同 |

---

## 附录：Mapper XML 与 SQL 对照表

| Mapper 文件 | 方法名 | SQL 技能点 | 行号 |
|-------------|--------|-----------|------|
| `TClientBizOpportunityDOMapper.xml` | `selectValidOpportunitiesWithHighStage` | JOIN + WHERE | 66-72 |
| `TClientBizOpportunityDOMapper.xml` | `selectNotHasRelationBizOpportunityList` | JOIN + LEFT JOIN + IS NULL | 40-55 |
| `TClientBizOpportunityDOMapper.xml` | `selectClientsWithMultipleValidOpportunities` | JOIN + GROUP BY + HAVING | 74-81 |
| `TClientBizOpportunityDOMapper.xml` | `selectClientsWithoutValidOpportunities` | CTE + LEFT JOIN + IS NULL | 83-100 |
| `TClientBizOpportunityDOMapper.xml` | `queryListByTime` | JOIN + 时间范围查询 | 121-134 |
| `TClientBizOpportunityDOMapper.xml` | `queryClientIdByBigValidStage` | JOIN + WHERE 多条件 | 112-119 |
| `TClientBizOpportunityDOMapper.xml` | `selectDealClientInvalidOpportunities` | LEFT JOIN + 多条件 | 57-64 |
| `TClientDOMapper.xml` | `oneIdRepeatList` | 子查询 + GROUP BY + HAVING | 328-335 |
| `TClientDOMapper.xml` | `phoneRepeatList` | 三层嵌套子查询 | 337-345 |
| `TClientDOMapper.xml` | `wxIdRepeatList` | 三层嵌套子查询 | 347-355 |
| `TClientDOMapper.xml` | `queryCustIsInPool` | 子查询当临时表 JOIN | 277-293 |
| `TClientDOMapper.xml` | `findByNameOrPhone` | JOIN + LIKE 模糊查询 | 258-275 |
| `TClientDOMapper.xml` | `findDuplicatePrivateClientID` | 多表 LEFT JOIN + 动态条件 | 73-122 |

---

## 学习建议

1. **按阶段顺序来**：基础查询 → JOIN → GROUP BY → 子查询 → CTE，不要跳
2. **每条 SQL 都跑一下**：在 DataGrip 里执行，观察结果
3. **改改试试**：改条件、去掉 LIMIT、换排序方向，看结果变化
4. **对照 Mapper XML**：跑完 SQL 后打开对应的 XML 文件，验证"我能看懂了"
5. **不要背语法**：多动手跑几次自然就记住了
