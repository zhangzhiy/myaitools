# 一人公司产品开发方法论与 Skills / Rules 实践

## 这份笔记解决什么问题

一人公司或独立开发者做产品，真正困难的不是不会写代码，而是：

- 需求容易越做越大
- 产品设计、前后端开发、测试上线都要自己扛
- 上下文切换频繁，导致效率和质量一起下降
- 很多经验没有沉淀，下一次还得重新想一遍

因此，最值得借鉴的不是大团队流程，而是适合个人开发者的轻量闭环：

1. 先验证问题，而不是先堆功能
2. 固定开发周期，弹性裁剪范围
3. 用 vertical slice 打通完整链路
4. 用测试分层和发布清单守住质量
5. 把经验沉淀成 `skills`、`rules`、`hooks`

---

## 一、适合一人公司的完整产品开发流程

### 1. 产品发现：先验证问题，再决定做什么

适合借鉴的方法论：

- `Lean Startup`
- `Customer Development`
- GV 的 `Learn More Faster`

核心思想：

- 不先假设用户一定需要
- 不先写一堆功能
- 先验证“这个问题是否真实存在、是否值得付费或持续使用”

在个人项目里，建议每个新产品或新功能都先写清这四项：

- 用户是谁：只写一个最小人群
- 他的当前替代方案是什么
- 你的产品替代的是哪一步
- 成功指标是什么：不超过 2 个

推荐输出模板：

```md
## Problem Brief

- 用户：
- 场景：
- 当前替代方案：
- 最大痛点：
- 我们的最小解法：
- 为什么现在做：
- 成功指标：
```

这一步的目标不是产出完整 PRD，而是避免做伪需求。

### 2. 产品设计：先主流程，再边界，再视觉

适合借鉴的方法论：

- `Getting Real`
- `Design Sprint` 的“快速原型 + 快速验证”思路

一人开发不要先做复杂信息架构，也不要一上来做高保真。更实用的顺序是：

1. 先画主流程
2. 再定义关键页面
3. 再补 loading / empty / error 三态
4. 最后再做视觉细化

每个功能建议只定义：

- 一个核心入口
- 一条主成功路径
- 两到三个关键失败场景

你应该优先设计这些页面或状态：

- 首页/入口页
- 创建页/编辑页
- 详情页/结果页
- 空状态
- 错误状态
- 首次使用引导

### 3. 需求裁剪：固定时间，弹性范围

适合借鉴的方法论：

- `Shape Up`
- `Getting Real`

最值得借鉴的是一句话：

`Fix time and budget, flex scope`

也就是：

- 周期固定
- 精力固定
- 范围可以删

这对一人开发非常关键。因为真正拖垮项目的通常不是技术难度，而是范围失控。

推荐开发节奏：

- 小功能：`3-5 天`
- 中功能：`7 天`
- 一个版本：`14 天`

每个周期开始前先写：

```md
## This Cycle

- 核心目标：
- 必须完成：
- 可删减项：
- 明确不做：
```

删减顺序建议固定：

1. 装饰性优化
2. 管理后台次要能力
3. 边缘场景支持
4. 非主链路高级能力

不要先删主流程。

### 4. 开发实施：按 vertical slice 打通，而不是按工种拆

一人开发最适合的方式不是：

- 先把前端都写完
- 再把后端都写完
- 再统一联调

更好的做法是按一条完整链路推进：

1. 先做页面骨架
2. 再定义 API contract
3. 再补后端 handler / service / repository
4. 再接数据库
5. 再联调
6. 再补异常、日志、埋点

这样你每完成一条 slice，就拥有一个可运行、可验证、可演示的增量。

典型 slice 示例：

- 用户注册
- 用户登录
- 创建笔记
- 编辑笔记
- 搜索笔记
- 导出笔记

### 5. 测试：少而关键，按层投入

适合借鉴的方法论：

- `Test Pyramid`
- `Continuous Delivery`

不建议一人项目把大量精力耗在脆弱的 UI 自动化上。更合理的是：

- 单元测试覆盖业务规则
- 集成测试覆盖接口和数据流
- E2E 只保核心主路径

建议测试分层：

#### 单元测试

覆盖：

- 数据转换
- 输入校验
- 权限判断
- 排序/过滤/聚合逻辑
- 时间和状态流转规则

#### 集成测试

覆盖：

- API 与 service 协作
- 数据库读写
- 缓存逻辑
- 第三方服务封装

#### E2E 测试

只保最关键几条：

- 注册/登录
- 创建核心对象
- 支付或订阅
- 搜索或导出

如果资源有限，宁可少量稳定，也不要大量脆弱。

### 6. 上线发布：靠清单，不靠记忆

一人开发很容易在上线前遗漏细节，所以必须要有发布清单。

最小发布流程建议：

1. `lint`
2. `typecheck`
3. `unit tests`
4. `integration tests`
5. `build`
6. `staging deploy`
7. `smoke test`
8. `production deploy`
9. 发布后观察日志、告警、关键指标

上线前至少确认：

