<script setup>
import { ref } from 'vue'

// Layout
import DialogBlur from '@layouts/DialogBlur.vue'

// Components Global
import CardTitle from '@components/CardTitle/CardTitle.vue'

// Components local
import SelectDate from './components/SelectDate.vue'

const monthCurrent = ref('Junio')
const yearCurrent = ref('2024')
const showSelectDate = ref(false)

const toggleShowSelectDate = () => {
  showSelectDate.value = !showSelectDate.value
}
const closeSelectDate = () => {
  showSelectDate.value = false
}
const handleSelectedYear = (year) => {
  yearCurrent.value = year
}
const handleSelectedMonth = (month) => {
  monthCurrent.value = month
}
</script>

<template>
  <div class="date-card-title">
    <div :class="{ 'date-card-title-card-title': showSelectDate }">
      <CardTitle
        title="Movimientos"
        margin-bottom="0"
        :selected-text="`${monthCurrent} - ${yearCurrent}`"
        :is-edit="true"
        @edit="toggleShowSelectDate"
      />
    </div>

    <DialogBlur
      :show="showSelectDate"
      :dependent="true"
      position-y="bottom"
      position-x="left"
      @close="closeSelectDate"
    >
      <SelectDate
        :year="yearCurrent"
        :month="monthCurrent"
        @selected-year="handleSelectedYear"
        @selected-month="handleSelectedMonth"
        @close="closeSelectDate"
      />
    </DialogBlur>
  </div>
</template>

<style lang="scss" scoped>
.date-card-title {
  margin-bottom: 25px;
  position: relative;
  width: fit-content;

  .date-card-title-card-title {
    position: relative;
    z-index: 12;
  }
}
</style>