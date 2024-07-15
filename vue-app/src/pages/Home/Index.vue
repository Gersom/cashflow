<script setup>
import { ref } from 'vue'

defineOptions({
  name: 'HomePage'
})

const count = ref(0)
</script>

<template>
  <div class="home-page">
    <h1>Home Page</h1>
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>

<style lang="scss" scoped>
</style>