<script setup>
import IconSelect from "@icons/actions/IconSelect.vue";
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Place holder'
  },
  isSelect:{
    type: Boolean,
    default: false
  },
  array:{
    type: Array,
    default:[{name: 'value'}]
  }
});

const selectedMonth = ref('Junio');
const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="card-head">
    <p class="underlined">
      <span>{{props.title}}</span>
      <span v-if="!props.isSelect"> :</span>
      <span v-else> {{selectedMonth}} </span>

    </p>
  </div>
    <!-- <p v-if="!props.isSelect" class="underlined">{{ props.title }}:</p> -->
    <!-- <p v-else class="underlined">{{ props.title }} {{props.array[0].name}}</p> -->
</template>

<style scoped>

.underlined {
  color: var(--button-text-color);
  position: relative;
  display: inline-block;
  margin: 0;
  padding: 0 0 5px 0;
  font-weight:bolder;

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

</style>