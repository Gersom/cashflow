<script setup>
import { useThemeStore } from "@stores/theme";
import IconSelect from "@icons/actions/IconSelect.vue";
import { ref, computed } from "vue";

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Selecciona una opción'
  },
  items: {
    type: Array,
    default: () => [
      { value: '0', text: 'Cargando...' },
    ]
  },
  modelValue: {
    type: Object,
    default: () => ({ value: '', text: 'Cargando...' })
  }
})

const emit = defineEmits(["update:modelValue"]);

// Store
const themeStore = useThemeStore();

const isOpen = ref(false);

const handleItemClick = (item) => {
  isOpen.value = false;
  emit("update:modelValue", item)
}
const toggleOpen = () => {
  isOpen.value = !isOpen.value;
}

const textSelect = computed(() => {
  if (!props.modelValue.value)
    return props.placeholder
  else
    return props.modelValue.text
})  
</script>

<template>
  <div
    class="custom-select"
    :class="{
      'is-dark-theme': themeStore.currentTheme === 'dark',
      'is-open': isOpen
    }"
  >
    <label
      class="label"
      @click="toggleOpen"
    >
      <span>
        {{ textSelect }}
      </span>

      <div class="icon-component">
        <IconSelect />
      </div>
    </label>


    <ul
      v-show="isOpen"
      class="list"
    >
      <li
        v-for="(item, index) in props.items"
        :key="index + item.value"
        class="item"
        @click="handleItemClick(item)"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.custom-select {
  position: relative;
  display: flex;
  align-items: center;

  .label {
    align-items: center;
    background: var(--background-color);
    border-radius: var(--border-radius);
    border: none;
    color: var(--text-color);
    font-family: var(--font-poppins);
    font-size: 16px;
    min-height: 36px;
    padding: 0 15px;
    width: 100%;
    display: flex;
    cursor: pointer;
  }

  .icon-component {
    height: 10px;
    margin-right: 5px;
    color: var(--text-color);
    position: absolute;
    right: 10px;
    svg {
      display: block;
    }
  }
  
  .list {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    width: 100%;
    background: var(--background-color);
    border-radius: var(--border-radius);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    z-index: 1;
    margin: 0;
    padding: 0;
    max-height: 200px;
    overflow-y: auto;
    .item {
      display: flex;
      align-items: center;
      height: 40px;
      padding: 0 15px;
      margin: 0;
      cursor: pointer;
      color: var(--text-color);
      &:hover {
        color: var(--secondary-color);
        background: var(--background-color3);
      }
    }
  }

  /* Dark Theme */
  &.is-dark-theme {
    .label {
      color: var(--text-color);
      background: rgb(var(--background-color-rgb) / 30%);
    }
    .label.is-open {
      background: rgb(var(--background-color-rgb) / 70%);
      color: var(--title-color);
    }
  }
}
</style>
