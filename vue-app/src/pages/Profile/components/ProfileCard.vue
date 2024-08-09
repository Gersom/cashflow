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

</script>

<template>
  <div class="card card-profile">
        <CardHead title="Foto de perfil "/>
  </div>
</template>

<style lang="scss" scoped>
.card {
  height: 100%;
  width: 100%;
}
</style>