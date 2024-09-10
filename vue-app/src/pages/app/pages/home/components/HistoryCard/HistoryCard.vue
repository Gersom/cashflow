<script setup>
import { onMounted } from 'vue';
import { useMovementsStore } from '@app-page/stores/movements';

// components global
import TransactionBadge from '@app-page/components/TransactionBadge.vue';

// components local
import DateCardTitle from './components/DateCardTitle/DateCardTitle.vue'
import MovementCard from './components/MovementCard/MovementCard.vue';

const movementsStore = useMovementsStore()

onMounted(() => {
  movementsStore.fillMovements()
})
</script>

<template>
  <div class="history-card">
    <DateCardTitle />

    <div class="movements-summary">
      <div class="income-info">
        <TransactionBadge :amount="1000.00" :isPositive="true" />
        <p class="paragraph">Ingresos</p>
      </div>
      <div class="expense-info">
        <TransactionBadge :amount="1000.00" :isPositive="false" />
        <p class="paragraph">Gastos</p>
      </div>
    </div>

    <p class="no-movements" v-show="movementsStore?.data?.length === 0">
      Todavia no tienes ninguna transacción registrada.
    </p>

    <div class="movements" v-if="movementsStore?.data?.length > 0">
      <MovementCard 
        v-for="movement in movementsStore.data"
        :key="movement.date.toISOString()"
        :date="movement.date"
        :text="movement.text"
        :bookmarks="movement.bookmarks"
        :isIncome="movement.isIncome "
        :amount="movement.amount"
      />
    </div>
     
  </div>
</template>

<style lang="scss" scoped>
  .history-card {   
  
    .movements-summary {
      display: flex;
      justify-content:space-around;
      padding: 0em 0 22px 0;
      width: 100%;
      .paragraph {
        margin: 0;
        padding: 0;
        color: var(--text-color);
        line-height: 20px;
        font-size: 14px;
        text-align: center;
      }
    }

    .no-movements {
      text-align: center;
      color: var(--text-color);
      font-size: 18px;
      line-height: 20px;
      padding: 0;
      margin-top: 20px;
    }

    .movements {
      display: flex;
      flex-direction: column;
      gap: 13px;
      height: 439px;
      overflow-y: auto;
    }

  }
</style>