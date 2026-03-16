<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  reportHeader,
  targetProgressList,
  overviewList,
  opportunityCards,
  getExpandDetailByCardId,
} from '@/mock/business-report-detail'

const router = useRouter()
const targetTab = ref('quarter')
const overviewTab = ref('all')
/** 具体商机情况 - 选项卡：全部商机 / 客商机 / 房商机 / 求租客 / 租赁房 */
const opportunityTab = ref<string>('all')
const opportunityTabs = [
  { key: 'all', label: '全部商机 2' },
  { key: 'client', label: '客商机 2' },
  { key: 'property', label: '房商机 2' },
  { key: 'tenant', label: '求租客 2' },
  { key: 'rental', label: '租赁房' },
] as const
/** 筛选条件 */
const filterOptions = [
  { key: 'city', label: '城市' },
  { key: 'district', label: '大区' },
  { key: 'store', label: '门店' },
  { key: 'progress', label: '今日新进展' },
] as const
const expandedCardId = ref<number | null>(null)

function goBack() {
  router.back()
}

function onCatalog() {
  // 目录悬浮按钮
}

function expandCard(id: number) {
  expandedCardId.value = id
}

function collapseCard() {
  expandedCardId.value = null
}

function getExpandDetail(id: number) {
  return getExpandDetailByCardId(id)
}

/** 取嵌套属性，供表格 formatter 使用 */
function getCell(row: Record<string, unknown>, path: string): string | number | undefined {
  const v = path.split('.').reduce((o: unknown, k) => (o as Record<string, unknown>)?.[k], row)
  return v as string | number | undefined
}

/** 生成表格 cell formatter，避免模板中 row 隐式 any */
function cellFormatter(path: string) {
  return (row: unknown): string | number => getCell(row as Record<string, unknown>, path) ?? ''
}

</script>

