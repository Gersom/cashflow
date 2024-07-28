import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    user: {
      id: '005454515120',
      email: 'gersomalaja@gmail.com',
      gender: 'male',
      image: 'https://www.google.com/image.jpg',
      name: 'Gersom',
      whatsapp: '+51910868526',
    },
    currency: {
      amount: '9999.45',
      symbol: 'S/.',
      name: 'Soles',
      code: 'PEN'
    }
  }),
  getters: {
    currencyAll: (state) => `${state.currency.amount} ${state.currency.name}`
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