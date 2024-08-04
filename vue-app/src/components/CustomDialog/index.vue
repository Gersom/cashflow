<script setup>
// Imports
import IconTriangle from "@icons/others/IconTriangle.vue";
import { useThemeStore } from "@stores/theme";

// Vue defines
defineOptions({ name: "CustomDialog" });
const emit = defineEmits(["vnode-unmounted", "close"]);

// Props
const props = defineProps({
  show: {
    type: Boolean,
    default: true,
  },
});

// Store
const themeStore = useThemeStore();

// Methods
const onClose = () => {
  emit("close");
};
</script>

<template>
  <div
    class="custom-dialog"
    :class="{ 'is-dark-theme': themeStore.currentTheme === 'dark' }"
    v-show="props.show"
  >
    <button class="blur" @click="onClose" />
    <div class="content">
      <slot></slot>
      <div class="icon">
        <IconTriangle />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.custom-dialog {
  display: flex;
  justify-content: center;
  .blur {
    background: rgb(var(--primary-color-rgb) / 10%);
    backdrop-filter: blur(3px);
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
  }
  .content {
    background: var(--background-color);
    position: absolute;
    bottom: calc(100% + 20px);
    z-index: 13;
    border-radius: 10px;
    .icon {
      height: 30px;
      color: var(--background-color);
      position: absolute;
      top: calc(100% - 7px);
      transform: rotate(180deg);
      display: flex;
      justify-content: center;
      width: 100%;
    }
  }

  /* Dark Theme */
  /*&.is-dark-theme {
      .input-tag {
        color: var(--text-color);
        background: rgb(20 21 26 / 30%);
      }
      .input-tag:focus {
        background: rgb(20 21 26 / 70%);
      }
    }*/
}
</style>
