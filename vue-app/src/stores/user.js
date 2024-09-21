import { apiApp } from '@src/services/api';
import { defineStore } from 'pinia'
import { useAccountsStore } from "@app-page/stores/accounts";

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
    isFilledData: false
  }),
  getters: {
    isFilled: ({isFilledData}) => isFilledData
  },
  actions: {
    async getUserProfile() {
      try {
        const response = await apiApp.get({
          url: `/users/profile`
        })
        
        const { selectedAccount, ...userData } = response.data.data
        this.user = userData
        this.isFilledData = true

        const accountsStore = useAccountsStore()
        accountsStore.fillSelectedAccount(selectedAccount)
        return { success: true, error: null }
      }
      
      catch (error) {
        // console.error('Error:', error);
        return { success: false, error }
      }
    }
  }
})
