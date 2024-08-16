<script setup>
import { ref } from 'vue';
import IconUpload from '@icons/form/IconUpload.vue';

const emit = defineEmits(["upload-file"]);
const props = defineProps({
  size: {
    type: String,
    default: "normal", // small, normal
  },
  text: {
    type: String,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  acceptFile: {
    type: String,
    default: 'image/*',
  },
});

const fileInput = ref(null)

const handleClick = () => {
  fileInput.value.click()
}
const onFileChange = (e) => {
  console.log(e.target.files[0])
  emit('upload-file', e.target.files[0])
}
</script>

<template>
  <div>
    <button
      :class="['custom-button', `is-${size}`, {'is-disabled': disabled}]"
      type="button"
      :disabled="disabled"
      @click="handleClick"
    >
      <div class="icon-component">
        <IconUpload />
      </div>
  
      <span class="span-text">
        {{ text }}
      </span>
    </button>
    <input
      type="file"
      ref="fileInput"
      :accept="props.acceptFile"
      @change="onFileChange"
      style="display: none;"
    />
  </div>

</template>

<style lang="scss" scoped>
.custom-button {
  align-items: center;
  background-color: transparent;
  border-radius: var(--button-border-radius);
  border-width: 2px;
  border-style: solid;
  border-color: var(--button-background);
  color: var(--button-background);
  cursor: pointer;
  display: flex;
  font-size: 16px;
  justify-content: center;
  width: fit-content;
  padding: 10px 15px;
  transition: all 0.3s;
  .icon-component {
    height: 20px;
    margin-right: 5px;
  }
  // &:hover {
  //   background-color: var(var(--button-background));
  //   color: var(--button-color);
  // }
}
.custom-button.is-normal {
  height: var(--button-height);
}

.custom-button.is-small {
  height: var(--button-height-small);
}


.custom-button.is-disabled {
  border-color: var(--button-color-disabled);
  color: var(--button-color-disabled);
  cursor: not-allowed;
  .span-text,
  .icon-component {
    opacity: 1;
    right: 0;
    transition: none;
  }
}
</style>
