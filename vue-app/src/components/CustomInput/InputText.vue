<script setup>
// Imports
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useThemeStore } from "@stores/theme";

// Vue defines
defineOptions({ name: "CustomInputText" });
const emit = defineEmits(["vnode-unmounted", "update:modelValue"]);

// Props
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
});

// Store
const themeStore = useThemeStore();
const { currentTheme } = storeToRefs(themeStore);

// Computed
const valueInput = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

// Methods
</script>

<template>
  <div
    class="custom-input-text"
    :class="{ 'is-dark-theme': currentTheme === 'dark' }"
  >
    <input class="input-tag" v-model="valueInput" :placeholder="placeholder" />
  </div>
</template>

<style lang="scss" scoped>
.custom-input-text {
  .input-tag {
    align-items: center;
    background: var(--background-color);
    border-radius: var(--border-radius);
    border: none;
    color: var(--text-color);
    font-family: var(--font-poppins);
    font-size: 16px;
    height: 36px;
    padding: 0 15px;
    width: 100%;
  }

  /* Dark Theme */
  &.is-dark-theme {
    .input-tag {
      color: var(--text-color);
      background: rgb(20 21 26 / 30%);
    }
    .input-tag:focus {
      background: rgb(20 21 26 / 70%);
    }
  }
}
</style>
