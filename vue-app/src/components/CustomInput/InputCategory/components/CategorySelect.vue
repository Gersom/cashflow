<script setup>
import { ref } from "vue";

const emit = defineEmits(["select"]);

const categories = ref([
  {
    id: 1,
    color: "orange",
    iconName: "shopping-bag",
    name: "Compras",
  },
  {
    id: 2,
    color: "peru",
    iconName: "credit-card",
    name: "Tarjeta",
  },
  {
    id: 2,
    color: "peru",
    iconName: "credit-card",
    name: "Cartera",
  },
  {
    id: 2,
    color: "peru",
    iconName: "credit-card",
    name: "Pepe",
  },
  {
    id: 2,
    color: "peru",
    iconName: "credit-card",
    name: "Conserje",
  },
  {
    id: 2,
    color: "peru",
    iconName: "credit-card",
    name: "David",
  },
  {
    id: 2,
    color: "peru",
    iconName: "credit-card",
    name: "Jejeje",
  },
]);
</script>

<template>
  <ul class="category-list">
    <li
      class="category-item"
      v-for="(cat, index) in categories"
      :key="`category${index}`"
    >
      <button class="button" @click="emit('select', cat)">
        <i
          :class="`icon icon-${cat.iconName}`"
          :aria-label="`icono ${cat.name}`"
          :style="{ background: cat.color }"
        />
        <span class="text">
          {{ cat.name }}
        </span>
      </button>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.category-item {
  .icon {
    align-items: center;
    border-radius: var(--border-radius);
    display: flex;
    font-size: 20px;
    height: 36px;
    justify-content: center;
    margin-right: 10px;
    transition: 0.3s ease all;
    width: 36px;
    color: var(--text-color);
  }
  .text {
    font-size: 14px;
    transition: 0.3s ease all;
    color: var(--text-color);
  }
  .button {
    display: flex;
    align-items: center;
    margin-top: 15px;
    border: none;
    background: none;
    &:hover {
      .icon {
        background: var(--primary-color) !important;
      }
      .text {
        color: var(--primary-color);
      }
    }
  }
}
.category-item:first-child {
  margin-top: 0;
}
</style>
