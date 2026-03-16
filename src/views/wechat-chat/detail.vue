<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getChatReportById } from '@/mock/wechat-chat'
import { ArrowLeft } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const report = computed(() => {
  const id = Number(route.params.id)
  return getChatReportById(id)
})

function goBack() {
  router.back()
}
</script>

<template>
  <div v-if="report" class="detail-page">
    <header class="detail-header">
      <button type="button" class="back-btn" aria-label="返回" @click="goBack">
        <el-icon><ArrowLeft /></el-icon>
      </button>
      <h1 class="detail-title">商机汇报详情</h1>
    </header>
    <div class="detail-content">
      <el-card shadow="hover" class="report-detail-card">
        <template #header>
          <span class="card-header">{{ report.title }}</span>
        </template>
        <el-descriptions :column="1" border>
          <el-descriptions-item label="汇报人">{{ report.sender }}</el-descriptions-item>
          <el-descriptions-item label="日期">{{ report.date }}</el-descriptions-item>
          <el-descriptions-item label="数据明细">{{ report.detail }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>
  </div>
  <div v-else class="detail-page">
    <el-result icon="warning" title="未找到该汇报" sub-title="请返回列表重试">
      <template #extra>
        <el-button type="primary" @click="router.push('/wechat-chat')">返回列表</el-button>
      </template>
    </el-result>
  </div>
</template>

<style scoped>
.detail-page {
  max-width: 600px;
  margin: 0 auto;
  min-height: 100%;
}

.detail-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #fff;
  border-bottom: 1px solid #eee;
  margin-bottom: 24px;
}

.detail-header .back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  padding: 4px;
  background: none;
  border: none;
  cursor: pointer;
  color: #576b95;
}

.detail-title {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: #000;
}

.report-detail-card .card-header {
  font-weight: 500;
  font-size: 16px;
}
</style>
