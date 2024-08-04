<script setup>
import CardHead from '@components/CardHead/CardHead.vue'
import TransactionBadge from '@components/TransactionBadge/TransactionBadge.vue';

defineOptions({
  name: 'HistoryCard'
})
</script>

<template>
  <div class="history-card">
    <CardHead title="Movimientos de " :isSelect="true" />

    <div class="movements-summary">
      <div class="income-info">
        <TransactionBadge :amount="1000.00" :isPositive="true" />
        <p>Ingresos</p>
      </div>
      <div class="expense-info">
        <TransactionBadge :amount="1000.00" :isPositive="false" />
        <p>Gastos</p>
      </div>
    </div>


  </div>
</template>

<style lang="scss" scoped>
  .history-card{   
   
    .movements-summary{
      display: flex;
      justify-content:space-between;
      padding: 1em 0;
      width: 70%;
      & p{
        margin: 0;
        padding: 0;
        color: var(--text-color);
        line-height: 20px;
      }
    }


  }
</style>
<!-- .card {
  &.history-card {
   
  }
} -->