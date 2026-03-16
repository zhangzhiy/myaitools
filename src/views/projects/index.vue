<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { projects, projectStatusMap, type Project } from '@/mock/projects'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Plus, View } from '@element-plus/icons-vue'

const router = useRouter()
const searchText = ref('')
const statusFilter = ref<string>('')
const isDialogVisible = ref(false)
const newProject = ref({ name: '', description: '', tags: '' })

const filteredProjects = computed(() => {
  return projects.filter((p) => {
    const matchSearch = !searchText.value || p.name.includes(searchText.value) || p.description.includes(searchText.value)
    const matchStatus = !statusFilter.value || p.status === statusFilter.value
    return matchSearch && matchStatus
  })
})

function viewDetail(project: Project) {
  router.push(`/projects/${project.id}`)
}

function handleCreate() {
  if (!newProject.value.name) {
    ElMessage.warning('请输入项目名称')
    return
  }
  ElMessage.success(`项目「${newProject.value.name}」创建成功`)
  isDialogVisible.value = false
  newProject.value = { name: '', description: '', tags: '' }
}

function handleDelete(project: Project) {
  ElMessageBox.confirm(`确认删除项目「${project.name}」？`, '删除确认', {
    type: 'warning',
  }).then(() => {
    ElMessage.success('删除成功')
  }).catch(() => {})
}
</script>

<template>
  <div class="space-y-5">
    <!-- 操作栏 -->
    <el-card shadow="hover">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <el-input
            v-model="searchText"
            placeholder="搜索项目..."
            :prefix-icon="Search"
            clearable
            class="w-64"
          />
          <el-select v-model="statusFilter" placeholder="状态筛选" clearable class="w-32">
            <el-option label="进行中" value="active" />
            <el-option label="已暂停" value="paused" />
            <el-option label="已完成" value="completed" />
          </el-select>
        </div>
        <el-button type="primary" :icon="Plus" @click="isDialogVisible = true">
          新建项目
        </el-button>
      </div>
    </el-card>

    <!-- 项目列表 -->
    <div class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      <el-card
        v-for="project in filteredProjects"
        :key="project.id"
        shadow="hover"
        class="cursor-pointer transition-transform hover:-translate-y-1"
        @click="viewDetail(project)"
      >
        <div class="space-y-4">
          <div class="flex items-start justify-between">
            <div class="min-w-0 flex-1">
              <h3 class="truncate text-lg font-semibold text-gray-800">{{ project.name }}</h3>
              <p class="mt-1 line-clamp-2 text-sm text-gray-500">{{ project.description }}</p>
            </div>
            <el-tag :type="projectStatusMap[project.status].type" size="small">
              {{ projectStatusMap[project.status].label }}
            </el-tag>
          </div>

          <el-progress
            :percentage="project.progress"
            :stroke-width="6"
            :color="project.progress === 100 ? '#67C23A' : '#409EFF'"
          />

          <div class="flex flex-wrap gap-1">
            <el-tag v-for="tag in project.tags" :key="tag" size="small" effect="plain">
              {{ tag }}
            </el-tag>
          </div>

          <div class="flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-400">
            <span>负责人: {{ project.owner }}</span>
            <span>{{ project.members }} 成员</span>
          </div>

          <div class="flex justify-end gap-2" @click.stop>
            <el-button size="small" :icon="View" @click="viewDetail(project)">查看</el-button>
            <el-button size="small" type="danger" plain @click="handleDelete(project)">删除</el-button>
          </div>
        </div>
      </el-card>
    </div>

    <el-empty v-if="filteredProjects.length === 0" description="暂无匹配的项目" />

    <!-- 新建项目弹窗 -->
    <el-dialog v-model="isDialogVisible" title="新建项目" width="500px">
      <el-form :model="newProject" label-width="80px">
        <el-form-item label="项目名称">
          <el-input v-model="newProject.name" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input v-model="newProject.description" type="textarea" :rows="3" placeholder="请输入项目描述" />
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="newProject.tags" placeholder="多个标签用逗号分隔" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="isDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCreate">创建</el-button>
      </template>
    </el-dialog>
  </div>
</template>