<template>
  <div class="report-detail-page">
    <!-- 导航 -->
    <header class="report-nav">
      <button type="button" class="nav-back" aria-label="返回" @click="goBack">
        <span class="nav-back-arrow">&lt;</span>
      </button>
      <h1 class="nav-title">预览商机汇报详情</h1>
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
        <el-table
          :data="targetProgressList"
          border
          size="small"
          class="report-table"
          row-key="scope"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          default-expand-all
        >
          <el-table-column prop="scope" label="组织范围" min-width="100" />
          <el-table-column label="总目标" align="center">
            <el-table-column label="业绩" width="68" align="center" :formatter="cellFormatter('totalTarget.performance') ?? ''" />
            <el-table-column label="市占" width="68" align="center" :formatter="cellFormatter('totalTarget.marketShare') ?? ''" />
            <el-table-column label="已签" width="68" align="center" :formatter="cellFormatter('totalTarget.signed') ?? ''" />
            <el-table-column label="保签" width="68" align="center" :formatter="cellFormatter('totalTarget.insured') ?? ''" />
          </el-table-column>
          <el-table-column label="整体进展" align="center">
            <el-table-column prop="completionRate" label="完成率" width="76" align="center" />
          </el-table-column>
          <el-table-column label="二手" align="center">
            <el-table-column label="已签" width="64" align="center" :formatter="cellFormatter('secondHand.signed') ?? ''" />
            <el-table-column label="已成交" width="64" align="center" :formatter="cellFormatter('secondHand.concluded') ?? ''" />
            <el-table-column label="房源边" width="64" align="center" :formatter="cellFormatter('secondHand.propertySide') ?? ''" />
            <el-table-column label="客源边" width="64" align="center" :formatter="cellFormatter('secondHand.clientSide') ?? ''" />
          </el-table-column>
          <el-table-column label="一手" align="center">
            <el-table-column label="已签" width="64" align="center" :formatter="cellFormatter('firstHand.signed') ?? ''" />
            <el-table-column label="已成交" width="64" align="center" :formatter="cellFormatter('firstHand.concluded') ?? ''" />
          </el-table-column>
          <el-table-column label="海外" align="center">
            <el-table-column label="已签" width="64" align="center" :formatter="cellFormatter('overseas.signed') ?? ''" />
            <el-table-column label="已成交" width="64" align="center" :formatter="cellFormatter('overseas.concluded') ?? ''" />
          </el-table-column>
          <el-table-column label="租赁" align="center">
            <el-table-column label="已签" width="64" align="center" :formatter="cellFormatter('rental.signed') ?? ''" />
            <el-table-column label="已成交" width="64" align="center" :formatter="cellFormatter('rental.concluded') ?? ''" />
            <el-table-column label="房源边" width="64" align="center" :formatter="cellFormatter('rental.propertySide') ?? ''" />
            <el-table-column label="客源边" width="64" align="center" :formatter="cellFormatter('rental.clientSide') ?? ''" />
          </el-table-column>
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
        <el-table
          :data="overviewList"
          border
          size="small"
          class="report-table"
          row-key="scope"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          default-expand-all
        >
          <el-table-column prop="scope" label="组织范围" min-width="100" />
          <el-table-column label="全部商机量" align="center">
            <el-table-column label="库存量" width="64" align="center" :formatter="cellFormatter('allOpportunity.inventory') ?? ''" />
            <el-table-column label="已转定" width="64" align="center" :formatter="cellFormatter('allOpportunity.converted') ?? ''" />
            <el-table-column label="今日有进展" width="80" align="center" :formatter="cellFormatter('allOpportunity.progressToday') ?? ''" />
          </el-table-column>
          <el-table-column label="100保签" align="center">
            <el-table-column label="库存量" width="64" align="center" :formatter="cellFormatter('stock100Insured.inventory') ?? ''" />
            <el-table-column label="已转定" width="64" align="center" :formatter="cellFormatter('stock100Insured.converted') ?? ''" />
            <el-table-column label="今日有进展" width="80" align="center" :formatter="cellFormatter('stock100Insured.progressToday') ?? ''" />
            <el-table-column label="新增90量" width="72" align="center" :formatter="cellFormatter('stock100Insured.new90') ?? ''" />
          </el-table-column>
          <el-table-column label="90商机" align="center">
            <el-table-column label="库存量" width="64" align="center" :formatter="cellFormatter('stock90.inventory') ?? ''" />
            <el-table-column label="意向金/认购" width="80" align="center" :formatter="cellFormatter('stock90.intentOrSubscribe') ?? ''" />
            <el-table-column label="今日有进展" width="80" align="center" :formatter="cellFormatter('stock90.progressToday') ?? ''" />
            <el-table-column label="新增80量" width="72" align="center" :formatter="cellFormatter('stock90.new80') ?? ''" />
          </el-table-column>
          <el-table-column label="80商机" align="center">
            <el-table-column label="库存量" width="64" align="center" :formatter="cellFormatter('stock80.inventory') ?? ''" />
            <el-table-column label="今日有进展" width="80" align="center" :formatter="cellFormatter('stock80.progressToday') ?? ''" />
            <el-table-column label="新增70量" width="72" align="center" :formatter="cellFormatter('stock80.new70') ?? ''" />
          </el-table-column>
          <el-table-column label="70商机" align="center">
            <el-table-column label="库存量" width="64" align="center" :formatter="cellFormatter('stock70.inventory') ?? ''" />
            <el-table-column label="今日有进展" width="80" align="center" :formatter="cellFormatter('stock70.progressToday') ?? ''" />
          </el-table-column>
        </el-table>
      </div>
    </section>

    <!-- 具体商机情况 Frame 2095585867：标题 + 头部切换 + 筛选 -->
    <section class="section-opportunity-header">
      <h3 class="opportunity-section-title">具体商机情况</h3>
      <div class="opportunity-header-inner">
        <!-- 选项卡 Tabs/group -->
        <div class="opportunity-tabs-wrap">
          <div class="opportunity-tabs-scroll">
            <button
              v-for="t in opportunityTabs"
              :key="t.key"
              type="button"
              :class="['opportunity-tab', { 'is-active': opportunityTab === t.key }]"
              @click="opportunityTab = t.key"
            >
              <span class="opportunity-tab-title">{{ t.label }}</span>
              <span class="opportunity-tab-underline" />
            </button>
          </div>
        </div>
        <!-- 筛选条件 -->
        <div class="opportunity-filters">
          <button
            v-for="f in filterOptions"
            :key="f.key"
            type="button"
            class="opportunity-filter-item"
          >
            <span class="opportunity-filter-label">{{ f.label }}</span>
            <svg class="opportunity-filter-arrow" width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
              <path d="M1 3L4 6L7 3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <div class="cards-wrap">
      <template v-for="card in opportunityCards" :key="card.id">
        <!-- 展开态：完整磋商单子 -->
        <article
          v-if="expandedCardId === card.id && getExpandDetail(card.id)"
          class="expand-card"
        >
          <div class="expand-inner">
            <!-- 房产头 -->
            <div class="expand-header">
              <div class="expand-header-thumb" />
              <div class="expand-header-info">
                <div class="expand-header-row">
                  <span class="expand-title">{{ getExpandDetail(card.id)!.propertyHeader.title }}</span>
                </div>
                <div class="expand-tags-row">
                  <span
                    v-for="(tag, i) in getExpandDetail(card.id)!.propertyHeader.tags"
                    :key="i"
                    :class="['expand-tag', tag.type === 'primary' ? 'expand-tag-primary' : 'expand-tag-default']"
                  >
                    {{ tag.text }}
                  </span>
                </div>
                <div class="expand-meta">{{ getExpandDetail(card.id)!.propertyHeader.meta }}</div>
              </div>
            </div>

            <!-- 磋商单子 -->
            <div class="negotiation-block">
              <div class="negotiation-inner">
                <!-- 金额 + 概述行 -->
                <div class="negotiation-summary">
                  <div class="negotiation-commission-row">
                    <span class="commission-amount">{{ getExpandDetail(card.id)!.commission }}</span>
                  </div>
                  <div class="negotiation-commission-note">
                    {{ getExpandDetail(card.id)!.commissionNote }}
                  </div>
                  <div class="negotiation-sub-row">
                    <span class="negotiation-property">{{ card.property }}</span>
                    <span class="negotiation-more">›</span>
                  </div>
                  <div
                    v-for="(row, ri) in getExpandDetail(card.id)!.summaryRows"
                    :key="ri"
                    class="negotiation-label-value"
                  >
                    <span class="n-label">{{ row.label }}</span>
                    <span class="n-value">{{ row.value }}</span>
                  </div>
                </div>

                <!-- 各区块：原始差距、磋商目标、磋商方向、今日进展等 -->
                <div class="negotiation-sections">
                  <div
                    v-for="(section, si) in getExpandDetail(card.id)!.sections"
                    :key="si"
                    class="section-card"
                  >
                    <div class="section-card-header">
                      <span
                        class="section-indicator"
                        :style="section.indicatorColor ? { background: section.indicatorColor } : undefined"
                      />
                      <span class="section-card-title">{{ section.title }}</span>
                    </div>
                    <div class="section-card-body">
                      <template v-if="section.paragraphs?.length">
                        <div
                          v-for="(p, pi) in section.paragraphs"
                          :key="'p-' + pi"
                          class="section-paragraph"
                        >
                          <span class="section-p-title">{{ p.title }}</span>
                          <span class="section-p-content">{{ p.content }}</span>
                        </div>
                      </template>
                      <div
                        v-for="(row, ri) in section.rows"
                        :key="'r-' + ri"
                        class="section-row"
                      >
                        <span class="section-row-label">{{ row.label }}</span>
                        <span class="section-row-value">{{ row.value }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 下一步计划 -->
                <div v-if="getExpandDetail(card.id)!.nextStep" class="next-step-card">
                  <div class="section-card-header">
                    <span class="section-indicator section-indicator-g1" />
                    <span class="section-card-title">下一步计划</span>
                  </div>
                  <div class="next-step-body">
                    <div class="next-step-row">
                      <span class="next-step-label">一般</span>
                      <span class="next-step-value">{{ getExpandDetail(card.id)!.nextStep.general }}</span>
                    </div>
                    <div class="next-step-row">
                      <span class="next-step-label">二</span>
                      <span class="next-step-value">{{ getExpandDetail(card.id)!.nextStep.second }}</span>
                    </div>
                    <div class="next-step-row">
                      <span class="next-step-label">三推</span>
                      <span class="next-step-value">{{ getExpandDetail(card.id)!.nextStep.third }}</span>
                    </div>
                    <div class="next-step-row">
                      <span class="next-step-label">四</span>
                      <span class="next-step-value">{{ getExpandDetail(card.id)!.nextStep.fourth }}</span>
                    </div>
                    <p class="next-step-overall">{{ getExpandDetail(card.id)!.nextStep.overall }}</p>
                    <p class="next-step-date">{{ getExpandDetail(card.id)!.nextStep.dateUser }}</p>
                    <div class="next-step-actions">
                      <button type="button" class="action-link">查看历史</button>
                      <button type="button" class="action-btn">
                        <span class="action-btn-icon">✎</span>
                        编辑
                      </button>
                      <button type="button" class="action-btn">
                        <span class="action-btn-icon">🎤</span>
                        语音
                      </button>
                    </div>
                    <button type="button" class="collapse-up-btn" @click="collapseCard">
                      <span class="collapse-up-arrow">▲</span>
                      向上收起
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- 折叠态：原卡片 + 查看更多 -->
        <article
          v-else
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
          <button v-else type="button" class="card-btn-more" @click="expandCard(card.id)">
            查看更多
            <span class="btn-arrow">›</span>
          </button>
        </article>
      </template>
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

/* 具体商机情况 Frame 2095585867：头部切换 + 筛选 */
.section-opportunity-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  width: 100%;
  max-width: 390px;
  flex: none;
  align-self: stretch;
  flex-shrink: 0;
}

