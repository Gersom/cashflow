<script setup>
// Layout
import GridCards from '@app-page/layouts/GridCards.vue'
import MainContainer from '@app-page/layouts/MainContainer.vue'

// Components global
import Head from '@app-page/components/Head.vue'

// Components local
import ChartCard from './components/ChartCard.vue'
import CreateCard from './components/CreateCard.vue'
import HistoryCard from './components/HistoryCard/HistoryCard.vue'

const emit = defineEmits(['vnode-unmounted'])
</script>

<template>
  <div class="home-page">
    <MainContainer>
      <Head />

      <GridCards :item-count="2">
        <!-- <template v-slot:card-1>
          <ChartCard />
        </template> -->

        <template #card-1>
          <CreateCard />
        </template>

        <template #card-2>
          <HistoryCard />
        </template>
      </GridCards>
    </MainContainer>
  </div>
</template>

<style lang="scss" scoped>
</style>