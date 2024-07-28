<script setup>
defineEmits(['vnode-unmounted'])
import { useThemeStore } from '@stores/theme'
import ButtonsSection from "./components/Buttons.vue";
import InputsSection from "./components/Inputs.vue";
import CustomButton from "@components/CustomButton/index.vue";
import IconAdd from "@icons/actions/IconAdd.vue";
// import { storeToRefs } from 'pinia'

defineOptions({name: 'DesignsPage'})

const themeStore = useThemeStore()
// const { currentTheme } = storeToRefs(themeStore)
const toggleTheme = () => {
  themeStore.toggleTheme()
}
</script>

<template>
<div class='DesingPage'>
  <h1 class="title">Desing Page</h1>
  <p>Tema actual: {{ themeStore.currentTheme }}</p>
  <CustomButton
    text="Cambiar tema"
    :icon-component="IconAdd"
    :transparent="true"
    @click="toggleTheme"
  />
  
  <h2 class="title">inputs</h2>
  <InputsSection />
  
  <h2 class="title">Botones</h2>
  <ButtonsSection />
</div>
</template>

<style lang="scss" scoped>
.DesingPage {
  margin-top: 20px;
  padding: 20px;
  color: var(--text-color);
  .title {
    color: var(--title-color);
  }
}
</style>
