<script setup>
import CustomButtom from '@components/CustomButton/index.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogin = () => {
  router.push({ name: 'AppHome' })
}

const handleRegister = () => {
  router.push({ name: 'Register' })
}
</script>

<template>
  <div class='login-page'>
    <h1>Login Page</h1>

    <div class="buttons">
      <CustomButtom
        text="Iniciar Sesión"
        @click="handleLogin"
      />
      <CustomButtom
        text="Registrarse"
        @click="handleRegister"
      />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.login-page {
  .buttons {
    display: flex;
    justify-content: space-between;
  }
}
</style>
