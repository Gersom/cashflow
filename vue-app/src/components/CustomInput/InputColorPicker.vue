<script setup>
  // Imports
  import '@cyhnkckali/vue3-color-picker/dist/style.css'
  import { ref, computed } from 'vue'
  import { Vue3ColorPicker } from '@cyhnkckali/vue3-color-picker'
  import CustomButton from '@components/CustomButton/index.vue'
  import IconEdir from '@icons/actions/IconEdit.vue'
  import InputColor from '@components/CustomInput/InputColor.vue'
  
  // Vue defines
  defineOptions({name: 'CustomInputColor'})
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
  const colorValue = ref('#90A4AE')
  const showColorPicker = ref(false)

  // Computed
  const valueInput = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  })

  // Methods
  const toggleColorPicker = () => {
    showColorPicker.value = !showColorPicker.value
    if (showColorPicker.value) {
      colorValue.value = '#ff8e38'
    }
  }
</script>

<template>
  <div class='custom-input-color-picker'>
    <div class="input-container">
      <InputColor
        v-model="colorValue"
        @select-color="toggleColorPicker"
      />
    </div>

    <div class="button-container">
      <CustomButton
        size="small"
        :text="showColorPicker ? 'Cerrar' : 'Editar'"
        :animation="true"
        :icon-component="IconEdir"
        :transparent="true"
        @click="toggleColorPicker"
      />
    </div>
    <div class="color-picker-container"
      v-show="showColorPicker"
    >
      <Vue3ColorPicker
        v-if="showColorPicker"
        v-model="colorValue"
        mode="solid"
        theme="dark"
        type="HEX"
        inputType="RGB"
        :showAlpha="false"
        :showInputSet="false"
        :showInputMenu="false"
        :showPickerMode="false"
      />
    </div>
  </div>
</template>

<style scoped>
  .custom-input-color-picker {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  .custom-input-color-picker .input-container {
    width: calc(100% - (100px + 10px));
  }
  .custom-input-color-picker .button-container {
    width: 100px;
  }
  .custom-input-color-picker .color-picker-container {
    border-radius: 20px;
    background-color: white;
    position: absolute;
    bottom: calc(34px + 10px);
    right: 0;
    z-index: 99;
  }

</style>
