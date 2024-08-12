<script setup>
import { useThemeStore } from "@stores/theme";
import { storeToRefs } from "pinia";

const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);
</script>

<template>
  <div
    class="app-container"
    :class="{ 'is-dark-theme': isDarkTheme }"
  >
    <RouterView />
  </div>
</template>

<style>
</style>
