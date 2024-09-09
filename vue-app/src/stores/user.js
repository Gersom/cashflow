import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      email: '',
      gender: '',
      image: '',
      name: '',
      whatsapp: '',
    },
    currency: {
      amount: '0.00',
      symbol: '$',
      name: '',
      plural: '',
      currencyPosition: '',
      decimalPlaces: 2
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
