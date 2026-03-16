<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  reportHeader,
  targetProgressList,
  overviewList,
  opportunityCards,
} from '@/mock/business-report-detail'

const router = useRouter()
const targetTab = ref('quarter')
const overviewTab = ref('all')
const filterTab = ref('today')

function goBack() {
  router.back()
}

function onCatalog() {
  // 目录悬浮按钮
}
</script>

<template>
  <div class="report-detail-page">
    <!-- 导航 -->
    <header class="report-nav">
      <button type="button" class="nav-back" aria-label="返回" @click="goBack">
        <span class="nav-back-arrow">&lt;</span>
      </button>
      <h1 class="nav-title">预京商机汇报详情</h1>
      <span class="nav-time">09:22</span>
    </header>

    <!-- 报告头 -->
    <section class="report-header-block">
      <h2 class="report-title">{{ reportHeader.title }}</h2>
      <p class="report-subtitle">{{ reportHeader.deadline }}</p>
    </section>

    <!-- 业绩及单量目标进展 -->
    <section class="section-card">
      <h3 class="section-title">业绩及单量目标进展</h3>
      <el-tabs v-model="targetTab" class="report-tabs">
        <el-tab-pane label="季度目标" name="quarter" />
        <el-tab-pane label="年度目标" name="year" />
      </el-tabs>
      <div class="table-wrap">
        <el-table :data="targetProgressList" border size="small" class="report-table">
          <el-table-column prop="scope" label="组织范围" min-width="90" />
          <el-table-column prop="target" label="目标" width="72" align="center" />
          <el-table-column prop="completed" label="完成" width="72" align="center" />
          <el-table-column prop="gap" label="差距" width="72" align="center" />
          <el-table-column prop="estimatedComplete" label="预计完成" width="80" align="center" />
          <el-table-column prop="submitted" label="已递交" width="72" align="center" />
        </el-table>
      </div>
    </section>

    <!-- 今日商机汇报概述 -->
    <section class="section-card">
      <h3 class="section-title">今日商机汇报概述</h3>
      <el-tabs v-model="overviewTab" class="report-tabs">
        <el-tab-pane label="全部商机" name="all" />
        <el-tab-pane label="跟进商机" name="follow" />
        <el-tab-pane label="新增商机" name="new" />
      </el-tabs>
      <div class="table-wrap">
        <el-table :data="overviewList" border size="small" class="report-table">
          <el-table-column prop="scope" label="组织范围" min-width="90" />
          <el-table-column label="全部商机" align="center">
            <el-table-column prop="totalStock" label="总存量" width="64" align="center" />
            <el-table-column prop="weeklyIncrease" label="周净增" width="64" align="center" />
          </el-table-column>
          <el-table-column prop="stock100" label="100商机" width="64" align="center" />
          <el-table-column prop="stock90" label="90商机" width="64" align="center" />
          <el-table-column prop="stock80" label="80商机" width="64" align="center" />
          <el-table-column prop="stock70" label="70商机" width="64" align="center" />
        </el-table>
      </div>
    </section>

    <!-- 具体商机情况 -->
    <section class="section-filter">
      <h3 class="section-title">具体商机情况</h3>
      <div class="filter-tabs">
        <button
          type="button"
          :class="['filter-tab', { active: filterTab === 'today' }]"
          @click="filterTab = 'today'"
        >
          今日跟进
        </button>
        <button
          type="button"
          :class="['filter-tab', { active: filterTab === 'full' }]"
          @click="filterTab = 'full'"
        >
          全职跟进
        </button>
      </div>
    </section>

    <div class="cards-wrap">
      <article
        v-for="card in opportunityCards"
        :key="card.id"
        class="opportunity-card"
      >
        <div class="card-head">
          <span class="card-head-bar" />
          <span class="card-level">{{ card.levelLabel }} ({{ card.count }})</span>
        </div>
        <div class="card-name">{{ card.customerName }}</div>
        <div class="card-tags">
          <span v-for="tag in card.tags" :key="tag" class="card-tag">{{ tag }}</span>
        </div>
        <p class="card-meta">创建日期 {{ card.createDate }} · {{ card.storeName }} · {{ card.region }}</p>
        <p class="card-property">{{ card.property }}</p>
        <p class="card-amount">{{ card.salesAmount }}</p>
        <p v-if="card.estimatedComplete" class="card-estimate">{{ card.estimatedComplete }}</p>
        <button v-if="card.hasSuggestButton" type="button" class="card-btn-suggest">
          <span class="btn-icon">🎤</span>
          查看具体跟进建议
        </button>
        <button v-else type="button" class="card-btn-more">
          查看更多
          <span class="btn-arrow">›</span>
        </button>
      </article>
    </div>

    <!-- 目录悬浮按钮 -->
    <button
      type="button"
      class="fab-catalog"
      aria-label="目录"
      @click="onCatalog"
    >
      <span class="fab-icon">≡</span>
      <span class="fab-label">目录</span>
    </button>
  </div>
</template>

