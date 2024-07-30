import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
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
    currencyNormal: ({currency}) => `${currency.symbol} ${currency.amount}`,
    currencyAll: ({currency}) => `${currency.amount} ${currency.name}`,
  },
  actions: {
    setGetUser() {
      // fetch get user
    }
  }
})