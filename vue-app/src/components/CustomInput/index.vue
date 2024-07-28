<script setup>
defineOptions({name: 'CustomInput'})
import { useThemeStore } from '@stores/theme'
const themeStore = useThemeStore()

const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
})

const emit = defineEmits(['vnode-unmounted', 'update:modelValue'])

import { ref, watch } from 'vue'
const valueInput = ref('')
watch(valueInput, (newValue) => {
  console.log('newValue', newValue)
  emit('update:modelValue', newValue)
})
</script>

<template>
  <div
    class='custom-input'
    :class="{
      'is-dark-theme': themeStore.currentTheme === 'dark',
      'is-light-theme': themeStore.currentTheme === 'light'
    }"
  >
    <input type="text" v-model="valueInput" :placeholder="placeholder">
  </div>
</template>

<style lang="scss" scoped>
.custom-input {
  input {
    align-items: center;
    background: var(--background-color);
    border-radius: 5px;
    border: none;
    color: var(--text-color);
    font-family: var(--font-poppins);
    font-size: 16px;
    height: 36px;
    padding: 0 15px;
    padding: 10px;
    width: 100%;
  }
  &.is-dark-theme {
    input {
      color: var(--text-color);
      background: rgb(20 21 26 / 30%);
    }
    input:focus {
      background: rgb(20 21 26 / 70%);
    }
  }
}
</style>
