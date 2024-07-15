<script setup>
import { useThemeStore } from '@stores/theme'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'HomePage'
})

const themeStore = useThemeStore()
const { currentTheme } = storeToRefs(themeStore)
const toggleTheme = () => {
  themeStore.toggleTheme()
}
</script>

<template>
  <div class="home-page">
    <h1>Home Page</h1>
    <p>Tema actual: {{ currentTheme }}</p>
    <button @click="toggleTheme">Cambiar tema</button>
  </div>
</template>

<style lang="scss" scoped>
</style>