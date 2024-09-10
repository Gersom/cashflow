import { defineStore } from 'pinia'
import { apiGet } from '@src/services/api';
import { API_URL } from "@src/config/env";
import { useToast } from 'vue-toastification'

export const useMovementsStore = defineStore('movements', {
  state: () => ({
    data: [],
    isFilledData: false
  }),
  getters: {
    movementsAll: ({data}) => data
  },
  actions: {
    async fillMovements() {
      if (!this.isFilledData) {
        await this.getMovementsAll()
      }
    },
    async getMovementsAll() {
      const toast = useToast()
      try {
        const response = await apiGet({
          url: `${API_URL}/common/movements/account`
        })
    
        if (response.status === 200) {
          this.data = response.data.data
          this.isFilledData = true
        }
        else {
          toast.warning('Algo ocurrió mientras se obtenian los movimientos.')
        }
      }
      
      catch (error) {
        console.error('Error:', error);
        toast.error('Ocurrió un error al obtener los movimientos.')
      }
    }
  }
})
