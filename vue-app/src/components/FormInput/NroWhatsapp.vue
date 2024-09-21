<script setup>
import { ref } from 'vue'
import InputText from '@components/CustomInput/InputText.vue'
import IconWhtasapp from '@icons/form/IconWhatsapp.vue'
import IconSuccess from '@icons/state/IconSuccess.vue'
import IconWarning from '@icons/state/IconWarning.vue'

defineOptions({ name: 'FormInputNroWhatsapp' })
const emit = defineEmits(['validate'])

const inputValue = ref('')
const stateValidation = ref(null)
const text = ref('Nro de whatsapp')
const textNotification = ref('')

const validateValue = () => {
  const characterRegex = /[^\w\s+]/
  const lettersRegex = /[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]+/g

  if (inputValue.value === '') {
    updateState('', null, '')
  } else if (inputValue.value[0] !== '+' && inputValue.value[0] !== '0') {
    updateState('El número de whatsapp debe empezar con "+" ó "0"', false)
  } else if (inputValue.value.includes(' ')) {
    updateState('El número de whatsapp no puede contener espacios', false)
  } else if (lettersRegex.test(inputValue.value)) {
    updateState('El número de whatsapp no puede contener letras', false)
  } else if (characterRegex.test(inputValue.value)) {
    updateState('El número de whatsapp no puede contener caracteres especiales', false)
  } else if (inputValue.value.length < 9) {
    updateState('El número de whatsapp debe tener al menos 9 dígitos', false)
  } else if (inputValue.value.length > 14) {
    updateState('El número de whatsapp no debe tener más de 14 dígitos', false)
  } else {
    updateState('Número de whatsapp válido', true)
  }
}

const updateState = (notification, validationState, emitValue = inputValue.value) => {
  textNotification.value = notification
  stateValidation.value = validationState
  emit('validate', emitValue, validationState === true)
}
</script>

<template>
  <div
    class="user-name"
    :class="{
      'is-warning': stateValidation === false,
      'is-success': stateValidation === true,
    }"
  >
    <div class="title">
      <div
        v-if="stateValidation !== null"
        class="icon"
      >
        <component :is="stateValidation ? IconSuccess : IconWarning" />
      </div>

      <span>{{ textNotification || text }}</span>
    </div>
    <InputText
      v-model="inputValue"
      placeholder="+519********"
      :icon-component="IconWhtasapp"
      @input="validateValue"
    />
  </div>
</template>

<style lang="scss" scoped>
.user-name {
  .title {
    align-items: center;
    color: var(--text-color);
    display: flex;
    font-size: 14px;
    margin: 0 0 5px 5px;

    .icon {
      height: 16px;
      margin-right: 5px;
    }
  }

  &.is-warning {
    .title,
    .icon {
      color: var(--warning-color);
    }
  }
  &.is-success {
    .title,
    .icon {
      color: var(--success-color);
    }
  }
}
</style>
