<script setup>
  // Imports
  import { computed } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useThemeStore } from '@stores/theme'

  // Vue defines
  defineOptions({name: 'CustomInputRadio'})
  const emit = defineEmits(['vnode-unmounted', 'update:modelValue'])

  // Props
  const props = defineProps({
    modelValue: {
      type: Object,
      default: () => {}
    },
    options: {
      type: Array,
      default: () => [] // { value: 'value1', text: 'Name 1' }
    },
    orientation: {
      type: String,
      default: 'horizontal' // vertical
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
    class='custom-input-radio'
    :class="{ 
      'is-dark-theme': currentTheme === 'dark',
      'is-vertical': orientation === 'vertical'
    }"
  >
    <label
      class="label-tag"
      :class="{ 'is-selected': valueInput?.value === item.value }"
      v-for="(item, index) in props.options" 
      :key="`radio${index}`"
    >
      <input
        class="input-tab"
        type="radio"
        :value="item"
        v-model="valueInput"
      />
      <span class="radio" />
      <span class="input-text">
        {{ item.text }}
      </span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
  .custom-input-radio {
    align-items: center;
    background: var(--background-color);
    border-radius: var(--border-radius);
    border: none;
    color: var(--text-color);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-family: var(--font-poppins);
    font-size: 14px;
    justify-content: space-around;
    padding: 5px 15px;
    width: 100%;
    min-height: 34px;

    .label-tag {
      align-items: center;
      cursor: pointer;
      display: flex;
      padding: 5px 10px;
      .input-tab {
        display: none;
      }
      .radio {
        align-items: center;
        background: none;
        border-radius: 50%;
        border: 2px solid var(--primary-color);
        display:flex;
        height: 18px;
        justify-content: center;
        margin-right: 5px;
        position: relative;
        width: 18px;
        &:before {
          background: var(--primary-color);
          border-radius: 50%;
          border: 2px solid var(--primary-color);
          content: '';
          display: none;
          height: 8px;
          position: absolute;
          width: 8px;
        }
      }
      &:hover {
        .input-text {
          color: var(--primary-color);
        }
      }
      &.is-selected {
        .radio::before {
          display: block;
        }
        .input-text {
          color: var(--primary-color);
        }
      }
    }

    /* Vertial orientation */
    &.is-vertical {
      align-items: flex-start;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: flex-start;
      .label-tag {
        padding-left: 0px;
      }
    }

    /* Dark Theme */
    &.is-dark-theme {
      color: var(--text-color);
      background: rgb(var(--background-color-rgb) / 30%);
    }    
  }

</style>
