<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { InfoFilled } from '@element-plus/icons-vue'
import { phoneAuthConfig } from '@/mock/phone-auth'

const router = useRouter()

function handleDisallow() {
  ElMessage.info('已拒绝授权')
  router.back()
}

function handleUseOtherNumber() {
  ElMessage.info('使用其它号码功能开发中')
}

function handleInfoClick() {
  ElMessage.info('该应用将用于用户注册，仅获取手机号用于验证身份')
}
</script>

<template>
  <div class="phone-auth-overlay">
    <div class="phone-auth-dialog">
      <!-- 顶部栏：应用信息 -->
      <div class="dialog-header">
        <div class="app-info">
          <div class="app-icon">宅</div>
          <span class="app-name">{{ phoneAuthConfig.appName }}</span>
          <span class="app-purpose">{{ phoneAuthConfig.appPurpose }}</span>
        </div>
        <button
          type="button"
          class="info-btn"
          aria-label="说明"
          @click="handleInfoClick"
        >
          <el-icon :size="18"><InfoFilled /></el-icon>
        </button>
      </div>

      <!-- 标题与副标题 -->
      <h2 class="dialog-title">{{ phoneAuthConfig.title }}</h2>
      <p class="dialog-subtitle">{{ phoneAuthConfig.subtitle }}</p>

      <!-- 手机号展示区 -->
      <div class="phone-block">
        <div class="phone-number">{{ phoneAuthConfig.maskedPhone }}</div>
        <div class="phone-label">{{ phoneAuthConfig.phoneLabel }}</div>
      </div>

      <!-- 不允许按钮 -->
      <button
        type="button"
        class="disallow-btn"
        @click="handleDisallow"
      >
        {{ phoneAuthConfig.disallowButtonText }}
      </button>

      <!-- 使用其它号码 -->
      <button
        type="button"
        class="use-other-link"
        @click="handleUseOtherNumber"
      >
        {{ phoneAuthConfig.useOtherNumberText }}
      </button>
    </div>
  </div>
</template>

<style scoped>
/* 遮罩层：与设计稿一致 */
.phone-auth-overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  max-width: 390px;
  margin: 0 auto;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0 0 24px;
  box-sizing: border-box;
}

.phone-auth-dialog {
  width: calc(100% - 32px);
  max-width: 358px;
  background: #fff;
  border-radius: 12px;
  padding: 20px 20px 24px;
  box-sizing: border-box;
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.app-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.app-icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
}

.app-name {
  font-size: 15px;
  font-weight: 500;
  color: #000;
}

.app-purpose {
  font-size: 13px;
  color: #666;
  margin-left: 4px;
}

.info-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: #f0f0f0;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.info-btn:hover {
  background: #e5e5e5;
}

.dialog-title {
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.35;
  color: #000;
}

.dialog-subtitle {
  margin: 0 0 20px;
  font-size: 13px;
  color: #999;
}

.phone-block {
  background: #f7f7f7;
  border-radius: 8px;
  padding: 20px 16px;
  margin-bottom: 20px;
  text-align: center;
}

.phone-number {
  font-size: 22px;
  font-weight: 500;
  color: #000;
  letter-spacing: 1px;
}

.phone-label {
  font-size: 12px;
  color: #999;
  margin-top: 6px;
}

.disallow-btn {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  font-weight: 500;
  color: #000;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 16px;
}

.disallow-btn:hover {
  background: #f5f5f5;
}

.use-other-link {
  display: block;
  width: 100%;
  padding: 0;
  font-size: 14px;
  color: #576b95;
  background: none;
  border: none;
  cursor: pointer;
  text-align: center;
}

.use-other-link:hover {
  text-decoration: underline;
}
</style>
