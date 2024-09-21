<script setup>
import { ref } from 'vue'
import InputText from '@components/CustomInput/InputText.vue'
import IconUserEdit from '@icons/form/IconUserEdit.vue'
import IconSuccess from '@icons/state/IconSuccess.vue'
import IconWarning from '@icons/state/IconWarning.vue'

defineOptions({ name: 'FormInputNickname' })
const emit = defineEmits(['validate'])

const inputValue = ref('')
const stateValidation = ref(null)
const text = ref('Nombre / apodo')
const textNotification = ref('')

const validateValue = () => {
  // const regexEspecial = /^[a-zA-Z0-9\s]+$/;
  // const regexNumber = /^.*[0-9].*$/;

  if (inputValue.value === '') {
    updateState('', null, '')
  } else if (inputValue.value.length < 3) {
    updateState('El nombre debe tener al menos 3 caracteres', false)
  } else if (inputValue.value.length > 20) {
    updateState('El nombre debe tener máximo 20 caracteres', false)
  // } else if (regexNumber.test(inputValue.value)) {
  //   updateState("El nombre no puede contener números", false);
  // } else if (!regexEspecial.test(inputValue.value)) {
  //   updateState("El nombre no puede contener caracteres especiales", false);
  } else {
    updateState('Nombre / apodo válido', true)
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
      placeholder="David"
      :icon-component="IconUserEdit"
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
