<script setup>
defineEmits(['vnode-unmounted'])
defineOptions({
  name: 'CategoriesPage'
})
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <div class="categories-page">
    <h1>Categories Page</h1>

    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>

<style lang="scss" scoped>
</style>