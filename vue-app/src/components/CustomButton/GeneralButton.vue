<script setup>
const emit = defineEmits(["click"]);
const props = defineProps({
  size: {
    type: String,
    default: "normal", // small, normal
  },
  text: {
    type: String,
    default: "button",
  },
  transparent: {
    type: Boolean,
    default: false,
  },
  iconComponent: {
    type: Object,
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  animation: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'button',
  },
});
</script>

<template>
  <button
    :class="['custom-button', `is-${size}`, {'is-solid': !transparent}, {'is-disabled': disabled}, {'is-animation': animation}]"
    :style="props.color ? { '--custom-btn-color': props.color } : {}"
    :type="type"
    :disabled="disabled"
    @click="emit('click')"
  >
    <div class="icon-component">
      <component :is="iconComponent" />
    </div>

    <span class="span-text">
      {{ text }}
    </span>
  </button>
</template>

<style lang="scss" scoped>
.custom-button {
  align-items: center;
  background-color: transparent;
  border-radius: var(--button-border-radius);
  border: 2px solid var(--custom-btn-color, var(--button-background));
  color: var(--custom-btn-color, var(--button-background));
  cursor: pointer;
  display: flex;
  font-size: 16px;
  justify-content: center;
  width: 100%;
  transition: all 0.3s;
  .icon-component {
    height: 20px;
    margin-right: 5px;
  }
  &:hover {
    background-color: var(--custom-btn-color, var(--button-background));
    color: var(--button-color);
  }
}
.custom-button.is-animation {
  .icon-component {
    opacity: 0;
    position: relative;
    right: 13px;
    transition: all 0.4s;
  }
  .span-text {
    position: relative;
    right: 13px;
    transition: all 0.4s;
  }
  &:hover {
    .icon-component {
      opacity: 1;
      right: 0px;
    }
    .span-text {
      right: 0px;
    }
  }
}
.custom-button.is-solid {
  background-color: var(--custom-btn-color, var(--button-background));
  color: var(--button-color);
}

.custom-button.is-normal {
  height: var(--button-height);
}

.custom-button.is-small {
  height: var(--button-height-small);
}


.custom-button.is-disabled {
  border: none;
  background-color: var(--button-background-disabled);
  color: var(--button-color-disabled);
  cursor: not-allowed;
  .span-text,
  .icon-component {
    opacity: 1;
    right: 0;
    transition: none;
  }
  &:hover {
    background-color: var(--button-background-disabled);
    color: var(--button-color-disabled);
    .span-text,
    .icon-component {
      opacity: 1;
      right: 0;
    }
  }
}
</style>
