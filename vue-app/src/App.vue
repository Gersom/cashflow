<script setup>
import DashboardLayout from '@layouts/Dashboard.vue'
import { useThemeStore } from '@stores/theme'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { isDarkMode } = storeToRefs(themeStore)
</script>

<template>
  <div :class="{ 
    'App': true, 
    'is-dark-mode': isDarkMode, 
    'is-light-mode': !isDarkMode 
  }">
    <DashboardLayout>
      <RouterView />
    </DashboardLayout>
  </div>
</template>

<style>
</style>
