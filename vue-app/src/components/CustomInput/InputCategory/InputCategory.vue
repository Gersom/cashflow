<script setup>
// Imports
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useThemeStore } from "@stores/theme";
import NewItem from "./components/NewItem.vue";
import Category from "./components/Category.vue";
import CategoryList from "./components/CategoryList.vue";

// Vue defines
defineOptions({ name: "CustomInputCategories" });
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

// Data
const showCategorySelect = ref(false);
const categories = ref([
  {
    id: 1,
    color: "orange",
    iconName: "shopping-bag",
    name: "Compras",
  },
]);

// Store
const themeStore = useThemeStore();
const { currentTheme } = storeToRefs(themeStore);

// Computed
const valueInput = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

// Methods
const selectCategorySelect = (cat) => {
  categories.value.push(cat);
  if (categories.value.length >= 3) {
    showCategorySelect.value = false;
  }
};
const removeCategorySelect = (index) => {
  categories.value.splice(index, 1);
};
const toggleCategorySelect = () => {
  showCategorySelect.value = !showCategorySelect.value;
};
</script>

<template>
  <div>
    <div
      class="custom-input-categories"
      :class="{ 'is-dark-theme': currentTheme === 'dark' }"
    >
      <div class="container">
        <button
          class="item"
          v-for="(cat, index) in categories"
          :key="`category${index}`"
          @click="removeCategorySelect(index)"
        >
          <Category :data="cat" />
        </button>

        <button
          class="item"
          @click="toggleCategorySelect"
          v-show="categories.length < 3"
        >
          <NewItem />
        </button>
      </div>
    </div>
    <CategoryList @select="selectCategorySelect" v-show="showCategorySelect" />
  </div>
</template>

<style lang="scss" scoped>
.custom-input-categories {
  .container {
    align-items: center;
    background: var(--background-color);
    border-radius: var(--border-radius);
    display: flex;
    justify-content: center;
    padding: 10px 15px;
    width: 100%;
    .item {
      background: none;
      border: none;
      margin: 0 0 0 15px;
      padding: 0;
      width: 60px;
    }
    .item:first-child {
      margin-left: 0;
    }
  }

  /* Dark Theme */
  &.is-dark-theme {
    .container {
      background: rgb(20 21 26 / 30%);
    }
    .container:focus {
      background: rgb(20 21 26 / 70%);
    }
  }
}
</style>
