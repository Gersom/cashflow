<script setup>
import { computed } from 'vue';
import IconArrow from '@icons/state/IconArrowUp.vue';
import { useUserStore } from '@stores/user';
import { storeToRefs } from 'pinia';


const userStore = useUserStore();
const { currency } = storeToRefs(userStore);

const props = defineProps({
  amount: {
    type: Number,
    required: true
  },
  isPositive: {
    type: Boolean,
    default: true
  }
});

const sign = computed(() => props.isPositive ? '+' : '-');
const formattedAmount = computed(() => Math.abs(props.amount).toFixed(currency.decimalPlaces));
</script>

<template>
  <div class="transaction-badge" :class="{ positive: isPositive }">
    <template v-if="currency.currencyPosition === 'before'">
      <p class="badge">
        {{ sign }} {{ currency.symbol }} {{ formattedAmount }} 
      </p>
    </template>
    <template v-else>
      <p class="badge">
        {{ sign }} {{ formattedAmount }} {{ currency.symbol }} 
      </p>
    </template>
    <div class="arrow-icon" :class="{ 'rotate-180': !isPositive }">
      <IconArrow />
    </div>
  </div>
</template>

<style scoped>

.badge{
  padding: 0;
  margin: 0 5px 0 0;
  font-size: 16px;
  font-weight: bold;
  font-family: var(--font-poppins);
}

.transaction-badge {
  display: inline-flex;
  align-items: center;
  
}
.transaction-badge.positive {
  color: var(--success-color);
}
.transaction-badge:not(.positive) {
  color: var(--error-color);
}
.arrow-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
  transition: transform 0.3s ease;
}
.rotate-180 {
  transform: rotate(180deg);
}
</style>