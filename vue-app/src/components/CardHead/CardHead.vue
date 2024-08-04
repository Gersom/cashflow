<script setup>
import IconSelect from "@icons/actions/IconSelect.vue";
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Place holder'
  },
  isSelect: {
    type: Boolean,
    default: false
  },
  array: {
    type: Array,
    default: [{ name: 'value' }]
  }
});

let selectedMonth = ref('Junio');
const isOpen = ref(false);
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio']; // temporal array

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const selectValue = (selected) => {
  selectedMonth.value = selected;
};
</script>

<template>
  <div class="card-head">
    <button @click="toggleDropdown" v-if="props.isSelect">
      <span>{{ props.title }} {{ selectedMonth }}</span>
      <div class="arrow" :class="{ 'arrow-up': isOpen }">
        <IconSelect />
      </div>
      <div v-if="props.isSelect && isOpen" class="dropdown-content">
        <div v-for="month in months" :key="month" class="dropdown-item" @click="selectValue(month)">
          {{ month }}
        </div>
      </div>
    </button>
  </div>

  <div class="card-head">
    <p v-if="!props.isSelect">
      <span>{{ props.title }} :</span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
  .card-head {
    & button {
      border-radius: 0;
      padding: 0;
      text-align: left;
      background: none;
      color: var(--text-color);
      font-weight: bolder;
      display: flex;
      gap: 1rem;
      position: relative;
      margin: 0;
      padding: 0 0 10px 0;
    }

    & button::after {
      content: ' ';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 3px;
      background: var(--primary-color);
    }

    & p {
      color: var(--text-color);
      position: relative;
      display: inline-block;
      margin: 0;
      padding: 0 0 10px 0;
      font-weight: bolder;
    }

    & p ::after {
      content: ' ';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 3px;
      background-color: var(--primary-color);
    }

    & .dropdown-content {
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 240px;
    top: 100%;
    overflow-y: auto;
    background-color: var(--background-color2);
    border-radius: 0 0 1rem 1rem ;
    }
  }

  .arrow {
    height: .7rem;
    transition: transform 0.3s ease;
    transform-origin: center;
  }

  .arrow-up {
    height: .7rem;
    transform: rotate(180deg) translate(0 , -1.8rem) ;
    transform-origin: center
  }

  .dropdown-item {
    font-weight: lighter;
    text-align: center;
    padding: .2rem;
    cursor: pointer;
  }

  .dropdown-item:hover {
    font-weight: bold;
  }
</style>