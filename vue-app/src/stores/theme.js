import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDarkMode: true
  }),
  getters: {
    currentTheme: (state) => state.isDarkMode ? 'dark' : 'light'
  },
  actions: {
    setLightMode() {
      this.isDarkMode = false
    },
    setDarkMode() {
      this.isDarkMode = true
    },
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode
    }
  }
})