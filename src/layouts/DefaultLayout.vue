<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import {
  HomeFilled,
  FolderOpened,
  User,
  Setting,
  Expand,
  Fold,
  Bell,
  SwitchButton,
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()

const menuItems = [
  { index: '/dashboard', title: '工作台', icon: HomeFilled },
  { index: '/projects', title: '项目管理', icon: FolderOpened },
  { index: '/users', title: '用户管理', icon: User },
  { index: '/settings', title: '系统设置', icon: Setting },
]

const activeMenu = computed(() => {
  const path = route.path
  const matched = menuItems.find((item) => path.startsWith(item.index))
  return matched?.index ?? '/dashboard'
})

function handleLogout() {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <el-container class="h-screen">
    <!-- 侧边栏 -->
    <el-aside
      :width="appStore.isCollapsed ? '64px' : '220px'"
      class="border-r border-gray-200 transition-all duration-300"
    >
      <div class="flex h-14 items-center justify-center border-b border-gray-200 bg-white">
        <span v-if="!appStore.isCollapsed" class="text-lg font-semibold text-gray-800">
          ProductDemo
        </span>
        <span v-else class="text-lg font-bold text-blue-500">P</span>
      </div>
      <el-menu
        :default-active="activeMenu"
        :collapse="appStore.isCollapsed"
        router
        class="!border-r-0"
      >
        <el-menu-item v-for="item in menuItems" :key="item.index" :index="item.index">
          <el-icon><component :is="item.icon" /></el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 顶部栏 -->
      <el-header class="flex items-center justify-between border-b border-gray-200 bg-white px-4">
        <div class="flex items-center gap-3">
          <el-icon
            class="cursor-pointer text-xl text-gray-500 hover:text-blue-500"
            @click="appStore.toggleSidebar"
          >
            <Fold v-if="!appStore.isCollapsed" />
            <Expand v-else />
          </el-icon>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              v-for="matched in route.matched.filter((r) => r.meta.title)"
              :key="matched.path"
            >
              {{ matched.meta.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div class="flex items-center gap-4">
          <el-badge :value="3" :max="99">
            <el-icon class="cursor-pointer text-xl text-gray-500"><Bell /></el-icon>
          </el-badge>
          <el-dropdown trigger="click">
            <div class="flex cursor-pointer items-center gap-2">
              <el-avatar :size="32">
                {{ userStore.userInfo.name.charAt(0) }}
              </el-avatar>
              <span class="text-sm text-gray-700">{{ userStore.userInfo.name }}</span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">
                  <el-icon><SwitchButton /></el-icon>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 内容区域 -->
      <el-main class="bg-gray-50 p-5">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
