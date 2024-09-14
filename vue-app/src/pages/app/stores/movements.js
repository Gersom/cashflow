import { defineStore } from 'pinia'
import { apiGet, apiPost } from '@src/services/api';
import { API_URL } from "@src/config/env";
import { useToast } from 'vue-toastification'
import { getLocalStorage, setLocalStorage } from '@utils/localStorage.js'

export const useMovementsStore = defineStore('movements', {
  state: () => ({
    data: getLocalStorage('app-movements') || [],
    isFilledData: false,
    isLoading: false
  }),
  getters: {
    movementsAll: ({data}) => data,
    sumExpenses: ({data}) => {
      return data
        .filter(item => item.type === "expense")
        .reduce((sum, item) => sum + item.amount, 0);
    }
  },
  actions: {
    async loadMovements() {
      if (!this.isFilledData) {
        await this.getMovementsAll()
      }
    },
    async getMovementsAll() {
      const toast = useToast()
      try {
        const response = await apiGet({
          url: `${API_URL}/common/movements`
        })
    
        if (response.status === 200) {
          this.data = response.data.data
          this.isFilledData = true
          setLocalStorage('app-movements', response.data.data)
        }
        else {
          toast.warning('Algo ocurrió mientras se obtenian los movimientos.')
          console.warn('Respuesta inesperada:', response)
        }
      }
      
      catch (error) {
        console.error('Error:', error);
        toast.error('Ocurrió un error al obtener los movimientos.')
      }
    },
    async createMovement(movement) {
      this.isLoading = true
      const dataOld = [...this.data]
      this.data = [{...movement, sync: false }, ...dataOld]
      const toast = useToast()
      setLocalStorage('app-movements', this.data)

      try {
        const response = await apiPost({
          url: `${API_URL}/common/movements`,
          data: {
            ...movement,
            categories: movement.categories.map(category => category.id)
          }
        })
    
        if (response.status === 201) {
          this.data[0] = { ...this.data[0], id: response.data?.data?.id, sync: true }
          toast.success(`${movement.title} creado exitosamente.`)
        }
        else {
          toast.warning('Algo ocurrió mientras se creaba el movimiento.')
          console.warn('Respuesta inesperada:', response)
        }
      }
      
      catch (error) {
        console.error('Error:', error);
        toast.error('Ocurrió un error al crear el movimiento.')
      }
    }
  }
})