.opportunity-section-title {
  font-family: 'MI Lan Pro VF', 'PingFang SC', sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  color: #212529;
  margin: 0 0 0 16px;
  padding: 0;
}

.opportunity-header-inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 0 0 16px;
  gap: 10px;
  width: 100%;
}

/* 选项卡 Tabs/group */
.opportunity-tabs-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  flex: none;
}

.opportunity-tabs-scroll {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0;
  gap: 24px;
  min-width: min-content;
  height: 42px;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
}

.opportunity-tabs-scroll::-webkit-scrollbar {
  display: none;
}

.opportunity-tab {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px 0 3px;
  gap: 6px;
  flex: none;
  background: none;
  border: none;
  cursor: pointer;
  min-width: 0;
}

.opportunity-tab-title {
  font-family: 'MI Lan Pro VF', 'PingFang SC', sans-serif;
  font-style: normal;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  white-space: nowrap;
}

.opportunity-tab:not(.is-active) .opportunity-tab-title {
  font-weight: 340;
  color: #88898F;
}

.opportunity-tab.is-active .opportunity-tab-title {
  font-weight: 400;
  color: #BF9660;
}

.opportunity-tab-underline {
  display: block;
  width: 100%;
  height: 3px;
  border-radius: 2px;
  flex: none;
  align-self: stretch;
}

