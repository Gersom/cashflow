<script setup>
// Imports
import IconTriangle from "@icons/others/IconTriangle.vue";
import IconClose from "@icons/actions/IconClose.vue";
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
  dependent: {
    type: Boolean,
    default: false,
  },
  buttonClose: {
    type: Boolean,
    default: false,
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
    class="dialog-blur"
    :class="{
      'is-dependent': props.dependent,
      'is-dark-theme': themeStore.currentTheme === 'dark',
    }"
    v-show="props.show"
  >
    <button class="blur" @click="onClose" />
    <div class="content">
      <button v-if="props.buttonClose" class="button-close" @click="onClose">
        <IconClose />
      </button>
      <slot></slot>
      <div class="icon" v-if="props.dependent">
        <IconTriangle />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dialog-blur {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 99;
  .blur {
    background: rgb(0 0 0 / 20%);
    backdrop-filter: blur(3px);
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 98;
  }
  .content {
    background: var(--background-color);
    position: relative;
    border-radius: 10px;
    z-index: 99;
  }
  .button-close {
    background: none;
    border: none;
    color: var(--subtitle-color);
    height: 25px;
    position: absolute;
    right: 15px;
    top: 15px;
    &:hover {
      color: var(--primary-color);
    }
  }

  /* Dependent to position button open */
  &.is-dependent {
    height: initial;
    width: initial;
    z-index: initial;
    position: static;
    .blur {
      z-index: 10;
    }
    .content {
      position: absolute;
      bottom: calc(100% + 15px);
      z-index: 13;
      .icon {
        height: 20px;
        color: var(--background-color);
        position: absolute;
        top: calc(100% - 7px);
        transform: rotate(180deg);
        display: flex;
        justify-content: center;
        width: 100%;
      }
    }
  }

  /* Dark Theme */
  &.is-dark-theme {
    .blur {
      background: rgb(var(--primary-color-rgb) / 10%);
    }
  }
}
</style>
