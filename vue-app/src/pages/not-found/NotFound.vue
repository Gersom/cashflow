<script setup>
import { useRouter } from 'vue-router'
import CustomButton from '@components/CustomButton/GeneralButton.vue'
import IconHome from '@icons/nav/IconHome.vue'
import IconLogo from '@icons/others/IconLogo.vue'
import { useThemeStore } from '@stores/theme'

const router = useRouter()
const themeStore = useThemeStore()
</script>

<template>
  <div class='not-found' :class="`is-${themeStore.currentTheme}-theme`">
    <div class="logo-icon">
      <IconLogo />
    </div>
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
        :transparent="true"
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
  background: var(--background-color2);
  background: linear-gradient(16deg, 
    var(--background-color) 20%, 
    var(--background-color2) 100%);
  .logo-icon {
    height: 60px;
  }
  .title {
    font-weight: 400;
    font-size: 70px;
    color: var(--title-color);
    font-weight: 400;
    font-family: var(--font-secular);
    // font-style: italic;
    margin: 0;
    text-shadow:
      5px 3px 0px var(--primary-color),
      8px 6px 0px var(--secondary-color);
  }
  .description {
    margin: 0;
    font-weight: 400;
    font-size: 18px;
    color: var(--text-color);
    font-family: var(--font-poppins);
    // font-style: italic;
  }
  .button-container {
    margin-top: 20px;
    max-width: 200px;
    width: 100%;
  }

  &.is-light-theme {
    .title {
      color: var(--text-color);
    }
  }
}
</style>
