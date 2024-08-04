<script setup>

defineOptions({
  name: 'GridCards'
})
</script>

<template>
  <div class="grid-cards">
    <div class="card-item">
      <slot name="first" />
    </div>
    <div class="card-item">
      <slot name="second" />
    </div>
    <div class="card-item">
      <slot name="third" />
    </div>
  </div>
</template>

<style scoped>
.grid-cards {
  height: 80vh;
  padding: 0rem;
  display: grid;
  gap: 2rem;
  /* grid-auto-rows:100%; */
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}
.card-item{
  width: 100%;
  height: 100%;
  min-width: 360px;
  min-height: 59px;
  border-radius: var(--border-radius);
  background-color: var(--background-color2);
  padding: 25px;
}
</style>