.opportunity-tab:not(.is-active) .opportunity-tab-underline {
  background: #F57D05;
  opacity: 0;
}

.opportunity-tab.is-active .opportunity-tab-underline {
  background: #BF9660;
}

/* 筛选条件 */
.opportunity-filters {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 36px;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  flex: none;
}

.opportunity-filter-item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0;
  gap: 4px;
  flex: none;
  background: none;
  border: none;
  cursor: pointer;
  font: inherit;
}

.opportunity-filter-label {
  font-family: 'MI Lan Pro VF', sans-serif;
  font-style: normal;
  font-weight: 340;
  font-size: 13px;
  line-height: 20px;
  color: #495057;
}

.opportunity-filter-arrow {
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  color: #838A90;
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

/* 展开态卡片 708090 房-别墅 */
.expand-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  gap: 10px;
  width: 100%;
  max-width: 366px;
  margin: 0 12px;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #DEDFE3;
  box-sizing: border-box;
}

.expand-inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
}

.expand-header {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
}

.expand-header-thumb {
  width: 86px;
  height: 64px;
  min-width: 86px;
  background: linear-gradient(135deg, #7f8fa4 0%, #5d6d82 100%);
  border-radius: 4px;
}

.expand-header-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
  flex: 1;
  min-width: 0;
}

.expand-header-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  width: 100%;
}

.expand-title {
  font-family: 'MI Lan Pro VF', 'PingFang SC', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #1C2633;
}

.expand-tags-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.expand-tag {
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 1px 4px;
  font-family: 'MI Lan Pro VF', sans-serif;
  font-weight: 340;
  font-size: 10px;
  line-height: 14px;
  color: #F57D05;
  border-radius: 4px;
}

.expand-tag-primary {
  background: rgba(245, 125, 5, 0.06);
  border: 0.5px solid rgba(245, 125, 5, 0.2);
  color: #F57D05;
}

.expand-tag-default {
  background: #F7F8FA;
  border: 0.5px solid #DEE2E6;
  color: #838A90;
}

.expand-meta {
  font-family: 'MI Lan Pro VF', sans-serif;
  font-weight: 340;
  font-size: 12px;
  line-height: 16px;
  color: #838A90;
}

/* 磋商单子 */
.negotiation-block {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: #F7F8FA;
  border-radius: 6px;
  padding: 10px;
  gap: 12px;
}

.negotiation-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.negotiation-summary {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  width: 100%;
}

