# 如何通过 Config Server 找到数据库并用 DataGrip 连接

> 适用于本公司所有基于 Spring Cloud Config 的微服务项目。以 `landz-client-domain` 为例。

---

## 整体流程

```
bootstrap.yml → 找到 Eureka 地址 → 从 Eureka 找到 Config Server → 从 Config Server 拉取数据库配置 → DataGrip 连接
```

---

## 第一步：从 bootstrap.yml 找到 Eureka 地址

打开项目的 `landz-client-starter/src/main/resources/bootstrap.yml`，找到：

```yaml
eureka:
    client:
        serviceUrl:
            defaultZone: http://eureka1.dev.com:8203/eureka/
```

各环境的 Eureka 地址：

| 环境 | Eureka 地址 |
|------|------------|
| dev  | `http://eureka1.dev.com:8203/eureka/` |
| test | `http://eureka1.test.com:8203/eureka/` |
| pre  | `http://eureka1.pre.com:8203/eureka/` |
| prod | `http://eureka1.prod.com:8203/eureka/` + `http://eureka2.prod.com:8203/eureka/` |

---

## 第二步：从 Eureka 找到 Config Server 地址

1. 确保在**公司网络或 VPN** 下
2. 浏览器打开 Eureka 地址（去掉末尾的 `/eureka/`）：`http://eureka1.dev.com:8203`
3. 在页面的 **Instances currently registered with Eureka** 表格中找到 `CONFIG-SERVER`
4. 记下它的 IP 和端口，例如：`10.10.128.41:8202`

---

## 第三步：从 Config Server 获取数据库配置

浏览器访问（URL 格式：`http://{Config Server地址}/{应用名}/{profile}`）：

```
http://10.10.128.41:8202/landz-client-domain/dev
```

返回的 JSON 中找到数据库相关配置，重点关注：

```
spring.datasource.dynamic.datasource.postgresql-read.url      → JDBC URL
spring.datasource.dynamic.datasource.postgresql-read.username  → 用户名
spring.datasource.dynamic.datasource.postgresql-read.password  → 密码
```

### 如何解读 JDBC URL

```
jdbc:postgresql://10.10.xxx.xxx:5432/biz_opp
                  └── Host ────┘     └── 数据库名
```

### 其他 profile 也可以查

| URL | 说明 |
|-----|------|
| `http://10.10.128.41:8202/landz-client-domain/dev` | 开发环境 |
| `http://10.10.128.41:8202/landz-client-domain/test` | 测试环境 |
| `http://10.10.128.41:8202/landz-client-domain/default` | 默认配置 |

---

## 第四步：DataGrip 连接数据库

### 4.1 新建数据源

```
DataGrip → File → New → Data Source → PostgreSQL
```

### 4.2 填写连接信息

| 字段 | 值 | 来源 |
|------|---|------|
| Name | `landz-client-dev`（自定义） | — |
| Host | JDBC URL 中 `//` 和 `:` 之间的 IP | Config Server |
| Port | JDBC URL 中 IP 后面的端口号（默认 `5432`） | Config Server |
| Database | JDBC URL 中最后一段（如 `biz_opp`） | Config Server |
| User | `spring.datasource...username` 的值 | Config Server |
| Password | `spring.datasource...password` 的值 | Config Server |

勾选 **☑ Save password** 免得每次输入。

### 4.3 下载驱动

如果顶部提示 `Download missing PostgreSQL driver files [Fix]`，直接点 **Fix** 自动下载。

### 4.4 测试连接

点 **Test Connection**：
- 绿色 **Succeeded** → 点 **OK** 保存
- 红色报错 → 检查 IP/端口/用户名/密码，确认在公司网络/VPN 下

### 4.5 配置显示 Schema

连接成功后如果左侧树是空的：

1. 右键数据源名 → **Database Properties**
2. 切到 **Schemas** 标签页
3. 勾选 **All schemas**（或只勾选 `client_biz_opp`）
4. 点 **OK**，然后右键数据源 → **Refresh**

### 4.6 查看数据

```
左侧树结构：
📁 landz-client-dev
  └── 📁 biz_opp（数据库）
       └── 📁 client_biz_opp（schema）
            └── 📁 tables
                 ├── t_client_biz_opportunity  ← 客商机表
                 ├── t_client                   ← 私客表
                 └── ...
```

- **双击表名** → 直接查看数据
- **右键数据库 → New → Query Console** → 手写 SQL
- **Cmd + Enter**（Mac）/ **Ctrl + Enter**（Windows）→ 执行 SQL

---

## 第五步：验证 —— 跑一条项目中的 SQL

```sql
SELECT c.name, c.sex, b.stage, b.status, b.created_time
FROM client_biz_opp.t_client_biz_opportunity b
JOIN client_biz_opp.t_client c ON b.client_id = c.pk_id
WHERE b.status = '100200000001'
ORDER BY b.created_time DESC
LIMIT 10;
```

能看到数据就说明一切正常。

---

## 通用技巧：其他微服务也一样

这套流程适用于公司所有微服务，只需要替换第三步的应用名：

```
http://{Config Server地址}/{其他应用名}/dev
```

例如：
- `http://10.10.128.41:8202/landz-owner-domain/dev` → 业主域的配置
- `http://10.10.128.41:8202/landz-house-domain/dev` → 房源域的配置

---

## 注意事项

- **dev/test 环境**的数据库可以查数据学习，但**不要随意修改数据**，避免影响其他同事
- **prod 环境**的数据库**严禁直连操作**，除非有明确授权
- Config Server 返回的配置中可能包含敏感信息（密码等），注意不要上传到公开仓库
- 如果连不上，先确认是否在**公司网络或 VPN** 下
