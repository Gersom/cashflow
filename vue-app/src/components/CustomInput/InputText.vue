<script setup>
// Imports
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@stores/theme'

// Vue defines
defineOptions({ name: 'CustomInputText' })
const emit = defineEmits(['vnode-unmounted', 'update:modelValue'])

// Props
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  iconComponent: {
    type: [Boolean, Object],
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

// Store
const themeStore = useThemeStore()
const { currentTheme } = storeToRefs(themeStore)

// Computed
const valueInput = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Methods
</script>

<template>
  <div
    class="custom-input-text"
    :class="{
      'is-icon': iconComponent,
      'is-dark-theme': currentTheme === 'dark',
    }"
  >
    <label class="label">
      <div
        v-if="iconComponent"
        class="icon-component"
      >
        <component :is="iconComponent" />
      </div>
      <input
        v-model="valueInput"
        class="input-tag"
        :placeholder="placeholder"
        :disabled="disabled"
      >
    </label>
  </div>
</template>

<style lang="scss" scoped>
.custom-input-text {
  .label {
    position: relative;

    .input-tag {
      align-items: center;
      background: var(--background-color);
      border-radius: var(--border-radius);
      border: none;
      color: var(--text-color);
      font-family: var(--font-poppins);
      font-size: 16px;
      min-height: 34px;
      padding: 0 15px;
      width: 100%;
    }
    // .input-tag:disabled {
    //   cursor: not-allowed;
    // }
  }

  &.is-icon {
    .label {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .icon-component {
      position: absolute;
      left: 15px;
      height: 16px;
      color: var(--text-color);
      svg {
        display: block;
      }
    }
    .input-tag {
      padding-left: 38px;
    }
  }

  /* Dark Theme */
  &.is-dark-theme {
    .input-tag {
      color: var(--text-color);
      background: rgb(var(--background-color-rgb) / 30%);
    }
    .input-tag:focus {
      background: rgb(var(--background-color-rgb) / 70%);
      color: var(--title-color);
    }
  }
}
</style>
