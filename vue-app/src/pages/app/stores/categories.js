import { apiGetAuth } from '@src/services/api';
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    data: [],
    isFilledData: false
  }),
  getters: {
    categoriesAll: ({data}) => data
  },
  actions: {
    async loadCategories() {
      if (!this.isFilledData) {
        await this.getCategoriesAll()
      }
    },
    async getCategoriesAll() {
      const toast = useToast()
      try {
        const response = await apiGetAuth({
          url: `/categories`
        })
    
        this.data = response.data.data
        this.isFilledData = true
      }
      
      catch (error) {
        console.error('Error:', error);
        toast.error('Ocurrió un error al obtener las categorias.')
      }
    }
  }
})
