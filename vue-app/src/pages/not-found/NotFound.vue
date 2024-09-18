<script setup>
import CustomButton from '@components/CustomButton/GeneralButton.vue'
import IconHome from '@icons/nav/IconHome.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class='not-found'>
    <h2 class="title">
      404 UPS!
    </h2>
    <p class="description">
      La página que estas buscando no existe.
    </p>
    <div class="button-container">
      <CustomButton
        text="Volver al inicio"
        type="button"
        size="normal"
        :animation="true"
        :icon-component="IconHome"
        @click="router.push({ name: 'Login' })"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: var(--primary-color);
  background: linear-gradient(0deg, var(--secondary-color) 0%, var(--primary-color) 100%);
  .title {
    font-weight: 400;
    font-size: 60px;
    color: var(--error-color);
    font-weight: 00;
    font-family: var(--font-secular);
    // font-style: italic;
    margin: 0;
  }
  .description {
    margin: 0;
    font-weight: 400;
    font-size: 18px;
    color: #333;
    font-family: var(--font-poppins);
    // font-style: italic;
  }
  .button-container {
    margin-top: 20px;
    max-width: 200px;
    width: 100%;
  }
}
</style>
