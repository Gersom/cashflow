<script setup>
import { ref } from "vue"
import { useToast } from 'vue-toastification'
import { apiPost } from '@src/services/api';

// Components
import CustomButtom from '@components/CustomButton/GeneralButton.vue'
import Email from "@components/FormInput/Email.vue"

// Icons
import IconGeometricFigures from '@icons/nav/IconGeometricFigures.vue'

const emit = defineEmits(["next"]);
const toast = useToast()
const emailData = ref({ value: '', isValid: false })
const isLoading = ref(false)

const handleEmail = (text, isValid) => {
  emailData.value = { value: text, isValid }
}

// Methods
const handleSubmit = async(e) => {
  e.preventDefault()
  isLoading.value = true
  // toast.info("Espere un momento...");
  try {
    await apiPost({
      url: `/auth/recover-password/request`,
      data: { email: emailData.value.value }
    })

    toast.success("Se envio tu código de recuperación al correo electrónico ingresado")
    emit('next', { email: emailData.value.value })
  }

  catch (error) {
    if (error.response.status === 400) {
      toast.warning('No tenemos registrado ese correo electrónico.')
    } else {
      toast.error('Ocurrió un error mientras enviaba tu código de recuperación.')
      console.error('Error:', error);
    }
  }

  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <form class="recover-password-form" @submit="handleSubmit">
    <p class="recover-password-description">
      <strong>Paso 1 de 3:</strong> Ingresa tu correo electrónico para recibir un código de verificación
    </p>

    <div class="input-container">
      <Email @validate="handleEmail" />
    </div>

    <!-- <p class="recover-password-description">
      Te enviaremos un código de verificación a tu correo electrónico para recuperar tu contraseña
    </p> -->

    <div class="submit-button">
      <CustomButtom
        text="Enviar codigo"
        type="submit"
        :loading="isLoading"
        :disabled="!emailData.isValid"
        :animation="true"
        :icon-component="IconGeometricFigures"
      />
    </div>
  </form>
</template>

<style lang='scss' scoped>
  .recover-password-form  {
    .input-container {
      margin-top: 10px;
      &:first-child {
        margin-top: 0px;
      }
    }
    .recover-password-description {
      font-size: 14px;
      color: var(--subtitle-color);
      text-align: center;
      margin-top: 10px;
    }
    
    .submit-button {
      margin-top: 15px;
    }
      
    .recover-password-link{
      margin-top: 7px;
      font-size: 14px;
    }
  }
</style>
