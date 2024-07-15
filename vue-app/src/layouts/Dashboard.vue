<script setup>
import NavComponent from '@components/Nav/index.vue'

defineOptions({
  name: 'DashboardLayout'
})
</script>

<template>
  <div class="dashboard-layout">
    <header>
      <NavComponent />
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
</style>