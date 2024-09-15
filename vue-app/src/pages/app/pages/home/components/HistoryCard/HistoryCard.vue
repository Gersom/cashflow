ww<script setup>
import { computed, onMounted } from 'vue';
import { useMovementsStore } from '@app-page/stores/movements';

// components global
import TransactionBadge from '@app-page/components/TransactionBadge.vue';

// components local
import DateCardTitle from './components/DateCardTitle/DateCardTitle.vue'
import MovementCard from './components/MovementCard/MovementCard.vue';

const movementsStore = useMovementsStore()
const lengthMovements = computed(() => movementsStore.data?.length)
onMounted(() => {
  movementsStore.loadMovements()
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

    <p class="no-movements" v-show="lengthMovements === 0">
      Todavia no tienes ninguna transacción registrada.
    </p>

    <div class="movements">
      <MovementCard 
        v-for="(movement, index) in movementsStore.data"
        :key="`movement-card-${index}`"
        :date="movement.date || new Date()"
        :text="movement.title"
        :bookmarks="movement.categories"
        :isIncome="movement.type === 'income'"
        :amount="parseFloat(movement.amount)"
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