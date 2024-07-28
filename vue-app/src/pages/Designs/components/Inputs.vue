<script setup>
import CustomInput from "@components/CustomInput/index.vue";

import { ref } from 'vue'
const valueInput = ref('')
</script>

<template>
<ul class='input-section'>
  <li>
    <p>Input normal</p>
    <CustomInput 
      v-model="valueInput"
    />
  </li>
  <li>
    <p>Input placeholder</p>
    <CustomInput
      placeholder="Ola 👌"
    />
  </li>
  <li>
    <p>Input placeholder</p>
    <CustomInput
      placeholder="Ola 👌"
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
}
</style>
