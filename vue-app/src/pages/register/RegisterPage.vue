<script setup>
// Imports
import { apiPost } from '@src/services/api';
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import LoginLayout from '@layouts/LoginLayout.vue';
import RegisterForm from './components/RegisterForm.vue';

// Data
const router = useRouter()
const toast = useToast()
const isLoading = ref(false)

// Methods
const handleSubmit = async(data) => {
  isLoading.value = true
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

  finally {
    isLoading.value = false
  }
}
</script>

<template>
<div class='register-page'>
  <LoginLayout title="Crear una cuenta">
    <RegisterForm
      :is-loading="isLoading"
      @submit="handleSubmit"
    />
  </LoginLayout>
</div>
</template>