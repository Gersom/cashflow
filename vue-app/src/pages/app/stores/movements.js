import { defineStore } from 'pinia'
import { apiApp } from '@src/services/api';
import { useToast } from 'vue-toastification'
import { getLocalStorage, setLocalStorage } from '@utils/localStorage.js'

const dataMovements = getLocalStorage('app-movements') 

export const useMovementsStore = defineStore('movements', {
  state: () => ({
    data: dataMovements?.movements || [],
    totalExpenses: dataMovements?.totalExpenses || '0.00',
    totalIncome: dataMovements?.totalIncome || '0.00',
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
    increaseIncome(amount) {
      this.totalIncome = parseFloat(this.totalIncome) + parseFloat(amount)
    },
    increaseExpense(amount) {
      this.totalExpenses = parseFloat(this.totalExpenses) + parseFloat(amount)
    },
    decreaseIncome(amount) {
      this.totalIncome = parseFloat(this.totalIncome) - parseFloat(amount)
    },
    decreaseExpense(amount) {
      this.totalExpenses = parseFloat(this.totalExpenses) - parseFloat(amount)
    },
    async getMovementsAll() {
      const toast = useToast()
      try {
        const response = await apiApp.get({
          url: `/movements`
        })
    
        this.data = response.data.data?.movements
        this.totalExpenses = response.data.data?.totalExpenses
        this.totalIncome = response.data.data?.totalIncome
        this.isFilledData = true
        setLocalStorage('app-movements', response.data.data)
      }
      catch (error) {
        console.error('Error:', error);
        toast.error('Ocurrió un error al obtener los movimientos.')
      }
    },
    async loadMovements() {
      if (!this.isFilledData) {
        await this.getMovementsAll()
      }
    },
    async createMovement(movement) {
      this.isLoading = true
      this.data = [{...movement, sync: false }, ...this.data]
      
      if (movement.type === 'income') {
        this.increaseIncome(movement.amount)
      } else if (movement.type === 'expense') {
        this.increaseExpense(movement.amount)
      }

      const toast = useToast()

      try {
        const response = await apiApp.post({
          url: `/movements`,
          data: {
            ...movement,
            categories: movement.categories.map(category => category.id)
          }
        })
    
        this.data[0] = { ...this.data[0], id: response.data?.data?.id, sync: true }
        toast.success(`"${movement.title}" creado exitosamente.`)
      }
      
      catch (error) {
        console.error('Error:', error);
        toast.error('Ocurrió un error al crear el movimiento.')
      }

      finally {
        this.isLoading = false
        setLocalStorage('app-movements', { 
          data: this.data, totalExpenses: this.totalExpenses, totalIncome: this.totalIncome
        })
      }
    },
    async editMovement(movement) {
      this.isLoading = true
      const indexMovement = this.data.findIndex(item => item.id === movement.id)
      
      const originalMovement = this.data[indexMovement];
  
      if (String(movement.amount) !== String(originalMovement.amount) || movement.type !== originalMovement.type) {
        
        if (originalMovement.type === 'income') {
          this.decreaseIncome(originalMovement.amount);
        } else if (originalMovement.type === 'expense') {
          this.decreaseExpense(originalMovement.amount);
        }
        
        if (movement.type === 'income') {
          this.increaseIncome(movement.amount);
        } else if (movement.type === 'expense') {
          this.increaseExpense(movement.amount);
        }
      }
      
      this.data[indexMovement] = { ...movement, sync: false }
      
      const toast = useToast()

      try {
        const { id, ...data } = movement
        await apiApp.put({
          url: `/movements/${id}`,
          data: {
            ...data,
            categories: data.categories.map(category => category.id)
          }
        })
    
        this.data[indexMovement] = { ...movement, sync: true }
        toast.success(`"${movement.title}" ha sido editado exitosamente.`)
      }
      
      catch (error) {
        console.error('Error:', error);
        toast.error('Ocurrió un error al editar el movimiento.')
      }

      finally {
        this.isLoading = false
        setLocalStorage('app-movements', { 
          data: this.data, totalExpenses: this.totalExpenses, totalIncome: this.totalIncome
        })
      }
    },
    async deleteMovement(id) {
      this.isLoading = true
      const indexMovement = this.data.findIndex(item => item.id === id)
      
      
      if (this.data[indexMovement].type === 'income') {
        this.decreaseIncome(this.data[indexMovement].amount)
      } else if (this.data[indexMovement].type === 'expense') {
        this.decreaseExpense(this.data[indexMovement].amount)
      }
      
      let originalData = this.data;
      originalData.splice(indexMovement, 1)
      this.data = originalData

      const toast = useToast()
      try {
        await apiApp.delete({
          url: `/movements/${id}`
        })
        toast.success(`"${this.data[indexMovement].title}" ha sido eliminado.`)
      }
      
      catch (error) {
        console.error('Error:', error);
        toast.error('Ocurrió un error al editar el movimiento.')
      }

      finally {
        this.isLoading = false
        setLocalStorage('app-movements', { 
          data: this.data, totalExpenses: this.totalExpenses, totalIncome: this.totalIncome
        })
      }
    }
  }
})
