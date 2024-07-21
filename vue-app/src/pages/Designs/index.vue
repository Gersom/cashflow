<script setup>
defineEmits(['vnode-unmounted'])
import CustomButton from "@components/CustomButton/index.vue";
import IconAdd from "@icons/actions/IconAdd.vue";
import { useThemeStore } from '@stores/theme'
// import { storeToRefs } from 'pinia'

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
    
    <h2 class="title">Botones</h2>
    <div class="content">
      <!--  -->
      <p>Boton Normal</p>
      <CustomButton
        text="Crear movimiento"
      />
      
      <!--  -->
      <p>Boton con icono</p>
      <CustomButton
        :icon-component="IconAdd"
        text="Crear movimiento"
      />
      
      <!--  -->
      <p>Boton Animado</p>
      <CustomButton
        :animation="true"
        :icon-component="IconAdd"
        text="Crear movimiento"
      />
      
      <!--  -->
      <p>Boton Transparente</p>
      <CustomButton
        :icon-component="IconAdd"
        :transparent="true"
        text="Boton"
      />
      
      <!--  -->
      <p>Boton Pequeño</p>
      <CustomButton
        :animation="true"
        :icon-component="IconAdd"
        :transparent="true"
        size="small"
        text="Boton"
      />
        
      <!--  -->
      <p>Boton Desabilitado</p>
      <CustomButton
        :disabled="true"
        :icon-component="IconAdd"
        text="Boton"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.DesingPage {
  margin-top: 20px;
  padding: 20px;
  background: var(--background-color);
  color: var(--text-color);
  .title {
    color: var(--title-color);
  }
  .content {
    padding: 25px;
    margin: 20px 0;
    border-radius: 10px;
    background-color: var(--background-color2);
    & > p {
      margin-top: 40px;
    }
    & > p:first-child {
      margin-top: 0;
    }
  }
}
</style>
