<script setup>
import { useThemeStore } from '@stores/theme'
import { storeToRefs } from 'pinia'
import GridCards from '@layouts/GridCards.vue'
import Head from '@components/Head/Head.vue'
import CardHead from '@components/CardHead/CardHead.vue'
import DoughnutChart from '@components/DoughnutChart/DoughnutChart.vue'
import TotalBalance from '@components/TotalBalance/TotalBalance.vue'
import Stat from '@components/Stat/Stat.vue'

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
            <div class="chart-card">
              <TotalBalance/>
                <div class="chart-container">
                  <DoughnutChart></DoughnutChart>
                </div>
              <div class="reserved">
                <Stat/>
                <Stat/>
                <Stat/>
                
              </div>
            </div>
          </div>
        </template>
        <template v-slot:second>
          <div class="card">
            <div class="create-movements">
              <CardHead title="Crear nuevo movimiento" />

            </div>
          </div>
        </template>
        <template v-slot:third>
          <div class="card">
            <div class="create-movements">
              <CardHead title="Movimientos de " isSelect="true"/>
              
            </div>
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
  height:100svh;
  overflow-y: auto;
  background-color: var(--background-color);
}

.home-page main {
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-flow: column nowrap;
  gap: 2rem;
}

.home-page h2 {
  color: var(--primary-color);
  margin: 0;
}

.card {
  width: 100%;
  height: 100%;
  min-width: 360px;
  min-height: 59px;
  border-radius: .3rem;
  /* padding: 1.5rem; */
  background-color: var(--background-color2);
}

.chart-card{
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow: hidden;
  box-sizing: border-box;
}

.chart-container{
  width: 70%;
  align-self: center;
  display: inline-block;
}

.reserved{
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
  scrollbar-width: thin;
  overflow-y: auto;
}

</style>