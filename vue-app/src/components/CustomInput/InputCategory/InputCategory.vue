<script setup>
// Imports
import { ref, nextTick, onMounted, watch, computed } from "vue";
import { useCategoriesStore } from '@app-page/stores/categories';
import { useThemeStore } from "@stores/theme";
import Category from "./components/Category.vue";
import CategorySelect from "./components/CategorySelect.vue";
import DialogBlur from "@layouts/DialogBlur.vue";
import NewItem from "./components/NewItem.vue";
// Vue defines
defineOptions({ name: "CustomInputCategories" });
const emit = defineEmits(["vnode-unmounted", "change-categories"]);

const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  }
});

// Data
const showCategorySelect = ref(false);
const categoriesState = ref([]);

const categoriesProp = computed(() => props.categories)

// Store
const themeStore = useThemeStore();
const categoriesStore = useCategoriesStore()

watch(categoriesProp, (newValue) => {
  categoriesState.value = newValue
})

// Methods
const selectCategorySelect = (cat) => {
  categoriesState.value = [...categoriesState.value, cat];
  nextTick(() => {
    emit("change-categories", categoriesState.value);
  });
  if (categoriesState.value.length >= 3) {
    showCategorySelect.value = false;
  }
};
const removeCategorySelect = (index) => {
  categoriesState.value.splice(index, 1);
  nextTick(() => {
    emit("change-categories", categoriesState.value);
  });
};
const closeCategorySelect = () => {
  showCategorySelect.value = false;
};
const toogleCategorySelect = () => {
  showCategorySelect.value = !showCategorySelect.value;
};

onMounted(() => categoriesStore.loadCategories())
</script>

<template>
  <div
    class="custom-input-categories"
    :class="{
      'is-dark-theme': themeStore.isDarkTheme,
      'is-select-categories': showCategorySelect
    }"
  >
    <div class="container">
      <button
        v-for="(cat, index) in categoriesState"
        :key="`category${index}`"
        class="item"
        type="button"
        @click="removeCategorySelect(index)"
      >
        <Category :data="cat" />
      </button>

      <button
        v-show="categoriesState.length < 3"
        class="item"
        type="button"
        @click="toogleCategorySelect"
      >
        <NewItem :show-close="showCategorySelect" />
      </button>
    </div>

    <DialogBlur
      :show="showCategorySelect"
      :dependent="true"
      position-y="top"
      @close="closeCategorySelect"
    >
      <CategorySelect
        :selected-categories="categoriesState"
        @select="selectCategorySelect"
      />
    </DialogBlur>
  </div>
</template>

<style lang="scss" scoped>
.custom-input-categories {
  position: relative;
  .container {
    align-items: center;
    background: var(--background-color);
    border-radius: var(--border-radius);
    display: flex;
    justify-content: space-evenly;
    padding: 10px 15px;
    position: relative;
    width: 100%;
    // height: 66px;
    .item {
      background: none;
      border: none;
      margin: 0 0 0 15px;
      padding: 0;
      position: relative;
      width: 60px;
    }
    .item:first-child {
      margin-left: 0;
    }
  }

  &.is-select-categories {
    .item {
      z-index: 11;
    }
  }

  &.is-dark-theme {
    .container {
      background: rgb(var(--background-color-rgb) / 30%);
    }
  }
}
</style>
