<script setup>
import { ref, computed } from 'vue'
import DialogBlur from '@layouts/DialogBlur.vue'
import { useThemeStore } from '@stores/theme'
import IconEdit from '@icons/actions/IconEdit.vue'
import CustomInputText from '@components/CustomInput/InputText.vue'
import CustomButton from '@components/CustomButton/GeneralButton.vue'
import IconsList from './IconList/IconsList.vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'transparent'
  }
})
const themeStore = useThemeStore()
const showIconSelect = ref(false)

const valueInput = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const handleToggleSelect = () => {
  showIconSelect.value = !showIconSelect.value
}
const closeIconSelect = () => {
  showIconSelect.value = false
}
const handleSelectIcon = (icon) => {
  emit('update:modelValue', icon.name)
  closeIconSelect()
}
</script>

<template>
  <div
    class="select-icon"
    :class="{
      'is-dark-theme': themeStore.currentTheme === 'dark',
      'is-open-select': showIconSelect
    }"
  >
    <div class="select-icon-content">
      <CustomInputText
        v-model="valueInput"
        :disabled="true"
      />
      <button
        class="button-icon"
        type="button"
        :style="`--input-color-button-icon: ${props.color}`"
        @click="handleToggleSelect"
      >
        <i :class="`icon icon-${valueInput}`" />
      </button>
      <div class="button-edit">
        <CustomButton
          :text="showIconSelect ? 'Cerrar' : 'Editar'"
          size="small"
          type="button"
          :icon-component="IconEdit"
          :transparent="true"
          @click="handleToggleSelect"
        />
      </div>
    </div>

    <DialogBlur
      :show="showIconSelect"
      :dependent="true"
      position-x="right"
      position-y="top"
      @close="closeIconSelect"
    >
      <IconsList @select-icon="handleSelectIcon" />
    </DialogBlur>
  </div>
</template>

<style lang="scss" scoped>
.select-icon {
  position: relative;
  .select-icon-content {
    display: flex;
    position: relative;
  }
  .button-icon{
    border: none;
    display: flex;
    height: 34px;
    margin-left: 10px;
    min-width: 34px;
    position: relative;
    width: 34px;
    font-size: 27px;
    font-weight: 600;
    align-items: center;
    justify-content: center;
    color: var(--input-color-button-icon);
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--background-color);
      border-radius: 5px;
    }
    i.icon {
      position: relative;
      z-index: 2;
    }
  }
  .button-edit {
    margin-left: 10px;
    min-width: 100px;
    width: 100px;
  }
  &.is-open-select {
    .select-icon-content {
      z-index: 11;
    }
  }
  /* Dark Theme */
  &.is-dark-theme {
    .button-icon {
      &::before { background: rgb(var(--background-color-rgb) / 30%); }
    }
  }
}
</style>
