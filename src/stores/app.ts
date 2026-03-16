import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isCollapsed = ref(false)
  const activeMenu = ref('')

  function toggleSidebar() {
    isCollapsed.value = !isCollapsed.value
  }

  return { isCollapsed, activeMenu, toggleSidebar }
})
