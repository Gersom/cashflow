<script setup>
import CustomButton from "@components/CustomButton/index.vue";
import IconAdd from "@icons/actions/IconAdd.vue";
</script>

<template>
<div class='buttons-section'>
  <div class="content">
    <!--  -->
    <p>Normal</p>
    <CustomButton
      text="Crear movimiento"
    />
    
    <!--  -->
    <p>With icon</p>
    <CustomButton
      :icon-component="IconAdd"
      text="Crear movimiento"
    />
    
    <!--  -->
    <p>Animated</p>
    <CustomButton
      :animation="true"
      :icon-component="IconAdd"
      text="Crear movimiento"
    />
    
    <!--  -->
    <p>Transparent</p>
    <CustomButton
      :icon-component="IconAdd"
      :transparent="true"
      text="Boton"
    />
    
    <!--  -->
    <p>Small</p>
    <CustomButton
      :animation="true"
      :icon-component="IconAdd"
      :transparent="true"
      size="small"
      text="Boton"
    />
      
    <!--  -->
    <p>Disabled</p>
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
