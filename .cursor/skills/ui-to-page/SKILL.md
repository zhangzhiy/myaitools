---
name: ui-to-page
description: Convert UI design images and CSS styles into fully interactive Vue 3 pages in the ProductDemo project. Generates page components, mock data, route registration, and sidebar menu entries. Use when the user provides a UI screenshot, design mockup, or CSS styles and wants them converted into working frontend pages with navigation and interactions.
---

# UI Design to Vue Page Generator

将用户提供的 UI 设计图 / CSS 样式，转换为 ProductDemo 项目中可交互的 Vue 3 页面。

## Project Context

**项目路径**: 找到当前工作区中包含 `src/views/`、`src/mock/`、`src/router/index.ts` 的 Vite + Vue 3 项目。
**技术栈**: Vite + Vue 3 + TypeScript + Vue Router 4 + Pinia + Element Plus + Tailwind CSS 4 + VueUse

### Key Directories

```
src/views/<page-name>/index.vue   — 页面组件
src/views/<page-name>/detail.vue  — 详情页（可选）
src/mock/<page-name>.ts           — Mock 数据 + TypeScript 接口
src/router/index.ts               — 路由注册
src/layouts/DefaultLayout.vue     — 侧边栏菜单项
src/stores/                       — Pinia store（按需）
```

## Workflow

收到 UI 设计（图片 / HTML / CSS）后，按以下步骤执行：

### Step 1: Analyze the Design

1. 仔细观察设计图的 **布局结构**（栅格、flex、间距）
2. 识别所有 **UI 元素**（表格、卡片、表单、按钮、Tag、图标等）
3. 识别 **交互点**：按钮→跳转、Tab 切换、弹窗、搜索筛选、开关、下拉等
4. 提取 **数据字段**：列表/表格中的字段名、类型、可能的枚举值
5. 确定页面路由路径和中文标题

### Step 2: Generate Mock Data

在 `src/mock/<page-name>.ts` 中生成：

```typescript
// 1. 定义 TypeScript interface，字段从设计图中提取
export interface XxxItem {
  id: number
  name: string
  // ...按设计图字段补全
}

// 2. 如有状态/类型枚举，使用 Record map
export const xxxStatusMap: Record<string, { label: string; type: string }> = { ... }

// 3. 生成 6-10 条中文 mock 数据，内容贴合业务语境
export const xxxList: XxxItem[] = [ ... ]

// 4. 如详情页需要，导出 getXxxById 函数
export function getXxxById(id: number): XxxItem | undefined {
  return xxxList.find((item) => item.id === id)
}
```

**Mock 数据要求**:
- 使用中文内容，贴合真实业务
- 数量 6-10 条
- 日期使用近期日期
- 手机号/邮箱使用脱敏格式

### Step 3: Generate Page Component

在 `src/views/<page-name>/index.vue` 中生成：

**模板规范**:
```vue
<script setup lang="ts">
// Vue Composition API + script setup
// 从 mock 导入数据和类型
// 使用 ref/computed 管理本地状态
// 交互函数用 function 声明
</script>

<template>
  <!-- 使用 Element Plus 组件 + Tailwind CSS 类 -->
</template>

<style scoped>
/* 仅放无法用 Tailwind 实现的样式 */
/* 如用户提供了自定义 CSS，放在这里 */
</style>
```

**UI 还原核心规则**:

1. **布局精确还原**: 使用 Tailwind 的 grid/flex 精确匹配设计图的栅格和间距
2. **颜色一致**: 如果设计图有具体色值，用 Tailwind arbitrary values `bg-[#xxx]` 或自定义 CSS
3. **字号/间距**: 用 Tailwind 的 `text-sm`/`text-base`/`p-4`/`gap-3` 等尽量贴近
4. **圆角/阴影**: 匹配设计图的圆角 `rounded-lg` 和阴影 `shadow-md`
5. **用户提供的 CSS**: 如果用户同时给了 CSS 代码，优先在 `<style scoped>` 中使用原始 CSS，保证视觉一致

