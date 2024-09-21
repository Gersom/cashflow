<script setup>
import { ref } from 'vue'
import InputText from '@components/CustomInput/InputText.vue'
import IconUrl from '@icons/form/IconUrl.vue'
import IconSuccess from '@icons/state/IconSuccess.vue'
import IconWarning from '@icons/state/IconWarning.vue'

defineOptions({ name: 'FormInputURL' })
const emit = defineEmits(['validate'])

const inputValue = ref('')
const stateValidation = ref(null)
const text = ref('Url externo')
const textNotification = ref('')

const validateValue = () => {
  // eslint-disable-next-line no-useless-escape
  const regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

  if (inputValue.value === '') {
    updateState('', null, '')
  } else if (!regex.test(inputValue.value)) {
    updateState('Url no es válida', false)
  } else {
    updateState('Url válido', true)
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
      placeholder="https://example.com/image.jpg"
      :icon-component="IconUrl"
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
