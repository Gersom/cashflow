<script setup>
defineOptions({
  name: 'Nav'
})
</script>

<template>
  <nav class="nav">
    <p>
      <strong>Current route path:</strong> {{ $route.fullPath }}
    </p>
    <div>
      <RouterLink to="/">Go to Home</RouterLink>
      <RouterLink to="/categorias">Go to Categories</RouterLink>
    </div>
  </nav>
</template>

<style>
</style>
