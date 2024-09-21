<script setup>
  // Imports
  import { computed } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useThemeStore } from '@stores/theme'

  // Vue defines
  defineOptions({name: 'CustomInputTextarea'})
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
    class="custom-input-textarea"
    :class="{ 'is-dark-theme': currentTheme === 'dark' }"
  >
    <textarea
      v-model="valueInput"
      class="textarea-tag"
      :placeholder="placeholder"
    />
  </div>
</template>

<style lang="scss" scoped>
  .custom-input-textarea {
    box-sizing: border-box;
    .textarea-tag {
      align-items: center;
      background: var(--background-color);
      border-radius: var(--border-radius);
      border: none;
      color: var(--text-color);
      field-sizing: content;
      font-family: var(--font-poppins);
      font-size: 14px;
      min-height: 64px;
      max-height: 138px;
      padding: 10px 15px;
      resize: none; /* vertical */
      width: 100%;
      margin: 0;
    }

    /* Dark Theme */
    &.is-dark-theme {
      .textarea-tag {
        color: var(--text-color);
        background: rgb(var(--background-color-rgb) / 30%);
      }
      .textarea-tag:focus {
        background: rgb(var(--background-color-rgb) / 70%);
        color: var(--title-color);
      }
    }
  }

</style>
