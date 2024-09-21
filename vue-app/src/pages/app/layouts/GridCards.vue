<script setup>
const props = defineProps({
  itemCount: {
    type: Number,
    default: 3
  }
})
</script>

<template>
  <div class="grid-cards">
    <div
      v-for="index in props.itemCount"
      :key="`grid-cards-${index}`"
      class="card-item"
    >
      <slot :name="`card-${index}`" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid-cards {
  padding-bottom: 22px;
  display: grid;
  gap: 22px;
  grid-auto-rows:minmax(591px, auto);
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));

  .card-item{
    width: 100%;
    height: 100%;
    min-width: 360px;
    border-radius: var(--border-radius);
    background-color: var(--background-color2);
    padding: 25px;
  }

  @media (width <= 600px) {
    grid-auto-rows: initial;
    grid-template-columns: initial;
    .card-item {
      padding: 25px 15px;
      min-width: initial;
    }
  }
}

</style>