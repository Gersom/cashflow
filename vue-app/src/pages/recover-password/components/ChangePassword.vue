<script setup>
import { ref, computed } from "vue"
import { useToast } from 'vue-toastification'
import { getLocalStorage } from "@src/utils/localStorage";
import { apiPost } from "@src/services/api";

// Components
import CustomButtom from '@components/CustomButton/GeneralButton.vue'
import Password from "@components/FormInput/Password.vue"
import ConfirmPassword from "@components/FormInput/ConfirmPassword.vue";

// Icons
import IconPassword from '@icons/form/IconPassword.vue'

const emit = defineEmits(["next"]);
const toast = useToast()
const formData = ref({
  password: { value: '', isValid: false },
  confirmPassword: { value: '', isValid: false },
})

const isFormValid = computed(() => 
  Object.values(formData.value).every(field => field.isValid)
)

const handleInput = (field, text, isValid) => {
  formData.value[field] = { value: text, isValid }
}

// Methods
const handleSubmit = async(e) => {
  e.preventDefault()
  toast.info("Espere un momento...");
  try {
    const response = await apiPost({
      url: `/auth/recover-password/reset`,
      data: {
        email: getLocalStorage('recoveryCode').formData.email,
        code: getLocalStorage('recoveryCode').formData.code,
        password: formData.value.password.value,
        confirmPassword: formData.value.confirmPassword.value
      }
    })

    if (response.status === 200) {
      toast.success("Tu contraseña ha sido cambiada con éxito ^^")
      emit('next')
    }

    else {
      toast.warning('Ocurrio un problema mientras cambiaba tu contraseña.')
      console.warn('Respuesta del servidor:', response.data)
    }
  }

  catch (error) {
    toast.error('Ocurrió un error mientras cambiaba tu contraseña.')
    console.error('Error:', error);
  }
}
</script>

<template>
  <form class="change-password" @submit="handleSubmit">
    <p class="recover-password-description">
      <strong>Paso 3/3:</strong> Ingresa tu nueva contraseña, ya casi terminamos.
    </p>

    <div class="input-container">
      <Password
        text-input="Nueva contraseña"
        @validate="(txt, valid) => handleInput('password', txt, valid)" />
    </div>
    <div class="input-container">
      <ConfirmPassword
        text-input="Confirmar nueva contraseña"
        :password="formData.password.value"
        @validate="(txt, valid) => handleInput('confirmPassword', txt, valid)" />
    </div>

    <p class="recover-password-description">
      ¡gracias por usar nuestra plataforma!
    </p>

    <div class="submit-button">
      <CustomButtom
        text="Cambiar contraseña"
        type="submit"
        :disabled="!isFormValid"
        :animation="true"
        :icon-component="IconPassword"
      />
    </div>
  </form>
</template>

<style lang='scss' scoped>
  .change-password  {
    .input-container {
      margin-top: 10px;
      &:first-child {
        margin-top: 0px;
      }
    }
    .recover-password-description {
      margin-top: 10px;
      font-size: 14px;
      text-align: center;
      color: var(--subtitle-color);
    }
    .submit-button {
      margin-top: 15px;
    }
  }
</style>