.negotiation-commission-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.commission-amount {
  font-family: 'MI Lan Pro VF', sans-serif;
  font-weight: 340;
  font-size: 12px;
  line-height: 16px;
  color: #E95433;
  flex: 1;
}

.negotiation-commission-note {
  font-family: 'MI Lan Pro VF', sans-serif;
  font-weight: 340;
  font-size: 12px;
  line-height: 16px;
  color: #343A40;
}

.negotiation-sub-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.negotiation-property {
  font-family: 'MI Lan Pro VF', sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  color: #212529;
  flex: 1;
}

.negotiation-more {
  font-size: 16px;
  color: #495057;
  flex-shrink: 0;
}

.negotiation-label-value {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.n-label {
  font-family: 'MI Lan Pro VF', sans-serif;
  font-weight: 340;
  font-size: 13px;
  line-height: 18px;
  color: #64748B;
  flex-shrink: 0;
  width: 65px;
}

.n-value {
  font-family: 'MI Lan Pro VF', sans-serif;
  font-weight: 340;
  font-size: 13px;
  line-height: 18px;
  color: #343A40;
  flex: 1;
}

/* 区块卡片 */
.negotiation-sections {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.section-card {
  box-sizing: border-box;
  width: 100%;
  background: #fff;
  border: 1px solid #CED4DA;
  border-radius: 6px;
  overflow: hidden;
}

.section-card-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 10px 4px;
  gap: 8px;
}

.section-indicator {
  width: 5px;
  height: 14px;
  background: #BF9660;
  border-radius: 4px;
  flex-shrink: 0;
}

.section-indicator-g1 {
  background: #BF9660;
}

.section-card-title {
  font-family: 'MI Lan Pro VF', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #212529;
  flex: 1;
}

.section-card-body {
  padding: 6px 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.section-paragraph {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 4px;
}

.section-p-title {
  font-family: 'MI Lan Pro VF', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #212529;
}

.section-p-content {
  font-family: 'MI Lan Pro VF', sans-serif;
  font-weight: 340;
  font-size: 13px;
  line-height: 18px;
  color: #343A40;
}

.section-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
}

.section-row-label {
  font-family: 'MI Lan Pro VF', sans-serif;
  font-weight: 340;
  font-size: 13px;
  line-height: 18px;
  color: #495057;
  flex-shrink: 0;
  width: 65px;
}

.section-row-value {
  font-family: 'MI Lan Pro VF', sans-serif;
  font-weight: 340;
  font-size: 13px;
  line-height: 18px;
  color: #343A40;
  flex: 1;
}

/* 下一步计划 */
.next-step-card {
  box-sizing: border-box;
  width: 100%;
  background: #fff;
  border: 1px solid #CED4DA;
  border-radius: 6px;
  overflow: hidden;
}

.next-step-card .section-card-header {
  padding: 12px 10px 4px;
}

.next-step-body {
  padding: 4px 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.next-step-row {
  display: flex;
  gap: 8px;
}

.next-step-label {
  font-family: 'MI Lan Pro VF', sans-serif;
  font-weight: 340;
  font-size: 13px;
  line-height: 18px;
  color: #64748B;
  flex-shrink: 0;
  width: 52px;
}

.next-step-value {
  font-family: 'MI Lan Pro VF', sans-serif;
  font-weight: 340;
  font-size: 13px;
  line-height: 18px;
  color: #343A40;
  flex: 1;
}

.next-step-overall {
  font-family: 'MI Lan Pro VF', sans-serif;
  font-weight: 340;
  font-size: 13px;
  line-height: 18px;
  color: #343A40;
  margin: 0;
}

.next-step-date {
  font-family: 'MI Lan Pro VF', sans-serif;
  font-weight: 340;
  font-size: 11px;
  line-height: 16px;
  color: #838A90;
  margin: 0;
}

.next-step-actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
}

.action-link {
  font-family: 'MI Lan Pro VF', sans-serif;
  font-weight: 340;
  font-size: 12px;
  line-height: 16px;
  color: #BF9660;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 4px 8px 4px 6px;
  font-size: 12px;
  line-height: 16px;
  color: #fff;
  background: #BF9660;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.action-btn-icon {
  font-size: 12px;
}

.collapse-up-btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2px;
  width: 100%;
  padding: 0;
  font-family: 'MI Lan Pro VF', sans-serif;
  font-weight: 340;
  font-size: 13px;
  line-height: 18px;
  color: #838A90;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 4px;
}

.collapse-up-arrow {
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
