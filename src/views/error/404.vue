<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-gray-50">
    <h1 class="text-8xl font-bold text-gray-200">404</h1>
    <p class="mt-4 text-xl text-gray-500">页面不存在</p>
    <el-button type="primary" class="mt-6" @click="router.push('/')">
      返回首页
    </el-button>
  </div>
</template>
