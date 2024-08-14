<script setup>
// Imports
import { apiPost } from '@src/services/api';
import { SERVER_URL } from "@src/config/env";
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import RegisterForm from './components/RegisterForm.vue';
import LoginLayout from '@layouts/LoginLayout.vue';


// Data
const router = useRouter()
const toast = useToast()

// Methods
const handleSubmit = async(data) => {
  toast.info("Espere un momento...");
  try {
    const response = await apiPost({
      url: `${SERVER_URL}/register`, data
    })

    if (response.statusText === 'OK') {
      toast.success("Te has registrado con éxito. Bienvenid@")
      router.push({ name: 'AppHome' })
    }

    else {
      toast.warning('Algo ocurrió mientras te registrabas.')
      console.warn('Respuesta del servidor:', response.data)
    }
  }
  
  catch (error) {
    toast.error('Ocurrió un error mientras te registrabas.')
    console.error('Error:', error);
  }
}
</script>

<template>
<div class='register-page'>
  <LoginLayout title="Crear una cuenta">
    <RegisterForm @submit="handleSubmit" />
  </LoginLayout>
</div>
</template>