<script setup>
import { ref } from "vue"
import { useToast } from 'vue-toastification'
// Components
import CustomButtom from '@components/CustomButton/index.vue'
import Email from "@components/FormInput/Email.vue"

// Icons
import IconGeometricFigures from '@icons/nav/IconGeometricFigures.vue'

const emit = defineEmits(["next"]);
const toast = useToast()
const emailData = ref({ value: '', isValid: false })

const handleEmail = (text, isValid) => {
  emailData.value = { value: text, isValid }
}

const handleSubmit = (e) => {
  e.preventDefault()
  toast.success("Se envio tu código de recuperación")
  emit('next', 'recoverPasswordCode')
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
