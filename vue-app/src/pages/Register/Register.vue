<script setup>
import CustomButtom from '@components/CustomButton/index.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogin = () => {
  router.push({ name: 'Login' })
}

const handleRegister = () => {
  router.push({ name: 'AppHome' })
}
</script>

<template>
  <div class='register-page'>
    <h1>Register Page</h1>

    <div class="buttons">
      <CustomButtom
        text="Registrarse"
        @click="handleRegister"
      />
      <CustomButtom
        text="Iniciar Sesión"
        @click="handleLogin"
      />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.register-page {
  .buttons {
    display: flex;
    justify-content: space-between;
  }
}
</style>
