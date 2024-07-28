<script setup>
import { useThemeStore } from '@stores/theme'
const themeStore = useThemeStore()

import { ref } from 'vue'
const value = ref('')
</script>

<template>
  <div
    class='custom-input'
    :class="{
      'is-dark-theme': themeStore.currentTheme === 'dark',
      'is-light-theme': themeStore.currentTheme === 'light'
    }"
  >
    <input type="text" v-model="value">
  </div>
</template>

<style lang="scss" scoped>
.custom-input {
  input {
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    border: none;
    color: var(--text-color);
    background: var(--background-color);
    font-family: var(--font-poppins);
  }
  &.is-dark-theme {
    input {
      color: var(--text-color);
      background: rgb(20, 21, 26 / 50%);
    }
  }
}
</style>
