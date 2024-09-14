<script setup>
import IconClose from "@icons/actions/IconClose.vue";
import { getContrastColor } from "@utils/color";

// Props
const props = defineProps({
  data: {
    type: Object,
    default() {
      return {
        id: 0,
        color: "orange",
        iconName: "shopping-bag",
        name: "Compras",
      };
    },
  },
});
</script>

<template>
  <div class="category">
    <i
      :class="`icon icon-${props.data.iconName}`"
      :aria-label="`icono ${props.data.name}`"
      :style="{ background: props.data.color, color: getContrastColor(props.data.color) }"
    />
    <div class="icon trash-container">
      <div class="trash-content">
        <IconClose />
      </div>
    </div>
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
    min-height: 30px;
    font-size: 20px;
    min-width: 30px;
    transition: 0.3s ease all;
    color: var(--title-color);
    font-weight: 600;

    &.trash-container {
      background: var(--error-color);
      display: none;
      .trash-content {
        height: 24px;
      }
    }
  }

  .text {
    font-size: 14px;
    margin-top: 2px;
    transition: 0.3s ease all;
  }

  &:hover {
    .icon {
      display: none;
      color: var(--title-color);
    }
    .icon.trash-container {
      display: flex;
      color: var(--title-color);
    }
    .text {
      color: var(--error-color);
    }
  }
}
</style>
