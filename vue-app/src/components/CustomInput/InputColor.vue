<script setup>
// Imports
import { computed } from 'vue'
import { useThemeStore } from '@stores/theme'

// Vue defines
defineOptions({ name: 'CustomInputColor' })
const emit = defineEmits([
  'vnode-unmounted', 'update:modelValue', 'select-color'
])

// Props
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

// Store
const themeStore = useThemeStore()

// Computed
const valueInput = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const handleBlur = (e) => {
  if (e.target.value === '') {
    emit('update:modelValue', 'transparent')
  }
}
</script>

<template>
  <div
    class="custom-input-color"
    :class="{
      'is-dark-theme': themeStore.currentTheme === 'dark'
    }"
  >
    <label class="label-tab">
      <input
        v-model="valueInput"
        class="input-tag"
        :disabled="props.disabled"
        :style="{borderColor: valueInput}"
        @blur="handleBlur"
      >
      <button
        class="button-color"
        :style="`--input-color-button-color: ${valueInput}`"
        @click="emit('select-color')"
      />
    </label>
  </div>
</template>

<style lang="scss" scoped>
  .custom-input-color {
    .label-tab {
      align-items: center;
      display: flex;
      justify-content: flex-start;
      position: relative;
    }
    .input-tag {
      align-items: center;
      background: var(--background-color);
      border-radius: var(--border-radius);
      border-width: 2px;
      border-style: solid;
      border-color: var(--background-color);
      color: var(--text-color);
      font-family: var(--font-poppins);
      font-size: 16px;
      height: 34px;
      padding: 0 15px;
      position: relative;
      width: 100%;
      z-index: 1;
      font-weight: 700;
    }
    .button-color{
      border: none;
      display: block;
      height: 34px;
      margin-left: 10px;
      min-width: 34px;
      position: relative;
      width: 34px;
      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--background-color);
        border-radius: 50%;
      }
      &::before {
        z-index: 1;
      }
      &::after {
        z-index: 2;
        background: var(--input-color-button-color);
      }
    }

    /* Dark Theme */
    &.is-dark-theme {
      .input-tag {
        font-weight: 500;
        background: rgb(var(--background-color-rgb) / 30%);
      }
      .input-tag:focus {
        background: rgb(var(--background-color-rgb) / 70%);
        color: var(--title-color);
      }
      .button-color {
        &::before { background: rgb(var(--background-color-rgb) / 30%); }
      }
    }
  }

</style>
