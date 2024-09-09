<script setup>
// Imports
import { apiPost } from '@src/services/api';
import { API_AUTH } from "@src/config/env";
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { ref } from "vue";
import CustomInputText from "@components/CustomInput/InputText.vue";
import LoginLayout from '@layouts/LoginLayout.vue';
import IconAccount from '@icons/others/IconAccount.vue';
import CustomSelect from "@components/CustomSelect/SelectDefault.vue";
import CustomButton from "@components/CustomButton/GeneralButton.vue";
import IconWarning from "@icons/state/IconWarning.vue";
import IconTriangle from '@icons/others/IconTriangle.vue';

// Data
const router = useRouter()
const toast = useToast()

const inputAccountName = ref('Principal')

// Methods
const handleSubmit = async(data) => {
  toast.info("Espere un momento...");
  try {
    const response = await apiPost({
      url: `${API_AUTH}/login`, data
    })

    if (response.statusText === 'OK') {
      toast.success("Bienvenid@")
      router.push({ name: 'AppHome' })
    }

    else {
      toast.warning('Algo ocurrió mientras se iniciaba tu sesión.')
      console.warn('Respuesta del servidor:', response.data)
    }
  }
  
  catch (error) {
    toast.error('Ocurrió un error mientras se iniciaba tu sesión.')
    console.error('Error:', error);
  }
}
</script>

<template>
<div class='currency-page'>
  <LoginLayout
    title="Selecciona tu moneda local"
    logo-title="Bienvenid@ a CashFlow"
  >
    <form class="form-login" @submit="handleSubmit">
      <div class="input-container">
        <div class="title">
          <span>Cuenta actual:</span>
          <div class="warning-icon">
            <IconWarning />
          </div>
        </div>
        <CustomInputText
          v-model="inputAccountName"
          :icon-component="IconAccount"
        />
        <div class="warning-text">
          <p>
            La creación de cuentas adicionales es una característica exclusiva del <strong>plan Premium</strong>. Puedes suscribirte a este plan directamente desde la aplicación para disfrutar de esta y otras ventajas.</p>
          <div class="icon-component">
            <IconTriangle />
          </div>
        </div>
      </div>
      <div class="input-container">
        <div class="title">
          <span>Monedas:</span>
        </div>
        <CustomSelect />
      </div>
  
      <div class="submit-button">
        <CustomButton
          text="Ingresar"
          type="submit"
        />
      </div>
    </form>
  </LoginLayout>
</div>
</template>

<style lang="scss" scoped>
.currency-page {
  .input-container {
    margin-top: 10px;
    position: relative;
    &:first-child {
      margin-top: 0px;
    }
    .warning-text {
      display: none;
      position: absolute;
      bottom: calc(100% + 15px);
      left: 0;
      padding: 15px;
      background: var(--background-color);
      border-radius: var(--border-radius);
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      z-index: 9;
      color: var(--text-color);
      font-size: 14px;
      font-family: var(--font-poppins);
      font-weight: 500;
      .icon-component {
        height: 15px;
        margin-right: 5px;
        color: var(--background-color);
        position: absolute;
        left: 10px;
        top: calc(100% - 3px);
        svg {
          display: block;
          transform: rotate(180deg);
        }
      }
    }
    &:hover {
      .warning-text {
        display: block;
        p {
          margin: 0;
        }
        strong {
          color: var(--warning-color);
        }
      }
    }
  }

  .title {
    font-size: 14px;
    color: var(--text-color);
    margin: 0 0 5px 5px;
    display: flex;

    .warning-icon {
      height: 16px;
      margin-left: 7px;
      color: var(--warning-color);
    }
  }

  .submit-button {
    margin-top: 20px;
  }
}
</style>