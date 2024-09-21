<script setup>
import { ref, computed } from 'vue'

// Components
import CustomButtom from '@components/CustomButton/GeneralButton.vue'
import Email from '@components/FormInput/Email.vue'
import Password from '@components/FormInput/Password.vue'
import Nickname from '@components/FormInput/Nickname.vue'
import NroWhatsapp from '@components/FormInput/NroWhatsapp.vue'

// Icons
import IconSuccess from '@icons/state/IconSuccess.vue'

const emit = defineEmits(['submit'])
const props = defineProps({
  isLoading: { type: Boolean, default: false }
})

// Data
const componentMap = {
  name: Nickname,
  email: Email,
  password: Password,
  whatsapp: NroWhatsapp
}

const formData = ref({
  name: { value: '', isValid: false },
  email: { value: '', isValid: false },
  password: { value: '', isValid: false },
  whatsapp: { value: '', isValid: false }
})

const isFormValid = computed(() =>
  Object.entries(formData.value)
    .filter(([key]) => key !== 'whatsapp')
    .every(([, field]) => field.isValid)
)
const isLoadingProp = computed(() => props.isLoading)

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
    class="register-form"
    @submit="handleSubmit"
  >
    <div
      v-for="(inputComponent, key) in componentMap"
      :key="key"
      class="input-container"
    >
      <component
        :is="inputComponent"
        @validate="(txt, valid) => handleInput(key, txt, valid)"
      />
    </div>

    <div class="submit-button">
      <CustomButtom
        text="Registrarme"
        type="submit"
        :disabled="!isFormValid"
        :loading="isLoadingProp"
        :animation="true"
        :icon-component="IconSuccess"
      />
    </div>

    <p class="register-link">
      Ya tienes una cuenta?
      <router-link :to="{ name: 'Login' }">
        Inicia sesión.
      </router-link>
    </p>
  </form>
</template>

<style lang='scss' scoped>
  .register-form  {
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
      margin-top: 7px;
      font-size: 14px;
    }
  }
</style>
