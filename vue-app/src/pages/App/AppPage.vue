<script setup>
import DashboardLayout from "@app-page/layouts/Dashboard.vue";
defineOptions({ name: 'AppPage' })
</script>

<template>
  <div class='app-page'>
    <DashboardLayout>
      <RouterView />
    </DashboardLayout>
  </div>
</template>

<style scoped>
</style>
