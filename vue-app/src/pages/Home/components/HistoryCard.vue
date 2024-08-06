<script setup>
import CardHead from '@components/CardHead/CardHead.vue'
import TransactionBadge from '@components/TransactionBadge/TransactionBadge.vue';
import MovementCard from './MovementCard/MovementCard.vue';

defineOptions({
  name: 'HistoryCard'
})

const movements = [
  {
    date: new Date('2024-08-01'),
    text: "Honorarios de la ciudad por contrato",
    amount: 200,
    isIncome: true,
    bookmarks: [
      { id: 1, color: 'orange', iconName: 'shopping-bag', name: 'Compras'},
      { id: 2, color: 'blue', iconName: 'user', name: 'Transporte' },
    ]
  },
  {
    date: new Date('2024-08-03'),
    text: "Compra de comestibles",
    amount: 75.50,
    isIncome: false,
    bookmarks: [
      { id: 3, color: 'green', iconName: 'utensils', name: 'Alimentación' },
    ]
  },
  {
    date: new Date('2024-08-05'),
    text: "Pago de alquiler",
    amount: 800,
    isIncome: false,
    bookmarks: [
      { id: 4, color: 'red', iconName: 'home', name: 'Vivienda' },
    ]
  },
  {
    date: new Date('2024-08-07'),
    text: "Depósito de salario",
    amount: 2500,
    isIncome: true,
    bookmarks: [
      { id: 5, color: 'purple', iconName: 'briefcase', name: 'Trabajo' },
    ]
  },
  {
    date: new Date('2024-08-10'),
    text: "Cena en restaurante",
    amount: 45.75,
    isIncome: false,
    bookmarks: [
      { id: 3, color: 'green', iconName: 'utensils', name: 'Alimentación' },
      { id: 6, color: 'pink', iconName: 'glass-cheers', name: 'Ocio' },
    ]
  },
  {
    date: new Date('2024-08-12'),
    text: "Pago de factura de electricidad",
    amount: 80.25,
    isIncome: false,
    bookmarks: [
      { id: 7, color: 'yellow', iconName: 'bolt', name: 'Servicios' },
    ]
  },
  {
    date: new Date('2024-08-15'),
    text: "Venta de artículo en línea",
    amount: 150,
    isIncome: true,
    bookmarks: [
      { id: 8, color: 'teal', iconName: 'dollar-sign', name: 'Ingresos extra' },
    ]
  },
  {
    date: new Date('2024-08-18'),
    text: "Compra de ropa",
    amount: 120.80,
    isIncome: false,
    bookmarks: [
      { id: 1, color: 'orange', iconName: 'shopping-bag', name: 'Compras' },
    ]
  },
  {
    date: new Date('2024-08-20'),
    text: "Recarga de tarjeta de transporte",
    amount: 30,
    isIncome: false,
    bookmarks: [
      { id: 2, color: 'blue', iconName: 'user', name: 'Transporte' },
    ]
  },
  {
    date: new Date('2024-08-25'),
    text: "Reembolso de gastos médicos",
    amount: 95.50,
    isIncome: true,
    bookmarks: [
      { id: 9, color: 'cyan', iconName: 'heartbeat', name: 'Salud' },
    ]
  }
];
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

    .movements{
      display: flex;
      flex-direction: column;
      gap: 13px;
      height: 500px;
      overflow-y: auto;
    }

  }
</style>