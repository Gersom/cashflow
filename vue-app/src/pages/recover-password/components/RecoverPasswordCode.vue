<script setup>
import { API_URL } from "@src/config/env";
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

const handleNewCode = (e) => {
  e.preventDefault()
  console.log('New code')

  toast.success('Se ha enviado un nuevo código')
}

// Methods
const handleSubmit = async(e) => {
  e.preventDefault()
  toast.info("Espere un momento...");
  try {
    const response = await apiPost({
      url: `${API_URL}/auth/recover-password/verify`,
      data: {
        email: getLocalStorage('recoveryCode').formData.email,
        code: codeData.value.value
      }
    })

    if (response.status === 200) {
      toast.success("Tu código de recuperación es correcto ^^")
      emit('next', { code: codeData.value.value })
    }

    else {
      toast.warning('Algo ocurrió un problema mientras se verificaba tu código de recuperación.')
      console.warn('Respuesta del servidor:', response.data)
    }
  }

  catch (error) {
    toast.error('Ocurrió un error mientras verificaba tu código de recuperación.')
    console.error('Error:', error);
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