<style scoped>
.report-detail-page {
  max-width: 390px;
  margin: 0 auto;
  min-height: 100%;
  background: #F5F6F7;
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;
}

/* 导航 */
.report-nav {
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 12px 0 16px;
  background: #fff;
  flex-shrink: 0;
}

.nav-back {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #495057;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.nav-title {
  flex: 1;
  text-align: center;
  font: 400 16px/22px 'PingFang SC', 'MI Lan Pro VF', sans-serif;
  color: #000;
  margin: 0;
}

.nav-time {
  width: 52px;
  text-align: right;
  font-size: 14px;
  color: #838A90;
}

/* 报告头 */
.report-header-block {
  padding: 16px 16px 8px;
  background: #fff;
  flex-shrink: 0;
}

.report-title {
  font: 500 22px/32px 'PingFang SC', sans-serif;
  color: #000;
  margin: 0 0 6px;
}

.report-subtitle {
  font: 400 14px/22px 'PingFang SC', sans-serif;
  color: #838A90;
  margin: 0;
}

/* 通用区块 */
.section-card {
  margin-top: 10px;
  padding: 16px;
  background: #fff;
  flex-shrink: 0;
}

.section-title {
  font: 500 18px/26px 'PingFang SC', sans-serif;
  color: #212529;
  margin: 0 0 8px;
}

.report-tabs :deep(.el-tabs__header) {
  margin-bottom: 10px;
}

.report-tabs :deep(.el-tabs__item.is-active) {
  color: #BF9660;
}

.report-tabs :deep(.el-tabs__active-bar) {
  background: #BF9660;
}

.report-tabs :deep(.el-tabs__indicator) {
  background: #BF9660;
}

.report-tabs :deep(.el-tabs__item) {
  font-size: 16px;
}

.report-tabs :deep(.el-tabs__nav-wrap::after) {
  display: none;
}

.table-wrap {
  overflow-x: auto;
  border: 1px solid #DEE2E6;
  border-radius: 8px;
}

.report-table {
  font-size: 12px;
}

.report-table :deep(.el-table__header th) {
  background: #F5F6F7;
  color: #212529;
  font-weight: 500;
}

.report-table :deep(.el-table__cell) {
  color: #292A2E;
}

/* 具体商机情况 */
.section-filter {
  padding: 20px 16px 0;
  flex-shrink: 0;
}

.section-filter .section-title {
  margin-bottom: 12px;
}

.filter-tabs {
  display: flex;
  gap: 36px;
  padding: 16px;
  background: #fff;
}

.filter-tab {
  font: 340 13px/20px 'MI Lan Pro VF', sans-serif;
  color: #495057;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.filter-tab.active {
  color: #F57D05;
  font-weight: 500;
}

/* 商机卡片列表 */
.cards-wrap {
  padding: 0 0 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.opportunity-card {
  margin: 0 12px;
  padding: 12px 12px 16px;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #DEDFE3;
  box-sizing: border-box;
}

.card-head {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
}

.card-head-bar {
  width: 4px;
  height: 14px;
  background: #F29A15;
  border-radius: 4px;
  flex-shrink: 0;
}

.card-level {
  font: 500 16px/24px 'PingFang SC', sans-serif;
  color: #212529;
}

.card-name {
  font: 400 16px/22px 'MI Lan Pro VF', sans-serif;
  color: #1C2633;
  margin-bottom: 6px;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
}

.card-tag {
  padding: 1px 4px;
  font: 340 10px/14px 'MI Lan Pro VF', sans-serif;
  color: #F57D05;
  background: rgba(245, 125, 5, 0.06);
  border: 0.5px solid rgba(245, 125, 5, 0.2);
  border-radius: 4px;
}

.card-meta {
  font: 340 12px/16px 'MI Lan Pro VF', sans-serif;
  color: #838A90;
  margin: 0 0 6px;
}

.card-property {
  font: 400 15px/22px 'MI Lan Pro VF', sans-serif;
  color: #212529;
  margin: 0 0 4px;
}

.card-amount {
  font: 400 13px/18px 'MI Lan Pro VF', sans-serif;
  color: #212529;
  margin: 0 0 2px;
}

.card-estimate {
  font: 340 12px/16px 'MI Lan Pro VF', sans-serif;
  color: #838A90;
  margin: 0 0 10px;
}

.card-btn-suggest {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  font: 340 12px/16px 'MI Lan Pro VF', sans-serif;
  color: #fff;
  background: #BF9660;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.card-btn-more {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font: 340 12px/16px 'MI Lan Pro VF', sans-serif;
  color: #838A90;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.btn-arrow {
  color: #838A90;
  font-size: 14px;
}

/* 目录悬浮按钮 */
.fab-catalog {
  position: fixed;
  right: 16px;
  bottom: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  background: #fff;
  border: 0.5px solid #DEE2E6;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  z-index: 10;
}

.fab-icon {
  font-size: 16px;
  color: #212529;
  line-height: 1;
}

.fab-label {
  font: 400 9px/9px 'Microsoft YaHei', sans-serif;
  color: #212529;
}
</style>
