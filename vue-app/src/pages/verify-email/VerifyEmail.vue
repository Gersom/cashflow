<script setup>
import { apiPost } from '@src/services/api';
import { useToast } from 'vue-toastification'
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()
const route = useRoute();
const toast = useToast()

// Methods
const handleSubmit = async () => {
  try {
    const response = await apiPost({
      url: `/register/verify`,
      data: { token: route.query.token || '' }
    })

    
    if (response.status === 200) {
      toast.success("Correo electrónico verificado con éxito ^^")
      router.push({ name: 'Login' })
    }
    
    else {
      toast.warning('Algo ocurrió un problema mientras se verificaba tu correo electrónico.')
      console.warn('Respuesta del servidor:', response.data)
    }
  }
  
  catch (error) {
    if (error.response.status === 400) {
      toast.warning('Tu correo electrónico ya habia sido verificado con anterioridad.')
      router.push({ name: 'Login' })
    }
    else {
      toast.error('Ocurrió un error mientras verificaba tu correo electrónico.')
      console.log('Error:', error);
    }
  }
}

onMounted(() => {
  handleSubmit()
})
</script>

<template>
  <div class='verify-email-container'>
    <h2>Verificando tu correo electrónico, espere un momento...</h2>
  </div>
</template>

<style scoped>
  .verify-email-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
