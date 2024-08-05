<script setup>
// Imports
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useThemeStore } from "@stores/theme";
import IconEye from "@icons/form/IconEye.vue";
import IconEyeSlash from "@icons/form/IconEyeSlash.vue";

// Vue defines
defineOptions({ name: "CustomInputPassword" });
const emit = defineEmits(["vnode-unmounted", "update:modelValue"]);

// Props
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  iconComponent: {
    type: [Boolean, Object],
    default: false,
  },
});

// Store
const themeStore = useThemeStore();
const { currentTheme } = storeToRefs(themeStore);

// Data
const showPassword = ref(false);

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
    :class="{
      'is-icon': iconComponent,
      'is-dark-theme': currentTheme === 'dark',
    }"
  >
    <label class="label">
      <div class="icon-component" v-if="iconComponent">
        <component :is="iconComponent" />
      </div>
      <input
        class="input-tag"
        type="text"
        v-model="valueInput"
        v-if="showPassword"
      />
      <input
        class="input-tag"
        type="password"
        v-model="valueInput"
        v-if="!showPassword"
      />
      <button
        class="showEye"
        v-show="showPassword"
        type="button"
        @click="showPassword = !showPassword"
      >
        <IconEye />
      </button>
      <button
        class="showEye"
        v-show="!showPassword"
        type="button"
        @click="showPassword = !showPassword"
      >
        <IconEyeSlash />
      </button>
    </label>
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
  .label {
    position: relative;
  }
  .showEye {
    background: none;
    border: none;
    color: var(--text-color);
    cursor: pointer;
    position: absolute;
    right: 15px;
    height: 20px;
    padding: 0;
  }

  &.is-icon {
    .label {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .icon-component {
      position: absolute;
      left: 15px;
      height: 16px;
      color: var(--text-color);
      svg {
        display: block;
      }
    }
    .input-tag {
      padding-left: 38px;
    }
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
