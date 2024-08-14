<script setup>
  // ------------
  // Imports
  // ------------
  import { ref, computed } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useThemeStore } from '@stores/theme'
  import { useUserStore } from '@stores/user'
  
  // ------------
  // Vue defines
  // ------------
  defineOptions({name: 'CustomInputCurrency'})
  const emit = defineEmits(['vnode-unmounted', 'update:modelValue'])
  
  // ------------
  // Props
  // ------------
  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    },
    transactionType: {
      type: String,
      default: 'income' // income, expense
    }
  })

  // ------------
  // Store
  // ------------
  const themeStore = useThemeStore()
  const userStore = useUserStore()
  const { currency } = storeToRefs(userStore)
  
  // ------------
  // Data references
  // ------------
  const inputRef = ref(null)
  const pressedShift = ref(false)
  const pressedShiftTab = ref(true)
  const pressedTab = ref(false)

  // Computed
  const valueInput = computed(() => props.modelValue)

  // ------------
  // Methods
  // ------------
  const handleBlur = (event) => {
    // presseds initialized
    pressedShift.value = false
    pressedShiftTab.value = true
    pressedTab.value = false

    // format number
    const str = event.target.value
    let parts = str.split('.');
    let integerPart = parts[0] || '0';
    let decimalPart = parts[1] || '00';
    decimalPart = decimalPart.length === 1 ? decimalPart + '0' : decimalPart.substring(0, 2);
    parts = `${integerPart}.${decimalPart}`
    emitInput(parts)
    event.target.value = parts;
  }
  const handleFocus = () => {
    const dotIndex = inputRef.value.value.indexOf('.')
    inputRef.value.setSelectionRange(0, dotIndex)
  }
  const handleInput = (event) => {
    const regex = /[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ!@#$%^&*(),?":{}|<>]/g
    let cursorPosition = event.target.selectionStart
    if(regex.test(event.target.value)) {
      cursorPosition -= 1
    }

    let newValue = event.target.value.replace(/[^\d.]/g, '')
    newValue = formatNumber(newValue)
    emitInput(newValue)
    event.target.value = newValue

    inputRef.value.setSelectionRange(cursorPosition, cursorPosition)
  }
  const handleKeyDown = (event) => {
    if(event.key === 'Shift') {
      pressedShift.value = true
    }
    if(event.key === '.') {
      event.preventDefault()
      selectDecimals()
    }
    if(event.key === 'Tab') {
      if(pressedShift.value) {
        if(!pressedShiftTab.value) {
          pressedShiftTab.value = true
          pressedTab.value = false
          event.preventDefault()
          console.log('selectIntegers')
          selectIntegers()
        }
      } else {
        if(!pressedTab.value) {
          pressedShiftTab.value = false
          pressedTab.value = true
          event.preventDefault()
          console.log('selectDecimals')
          selectDecimals()
        }
      }
    }
  }
  const handleKeyUp = (event) => {
    if(event.key === 'Shift') {
      pressedShift.value = false
    }
  }

  // ------------
  // Utils Funtions
  // ------------
  const emitInput = (value) => {
    emit('update:modelValue', value)
  }
  const selectDecimals = () => {
    const dotIndex = inputRef.value.value.indexOf('.')
    if(dotIndex === -1) {
      emitInput(inputRef.value.value + '.00')
      inputRef.value.value = inputRef.value.value + '.00'
      inputRef.value.setSelectionRange(inputRef.value.value.length - 2, inputRef.value.value.length)
    } else {
      inputRef.value.setSelectionRange(dotIndex + 1, dotIndex + 3)
    }
  }
  const selectIntegers = () => {
    const dotIndex = inputRef.value.value.indexOf('.')
    inputRef.value.setSelectionRange(0, dotIndex)
  }
  const formatNumber = (str) => {
    let parts = str.split('.');
    let integerPart = parts[0];
    let decimalPart = parts[1];

    if(decimalPart) {
      decimalPart = decimalPart.length > 1 ? decimalPart.substring(0, 2) : decimalPart;
      return `${integerPart}.${decimalPart}`;
    }
    else return integerPart
  }
</script>

<template>
  <div
    class='custom-input-currency'
    :class="{
      'is-dark-theme': themeStore.currentTheme === 'dark',
      'is-expense-transaction': props.transactionType === 'expense',
      'is-income-transaction': props.transactionType === 'income',
    }"
  >
    <label class="label-tab">
      <span class="currency-symbol">
        {{ props.transactionType === 'income' ? '+ ' : '- ' }}
        {{ currency.symbol }}
      </span>
      <input
        class="input-tag"
        ref="inputRef"
        :value="valueInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @input="handleInput"
        @keydown="handleKeyDown"
        @keyup="handleKeyUp"
      >
    </label>
  </div>
</template>

<style lang="scss" scoped>
  .custom-input-currency {
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
      border: none;
      color: var(--text-color);
      font-family: var(--font-poppins);
      font-size: 16px;
      height: 34px;
      padding: 0 15px 0 15px;
      position: relative;
      width: 100%;
      z-index: 1;
      text-align: center;
    }
    .currency-symbol {
      left: 25px;
      position: absolute;
      z-index: 9;
    }
    .input-tag,
    .currency-symbol {
      font-weight: 700;
    }

    /* Transaction Type */
    &.is-income-transaction {
      .currency-symbol,
      .input-tag {
        color: var(--success-color);
      }
    }
    &.is-expense-transaction {
      .currency-symbol,
      .input-tag {
        color: var(--error-color);
      }
    }
    
    /* Dark Theme */
    &.is-dark-theme {
      .input-tag {
        background: rgb(var(--background-color-rgb) / 30%);
      }
      .input-tag:focus {
        background: rgb(var(--background-color-rgb) / 70%);
      }
      .input-tag {
        font-weight: 500;
      }
    }  
  }

</style>
