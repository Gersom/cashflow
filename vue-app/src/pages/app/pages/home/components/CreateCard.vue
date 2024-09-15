<script setup>
import { useMovementsStore } from '@app-page/stores/movements';
import MovementForm from '@app-page/components/MovementForm.vue'

const movementsStore = useMovementsStore()

const submitMovement = (dataForm) => {
  movementsStore.createMovement(dataForm)
}
</script>

<template>
  <div class="create-card">
    <MovementForm @data-submit="submitMovement" />
  </div>
</template>

<style lang="scss" scoped>
</style>