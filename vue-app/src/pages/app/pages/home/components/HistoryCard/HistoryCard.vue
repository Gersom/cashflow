<script setup>
import { ref, computed, onMounted } from 'vue';
import { useMovementsStore } from '@app-page/stores/movements';
import MovementForm from '@app-page/components/MovementForm.vue'

// components global
import TransactionBadge from '@app-page/components/TransactionBadge.vue';
import DialogBlur from '@layouts/DialogBlur.vue';

// components local
import DateCardTitle from './components/DateCardTitle/DateCardTitle.vue'
import MovementCard from './components/MovementCard/MovementCard.vue';

const movementsStore = useMovementsStore()

const showEditModal = ref(false)
const currentMovement = ref({
  title: '',
  amount: '0.00',
  type: 'expense',
  description: '',
  categories: [],
})

const lengthMovements = computed(() => movementsStore.data?.length)
const closeEditModal = () => showEditModal.value = false;

const openEditModal = (movement) => {
  currentMovement.value = movement
  showEditModal.value = true
}

const submitEditModal = (data) => {
  movementsStore.editMovement(data)
  closeEditModal()
}
const deleteMovement = (id) => {
  movementsStore.deleteMovement(id)
  closeEditModal()
}

onMounted(() => movementsStore.loadMovements())
</script>

<template>
  <div class="history-card">
    <DateCardTitle />

    <div class="movements-summary">
      <div class="income-info">
        <TransactionBadge
          :amount="parseFloat(movementsStore.totalIncome)"
          :is-positive="true"
        />
        <p class="paragraph">
          Ingresos
        </p>
      </div>
      <div class="expense-info">
        <TransactionBadge
          :amount="parseFloat(movementsStore.totalExpenses)"
          :is-positive="false"
        />
        <p class="paragraph">
          Gastos
        </p>
      </div>
    </div>

    <p
      v-show="lengthMovements === 0"
      class="no-movements"
    >
      Todavia no tienes ninguna transacción registrada.
    </p>

    <div class="movements">
      <MovementCard 
        v-for="(movement, index) in movementsStore.movementsAll"
        :key="`movement-card-${index}`"
        :data="movement"
        @on-edit="openEditModal(movement)"
      />
    </div>
    
    <DialogBlur
      :button-close="true"
      :show="showEditModal"
      background-color="var(--background-color2)"
      @close="closeEditModal"
    >
      <div class="edit-modal">
        <MovementForm
          :dataform="currentMovement"
          :is-edit="true"
          :update-show="showEditModal"
          @delete-movement="deleteMovement"
          @data-submit="submitEditModal"
        />
      </div>
    </DialogBlur>
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
      padding-right: 5px;
    }

    .edit-modal {
      padding: 20px;
      min-width: 350px;
      border-radius: 15px;
    }
  }
</style>