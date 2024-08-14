<script setup>
import { shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import ChangePassword from './components/ChangePassword.vue'
import RecoverPasswordCode from './components/RecoverPasswordCode.vue'
import RecoverPasswordForm from './components/RecoverPasswordForm.vue'
import LoginLayout from '@layouts/LoginLayout.vue';

const componentsList = {
  recoverPasswordCode: RecoverPasswordCode,
  changePassword: ChangePassword
}

const router = useRouter()
const componentCurrent = shallowRef(RecoverPasswordForm)

const handleNextStep = (key) => {
  componentCurrent.value = componentsList[key]
}
const handleFinish = () => {
  router.push({ name: 'Login' })
}
</script>

<template>
<div class='recover-password'>
  <LoginLayout title="Recuperar contraseña">
    <component
      @next="handleNextStep"
      @finish="handleFinish"
      :is="componentCurrent" />
    
    <p class="register-link">
      Ya te acordaste de tu contraseña?
      <router-link :to="{ name: 'Login' }">
        Inicia sesión.
      </router-link> 
    </p>
  </LoginLayout>
</div>
</template>

<style lang='scss' scoped>
.recover-password {
  .register-link {
    text-align: center;
    font-size: 14px;
    margin-top: 7px;
  }
}
</style>