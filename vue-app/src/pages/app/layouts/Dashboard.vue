<script setup>
import NavComponent from '@app-page/components/nav/Nav.vue'

defineOptions({
  name: 'DashboardLayout'
})
</script>

<template>
  <div class="dashboard-layout">
    <header class="header">
      <NavComponent />
    </header>
    <main class="main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.dashboard-layout {
  background: var(--background-color);
  display: flex;
  flex-direction: row;
  height: 100%;
  max-height: 100vh;
  min-height: 100vh;
  overflow-y: auto;
  width: 100%;
}
.dashboard-layout .header {
  height: 100%;
}
.dashboard-layout .main {
  width: 100%;
}
</style>