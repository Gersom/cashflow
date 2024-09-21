<script setup>
import DoughnutChart from '@app-page/components/DoughnutChart.vue'
import Stat from '@app-page/components/Stat.vue'
import TotalBalance from '@app-page/components/TotalBalance.vue'

defineOptions({
  name: 'ChartCard'
})
</script>

<template>
  <div class="card chart-card">
    <TotalBalance />
    <div class="chart-container">
      <DoughnutChart />
    </div>
    <div class="reserved">
      <Stat />
      <Stat />
      <Stat />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  &.chart-card {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    overflow: hidden;
    box-sizing: border-box;

    .chart-container {
      width: 70%;
      align-self: center;
      display: inline-block;
    }

    .reserved {
      display: flex;
      box-sizing: border-box;
      flex-direction: column;
      height: 100%;
      gap: 1rem;
      scrollbar-width: thin;
      overflow-y: auto;
    }
  }
}
</style>