<script setup>
// Imports
import { computed } from "vue";
import IconCheck from '@icons/actions/IconCheck.vue';

// Vue defines
defineOptions({ name: "CustomCheckBox" });
const emit = defineEmits(["vnode-unmounted", "update:modelValue"]);

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

// Computed
const valueInput = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

// Methods
</script>

<template>
  <label
    class="custom-checkbox"
    :class="{ 'is-check': modelValue }"
  >
    <div class="checkmark-container">
      <span class="checkmark"></span>
      <div class="icon" v-show="modelValue">
        <IconCheck />
      </div>
    </div>
    <span class="text">
      {{ text }}
    </span>
    <input type="checkbox" v-model="valueInput" />
  </label>
</template>

<style lang="scss" scoped>
.custom-checkbox {
  color: var(--text-color);
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;

  .checkmark-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .checkmark {
      height: 16px;
      width: 16px;
      border-radius: 3px;
      display: block;
      border: 2px solid var(--primary-color);
    }
    .icon {
      position: absolute;
      top: 4px;
      height: 8px;
      color: var(--secondary-color);
      display: flex;
      width: 8px;
    }
  }

  .text {
    margin-left: 7px;
    display: block;
    // line-height: 1.7;
  }

  input[type="checkbox"] {
    display: none;
  }

  &:hover {
    color: var(--title-color);
  }

  &.is-check {
    .text {
      color: var(--primary-color);
    }
  }
}
</style>
