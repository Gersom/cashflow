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
    class='custom-input-textarea'
    :class="{ 'is-dark-theme': currentTheme === 'dark' }"
  >
    <textarea
      class="textarea-tag"
      v-model="valueInput"
      :placeholder="placeholder"
    ></textarea>
  </div>
</template>

<style lang="scss" scoped>
  .custom-input-textarea {
    .textarea-tag {
      align-items: center;
      background: var(--background-color);
      border-radius: var(--border-radius);
      border: none;
      color: var(--text-color);
      field-sizing: content;
      font-family: var(--font-poppins);
      font-size: 16px;
      max-height: 138px;
      min-height: 66px;
      padding: 9px 15px;
      resize: none; /* vertical */
      width: 100%;
    }

    /* Dark Theme */
    &.is-dark-theme {
      .textarea-tag {
        color: var(--text-color);
        background: rgb(20 21 26 / 30%);
      }
      .textarea-tag:focus {
        background: rgb(20 21 26 / 70%);
      }
    }
  }

</style>
