<script setup>
// Imports
import { apiAuth } from '@src/services/api';
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import LoginForm from './components/LoginForm.vue'
import LoginLayout from '@layouts/LoginLayout.vue';
import { ref } from 'vue'

// Data
const router = useRouter()
const toast = useToast()
const isLoading = ref(false)

// Methods
const handleSubmit = async(data) => {
  isLoading.value = true
  try {
    const response = await apiAuth.post({
      url: `/login`, data
    })

    if (response.data?.data?.isNewUser) {
      toast.success("Ya casi terminamos, solo falta tu moneda local")
      router.push({ name: 'CurrencyPage' })
    }
    else {
      toast.success("Bienvenido!")
      router.push({ name: 'AppHome' })
    }
  }
  
  catch (error) {
    if (error.response.status === 401) {
      toast.warning('El correo electrónico o la contraseña ingresados no son correctos. Por favor, verifica ambos datos e intenta nuevamente.')
    } else if (error.response.status === 403) {
      toast.warning('Tu correo electrónico no esta verificado, por favor verifica tu bandeja de entrada.')
    }
    else {
      toast.error('Ocurrió un error mientras se iniciaba tu sesión.')
      console.error('Error:', error);
    }
  }

  finally {
    isLoading.value = false
  }
}
</script>

<template>
<div class='login-page'>
  <LoginLayout
    title="Iniciar sesión"
    :verify-session="true"
  >
    <LoginForm
      :is-loading="isLoading"
      @submit="handleSubmit"
    />
  </LoginLayout>
</div>
</template>
