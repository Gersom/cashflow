<script setup>
import TransactionBadge from '@components/TransactionBadge/TransactionBadge.vue';

const emit = defineEmits(["click"]);
const props = defineProps({
//   size: {
//     type: String,
//     default: "normal", // small, normal
//   },
//   text: {
//     type: String,
//     default: "button",
//   },
//   transparent: {
//     type: Boolean,
//     default: false,
//   },
//   iconComponent: {
//     type: Object,
//     required: false,
//   },
//   disabled: {
//     type: Boolean,
//     default: false,
//   },
//   animation: {
//     type: Boolean,
//     default: false,
//   },
});
</script>

<template>
  <button class="card-button">
    <div class="description">

    </div>
    <div class="">
        <TransactionBadge />
    </div>
    <p></p> 

  </button>
</template>

<style lang="scss" scoped>
    .card-button {
        height: 56px;
        width: 100%;
        background-color: var(--background-color-2);
        border: 2px solid rgb(var(--background-color-rgb) / 50%);

        &:hover {
            background-color: var(--primary-color);
        }
    }  
</style>
