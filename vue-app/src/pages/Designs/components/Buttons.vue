<script setup>
import CustomButton from "@components/CustomButton/index.vue";
import IconAdd from "@icons/actions/IconAdd.vue";
</script>

<template>
<div class='buttons-section'>
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
</style>
