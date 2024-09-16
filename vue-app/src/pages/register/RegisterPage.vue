<script setup>
// Imports
import { apiPost } from '@src/services/api';
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
    await apiPost({ url: `/register`, data })

    toast.success("Te has registrado con éxito. Bienvenid@")
    router.push({ name: 'Login' })
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