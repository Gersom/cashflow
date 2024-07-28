<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Place holder'
  }
});
</script>

<template>
  <div class="card-head">
    <p class="underlined">{{ props.title }} :</p>
  </div>
</template>

<style scoped>
.underlined {
  color: var(--button-text-color);
  position: relative;
  display: inline-block;
  margin: 0;
  padding: 0 0 5px 0;
}

.underlined::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 90%;
  height: 3px;
  background-color: var(--primary-color);
}
</style>