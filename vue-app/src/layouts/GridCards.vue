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
  padding-bottom: 22px;
  display: grid;
  gap: 22px;
  grid-auto-rows:591px;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
}
.card-item{
  width: 100%;
  height: 100%;
  min-width: 360px;
  /* overflow: hidden; */
  border-radius: var(--border-radius);
  background-color: var(--background-color2);
  padding: 25px;
}
</style>