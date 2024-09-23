<script setup>
import { ref } from 'vue'
import icons from './icons.json'

const emit = defineEmits(['selectIcon'])
const iconsList = ref(icons)
const selectedIcon = ref('')

const handleSelectIcon = (icon) => {
  selectedIcon.value = icon
  emit('selectIcon', icon)
}
</script>

<template>
  <ul class="icons-list">
    <li
      v-for="(icon, index) in iconsList"
      :key="icon.name + index"
      :class="{ 'is-selected': selectedIcon.name === icon.name }"
    >
      <button
        class="button-icon"
        type="button"
        @click="handleSelectIcon(icon)"
      >
        <i :class="`icon icon-${icon.name}`" />
        <span>{{ icon.label }}</span>
      </button>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.icons-list {
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 300px);
  overflow-y: auto;
  padding: 15px 0;
  li {
    display: flex;
    align-items: center;
    width: 100%;
    .button-icon {
      gap: 10px;
      display: flex;
      align-items: center;
      color: var(--text-color);
      margin: 0;
      padding: 7px 25px;
      width: 100%;
      &:hover {
        color: var(--primary-color);
      }
    }
    i {
      font-size: 22px;
    }
    span {
      font-size: 14px;
      color: var(--text-color-secondary);
    }

    &.is-selected {
      .button-icon {
        color: var(--secondary-color);
      }
    }
  }
}
</style>
