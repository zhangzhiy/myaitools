import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface UserInfo {
  id: number
  name: string
  avatar: string
  role: string
}

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(true)
  const userInfo = ref<UserInfo>({
    id: 1,
    name: '张三',
    avatar: '',
    role: '管理员',
  })

  function login(name: string) {
    isLoggedIn.value = true
    userInfo.value.name = name
  }

  function logout() {
    isLoggedIn.value = false
  }

  return { isLoggedIn, userInfo, login, logout }
})
