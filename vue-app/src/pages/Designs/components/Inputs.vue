<script setup>
import CustomInputText from "@components/CustomInput/InputText.vue";
import CustomInputCurrency from "@components/CustomInput/InputCurrency.vue";

import { ref } from 'vue'
const inputIncomeValue  = ref('0.00')
const inputExpenseValue  = ref('0.00')
</script>

<template>
<ul class='input-section'>
  <li>
    <p>Input <strong>text</strong> default</p>
    <CustomInputText />
  </li>
  <li>
    <p>Input <strong>text</strong> placeholder</p>
    <CustomInputText
      placeholder="Ola 👌"
    />
  </li>
  <li>
    <p>Input <strong>currency</strong> Income</p>
    <CustomInputCurrency
      v-model="inputIncomeValue"
    />
    <p>Input <strong>currency</strong> Expense</p>
    <CustomInputCurrency
      transaction-type="expense"
      v-model="inputExpenseValue"
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
    color: var(--primary-color);
  }
}
</style>
