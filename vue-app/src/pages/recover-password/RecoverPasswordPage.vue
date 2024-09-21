<script setup>
import { shallowRef, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '@src/utils/localStorage'
import ChangePassword from './components/ChangePassword.vue'
import RecoverPasswordCode from './components/RecoverPasswordCode.vue'
import RecoverPasswordForm from './components/RecoverPasswordForm.vue'
import LoginLayout from '@layouts/LoginLayout.vue'

const componentsList = [
  RecoverPasswordForm,
  RecoverPasswordCode,
  ChangePassword
]

const router = useRouter()
const currentStep = ref(0)
const formData = shallowRef({
  code: '',
  email: '',
  newPassword: '',
  confirmPassword: ''
})

const handleNextStep = async (data) => {
  if (componentsList.length === currentStep.value + 1) {
    removeLocalStorage('recoveryCode')
    router.push({ name: 'Login' })
  } else {
    changeFormData(data)
    setLocalStorage('recoveryCode', {
      step: currentStep.value + 1,
      formData: formData.value
    })
    currentStep.value++
  }
}

const changeFormData = ({ code, email, newPassword, confirmPassword }) => {
  if (code) formData.value.code = code
  if (email) formData.value.email = email
  if (newPassword) formData.value.newPassword = newPassword
  if (confirmPassword) formData.value.confirmPassword = confirmPassword
}

onMounted(() => {
  const recoveryCode = getLocalStorage('recoveryCode')
  if (recoveryCode) {
    currentStep.value = recoveryCode.step
    changeFormData(recoveryCode.formData)
  }
})
</script>

<template>
  <div class="recover-password">
    <LoginLayout title="Recuperar contraseña">
      <component
        :is="componentsList[currentStep]"
        @next="handleNextStep"
      />

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