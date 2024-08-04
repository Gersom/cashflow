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
  <div class="new-item">
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
    height: 36px;
    justify-content: center;
    width: 36px;
  }
  .text {
    font-size: 14px;
    margin-top: 2px;
  }
  .text,
  .icon {
    color: var(--text-color);
    transition: 0.3s ease all;
  }
  &:hover {
    .icon,
    .text {
      color: var(--primary-color);
    }
  }
}
</style>
