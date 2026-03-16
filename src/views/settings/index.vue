<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const activeTab = ref('basic')

const basicForm = ref({
  siteName: 'ProductDemo',
  siteDescription: '产品演示系统',
  logo: '',
  language: 'zh-CN',
  timezone: 'Asia/Shanghai',
})

const notifyForm = ref({
  emailEnabled: true,
  smsEnabled: false,
  webhookEnabled: false,
  webhookUrl: '',
})

const securityForm = ref({
  passwordMinLength: 8,
  sessionTimeout: 30,
  twoFactorAuth: false,
  ipWhitelist: '',
})

function handleSave() {
  ElMessage.success('设置已保存')
}
</script>

<template>
  <div class="space-y-5">
    <el-card shadow="hover">
      <el-tabs v-model="activeTab">
        <!-- 基本设置 -->
        <el-tab-pane label="基本设置" name="basic">
          <el-form :model="basicForm" label-width="120px" class="max-w-xl">
            <el-form-item label="系统名称">
              <el-input v-model="basicForm.siteName" />
            </el-form-item>
            <el-form-item label="系统描述">
              <el-input v-model="basicForm.siteDescription" type="textarea" :rows="3" />
            </el-form-item>
            <el-form-item label="语言">
              <el-select v-model="basicForm.language" class="w-full">
                <el-option label="简体中文" value="zh-CN" />
                <el-option label="English" value="en-US" />
              </el-select>
            </el-form-item>
            <el-form-item label="时区">
              <el-select v-model="basicForm.timezone" class="w-full">
                <el-option label="Asia/Shanghai (UTC+8)" value="Asia/Shanghai" />
                <el-option label="America/New_York (UTC-5)" value="America/New_York" />
                <el-option label="Europe/London (UTC+0)" value="Europe/London" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSave">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 通知设置 -->
        <el-tab-pane label="通知设置" name="notify">
          <el-form :model="notifyForm" label-width="120px" class="max-w-xl">
            <el-form-item label="邮件通知">
              <el-switch v-model="notifyForm.emailEnabled" />
            </el-form-item>
            <el-form-item label="短信通知">
              <el-switch v-model="notifyForm.smsEnabled" />
            </el-form-item>
            <el-form-item label="Webhook">
              <el-switch v-model="notifyForm.webhookEnabled" />
            </el-form-item>
            <el-form-item v-if="notifyForm.webhookEnabled" label="Webhook URL">
              <el-input v-model="notifyForm.webhookUrl" placeholder="https://" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSave">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 安全设置 -->
        <el-tab-pane label="安全设置" name="security">
          <el-form :model="securityForm" label-width="120px" class="max-w-xl">
            <el-form-item label="密码最小长度">
              <el-input-number v-model="securityForm.passwordMinLength" :min="6" :max="32" />
            </el-form-item>
            <el-form-item label="会话超时(分钟)">
              <el-input-number v-model="securityForm.sessionTimeout" :min="5" :max="480" />
            </el-form-item>
            <el-form-item label="双因素认证">
              <el-switch v-model="securityForm.twoFactorAuth" />
            </el-form-item>
            <el-form-item label="IP 白名单">
              <el-input
                v-model="securityForm.ipWhitelist"
                type="textarea"
                :rows="3"
                placeholder="每行一个 IP 地址"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSave">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
