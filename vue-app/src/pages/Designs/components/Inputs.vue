<script setup>
import CustomInputText from "@components/CustomInput/InputText.vue";
import CustomInputCurrency from "@components/CustomInput/InputCurrency.vue";
import CustomInputRadio from "@components/CustomInput/InputRadio.vue";
import CustomInputTextarea from "@components/CustomInput/InputTextarea.vue";
import CustomInputColor from "@components/CustomInput/InputColor.vue";
import CustomInputColorPicker from "@components/CustomInput/InputColorPicker.vue";
import InputCategory from "@components/CustomInput/InputCategory/InputCategory.vue";

import { ref } from 'vue'
const inputTextDefault  = ref('')
const inputTextPlaceholder  = ref('')

const inputRadioTwo  = ref({})
const inputRadioDataTwo = [
  { value: 'value1', text: 'Name 1' },
  { value: 'value2', text: 'Name 2' }
]
const inputRadioFour  = ref({})
const inputRadioDataFour = [
  { value: 'value1', text: 'Name 1' },
  { value: 'value2', text: 'Name 2' },
  { value: 'value3', text: 'Name 3' },
  { value: 'value4', text: 'Name 4' },
]
const inputRadioSeven  = ref({})
const inputRadioDataSeven = [
  { value: 'value1', text: 'Name 1' },
  { value: 'value2', text: 'Name 2' },
  { value: 'value3', text: 'Name 3' },
  { value: 'value4', text: 'Name 4' },
  { value: 'value5', text: 'Name 5' },
  { value: 'value6', text: 'Name 6' },
  { value: 'value7', text: 'Name 7' }
]

const inputCurrencyIncome  = ref('0.00')
const inputCurrencyExpense  = ref('0.00')

const inputColor  = ref('#90A4AE')

const inputTextareaDefault  = ref('')
const inputTextareaPlaceholder  = ref('')
</script>

<template>
<ul class='input-section'>
  <li>
    <p><strong>Text</strong> default</p>
    <i class="icon icon-box" aria-label="icono caja" />
    <CustomInputText v-model="inputTextDefault" />
  </li>
  <li>
    <p><strong>Category</strong> default</p>
    <InputCategory />
  </li>
  <li>
    <p><strong>Text</strong> placeholder</p>
    <CustomInputText
      v-model="inputTextPlaceholder"
      placeholder="Ola 👌"
    />
  </li>
  <li>
    <p><strong>Currency</strong> Income</p>
    <CustomInputCurrency
      v-model="inputCurrencyIncome"
    />
    <p><strong>Currency</strong> Expense</p>
    <CustomInputCurrency
      transaction-type="expense"
      v-model="inputCurrencyExpense"
    />
  </li>
  <li>
    <p><strong>Color</strong></p>
    <CustomInputColor
      v-model="inputColor"
    />
  </li>
  <li>
    <p><strong>Color width picker</strong></p>
    <CustomInputColorPicker
    />
  </li>
  <li>
    <p><strong>Textarea</strong> default</p>
    <CustomInputTextarea
      v-model="inputTextareaDefault"
    />
  </li>
  <li>
    <p><strong>Textarea</strong> placeholder</p>
    <CustomInputTextarea
      v-model="inputTextareaPlaceholder"
      :placeholder="'Ola 👌\npepe'"
    />
  </li>
  <li>
    <p><strong>Radio</strong> two option</p>
    <CustomInputRadio
      :data="inputRadioDataTwo"
      v-model="inputRadioTwo"
    />
  </li>
  <li>
    <p><strong>Radio</strong> seven options</p>
    <CustomInputRadio
      :data="inputRadioDataSeven"
      v-model="inputRadioSeven"
    />
  </li>
  <li>
    <p><strong>Radio vertical</strong> four options</p>
    <CustomInputRadio
      :data="inputRadioDataFour"
      orientation="vertical"
      v-model="inputRadioFour"
    />
  </li>
</ul>
</template>

<style lang="scss" scoped>
.input-section {
  padding: 25px;
  margin: 20px 0;
  border-radius: 10px;
  background-color: var(--background-color2);

  li {
    list-style: none;
    margin-top: 20px;
  }
  li:first-child {
    margin-top: 0px;
  }
  p {
    color: var(--text-color);
  }
}
</style>
