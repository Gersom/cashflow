<script setup>
import { apiAuth } from '@src/services/api';
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import IconLogo from '@icons/others/IconLogo.vue'
import LoadingComponent from '@components/Loading/Loading.vue'

const router = useRouter()
const route = useRoute();
const toast = useToast()

// Methods
const handleSubmit = async () => {
  try {
    await apiAuth.post({
      url: `/register/verify`,
      data: { token: route.query.token || '' }
    })

    toast.success("Correo electrónico verificado con éxito ^^")
    router.push({ name: 'Login' })
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
  if (route.query.token) {
    handleSubmit()
  } else {
    router.push({ name: 'Login' })
  }
})
</script>

<template>
  <div class="verify-email-container">
    <div class="logo-icon">
      <IconLogo />
    </div>
    <h2 class="title">
      Verificando tu correo electrónico, espere un momento...
    </h2>
    <div class="loading-container">
      <LoadingComponent />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .verify-email-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    .title {
      font-weight: 400;
      font-size: 16px;
      // font-family: var(--font-nunito);
      // font-style: italic;
    }
    .logo-icon {
      height: 60px;
    }
    .loading-container {
      height: 30px;
    }
  }
</style>
