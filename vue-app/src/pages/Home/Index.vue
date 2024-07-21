<script setup>
import { useThemeStore } from '@stores/theme'
import { storeToRefs } from 'pinia'
import GridCards from '@layouts/GridCards.vue'
import Head from '@components/Head/Head.vue'
import CardHead from '@components/CardHead/CardHead.vue'
import DoughnutChart from '@components/DoughnutChart/DoughnutChart.vue'

defineOptions({
  name: 'HomePage'
})

const themeStore = useThemeStore()
const { currentTheme } = storeToRefs(themeStore)
const toggleTheme = () => {
  themeStore.toggleTheme()
}
</script>

<template>
  <div class="home-page">
    <main>

      <Head />
      <GridCards>
        <template v-slot:first>
          <div class="card">
            <DoughnutChart></DoughnutChart>
          </div>
        </template>
        <template v-slot:second>
          <div class="card">
            <CardHead title="Crear nuevo movimiento" />
          </div>
        </template>
        <template v-slot:third>
          <div class="card">
            <CardHead title="Movimientos de Junio" />
          </div>
        </template>
      </GridCards>
    </main>
    <!-- <p>Tema actual: {{ currentTheme }}</p>
    <button @click="toggleTheme">Cambiar tema</button> -->
  </div>
</template>

<style scoped>
.home-page {
  width: 100%;
  height: 100vh;
  background-color: var(--background-color);
}

.home-page main {
  padding: 2rem;
  display: flex;
  flex-flow: column nowrap;
  gap: 1.5rem;
}

.home-page h2 {
  color: var(--primary-color);
  margin: 0;
}

.card {
  width: 100%;
  height: 100%;
  border-radius: .3rem;
  padding: 1.5rem;
  background-color: var(--background-color2);
}
</style>