- 环境变量正确
- 数据迁移可回滚
- 错误监控已接入
- 核心埋点已可见
- 主路径 smoke test 通过

---

## 二、最值得借鉴的方法论沉淀

### 1. Lean Startup

适合解决：

- 想法很多，不知道先做什么
- 做完以后才发现没人需要

可借鉴点：

- Build-Measure-Learn
- 每次只验证一个关键假设
- 功能不是资产，验证才是资产

适合沉淀成：

- 需求验证模板
- 用户访谈提纲
- 版本成功指标模板

### 2. Customer Development

适合解决：

- 你以为的问题不是真问题
- 你以为的用户不是付费用户

可借鉴点：

- 先找目标用户对话
- 先确认痛点强度
- 先确认是否会持续使用或付费

适合沉淀成：

- 用户访谈问题库
- 竞品替代方案观察表
- 用户反馈分类规则

### 3. Getting Real

适合解决：

- 产品越来越重
- 设计和实现脱节

可借鉴点：

- 做更少
- 从真实界面开始
- 优先做可以运行的软件
- 必须考虑 regular / blank / error 三态

适合沉淀成：

- 页面三态检查规则
- 功能范围裁剪清单
- 最小 UI 原型模板

### 4. Shape Up

适合解决：

- 周期一直拖
- 需求边界不清

可借鉴点：

- 先定义 appetite，再定义方案
- 不问“全部做完要多久”
- 问“我们愿意花多久”

适合沉淀成：

- 周期目标模板
- scope 剪裁模板
- 版本节奏模板

### 5. Test Pyramid

适合解决：

- 测试花很多时间，但收益很低
- E2E 太多，维护痛苦

可借鉴点：

- 底层测得更多
- 高层测得更少但更关键
- UI 自动化只守核心链路

适合沉淀成：

- 测试分层策略文档
- 不同模块的测试优先级规则
- PR/上线前自动检查项

---

## 三、什么是适合个人开发者的 Skills / Rules / Hooks

这三者可以理解为你的个人开发操作系统。

### 1. Skills：把工作流模块化

`skills` 的作用不是“提供知识”，而是“封装步骤”。

每个 skill 都应该解决一个重复出现的问题，并且有固定输入输出。

推荐你沉淀的 skills：

#### `product-discovery`

输入：

- 一个产品想法或需求

输出：

- 用户画像
- 问题定义
- 成功指标
- 非目标

#### `spec-writer`

输入：

- 需求 brief

输出：

- 用户故事
- 主流程
- 边界情况
- 验收标准

#### `frontend-builder`

输入：

- 页面说明或设计稿

输出：

- 页面结构
- 状态定义
- 交互逻辑
- 埋点点位

#### `backend-builder`

输入：

- 业务场景和接口需求

输出：

- schema
- API contract
- service 设计
- 异常模型

#### `test-runner`

输入：

- 功能改动说明

输出：

- 单测建议
- 集成测试建议
- E2E 建议
- 风险点

#### `release-manager`

输入：

- 当前待发布版本

输出：

- 发布前检查项
- 风险提示
- 回滚清单
- 发布后观察项

### 2. Rules：把长期约束写死

`rules` 不是流程步骤，而是长期生效的判断标准。

好的 rules 要尽量具体，避免空话。

不好的写法：

- 代码要清晰
- 注意性能
- 做好测试

好的写法：

- 每个页面必须覆盖 `loading / empty / error` 三态
- 每个外部 API 调用必须设置超时，并记录失败日志
- 新增接口必须先定义 request / response contract
- 涉及状态流转的逻辑必须写单元测试
- 上线前必须跑一次主链路 smoke test

推荐按这五类沉淀 rules：

#### 产品规则

- 每个版本只允许一个核心目标
- 每个需求必须写清非目标
- 没有成功指标的功能不进入开发

#### 架构规则

- 先定义契约，再写实现
- 所有副作用操作必须可追踪
- 关键链路必须可观测

#### 前端规则

- 页面必须有三态
- 表单必须有校验、错误提示、禁用态
- 异步操作必须有 pending 状态

#### 后端规则

- 所有外部依赖必须设置 timeout
- 数据写入逻辑必须考虑幂等或重复提交
- 错误信息必须分用户可见与内部日志两层

#### 发布规则

- DB migration 必须可回滚
- 发布必须带版本说明
- 发布后必须观察关键日志和指标

### 3. Hooks：把规则自动执行

`hooks` 的价值是减少“我本来知道，但这次忘了”。

适合做成自动化的事情：

- 改前端文件后提醒检查三态
- 改接口文件后提醒补 contract test
- 提交前自动跑 lint / typecheck / test
- 发布前自动执行 smoke test
- 改数据库 schema 后提醒补 migration 文档

换句话说：

- `skills` 负责怎么做
- `rules` 负责做到什么标准
- `hooks` 负责强制执行

---

## 四、可直接照搬的一人前后端项目模板

### 1. 需求卡模板

