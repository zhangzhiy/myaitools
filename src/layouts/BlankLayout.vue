<script setup lang="ts">
// 无侧栏、无顶栏的空白布局，仅渲染页面内容，用于手机端全屏展示（如新房商机汇报详情）
</script>

<template>
  <div class="h-screen w-full overflow-auto bg-[#F5F6F7]">
    <router-view />
  </div>
</template>
