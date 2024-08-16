<script setup>
// Layout
import GridCards from '@app-page/layouts/GridCards.vue'

// Components global
import Head from '@app-page/components/Head.vue'

// Components local
import ChartCard from './components/ChartCard.vue'
import CreateCard from './components/CreateCard.vue'
import HistoryCard from './components/HistoryCard/HistoryCard.vue'

defineOptions({ name: 'Home' })
</script>

<template>
  <div class="home-page">
    <main>
      <Head />

      <GridCards>
        <template v-slot:first>
          <ChartCard />
        </template>

        <template v-slot:second>
          <CreateCard />
        </template>

        <template v-slot:third>
          <HistoryCard />
        </template>
      </GridCards>

    </main>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  width: 100%;
  height: 100svh;
  background-color: var(--background-color);

  main {
    height: 100%;
    padding: 2rem;
    display: flex;
    flex-flow: column nowrap;
    gap: 2rem;
  }

  h2 {
    color: var(--primary-color);
    margin: 0;
  }
}
</style>