export interface PhoneAuthConfig {
  appName: string
  appPurpose: string
  title: string
  subtitle: string
  maskedPhone: string
  phoneLabel: string
  disallowButtonText: string
  useOtherNumberText: string
}

export const phoneAuthConfig: PhoneAuthConfig = {
  appName: '丽兹行豪宅',
  appPurpose: '申请使用',
  title: '申请获取并验证你的手机号',
  subtitle: '用户注册',
  maskedPhone: '186****6987',
  phoneLabel: '微信绑定号码',
  disallowButtonText: '不允许',
  useOtherNumberText: '使用其它号码',
}
