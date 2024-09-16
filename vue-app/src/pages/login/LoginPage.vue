<script setup>
// Imports
import { apiPost } from '@src/services/api';
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import LoginForm from './components/LoginForm.vue'
import LoginLayout from '@layouts/LoginLayout.vue';

// Data
const router = useRouter()
const toast = useToast()

// Methods
const handleSubmit = async(data) => {
  try {
    const response = await apiPost({
      url: `/login`, data
    })

    console.log('Respuesta del servidor Login:', response)
    if (response.data?.data?.isNewUser) {
      toast.success("Ya casi terminamos, solo falta tu moneda local")
      router.push({ name: 'CurrencyPage' })
    }
    else {
      toast.success("Bienvenid@")
      router.push({ name: 'AppHome' })
    }
    // if (response.statusText === 'OK') {
    // }

    // else {
    //   toast.warning('Algo ocurrió mientras se iniciaba tu sesión.')
    //   console.warn('Respuesta del servidor:', response.data)
    // }
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
}
</script>

<template>
<div class='login-page'>
  <LoginLayout title="Iniciar sesión">
    <LoginForm @submit="handleSubmit" />
  </LoginLayout>
</div>
</template>
