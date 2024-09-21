<script setup>
import "./styles/icomoon.css";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from 'vue-toastification'
import { useUserStore } from "@stores/user"; 
import DashboardLayout from "./layouts/Dashboard.vue";
import LogoLoading from "@components/Loading/LogoLoading.vue";

defineEmits(['vnode-unmounted'])
const toast = useToast()
const userStore = useUserStore()
const router = useRouter()

onMounted(async () => {
  const { success, error } = await userStore.getUserProfile()
  if (!success) {
    if (error.request.status === 401) {
      toast.warning('Tu sesión ha expirado, por favor inicia sesión nuevamente')
    }
    else {
      toast.error('Ocurrió un error al iniciar la Aplicación')
    }
    router.push({ name: 'Login' })
  }
})
</script>

<template>
  <div class="app-page">
    <div
      v-if="!userStore.isFilled"
      class="app-loading"
    >
      <LogoLoading />
    </div>

    <DashboardLayout v-if="userStore.isFilled">
      <RouterView />
    </DashboardLayout>
  </div>
</template>

<style lang="scss" scoped>
.app-page {
  .app-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
}
</style>
