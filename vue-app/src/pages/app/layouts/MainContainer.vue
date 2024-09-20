<script setup>
</script>

<template>
  <main class='main-container'>
    <slot />
  </main>
</template>

<style scoped>
.main-container {
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-flow: column nowrap;
  gap: 2rem;

  @media (width <= 600px) {
    padding: 2rem 10px;
  }
}
</style>
