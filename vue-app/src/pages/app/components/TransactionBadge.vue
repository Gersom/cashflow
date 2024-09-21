<script setup>
import { computed } from 'vue';
import IconArrow from '@icons/state/IconArrowUp.vue';
import { useAccountsStore } from '@app-page/stores/accounts';
import { storeToRefs } from 'pinia';


const useAccounts = useAccountsStore();
const { currentCurrency } = storeToRefs(useAccounts);

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
const formattedAmount = computed(() => {
  return Math.abs(props.amount).toFixed(useAccounts.currentCurrency.decimalPlaces)
})
</script>

<template>
  <div
    class="transaction-badge"
    :class="{ positive: isPositive }"
  >
    <p class="badge">
      {{ sign }} {{ currentCurrency.symbol }} {{ formattedAmount }}
    </p>
    <!-- <template v-if="currency.currencyPosition === 'before'">
      <p class="badge">
        {{ sign }} {{ currency.symbol }} {{ formattedAmount }}
      </p>
    </template>
    <template v-else>
      <p class="badge">
        {{ sign }} {{ formattedAmount }} {{ currency.symbol }}
      </p>
    </template> -->
    <div
      class="arrow-icon"
      :class="{ 'rotate-180': !isPositive }"
    >
      <IconArrow />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.transaction-badge {
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  
  .badge {
    padding: 0 0 0 0;
    margin: 0 0 0 0;
    font-size: 16px;
    font-weight: 500;
    font-family: var(--font-poppins);
  }

  .arrow-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12px;
    height: 12px;
    transition: transform 0.3s ease;
    padding: 0;
    margin: 0;
  }
}

.transaction-badge.positive {
  color: var(--success-color);

  .arrow-icon {
    padding-left: 4px;
  }
}

.transaction-badge:not(.positive) {
  color: var(--error-color);
  .arrow-icon {
    padding-right: 4px;
  }
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>