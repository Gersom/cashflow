<script setup>
// Imports
import { ref, nextTick } from "vue";
import NewItem from "./components/NewItem.vue";
import Category from "./components/Category.vue";
import CategorySelect from "./components/CategorySelect.vue";
import CustomDialog from "@components/CustomDialog/index.vue";

// Vue defines
defineOptions({ name: "CustomInputCategories" });
const emit = defineEmits(["vnode-unmounted", "change-categories"]);

// Data
const showCategorySelect = ref(false);
const categories = ref([]);

// Methods
const selectCategorySelect = (cat) => {
  categories.value.push(cat);
  nextTick(() => {
    emit("change-categories", categories.value);
  });
  if (categories.value.length >= 3) {
    showCategorySelect.value = false;
  }
};
const removeCategorySelect = (index) => {
  categories.value.splice(index, 1);
  nextTick(() => {
    emit("change-categories", categories.value);
  });
};
const closeCategorySelect = () => {
  showCategorySelect.value = false;
};
const toogleCategorySelect = () => {
  showCategorySelect.value = !showCategorySelect.value;
};
</script>

<template>
  <div class="custom-input-categories">
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
        @click="toogleCategorySelect"
        v-show="categories.length < 3"
      >
        <NewItem :show-close="showCategorySelect" />
      </button>
    </div>
    <CustomDialog :show="showCategorySelect" @close="closeCategorySelect">
      <CategorySelect
        :selected-categories="categories"
        @select="selectCategorySelect"
      />
    </CustomDialog>
  </div>
</template>

<style lang="scss" scoped>
.custom-input-categories {
  position: relative;
  .container {
    align-items: center;
    background: #22242e;
    border-radius: var(--border-radius);
    display: flex;
    justify-content: center;
    padding: 10px 15px;
    position: relative;
    width: 100%;
    .item {
      background: none;
      border: none;
      margin: 0 0 0 15px;
      padding: 0;
      position: relative;
      width: 60px;
      z-index: 12;
    }
    .item:first-child {
      margin-left: 0;
    }
  }
}
</style>
