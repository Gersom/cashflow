import { API_URL } from "@src/config/env";
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
    async fillCategories() {
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
    
        if (response.status === 200) {
          this.data = response.data.data
          this.isFilledData = true
        }
        else {
          toast.warning('Algo ocurrió mientras se obtenian las categorias.')
        }
      }
      
      catch (error) {
        console.error('Error:', error);
        toast.error('Ocurrió un error al obtener las categorias.')
      }
    }
  }
})
