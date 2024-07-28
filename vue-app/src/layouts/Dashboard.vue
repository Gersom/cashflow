<script setup>
import NavComponent from '@components/Nav/index.vue'

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

<style lang="scss" scoped>
.dashboard-layout {
  background: var(--background-color);
  display: flex;
  flex-direction: row;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  .header {
    height: 100%;
  }
  .main {
    width: 100%;
  }
}
</style>