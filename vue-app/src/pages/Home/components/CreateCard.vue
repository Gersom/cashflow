<script setup>
import { ref } from 'vue'
import CardHead from '@components/CardHead/CardHead.vue'
import CustomButton from "@components/CustomButton/index.vue"
import IconAdd from "@icons/actions/IconAdd.vue"
import CustomInputText from "@components/CustomInput/InputText.vue"
import CustomInputCurrency from "@components/CustomInput/InputCurrency.vue"
import CustomInputRadio from "@components/CustomInput/InputRadio.vue"
import CustomInputTextarea from "@components/CustomInput/InputTextarea.vue"
import InputCategory from "@components/CustomInput/InputCategory/InputCategory.vue"

defineOptions({
  name: 'CreateCard'
})

const inputTextDefault = ref('')
const inputCurrencyExpense = ref('0.00')
const inputTextareaDefault = ref('')
const inputRadioTwo  = ref({})
const inputRadioDataTwo = [
  { value: 'value1', text: 'Name 1' },
  { value: 'value2', text: 'Name 2' }
]

// Assuming inputRadioDataTwo is defined somewhere, you might want to add it here
// const inputRadioDataTwo = [...]
</script>

<template>
  <div class="card create-card">
    <CardHead title="Crear nuevo movimiento" />
    <div class="input-group">
      <p>Titulo</p>
      <CustomInputText v-model="inputTextDefault" />
    </div>
    <div class="input-group">
      <p>Monto</p>
      <CustomInputCurrency
        transaction-type="expense"
        v-model="inputCurrencyExpense"
      />
    </div>
    <div class="input-group">
      <p>Tipo</p>
      <CustomInputRadio
        :data="inputRadioDataTwo"
        v-model="inputRadioTwo"
      />
    </div>
    <div class="input-group">
      <p>Descripción</p>
      <CustomInputTextarea
        v-model="inputTextareaDefault"
      />
    </div>
    <div class="input-group">
      <p>Categoria</p>
      <InputCategory />
    </div>
    <CustomButton
      :animation="true"
      :icon-component="IconAdd"
      text="Crear movimiento"
    />
  </div>
</template>

<style lang="scss" scoped>
.card {
  &.create-card {

    .input-group {
      margin-bottom: 1rem;

      p {
        margin-bottom: 0.5rem;
        color: var(--text-color)
      }
    }
  }
}
</style>