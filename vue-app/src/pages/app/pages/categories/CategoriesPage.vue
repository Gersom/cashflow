<script setup>
import MainContainer from '@app-page/layouts/MainContainer.vue'
import Head from '@app-page/components/Head.vue'
import GridCards from '@app-page/layouts/GridCards.vue'
import CreateCategory from './components/CreateCategory/CreateCategory.vue'
import HistoryCategories from './components/HistoryCategories/HistoryCategories.vue'

defineEmits(['vnode-unmounted'])
</script>

<template>
  <div class="categories-page">
    <MainContainer>
      <Head />

      <GridCards :item-count="2">
        <template #card-1>
          <HistoryCategories />
        </template>

        <template #card-2>
          <CreateCategory />
        </template>
      </GridCards>
    </MainContainer>
  </div>
</template>

<style lang="scss" scoped>
</style>