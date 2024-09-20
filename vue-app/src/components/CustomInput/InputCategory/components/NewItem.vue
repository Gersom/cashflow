<script setup>
import IconAdd from "@icons/actions/IconAdd.vue";
import IconClose from "@icons/actions/IconClose.vue";

const props = defineProps({
  showClose: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="new-item" :class="{ 'is-selected': props.showClose }">
    <span class="icon">
      <IconAdd v-show="!props.showClose" />
      <IconClose v-show="props.showClose" />
    </span>
    <span class="text">
      {{ props.showClose ? "Cerrar" : "Agregar" }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.new-item {
  align-items: center;
  display: flex;
  flex-direction: column;
  .icon {
    align-items: center;
    border-radius: var(--border-radius);
    display: flex;
    min-height: 30px;
    justify-content: center;
    min-width: 30px;
  }
  .text {
    font-size: 14px;
    margin-top: 2px;
    line-height: 1;
    margin-top: 7px;
  }
  .text,
  .icon {
    color: var(--text-color);
    transition: 0.3s ease all;
  }
  &:hover {
    .icon,
    .text {
      color: var(--title-color);
      // color: var(--primary-color);
    }
  }

  &.is-selected {
    .icon {
      color: var(--error-color);
    }
    .text {
      color: var(--title-color);
    }
    &:hover {
      .icon,
      .text {
        color: var(--error-color);
      }
    }
  }
}
</style>
