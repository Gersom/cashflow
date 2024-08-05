<script setup>
import DashboardLayout from "@layouts/Dashboard.vue";
import { useThemeStore } from "@stores/theme";
import { storeToRefs } from "pinia";

const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);
</script>

<template>
  <div
    :class="{
      App: true,
      'is-dark-theme': isDarkTheme,
      'is-light-theme': !isDarkTheme,
    }"
  >
    <DashboardLayout>
      <RouterView />
    </DashboardLayout>
  </div>
</template>

<style>
</style>
