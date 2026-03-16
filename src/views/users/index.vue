<script setup lang="ts">
import { ref, computed } from 'vue'
import { users, roleOptions, departmentOptions, type UserRecord } from '@/mock/users'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Plus, Edit, Delete } from '@element-plus/icons-vue'

const searchText = ref('')
const roleFilter = ref<string>('')
const isDialogVisible = ref(false)
const isEditing = ref(false)
const currentUser = ref<Partial<UserRecord>>({})

const filteredUsers = computed(() => {
  return users.filter((u) => {
    const matchSearch = !searchText.value || u.name.includes(searchText.value) || u.email.includes(searchText.value)
    const matchRole = !roleFilter.value || u.role === roleFilter.value
    return matchSearch && matchRole
  })
})

function handleAdd() {
  isEditing.value = false
  currentUser.value = { status: 'active' }
  isDialogVisible.value = true
}

function handleEdit(user: UserRecord) {
  isEditing.value = true
  currentUser.value = { ...user }
  isDialogVisible.value = true
}

function handleSave() {
  if (!currentUser.value.name) {
    ElMessage.warning('请输入姓名')
    return
  }
  ElMessage.success(isEditing.value ? '编辑成功' : '新增成功')
  isDialogVisible.value = false
}

function handleDelete(user: UserRecord) {
  ElMessageBox.confirm(`确认删除用户「${user.name}」？`, '删除确认', { type: 'warning' })
    .then(() => ElMessage.success('删除成功'))
    .catch(() => {})
}

function handleToggleStatus(user: UserRecord) {
  const action = user.status === 'active' ? '停用' : '启用'
  user.status = user.status === 'active' ? 'inactive' : 'active'
  ElMessage.success(`已${action}`)
}
</script>

<template>
  <div class="space-y-5">
    <!-- 搜索栏 -->
    <el-card shadow="hover">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <el-input
            v-model="searchText"
            placeholder="搜索姓名、邮箱..."
            :prefix-icon="Search"
            clearable
            class="w-64"
          />
          <el-select v-model="roleFilter" placeholder="角色筛选" clearable class="w-32">
            <el-option v-for="role in roleOptions" :key="role" :label="role" :value="role" />
          </el-select>
        </div>
        <el-button type="primary" :icon="Plus" @click="handleAdd">新增用户</el-button>
      </div>
    </el-card>

    <!-- 用户表格 -->
    <el-card shadow="hover">
      <el-table :data="filteredUsers" stripe>
        <el-table-column prop="name" label="姓名" width="100">
          <template #default="{ row }">
            <div class="flex items-center gap-2">
              <el-avatar :size="28">{{ row.name.charAt(0) }}</el-avatar>
              <span>{{ row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="180" />
        <el-table-column prop="phone" label="手机号" width="140" />
        <el-table-column prop="role" label="角色" width="100">
          <template #default="{ row }">
            <el-tag size="small">{{ row.role }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="department" label="部门" width="100" />
        <el-table-column prop="status" label="状态" width="90">
          <template #default="{ row }">
            <el-switch
              :model-value="row.status === 'active'"
              @change="handleToggleStatus(row)"
              inline-prompt
              active-text="启"
              inactive-text="停"
            />
          </template>
        </el-table-column>
        <el-table-column prop="joinDate" label="入职日期" width="120" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button :icon="Edit" size="small" link type="primary" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button :icon="Delete" size="small" link type="danger" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增/编辑弹窗 -->
    <el-dialog
      v-model="isDialogVisible"
      :title="isEditing ? '编辑用户' : '新增用户'"
      width="500px"
    >
      <el-form :model="currentUser" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="currentUser.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="currentUser.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="currentUser.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="currentUser.role" placeholder="请选择角色" class="w-full">
            <el-option v-for="role in roleOptions" :key="role" :label="role" :value="role" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="currentUser.department" placeholder="请选择部门" class="w-full">
            <el-option v-for="dept in departmentOptions" :key="dept" :label="dept" :value="dept" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="isDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>