**Element Plus 组件选用**:
- 表格 → `el-table` + `el-table-column`
- 表单 → `el-form` + `el-form-item`
- 卡片 → `el-card`
- 弹窗 → `el-dialog`
- 标签 → `el-tag`
- 按钮 → `el-button`
- 分页 → `el-pagination`
- Tab → `el-tabs` + `el-tab-pane`
- 统计 → `el-statistic` 或自定义卡片
- 图标 → `@element-plus/icons-vue` 按需导入

### Step 4: Add Interactions

根据页面元素类型，自动添加交互逻辑：

| UI 元素 | 交互行为 |
|---------|---------|
| 列表/卡片项 | 点击跳转详情 `router.push('/xxx/' + id)` |
| 「新建/新增」按钮 | 打开 `el-dialog` 表单弹窗 |
| 「编辑」按钮 | 打开编辑弹窗，回填数据 |
| 「删除」按钮 | `ElMessageBox.confirm` 确认后 `ElMessage.success` |
| 搜索框 | `v-model` 绑定 + computed 过滤 |
| 筛选下拉 | `el-select` + computed 过滤 |
| Tab 栏 | `el-tabs` + `v-model` 切换内容 |
| 开关/Switch | `el-switch` + 状态切换 + `ElMessage` 提示 |
| 表单提交 | 校验 → `ElMessage.success` 提示 → 关闭弹窗 |
| 返回按钮 | `router.back()` |
| 分页 | `el-pagination` + computed 截取数据 |

### Step 5: Register Route

在 `src/router/index.ts` 的 `DefaultLayout` children 数组中追加：

```typescript
{
  path: '<page-name>',
  name: '<PageName>',
  component: () => import('@/views/<page-name>/index.vue'),
  meta: { title: '<中文标题>', icon: '<ElementPlusIconName>' },
},
```

如有详情页，追加子路由：
```typescript
{
  path: '<page-name>/:id',
  name: '<PageName>Detail',
  component: () => import('@/views/<page-name>/detail.vue'),
  meta: { title: '<中文标题>详情', hidden: true },
},
```

### Step 6: Add Sidebar Menu

在 `src/layouts/DefaultLayout.vue` 中：

1. `import` 对应的 Element Plus 图标
2. 在 `menuItems` 数组中追加菜单项：
```typescript
{ index: '/<page-name>', title: '<中文标题>', icon: ImportedIcon },
```

### Step 7: Verify & Report

1. 确认无 TypeScript 类型错误
2. 确认导入路径正确
3. 输出结果：

```
✅ 页面生成完成

📄 新增文件:
  - src/views/<page-name>/index.vue
  - src/mock/<page-name>.ts

📝 修改文件:
  - src/router/index.ts（新增路由）
  - src/layouts/DefaultLayout.vue（新增菜单）

🔗 访问地址: http://localhost:3000/<page-name>

🖱️ 交互说明:
  - 点击 xxx 可跳转到 ...
  - 点击「新建」打开弹窗 ...
  - 支持搜索和筛选 ...
```

## CSS Handling Rules

当用户同时提供 CSS 样式时：

1. **自定义色值/渐变**: 直接写入 `<style scoped>` 或使用 Tailwind arbitrary `bg-[#hex]`
2. **自定义动画**: 写入 `<style scoped>`
3. **常规布局/间距/字号**: 优先用 Tailwind class 替代
4. **组件库覆盖样式**: 使用 `:deep()` 选择器在 `<style scoped>` 中覆盖 Element Plus 默认样式
5. **保留原始 class name**: 如用户 CSS 用了特定 class，在 template 中保留这些 class

## Multi-Page Handling

如果设计图包含多个页面（如列表页 + 详情页）：

1. 列表页 → `src/views/<name>/index.vue`
2. 详情页 → `src/views/<name>/detail.vue`
3. 两者共用同一份 mock 数据 `src/mock/<name>.ts`
4. 列表页点击项跳转详情页
5. 详情页有返回按钮回到列表

## Important Reminders

- **所有文本使用中文**
- **不删除已有文件内容**，只追加路由和菜单
- **保持与项目现有代码风格一致**：Composition API、function 声明、Tailwind + Element Plus 混用
- **优先 UI 还原度**：宁可多写几行 CSS，也不要偏离设计图
- **交互必须可用**：每个按钮/链接都必须有响应，即使只是 `ElMessage.info('功能开发中')`
