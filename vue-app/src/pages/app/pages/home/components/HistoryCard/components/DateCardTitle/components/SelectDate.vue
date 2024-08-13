<script setup>
import IconSuccess from '@icons/state/IconSuccess.vue';
import CustomButton from '@components/CustomButton/index.vue';

const emit = defineEmits(['selected-year', 'selected-month', 'close']);

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const years = ['2021', '2022', '2023', '2024'];

const props = defineProps({
  year: {
    type: String,
    default: '2024'
  },
  month: {
    type: String,
    default: 'Enero'
  }
});
</script>

<template>
<div class="select-date">
  <div class='select-date-content'>
    <ul class="years-list">
      <li
        v-for="(year, index) in years"
        :key="`year-${index}`"
        :class="{ 'year-selected': year.toLowerCase() === props.year.toLowerCase() }"
      >
        <button
          class="year-button"
          @click="emit('selected-year', year)"
          v-if="year.toLowerCase() !== props.year.toLowerCase()"
        >
          {{ year }}
        </button>

        <div
          class="year-button"
          v-if="year.toLowerCase() === props.year.toLowerCase()"
        >
          <div class="icon">
            <IconSuccess />
          </div>
          <label>{{ year }}</label>
        </div>
      </li>
    </ul>

    <span class="separator" />

    <ul class="months-list">
      <li
        v-for="(month, index) in months"
        :key="`month-${index}`"
        :class="{ 'month-selected': month.toLowerCase() === props.month.toLowerCase() }"
      >
        <button
          class="month-button"
          v-if="month.toLowerCase() !== props.month.toLowerCase()"
          @click="emit('selected-month', month)"
        >
          {{ month }}
        </button>
        <div
          class="month-button"
          v-if="month.toLowerCase() === props.month.toLowerCase()"
        >
          <div class="icon">
            <IconSuccess />
          </div>
          <label>{{ month }}</label>
        </div>
      </li>
    </ul>
  </div>

  <div class="button-accept">
    <CustomButton
      :transparent="true"
      @click="emit('close')"
      size="small"
      text="Ok"
    />
  </div>
</div>
</template>

<style lang="scss" scoped>
.select-date-content {
  display: flex;
  padding: 25px 0;
  margin: 0;
  color: var(--text-color);
  height: 250px;
  .separator {
    width: 2px;
    height: 100%;
    background-color: var(--primary-color);
  }

  .year-button,
  .month-button {
    background: none;
    border-radius: 0;
    border: none;
    color: var(--text-color);
    padding: 10px 0;
    transition: ease 0.3s color;
    width: 100%;
    margin: 0;
    &:hover {
      color: var(--primary-color);
    }
  }
  .month-button {
    text-align: right;
  }

  .years-list,
  .months-list {
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0;
  }
  .years-list {
    width: 150px;
    .year-selected {
      .year-button {
        color: var(--success-color);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .icon {
        height: 18px;
        margin-right: 5px;
      }
    }
  }
  .months-list {
    width: 150px;
    overflow-y: auto;
    .month-selected {
      .month-button {
        color: var(--success-color);
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      .icon {
        height: 18px;
        margin-right: 5px;
      }
    }
  }
}
.button-accept {
  margin: 0px auto 15px auto;
  max-width: 150px;
}
</style>
