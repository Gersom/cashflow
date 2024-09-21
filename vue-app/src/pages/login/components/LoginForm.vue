<script setup>
import { ref, computed } from 'vue'

// Components
import CustomButtom from '@components/CustomButton/GeneralButton.vue'
import Email from '@components/FormInput/Email.vue'
import Password from '@components/FormInput/Password.vue'

// Icons
import IconLogin from '@icons/login/IconLogIn.vue'

const emit = defineEmits(['submit'])
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})

// Data
const formData = ref({
  email: { value: '', isValid: false },
  password: { value: '', isValid: false }
})

const isFormValid = computed(() =>
  Object.values(formData.value).every(field => field.isValid)
)

// Methods
const handleInput = (field, text, isValid) => {
  formData.value[field] = { value: text, isValid }
}

const handleSubmit = async (e) => {
  e.preventDefault()

  const data = {}
  Object.keys(formData.value).forEach(key => {
    data[key] = formData.value[key].value
  })

  emit('submit', data)
}
</script>

<template>
  <form
    class="form-login"
    @submit="handleSubmit"
  >
    <div class="input-container">
      <Email @validate="(txt, valid) => handleInput('email', txt, valid)" />
    </div>
    <div class="input-container">
      <Password @validate="(txt, valid) => handleInput('password', txt, valid)" />
    </div>

    <div class="recover-password-link">
      <router-link :to="{ name: 'RecoverPassword' }">
        ¿Olvidaste tu contraseña?
      </router-link>
    </div>

    <div class="submit-button">
      <CustomButtom
        text="Iniciar Sesión"
        type="submit"
        :disabled="!isFormValid"
        :loading="props.isLoading"
        :animation="true"
        :icon-component="IconLogin"
      />
    </div>

    <p class="register-link">
      ¿No tienes una cuenta?
      <router-link :to="{ name: 'Register' }">
        Registrate.
      </router-link>
    </p>
  </form>
</template>

<style lang='scss' scoped>
  .form-login  {
    .input-container {
      margin-top: 10px;
      &:first-child {
        margin-top: 0px;
      }
    }

    .submit-button {
      margin-top: 15px;
    }

    .register-link {
      text-align: center;
    }

    .recover-password-link,
    .register-link {
      margin-top: 7px;
      font-size: 14px;
    }
  }
</style>
