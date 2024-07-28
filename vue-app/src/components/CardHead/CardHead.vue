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

const selectedMonth = ref('Junio');
const isOpen = ref(false);
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
<div class="card-head">
    <p v-if="!props.isSelect">
      <span>{{ props.title }} :</span>
    </p>
    
    <button
      @click="toggleDropdown"
      v-if="props.isSelect"
    >
      <span>{{ selectedMonth }}</span>
      <div class="arrow" :class="{ 'arrow-up': isOpen }">
        <IconSelect />
      </div>
    </button>

    <div v-if="isSelect && isOpen" class="dropdown-content">
      <div v-for="month in months" :key="month" class="dropdown-item" @click="selectMonth(month)">
        {{ month }}
      </div>
    </div>
  </div>
  <div class="card-head">
    <p v-if="props.isSelect">
      <span>{{ props.title }} :</span>
    </p>
    
    <div v-if="isSelect && isOpen" class="dropdown-content">
      <div v-for="month in months" :key="month" class="dropdown-item" @click="selectMonth(month)">
        {{ month }}
      </div>
    </div>
  </div>
</template>

<style scoped>

button{
  border-radius: 0;
  padding: 0;
  text-align: left;
  /* background: none; */
  color: var(--text-color);
  font-weight: bolder;

}

.card-head{
  /* display: flex; */
}

.card-head > p{
  color: var(--text-color);
  position: relative;
  display: inline-block;
  margin: 0;
  padding: 0 0 5px 0;
  font-weight: bolder;

}

.card-head > p ::after{
  content: ' ';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
  background-color: var(--primary-color);

}

.underlined {
  color: var(--text-color);
  position: relative;
  display: inline-block;
  margin: 0;
  padding: 0 0 5px 0;
  font-weight: bolder;

}

.underlined::after {
  content: ' ';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
  background-color: var(--primary-color);
}

.dropdown {
  position: relative;
  width: 200px;
  font-family: Arial, sans-serif;
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #2c3e50;
  color: white;
  cursor: pointer;
}

.arrow {
  height: 100%;
  transition: transform 0.3s ease;
}

.arrow-up {
  transform: rotate(180deg) translate(0, -100%);
}

.dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #34495e;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.dropdown-item {
  padding: 10px;
  color: white;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #2c3e50;
}
</style>