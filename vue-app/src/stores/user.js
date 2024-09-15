import { API_URL } from "@src/config/env";
import { apiGetAuth } from '@src/services/api';
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { useAccountsStore } from "@app-page/stores/accounts";

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
    isFilledData: false
  }),
  getters: {
    currencyNormal: ({currency}) => `${currency.symbol} ${currency.amount}`,
    currencyAll: ({currency}) => `${currency.amount} ${currency.name}`,
  },
  actions: {
    async setUserProfile() {
      if (!this.isFilledData) {
        await this.getUserProfile()
      }
    },
    async getUserProfile() {
      const toast = useToast()
      const accountsStore = useAccountsStore()
      try {
        const response = await apiGetAuth({
          url: `/users/profile`
        })
    
        if (response.status === 200) {
          const { selectedAccount, ...userData } = response.data.data
          this.user = userData
          this.isFilledData = true
          accountsStore.fillSelectedAccount(selectedAccount)
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