```md
# Feature Brief

## 背景
- 为什么要做：

## 用户
- 谁会使用：

## 问题
- 当前痛点：

## 最小解法
- 我们这次做什么：

## 不做什么
- 非目标 1：
- 非目标 2：

## 成功指标
- 指标 1：
- 指标 2：

## 验收标准
- [ ] 主流程可完成
- [ ] 空状态明确
- [ ] 错误状态明确
- [ ] 埋点已接入
```

### 2. 开发周期模板

```md
# This Cycle

- 周期：7 天
- 核心目标：
- 必须上线：
- 可删减项：
- 不做项：
- 风险：
```

### 3. 前端实现检查模板

```md
# Frontend Checklist

- [ ] 页面结构明确
- [ ] loading 状态已处理
- [ ] empty 状态已处理
- [ ] error 状态已处理
- [ ] 表单校验已处理
- [ ] 异步按钮 pending 已处理
- [ ] 埋点已添加
- [ ] 移动端可用
```

### 4. 后端实现检查模板

```md
# Backend Checklist

- [ ] schema 已确认
- [ ] API contract 已定义
- [ ] 参数校验已完成
- [ ] 错误模型已定义
- [ ] timeout / retry / logging 已处理
- [ ] 数据写入幂等性已考虑
- [ ] 集成测试已补齐
```

### 5. 发布检查模板

```md
# Release Checklist

- [ ] lint 通过
- [ ] typecheck 通过
- [ ] unit tests 通过
- [ ] integration tests 通过
- [ ] build 成功
- [ ] migration 已验证
- [ ] staging smoke test 通过
- [ ] 回滚方案可用
- [ ] 发布后观察项明确
```

---

## 五、推荐你在项目里直接建立的沉淀文件

如果你希望这套方法真正帮到未来项目，建议每个仓库至少放这几个文件：

- `PROJECT_RULES.md`
- `TEST_STRATEGY.md`
- `RELEASE_CHECKLIST.md`
- `docs/features/`
- `docs/retros/`
- `skills/`

推荐目录结构：

```text
project/
  docs/
    features/
    retros/
  skills/
    product-discovery.md
    spec-writer.md
    frontend-builder.md
    backend-builder.md
    test-runner.md
    release-manager.md
  PROJECT_RULES.md
  TEST_STRATEGY.md
  RELEASE_CHECKLIST.md
```

---

## 六、适合你现在直接采用的一套最小工作方式

如果你现在主要做前后端项目，我建议直接采用下面这套：

### 开发前

- 先写 `Feature Brief`
- 只定一个核心目标
- 先明确非目标

### 开发中

- 按 vertical slice 推进
- 先打通主流程
- 每完成一条链路就自测

### 测试时

- 单测守业务规则
- 集成测试守接口和数据流
- E2E 只守主流程

### 上线时

- 全部靠 checklist
- 不靠记忆
- 发布后立即看日志和关键指标

### 复盘时

- 记录这次删掉了什么
- 记录这次哪里返工最多
- 记录下次可以自动化的动作

---

## 七、最关键的结论

一人开发最容易死在两件事上：

- 范围不断膨胀
- 经验没有沉淀

所以真正应该长期建设的，不只是代码，而是你的“个人产品工厂”：

- 用 `methodology` 约束决策
- 用 `skills` 固化步骤
- 用 `rules` 固化标准
- 用 `hooks` 自动执行检查

这样你每次启动新项目时，不是从零开始思考，而是在复用一套已经跑通的方法系统。

---

## 参考来源

- 37signals / Getting Real
  - https://books.37signals.com/8/getting-real
  - https://books.37signals.com/8/getting-real/55/what-is-getting-real
  - https://books.37signals.com/8/getting-real/62/fix-time-and-budget-flex-scope
  - https://books.37signals.com/8/getting-real/102/test-in-the-wild
  - https://books.37signals.com/8/getting-real/119/three-state-solution
- Basecamp / Shape Up
  - https://basecamp.com/shapeup/0.3-chapter-01
  - https://basecamp.com/shapeup/4.2-appendix-03
- Steve Blank
  - https://steveblank.com/2010/03/11/teaching-entrepreneurship-%E2%80%93-by-getting-out-of-the-building/
  - https://steveblank.com/2009/08/31/the-customer-development-manifesto-reasons-for-the-revolution-part-1/
- GV
  - https://www.gv.com/news/learn-more-faster
- Lean Startup
  - https://theleanstartup.com/
- Martin Fowler
  - https://martinfowler.com/bliki/TestPyramid.html
  - https://martinfowler.com/articles/practical-test-pyramid.html
  - https://martinfowler.com/bliki/ContinuousDelivery.html
  - https://martinfowler.com/bliki/DeploymentPipeline.html
- Anthropic Claude Code
  - https://docs.anthropic.com/en/docs/claude-code/memory
  - https://docs.anthropic.com/en/docs/claude-code/slash-commands
  - https://docs.anthropic.com/en/docs/claude-code/sub-agents
  - https://docs.anthropic.com/en/docs/claude-code/hooks
  - https://docs.anthropic.com/en/docs/claude-code/hooks-guide
- Cursor
  - https://docs.cursor.com/en/context/rules
