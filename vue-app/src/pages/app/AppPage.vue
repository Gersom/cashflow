<script setup>
import "./styles/icomoon.css";
import DashboardLayout from "./layouts/Dashboard.vue";
import { onMounted } from "vue";
import { useUserStore } from "@stores/user"; 

const userStore = useUserStore()

onMounted(() => userStore.setUserProfile())
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
