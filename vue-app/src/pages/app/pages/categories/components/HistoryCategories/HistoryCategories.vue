<script setup>
import CategoryItem from './components/CategoryItem.vue'
import CardTitle from '@components/CardTitle/CardTitle.vue'

const categoriesList = [
  { id: '93b', name: 'Salud', iconName: 'thermometer', color: '#FFE5B4', movementsLenght: 5 },
  { id: '93e', name: 'Finanzas', iconName: 'dollar-sign', color: '#98FB98', movementsLenght: 0 },
  { id: '939', name: 'Transporte', iconName: 'truck', color: '#BDFCC9', movementsLenght: 20 },
  { id: '93c', name: 'Ocio', iconName: 'music', color: '#B0E0E6', movementsLenght: 29 },
  { id: '938', name: 'Alimentación', iconName: 'coffee', color: '#FFD1DC', movementsLenght: 1 },
  { id: '93a', name: 'Hogar', iconName: 'home', color: '#E6E6FA', movementsLenght: 210 },
  { id: '93a', name: 'Hogar', iconName: 'home', color: '#E6E6FA', movementsLenght: 210 },
  { id: '93a', name: 'Hogar', iconName: 'home', color: '#E6E6FA', movementsLenght: 210 },
  { id: '93a', name: 'Hogar', iconName: 'home', color: '#E6E6FA', movementsLenght: 210 },
  { id: '93a', name: 'Hogar', iconName: 'home', color: '#E6E6FA', movementsLenght: 210 },
  { id: '93a', name: 'Hogar', iconName: 'home', color: '#E6E6FA', movementsLenght: 210 },
  { id: '93a', name: 'Hogar', iconName: 'home', color: '#E6E6FA', movementsLenght: 210 },
  { id: '93a', name: 'Hogar', iconName: 'home', color: '#E6E6FA', movementsLenght: 210 },
  { id: '93a', name: 'Hogar', iconName: 'home', color: '#E6E6FA', movementsLenght: 210 },
  { id: '93a', name: 'Hogar', iconName: 'home', color: '#E6E6FA', movementsLenght: 210 },
  { id: '93a', name: 'Hogar', iconName: 'home', color: '#E6E6FA', movementsLenght: 210 },
  { id: '93a', name: 'Hogar', iconName: 'home', color: '#E6E6FA', movementsLenght: 210 },
  { id: '93a', name: 'Hogar', iconName: 'home', color: '#E6E6FA', movementsLenght: 210 },
  { id: '93a', name: 'Hogar', iconName: 'home', color: '#E6E6FA', movementsLenght: 210 },
  { id: '93d', name: 'Compras', iconName: 'shopping-cart', color: '#FFC0CB', movementsLenght: 0 }
]
</script>

<template>
  <div class="history-categories">
    <CardTitle
      title="Categorias registradas"
    />
    <div class="categories-list">
      <CategoryItem
        v-for="(category, index) in categoriesList"
        :key="`category-item-${index}`"
        :category="category"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.history-categories {
  .categories-list {
    display: flex;
    flex-direction: column;
    gap: 5px;
    overflow-y: auto;
    height: 470px;
    padding-right: 5px;
  }
}
</style>
