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
        height: 80vh;
        padding:0rem;
        display: grid;
        gap: 2rem;
        /* grid-auto-rows:100%; */
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    }
</style>