<script setup>
  // Props
  const props = defineProps({
    data: {
      type: Object,
      default() {
        return {
          id: 0,
          color: 'orange',
          iconName: 'shopping-bag',
          name: 'Compras',
        }
      }
    }
  })
</script>

<template>
  <div class='category'>
    <i
      :class="`icon icon-${props.data.iconName}`"
      :aria-label="`icono ${ props.data.name }`"
      :style="{ background: props.data.color }"
    />
    <span class="text">
      {{ props.data.name }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.category {
  display: flex;
  align-items: center;
  flex-direction: column;
  color: var(--text-color);
  .icon {
    align-items: center;
    display: flex;
    justify-content: center;
    border-radius: var(--border-radius);
    height: 36px;
    font-size: 20px;
    width: 36px;
    transition: 0.3s ease all;
  }
  .text {
    font-size: 14px;
    margin-top: 2px;
    transition: 0.3s ease all;
  }
  &:hover {
    color: var(--primary-color);
    .icon {
      color: var(--text-color);
      background: var(--primary-color) !important;
    }
  }
}
</style>
