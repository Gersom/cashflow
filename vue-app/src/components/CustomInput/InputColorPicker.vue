<script setup>
// Imports
import '@cyhnkckali/vue3-color-picker/dist/style.css'
import { ref, computed } from 'vue'
import { Vue3ColorPicker } from '@cyhnkckali/vue3-color-picker'
import CustomButton from '@components/CustomButton/GeneralButton.vue'
import DialogBlur from '@layouts/DialogBlur.vue'
import IconEdit from '@icons/actions/IconEdit.vue'
import InputColor from '@components/CustomInput/InputColor.vue'

// Vue defines
defineOptions({ name: 'CustomInputColor' })
const emit = defineEmits([
  'vnode-unmounted', 'update:modelValue'
])

// Props
const props = defineProps({
  modelValue: {
    type: String,
    default: '#90A4AE'
  }
})

// Data
const showColorPicker = ref(false)

const valueInput = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Methods
const toggleColorPicker = () => {
  showColorPicker.value = !showColorPicker.value
  if (
    showColorPicker.value &&
    valueInput.value[0] !== '#' &&
    valueInput.value.slice(0, 3) !== 'rgb'
  ) {
    emit('update:modelValue', '#90A4AE')
  }
}
const closeColorPicker = () => {
  showColorPicker.value = false
}
</script>

<template>
  <div
    class="custom-input-color-picker"
    :class="{ 'is-color-picker': showColorPicker }"
  >
    <div class="input-container">
      <InputColor
        v-model="valueInput"
        :disabled="showColorPicker"
        @select-color="toggleColorPicker"
      />
    </div>

    <DialogBlur
      :show="showColorPicker"
      :dependent="true"
      position-x="right"
      position-y="top"
      @close="closeColorPicker"
    >
      <Vue3ColorPicker
        v-if="showColorPicker"
        v-model="valueInput"
        mode="solid"
        theme="dark"
        type="HEX"
        input-type="RGB"
        :show-alpha="false"
        :show-input-set="false"
        :show-input-menu="false"
        :show-picker-mode="false"
      />
    </DialogBlur>

    <div class="button-container">
      <CustomButton
        size="small"
        :text="showColorPicker ? 'Cerrar' : 'Editar'"
        :icon-component="IconEdit"
        :transparent="true"
        @click="toggleColorPicker"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .custom-input-color-picker {
    align-items: center;
    display: flex;
    justify-content: space-between;
    position: relative;
    width: 100%;

    .input-container {
      width: calc(100% - (100px + 10px));
    }
    .button-container {
      width: 100px;
    }

    &.is-color-picker {
      .input-container {
        z-index: 12;
      }
      .button-container {
        z-index: 12;
      }
    }
  }

</style>
