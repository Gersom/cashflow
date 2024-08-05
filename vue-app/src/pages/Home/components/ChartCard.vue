<script setup>
import CardHead from '@components/CardHead/CardHead.vue'
import DoughnutChart from '@components/DoughnutChart/DoughnutChart.vue'
import TotalBalance from '@components/TotalBalance/TotalBalance.vue'
import Stat from '@components/Stat/Stat.vue'

defineOptions({
  name: 'ChartCard'
})
</script>

<template>
  <div class="card chart-card">
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