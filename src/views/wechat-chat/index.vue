<script setup lang="ts">
import { useRouter } from 'vue-router'
import { chatReportList, type ChatReportMessage } from '@/mock/wechat-chat'

const router = useRouter()

function goBack() {
  router.back()
}

function viewDetail(msg: ChatReportMessage) {
  router.push(`/wechat-chat/${msg.id}`)
}
</script>

<template>
  <div class="wechat-chat-page">
    <!-- 导航栏 -->
    <header class="chat-header">
      <button type="button" class="back-btn" aria-label="返回" @click="goBack">
        <span class="back-arrow">&lt;</span>
      </button>
      <h1 class="chat-title">（微信界面） 商机汇报群</h1>
    </header>

    <!-- 主内容区 -->
    <div class="chat-container">
      <div class="chat-time">20:04</div>
      <div class="chat-messages">
        <div
          v-for="msg in chatReportList"
          :key="msg.id"
          class="message-row"
        >
          <div class="avatar-wrap">
            <span class="avatar-emoji">👤</span>
          </div>
          <div class="message-content">
            <div class="sender-name">{{ msg.sender }}</div>
            <div class="report-card">
              <div class="card-title">{{ msg.title }}</div>
              <div class="card-detail">{{ msg.detail }}</div>
              <button
                type="button"
                class="card-link"
                @click="viewDetail(msg)"
              >
                <span class="link-icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="4" y1="2" x2="12" y2="10" stroke="#576B95" stroke-width="1.17" />
                    <line x1="2" y1="6" x2="10" y2="12" stroke="#576B95" stroke-width="1.17" />
                  </svg>
                </span>
                <span>点击查看详情</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wechat-chat-page {
  max-width: 390px;
  margin: 0 auto;
  min-height: 100%;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #fff;
  border-bottom: 1px solid #eee;
  flex: none;
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin-right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: #576b95;
  font-size: 20px;
  line-height: 1;
}

.back-btn:hover {
  opacity: 0.8;
}

.back-arrow {
  font-weight: 600;
}

.chat-title {
  flex: 1;
  margin: 0;
  font-family: 'Inter', -apple-system, sans-serif;
  font-weight: 500;
  font-size: 17px;
  line-height: 24px;
  color: #000;
  text-align: center;
}

.chat-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 12px 0;
  gap: 16px;
  flex: 1;
  width: 100%;
  box-sizing: border-box;
}

.chat-time {
  align-self: center;
  font-family: 'Inter', -apple-system, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  text-align: center;
  letter-spacing: -0.0761719px;
  color: #b2b2b2;
}

.chat-messages {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  gap: 12px;
  width: 100%;
  flex: 1;
}

.message-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0;
  gap: 10px;
  width: 100%;
  max-width: 366px;
}

.avatar-wrap {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: none;
  width: 42px;
  height: 42px;
  background: linear-gradient(
    135deg,
    #7f8fa4 0%,
    #7d8da2 7.14%,
    #7a8a9f 14.29%,
    #78889d 21.43%,
    #75859a 28.57%,
    #738398 35.71%,
    #708095 42.86%,
    #6e7e93 50%,
    #6b7b90 57.14%,
    #69798e 64.29%,
    #67778c 71.43%,
    #647489 78.57%,
    #627287 85.71%,
    #5f6f84 92.86%,
    #5d6d82 100%
  );
  border-radius: 4px;
}

.avatar-emoji {
  font-size: 24px;
  line-height: 36px;
  letter-spacing: 0.0703125px;
  color: #fff;
}

.message-content {
  flex: 1;
  min-width: 0;
  position: relative;
}

.sender-name {
  font-family: 'Inter', -apple-system, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: -0.234375px;
  color: #000;
  margin-bottom: 4px;
}

.report-card {
  background: #fff;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px -1px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 12px;
  width: 100%;
  max-width: 260px;
  box-sizing: border-box;
}

.card-title {
  font-family: 'Inter', -apple-system, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.3125px;
  color: #000;
  margin-bottom: 8px;
}

.card-detail {
  font-family: 'Inter', -apple-system, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.0761719px;
  color: #999;
  margin-bottom: 12px;
}

.card-link {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Inter', -apple-system, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.0761719px;
  color: #576b95;
}

.card-link:hover {
  text-decoration: underline;
}

.link-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}
</style>
