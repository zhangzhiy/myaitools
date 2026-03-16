<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProjectById, projectStatusMap } from '@/mock/projects'
import { ArrowLeft } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const project = computed(() => {
  const id = Number(route.params.id)
  return getProjectById(id)
})

const milestones = [
  { title: '需求确认', date: '2026-01-15', status: 'done' },
  { title: '设计评审', date: '2026-02-01', status: 'done' },
  { title: '开发完成', date: '2026-03-01', status: 'current' },
  { title: '测试上线', date: '2026-03-20', status: 'pending' },
]
</script>

<template>
  <div v-if="project" class="space-y-5">
    <el-page-header @back="router.back()">
      <template #icon>
        <el-icon><ArrowLeft /></el-icon>
      </template>
      <template #content>
        <div class="flex items-center gap-3">
          <span class="text-lg font-semibold">{{ project.name }}</span>
          <el-tag :type="projectStatusMap[project.status].type">
            {{ projectStatusMap[project.status].label }}
          </el-tag>
        </div>
      </template>
    </el-page-header>

    <div class="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <!-- 基本信息 -->
      <el-card shadow="hover" class="lg:col-span-2">
        <template #header>
          <span class="font-medium">项目信息</span>
        </template>
        <el-descriptions :column="2" border>
          <el-descriptions-item label="项目名称">{{ project.name }}</el-descriptions-item>
          <el-descriptions-item label="负责人">{{ project.owner }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="projectStatusMap[project.status].type" size="small">
              {{ projectStatusMap[project.status].label }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="成员数">{{ project.members }} 人</el-descriptions-item>
          <el-descriptions-item label="创建时间">{{ project.createdAt }}</el-descriptions-item>
          <el-descriptions-item label="更新时间">{{ project.updatedAt }}</el-descriptions-item>
          <el-descriptions-item label="项目描述" :span="2">
            {{ project.description }}
          </el-descriptions-item>
        </el-descriptions>

        <div class="mt-4 flex flex-wrap gap-2">
          <el-tag v-for="tag in project.tags" :key="tag" effect="plain">{{ tag }}</el-tag>
        </div>
      </el-card>

      <!-- 进度 -->
      <el-card shadow="hover">
        <template #header>
          <span class="font-medium">进度概况</span>
        </template>
        <div class="flex flex-col items-center gap-4">
          <el-progress type="dashboard" :percentage="project.progress" :width="140" />
          <span class="text-sm text-gray-500">当前完成进度</span>
        </div>
      </el-card>
    </div>

    <!-- 里程碑 -->
    <el-card shadow="hover">
      <template #header>
        <span class="font-medium">里程碑</span>
      </template>
      <el-steps :active="milestones.findIndex((m) => m.status === 'current')" finish-status="success">
        <el-step
          v-for="milestone in milestones"
          :key="milestone.title"
          :title="milestone.title"
          :description="milestone.date"
        />
      </el-steps>
    </el-card>
  </div>

  <el-empty v-else description="项目不存在">
    <el-button type="primary" @click="router.push('/projects')">返回列表</el-button>
  </el-empty>
</template>
