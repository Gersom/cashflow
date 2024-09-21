<script setup>
import IconSuccess from '@icons/state/IconSuccess.vue'
import { useCategoriesStore } from '@src/pages/app/stores/categories'
import { getContrastColor } from '@utils/color'

const emit = defineEmits(['select'])
const categoriesStore = useCategoriesStore()
const props = defineProps({
  selectedCategories: {
    type: Array,
    default: () => []
  }
})

const isCategorySelected = (cat) => {
  return props.selectedCategories.includes(cat)
}

const addCategory = (cat) => {
  emit('select', cat)
}
</script>

<template>
  <div class="category-list">
    <ul class="category-list-content">
      <li
        v-for="(cat, index) in categoriesStore.data"
        :key="`category${index}`"
        class="category-item"
      >
        <button
          v-if="!isCategorySelected(cat)"
          class="button"
          type="button"
          @click="addCategory(cat)"
        >
          <i
            :class="`icon icon-${cat.iconName}`"
            :aria-label="`icono ${cat.name}`"
            :style="{ background: cat.color, color: getContrastColor(cat.color) }"
          />
          <span class="text">
            {{ cat.name }}
          </span>
        </button>
        <div
          v-if="isCategorySelected(cat)"
          class="button"
          :class="{ 'is-selected': isCategorySelected(cat) }"
        >
          <div class="icon">
            <div class="icon-svg">
              <IconSuccess />
            </div>
          </div>
          <span class="text">
            {{ cat.name }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.category-list {
  list-style: none;
  padding: 20px 0px;
  margin: 0;
}
.category-list-content {
  padding: 0;
  margin: 0;
  overflow-y: auto;
  max-height: 200px;
}
.category-item {
  .button {
    display: flex;
    align-items: center;
    margin-top: 15px;
    border: none;
    background: none;
    padding: 0 40px;
    .icon {
      align-items: center;
      border-radius: var(--border-radius);
      display: flex;
      font-size: 20px;
      font-weight: 600;
      height: 36px;
      justify-content: center;
      margin-right: 10px;
      transition: 0.3s ease all;
      width: 36px;
    }
    .icon-svg {
      height: 20px;
    }
    .text {
      font-size: 14px;
      transition: 0.3s ease all;
    }
    &.is-selected {
      .icon {
        background: var(--background-color2);
      }
      .icon,
      .text {
        color: var(--success-color);
      }
    }
  }
  button.button {
    .icon {
      color: var(--title-color);
    }
    .text {
      color: var(--title-color);
    }
    &:hover {
      .icon {
        background: var(--primary-color) !important;
      }
      .text {
        color: var(--primary-color);
      }
    }
  }
  &:first-child {
    .button {
      margin-top: 0;
    }
  }
}
</style>
