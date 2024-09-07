<script setup>
// Imports
import { apiPost } from '@src/services/api';
import { API_AUTH } from "@src/config/env";
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import LoginForm from './components/LoginForm.vue'
import LoginLayout from '@layouts/LoginLayout.vue';

// Data
const router = useRouter()
const toast = useToast()

// Methods
const handleSubmit = async(data) => {
  toast.info("Espere un momento...");
  try {
    const response = await apiPost({
      url: `${API_AUTH}/login`, data
    })

    if (response.statusText === 'OK') {
      toast.success("Bienvenid@")
      router.push({ name: 'AppHome' })
    }

    else {
      toast.warning('Algo ocurrió mientras se iniciaba tu sesión.')
      console.warn('Respuesta del servidor:', response.data)
    }
  }
  
  catch (error) {
    toast.error('Ocurrió un error mientras se iniciaba tu sesión.')
    console.error('Error:', error);
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
