<script setup>

defineOptions({
  name: 'GridCards'
})
</script>

<template>
  <div class="grid-cards">
    <slot name="first"/>
    <slot name="second"/>
    <slot name="third"/>
  </div>
</template>

<style scoped>
    .grid-cards{
        display: grid;
        gap: 1rem;
        grid-auto-rows:75vh;
        grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    }
</style>