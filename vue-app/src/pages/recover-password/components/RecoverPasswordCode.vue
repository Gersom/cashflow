<script setup>
import { apiPost } from "@src/services/api";
import { getLocalStorage } from "@src/utils/localStorage";
import { ref } from "vue"
import { useToast } from "vue-toastification"
import CustomButtom from '@components/CustomButton/GeneralButton.vue'
import IconGeometricFigures from '@icons/nav/IconGeometricFigures.vue'
import InputCode from "./InputCode.vue"

const toast = useToast()
const emit = defineEmits(["next"])
const codeData = ref({ value: '', isValid: false })

const handleCode = (text, isValid) => {
  codeData.value = { value: text, isValid }
}

const handleNewCode = async () => {
  try {
    await apiPost({
      url: `/auth/recover-password/request`,
      data: {
        email: getLocalStorage('recoveryCode').formData.email
      }
    })

    codeData.value.value = ''
    toast.success("Tu nuevo código de recuperación se ha venviado a tu correo electrónico, revisa tu bandeja de entrada.")
  }

  catch (error) {
    toast.error('Ocurrió un error mientras generaba tu nuevo código de recuperación.')
    console.error('Error:', error);
  }
}

// Methods
const handleSubmit = async(e) => {
  e.preventDefault()
  // toast.info("Espere un momento...");
  try {
    await apiPost({
      url: `/auth/recover-password/verify`,
      data: {
        email: getLocalStorage('recoveryCode').formData.email,
        code: codeData.value.value
      }
    })

    toast.success("Tu código de recuperación es correcto ^^")
    emit('next', { code: codeData.value.value })
  }

  catch (error) {
    if (error.response.status === 400) {
      toast.warning('El código de recuperación no es válido.')
    }
    else if (error.response.status === 410) {
      toast.warning('El código de recuperación ha expirado, dale click en enviar un nuevo código.')
    }
    else {
      toast.error('Ocurrió un error mientras verificaba tu código de recuperación.')
      console.error('Error:', error);
    }
  }
}
</script>

<template>
  <form class='recover-password-code' @submit="handleSubmit">

    <p class="recover-password-description">
      <strong>Paso 2 de 3:</strong> Ingresa el código de verificación que te hemos enviado a tu correo electrónico.
    </p>

    <div class="input-container">
      <InputCode :input-value="codeData.value" @validate="handleCode" />
    </div>
    <p class="recover-password-description">
      {{ 'Si no lo encuentras en  tu bandeja de entrada o en la carpeta de spam, podemos' }}
      <a href="#" @click="handleNewCode">
        enviarte un nuevo código.
      </a>
    </p>

    <div class="submit-button">
      <CustomButtom
        text="Verificar código"
        type="submit"
        :disabled="!codeData.isValid"
        :animation="true"
        :icon-component="IconGeometricFigures"
      />
    </div>
  </form>
</template>

<style lang="scss" scoped>
.recover-password-code {
  .input-container {
    margin-top: 10px;
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
