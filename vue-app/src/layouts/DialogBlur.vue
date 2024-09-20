<script setup>
// Imports
import IconTriangle from "@icons/others/IconTriangle.vue";
import IconCross from "@icons/actions/IconCross.vue";
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
  positionX: {
    type: String,
    default: "center", // center, left, right
  },
  positionY: {
    type: String,
    default: "center", // center, top or bottom
  },
  backgroundColor: {
    type: String,
    default: "var(--background-color)",
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
      'is-left': props.positionX === 'left',
      'is-right': props.positionX === 'right',
      'is-top': props.positionY === 'top',
      'is-dark-theme': themeStore.currentTheme === 'dark',
    }"
    v-show="props.show"
  >
    <button
      class="blur" 
      type="button"
      @click="onClose"
    />
    <div class="content" :style="{ background: props.backgroundColor }">
      <button
        class="button-close"
        type="button"
        v-if="props.buttonClose"
        @click="onClose"
      >
        <IconCross />
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
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
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
    position: relative;
    border-radius: 10px;
    z-index: 99;
  }
  .button-close {
    background: none;
    border: none;
    color: var(--subtitle-color);
    height: 20px;
    position: absolute;
    right: 15px;
    top: 15px;
    transition: .3s ease color;
    &:hover {
      color: var(--error-color);
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
      top: calc(100% + 20px);
      z-index: 13;
      .icon {
        color: var(--background-color);
        display: flex;
        height: 20px;
        justify-content: center;
        position: absolute;
        bottom: calc(100% - 7px);
        width: 100%;
      }
    }
  }

  /* Position */
  &.is-left {
    .content {
      left: 0px;
      .icon {
        padding-left: 15%;
        justify-content: flex-start;
      }
    }
  }
  &.is-right {
    .content {
      right: 0px;
      .icon {
        padding-right: 15%;
        justify-content: flex-end;
      }
    }
  }
  &.is-top {
    .content {
      top: initial;
      bottom: calc(100% + 20px);
      .icon {
        bottom: initial;
        top: calc(100% - 7px);
        transform: rotateX(180deg);
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
