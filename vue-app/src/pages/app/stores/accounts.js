import { apiApp } from '@src/services/api'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    data: [],
    selected: {
      id: '00001',
      name: 'Principal',
      balance: 0.00,
      currency: {
        id: '2aaae1',
        symbol: '$',
        name: 'dolar',
        code: 'USD',
        plural: 'dolares',
        countryCode: 'USA',
        decimalPlaces: 2
      }
    },
    isFilledData: false
  }),
  getters: {
    acccountsAll: ({ data }) => data,
    accountSelected: ({ selected }) => ({
      id: selected.id,
      name: selected.name,
      balance: selected.balance
    }),
    currentCurrency: ({ selected }) => selected.currency
  },
  actions: {
    fillSelectedAccount (account) {
      this.selected = account
    },
    async loadAccounts () {
      if (!this.isFilledData) {
        await this.getCategoriesAll()
      }
    },
    async getCategoriesAll () {
      const toast = useToast()
      try {
        const response = await apiApp.get({
          url: '/accounts'
        })

        this.data = response.data.data
        this.isFilledData = true
      } catch (error) {
        console.error('Error:', error)
        toast.error('Ocurrió un error al obtener las categorias.')
      }
    }
  }
})
