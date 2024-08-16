<script setup>
import { ref } from 'vue'

// Components
import CardTitle from '@components/CardTitle/CardTitle.vue'
import CustomButton from "@components/CustomButton/GeneralButton.vue"

// Custom Inputs
import CustomInputCurrency from "@components/CustomInput/InputCurrency.vue"
import CustomInputRadio from "@components/CustomInput/InputRadio.vue"
import CustomInputText from "@components/CustomInput/InputText.vue"
import CustomInputTextarea from "@components/CustomInput/InputTextarea.vue"
import InputCategory from "@components/CustomInput/InputCategory/InputCategory.vue"

// Icons
import IconAdd from "@icons/actions/IconAdd.vue"

const inputTextDefault = ref('')
const inputCurrencyExpense = ref('0.00')
const inputTextareaDefault = ref('')
const inputRadioTwo = ref({})

const inputRadioDataTwo = [
  { value: 'gasto', text: 'Gasto' },
  { value: 'ingreso', text: 'Ingreso' }
]
</script>

<template>
  <div class="card create-card">
    <CardTitle title="Crear nuevo movimiento" />

    <div class="form">
      <div class="input-group">
        <p>Titulo</p>
        <CustomInputText v-model="inputTextDefault" />
      </div>
      <div class="input-group">
        <p>Monto</p>
        <CustomInputCurrency transaction-type="expense" v-model="inputCurrencyExpense" />
      </div>
      <div class="input-group">
        <p>Tipo</p>
        <CustomInputRadio :data="inputRadioDataTwo" v-model="inputRadioTwo" />
      </div>
      <div class="input-group">
        <p>Descripción</p>
        <CustomInputTextarea v-model="inputTextareaDefault" />
      </div>
      <div class="input-group">
        <p>Categoria</p>
        <InputCategory />
      </div>
    </div>

    <CustomButton
      text="Crear movimiento"
      :animation="true"
      :icon-component="IconAdd"
    />
  </div>
</template>

<style lang="scss" scoped>
.card {
  &.create-card {
    & .form {
      padding: 0px 0 20px 0;
      display: flex;
      flex-direction: column;
      gap: 15px;

      & .input-group >  p {
        margin: 0px;
        padding: 0;
        font-size: 14px;
        font-weight: 400;
        font-family: var(--font-nunito);
        margin-bottom: 0.5rem;
        color: var(--subtitle-color);

      }
    }

  }
}
</style>