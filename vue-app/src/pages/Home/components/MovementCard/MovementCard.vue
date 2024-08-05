<script setup>
import { defineComponent } from 'vue';
import IconHouse from '@icons/nav/IconHome.vue';
import CardButton from './components/CardButton.vue';

</script>

<template>
    <div class="card">
        <div class="category">
            
        </div>
        <CardButton :date="new Date"/>
    </div>
</template>

<style scoped>

</style>