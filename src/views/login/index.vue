<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

const form = ref({ username: 'admin', password: '123456' })
const isLoading = ref(false)

async function handleLogin() {
  if (!form.value.username || !form.value.password) {
    ElMessage.warning('请输入用户名和密码')
    return
  }
  isLoading.value = true
  await new Promise((resolve) => setTimeout(resolve, 800))
  userStore.login(form.value.username === 'admin' ? '张三' : form.value.username)
  ElMessage.success('登录成功')
  router.push('/dashboard')
  isLoading.value = false
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <div class="w-full max-w-md rounded-2xl bg-white p-10 shadow-xl">
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-gray-800">ProductDemo</h1>
        <p class="mt-2 text-gray-500">产品演示系统</p>
      </div>
      <el-form :model="form" @submit.prevent="handleLogin">
        <el-form-item>
          <el-input
            v-model="form.username"
            placeholder="用户名"
            prefix-icon="User"
            size="large"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
            prefix-icon="Lock"
            size="large"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            class="w-full"
            :loading="isLoading"
            native-type="submit"
          >
            登 录
          </el-button>
        </el-form-item>
      </el-form>
      <div class="mt-4 text-center text-xs text-gray-400">
        演示账号: admin / 123456
      </div>
    </div>
  </div>
</template>
