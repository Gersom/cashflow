import { API_URL } from "@src/config/env";
import { apiGet } from '@src/services/api';
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
    currency: {
      amount: '0.00',
      symbol: '$',
      name: '',
      plural: '',
      currencyPosition: '',
      decimalPlaces: 2
    },
    isFilledData: false
  }),
  getters: {
    currencyNormal: ({currency}) => `${currency.symbol} ${currency.amount}`,
    currencyAll: ({currency}) => `${currency.amount} ${currency.name}`,
  },
  actions: {
    async fillUserProfile() {
      if (!this.isFilledData) {
        await this.getUserProfile()
      }
    },
    async getUserProfile() {
      const toast = useToast()
      try {
        const response = await apiGet({
          url: `${API_URL}/common/users/profile`
        })
    
        if (response.status === 200) {
          this.user = response.data.data
          this.isFilledData = true
        }
        else {
          toast.warning('Algo ocurrió mientras se obtenian los datos de tu perfil.')
        }
      }
      
      catch (error) {
        console.error('Error:', error);
        toast.error('Ocurrió un error al obtener los datos de tu perfil.')
      }
    }
  }
})
