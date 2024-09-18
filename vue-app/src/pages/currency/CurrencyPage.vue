<script setup>
// Imports
import { apiGetAuth, apiPatchAuth } from '@src/services/api';
import { ref, computed, onMounted } from "vue";
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import CustomButton from "@components/CustomButton/GeneralButton.vue";
import CustomInputText from "@components/CustomInput/InputText.vue";
import CustomSelect from "@components/CustomSelect/SelectDefault.vue";
import IconAccount from '@icons/others/IconAccount.vue';
import IconTriangle from '@icons/others/IconTriangle.vue';
import IconWarning from "@icons/state/IconWarning.vue";
import LoginLayout from '@layouts/LoginLayout.vue';

// Data
const router = useRouter()
const toast = useToast()

const currencyList = ref([])
const currencySelected = ref({})
const inputAccountName = ref('Principal')
const isLoading = ref(false)

const isSelectedValue = computed(() => !currencySelected.value.value)

// Methods
const handleSubmit = async(e) => {
  e.preventDefault()
  isLoading.value = true
  try {
    await apiPatchAuth({
      url: '/accounts/change-currency',
      data: { currencyId: currencySelected.value.value }
    })

    toast.success("Bienvenid@")
    router.push({ name: 'AppHome' })
  }
  
  catch (error) {
    toast.error('Ocurrió un error.')
    console.error('Error:', error);
  }

  finally {
    isLoading.value = false
  }
}
const getCurrency = async () => {
  try {
    const response = await apiGetAuth({
      url: '/currencies'
    })

    if (response?.data?.data)
      currencyList.value = formatedCurrencyList(response?.data?.data)
    else
      toast.warning('Algo ocurrió con la información de las monedas')
  }
  
  catch (error) {
    toast.error('Ocurrió un error mientras se obtenia tus monedas locales.')
    console.error('Error:', error);
  }
}
const formatedCurrencyList = (list) => {
  return list.map(currency => {
    return {
      value: currency._id,
      text: `${currency.name.charAt(0).toUpperCase() + currency.name.slice(1)} - ${currency.code} (${currency.symbol})`
    }
  })
}

onMounted(() => {
  getCurrency()
})
</script>

<template>
<div class='currency-page'>
  <LoginLayout
    title="Selecciona tu moneda local"
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
          :disabled="true"
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
        <CustomSelect
          placeholder="Escoge tu moneda local"
          v-model="currencySelected"
          :items="currencyList"
        />
      </div>
  
      <div class="submit-button">
        <CustomButton
          text="Ingresar"
          type="submit"
          :loading="isLoading"
          :disabled="isSelectedValue"
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