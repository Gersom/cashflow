<script setup>
import { movements } from './data/movements.js';

// components global
import TransactionBadge from '@app-page/components/TransactionBadge.vue';

// components local
import DateCardTitle from './components/DateCardTitle/DateCardTitle.vue'
import MovementCard from './components/MovementCard/MovementCard.vue';
</script>

<template>
  <div class="history-card">
    <DateCardTitle />

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

      <div class="movements">
        <MovementCard 
          v-for="movement in movements"
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
      justify-content:space-between;
      padding: 0em 0 22px 0;
      width: 70%;
      & p{
        margin: 0;
        padding: 0;
        color: var(--text-color);
        line-height: 20px;
      }
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