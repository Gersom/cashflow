<script setup>
import "./styles/icomoon.css";
import DashboardLayout from "./layouts/Dashboard.vue";
import { API_URL } from "@src/config/env";
import { apiGet } from '@src/services/api';
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()
const userData = ref({})

const getUserProfile = async () => {
  try {
    const response = await apiGet({
      url: `${API_URL}/common/users/profile`
    })

    if (response.status === 200) {
      userData.value = response.data
    }
    else {
      toast.warning('Algo ocurrió mientras se obtenia tu perfil.')
      router.push({ name: 'Login' })
    }
  }
  
  catch (error) {
    if (error.response.status === 401) {
      toast.warning('Tu sesión ha caducado. Por favor, inicia sesión nuevamente.')
      router.push({ name: 'Login' })
    }
    else {
      toast.error('Ocurrió un error al obtener tu perfil.')
      console.error('Error:', error);
      router.push({ name: 'Login' })
    }
  }
}

onMounted(() => {
  getUserProfile()
})
</script>

<template>
  <div class='app-page'>
    <DashboardLayout>
      <RouterView />
    </DashboardLayout>
  </div>
</template>

<style scoped>
</style>
