<script setup>
import CustomInput from "@components/CustomInput/index.vue";
</script>

<template>
<ul class='input-section'>
  <li>
    <CustomInput />
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
