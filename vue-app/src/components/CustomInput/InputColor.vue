<script setup>
  // Imports
  import { ref, computed } from 'vue'
  import { useThemeStore } from '@stores/theme'
  
  // Vue defines
  defineOptions({name: 'CustomInputColor'})
  const emit = defineEmits([
    'vnode-unmounted', 'update:modelValue', 'select-color'
  ])
  
  // Props
  const props = defineProps({
    modelValue: {
      type: String,
      default: '#90A4AE'
    }
  })

  // Store
  const themeStore = useThemeStore()

  // Computed
  const valueInput = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  })
</script>

<template>
  <div
    class='custom-input-color'
    :class="{
      'is-dark-theme': themeStore.currentTheme === 'dark'
    }"
  >
    <label class="label-tab">
      <input
        class="input-tag"
        v-model="valueInput"
        :style="{borderColor: valueInput}"
      >
      <button
        class="button-color"
        @click="emit('select-color')"
        :style="{backgroundColor: valueInput}"
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
      background: var(--background-color);
      border-radius: 50%;
      border: none;
      display: block;
      height: 34px;
      margin-left: 10px;
      min-width: 34px;
      width: 34px;
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
    }  
  }

</style>
