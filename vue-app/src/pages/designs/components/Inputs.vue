<script setup>
import CustomInputText from '@components/CustomInput/InputText.vue'
import CustomInputCurrency from '@components/CustomInput/InputCurrency.vue'
import CustomInputRadio from '@components/CustomInput/InputRadio.vue'
import CustomInputTextarea from '@components/CustomInput/InputTextarea.vue'
import CustomInputColor from '@components/CustomInput/InputColor.vue'
import CustomInputColorPicker from '@components/CustomInput/InputColorPicker.vue'
import InputCategory from '@components/CustomInput/InputCategory/InputCategory.vue'
import IconUrl from '@icons/form/IconUrl.vue'

import { ref } from 'vue'
const inputTextIcon = ref('')
const inputTextDefault = ref('')
const inputTextPlaceholder = ref('')

const inputRadioTwo = ref({})
const inputRadioDataTwo = [
  { value: 'value1', text: 'Name 1' },
  { value: 'value2', text: 'Name 2' }
]
const inputRadioFour = ref({})
const inputRadioDataFour = [
  { value: 'value1', text: 'Name 1' },
  { value: 'value2', text: 'Name 2' },
  { value: 'value3', text: 'Name 3' },
  { value: 'value4', text: 'Name 4' }
]
const inputRadioSeven = ref({})
const inputRadioDataSeven = [
  { value: 'value1', text: 'Name 1' },
  { value: 'value2', text: 'Name 2' },
  { value: 'value3', text: 'Name 3' },
  { value: 'value4', text: 'Name 4' },
  { value: 'value5', text: 'Name 5' },
  { value: 'value6', text: 'Name 6' },
  { value: 'value7', text: 'Name 7' }
]

const inputCurrencyIncome = ref('0.00')
const inputCurrencyExpense = ref('0.00')

const inputColor = ref('#90A4AE')
const inputColorPicker = ref('#90A4AE')

const inputTextareaDefault = ref('')
const inputTextareaPlaceholder = ref('')

const inputCategories = ref([])
const onChangeCategories = (categories) => {
  inputCategories.value = categories
}
</script>

<template>
  <ul class="input-section">
    <!-- Input Text Default -->
    <li>
      <p><strong>Text</strong> default</p>
      <CustomInputText v-model="inputTextDefault" />
    </li>

    <!-- Input Text Placeholder -->
    <li>
      <p><strong>Text</strong> placeholder</p>
      <CustomInputText
        v-model="inputTextPlaceholder"
        placeholder="Ola 👌"
      />
    </li>

    <!-- Input Text Default -->
    <li>
      <p>text icon</p>
      <CustomInputText
        v-model="inputTextIcon"
        placeholder="https://..."
        :icon-component="IconUrl"
      />
    </li>

    <!-- Input Category -->
    <li>
      <p><strong>Category</strong></p>
      <InputCategory @change-categories="onChangeCategories" />
    </li>

    <!-- Input Currency Income -->
    <li>
      <p><strong>Currency</strong> Income</p>
      <CustomInputCurrency v-model="inputCurrencyIncome" />
      <p><strong>Currency</strong> Expense</p>
      <CustomInputCurrency
        v-model="inputCurrencyExpense"
        transaction-type="expense"
      />
    </li>

    <!-- Input Color -->
    <li>
      <p><strong>Color</strong></p>
      <CustomInputColor v-model="inputColor" />
    </li>

    <!-- Input Color Picker -->
    <li>
      <p><strong>Color width picker</strong></p>
      <CustomInputColorPicker v-model="inputColorPicker" />
    </li>

    <!-- Input Textarea Default -->
    <li>
      <p><strong>Textarea</strong> default</p>
      <CustomInputTextarea v-model="inputTextareaDefault" />
    </li>

    <!-- Input Textarea Placeholder -->
    <li>
      <p><strong>Textarea</strong> placeholder</p>
      <CustomInputTextarea
        v-model="inputTextareaPlaceholder"
        :placeholder="'Ola 👌\npepe'"
      />
    </li>

    <!-- Input Radio two option -->
    <li>
      <p><strong>Radio</strong> two option</p>
      <CustomInputRadio
        v-model="inputRadioTwo"
        :data="inputRadioDataTwo"
      />
    </li>

    <!-- Input Radio seven options -->
    <li>
      <p><strong>Radio</strong> seven options</p>
      <CustomInputRadio
        v-model="inputRadioSeven"
        :data="inputRadioDataSeven"
      />
    </li>

    <!-- Input Radio vertical four options -->
    <li>
      <p><strong>Radio vertical</strong> four options</p>
      <CustomInputRadio
        v-model="inputRadioFour"
        :data="inputRadioDataFour"
        orientation="vertical"
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
