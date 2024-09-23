<script setup>
import { computed } from 'vue'
import { getContrastColor } from '@utils/color.js'
import IconEdit from '@icons/actions/IconEdit.vue'

const props = defineProps({
  category: {
    type: Object,
    default: () => ({
      id: '66e5f3d5ef562233adf1f93b',
      name: 'Salud',
      iconName: 'thermometer',
      color: '#FFE5B4',
      movementsLenght: 0
    })
  }
})

const categoryColor = computed(() => props.category.color)
const categoryContrastColor = computed(() => getContrastColor(props.category.color || '#282a36'))
const movementsMessage = computed(() => {
  if (props.category.movementsLenght === 0) {
    return 'Sin movimiento'
  } else if (props.category.movementsLenght === 1) {
    return '01 movimiento'
  } else {
    return `${props.category.movementsLenght} movimientos`
  }
})
</script>

<template>
  <button
    class="category-item"
    :style="[
      `--category-color: ${categoryColor}`,
      `--category-contrast-color: ${categoryContrastColor}`
    ]"
  >
    <div class="category-icon">
      <i :class="`icon icon-${props.category.iconName}`" />
    </div>

    <div class="category-details">
      <p class="category-name">
        {{ props.category.name }}
      </p>
      <p>{{ movementsMessage }}</p>
    </div>

    <div class="icon-edit">
      <IconEdit />
    </div>
  </button>
</template>

<style lang="scss" scoped>
.category-item {
  display: flex;
  align-items: center;
  color: var(--text-color);
  width: 100%;
  padding: 12px 15px;

  .category-icon {
    font-size: 23px;
    display: flex;
    align-items: center;
    color: var(--category-color);
    font-weight: 600;
  }
  .category-details {
    margin-left: 15px;
    line-height: 1.15;
    text-align: left;
    font-size: 14px;
    p { margin: 0; }
    .category-name {
      font-weight: 600;
      font-size: 16px;
      color: var(--title-color);
    }
  }
  .icon-edit {
    height: 25px;
    margin-left: auto;
    color: var(--primary-color);
  }

  &:hover {
    background: var(--category-color);
    .category-icon {
      color: var(--category-contrast-color);
    }
    .category-details {
      font-weight: 600;
      color: var(--category-contrast-color);
      .category-name { color: var(--category-contrast-color);}
    }
    .icon-edit { color: var(--category-contrast-color);}
  }
}
</style>
