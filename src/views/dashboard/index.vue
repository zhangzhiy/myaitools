<script setup lang="ts">
import { ref } from 'vue'
import { statCards, activities, todoList, type TodoItem } from '@/mock/dashboard'
import {
  HomeFilled,
  FolderOpened,
  User,
  Money,
  Bell,
  TrendCharts,
  ArrowUp,
  ArrowDown,
  Check,
  Clock,
  WarningFilled,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const iconMap: Record<string, typeof HomeFilled> = {
  HomeFilled,
  FolderOpened,
  User,
  Money,
  Bell,
}

const localTodos = ref<TodoItem[]>([...todoList])

function toggleTodo(todo: TodoItem) {
  todo.status = todo.status === 'done' ? 'pending' : 'done'
  ElMessage.success(todo.status === 'done' ? '已完成' : '已标记为待办')
}

function getStatusIcon(status: string) {
  const map: Record<string, typeof Check> = { done: Check, pending: Clock, overdue: WarningFilled }
  return map[status] ?? Clock
}

function getStatusColor(status: string) {
  const map: Record<string, string> = { done: '#67C23A', pending: '#409EFF', overdue: '#F56C6C' }
  return map[status] ?? '#409EFF'
}
</script>

<template>
  <div class="space-y-5">
    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <el-card
        v-for="card in statCards"
        :key="card.title"
        shadow="hover"
        class="relative overflow-hidden"
      >
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm text-gray-500">{{ card.title }}</div>
            <div class="mt-2 text-3xl font-bold text-gray-800">
              {{ card.value }}
              <span class="text-base font-normal text-gray-400">{{ card.unit }}</span>
            </div>
            <div class="mt-2 flex items-center gap-1 text-xs">
              <el-icon :color="card.trend === 'up' ? '#67C23A' : '#F56C6C'">
                <ArrowUp v-if="card.trend === 'up'" />
                <ArrowDown v-else />
              </el-icon>
              <span :class="card.trend === 'up' ? 'text-green-500' : 'text-red-500'">
                {{ card.trendValue }}
              </span>
              <span class="text-gray-400">较上月</span>
            </div>
          </div>
          <div
            class="flex h-14 w-14 items-center justify-center rounded-xl"
            :style="{ backgroundColor: card.color + '15' }"
          >
            <el-icon :size="28" :color="card.color">
              <component :is="iconMap[card.icon]" />
            </el-icon>
          </div>
        </div>
      </el-card>
    </div>

    <div class="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <!-- 最近动态 -->
      <el-card shadow="hover" class="lg:col-span-2">
        <template #header>
          <div class="flex items-center gap-2">
            <el-icon color="#409EFF"><TrendCharts /></el-icon>
            <span class="font-medium">最近动态</span>
          </div>
        </template>
        <el-timeline>
          <el-timeline-item
            v-for="item in activities"
            :key="item.id"
            :timestamp="item.time"
            placement="top"
          >
            <div class="flex items-center gap-2">
              <el-avatar :size="28">{{ item.user.charAt(0) }}</el-avatar>
              <span class="font-medium text-gray-700">{{ item.user }}</span>
              <span class="text-gray-500">{{ item.action }}</span>
              <el-tag size="small" type="info">{{ item.target }}</el-tag>
            </div>
          </el-timeline-item>
        </el-timeline>
      </el-card>

      <!-- 待办事项 -->
      <el-card shadow="hover">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <el-icon color="#E6A23C"><Clock /></el-icon>
              <span class="font-medium">待办事项</span>
            </div>
            <el-tag size="small">{{ localTodos.filter((t) => t.status === 'pending').length }} 待处理</el-tag>
          </div>
        </template>
        <div class="space-y-3">
          <div
            v-for="todo in localTodos"
            :key="todo.id"
            class="flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50"
            @click="toggleTodo(todo)"
          >
            <el-icon :size="18" :color="getStatusColor(todo.status)">
              <component :is="getStatusIcon(todo.status)" />
            </el-icon>
            <div class="min-w-0 flex-1">
              <div
                class="truncate text-sm"
                :class="todo.status === 'done' ? 'text-gray-400 line-through' : 'text-gray-700'"
              >
                {{ todo.title }}
              </div>
              <div class="mt-1 text-xs text-gray-400">截止: {{ todo.deadline }}</div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
