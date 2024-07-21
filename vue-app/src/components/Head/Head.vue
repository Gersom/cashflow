<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  userName: {
    type: String,
    default: 'User 1223314'
  }
});

defineOptions({
  name: 'Head'
})

</script>

<template>
  <header class="head">
    <div class="head-info">
      <h2>Bienvenido</h2>
      <small>{{props.userName}}</small>
    </div>
    <div class="profile--container">
      <img
        src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="profile_img">
    </div>
  </header>
</template>

<style scoped>
.head {
  height: 10vh;
  display: flex;
  gap: 2rem;
  align-items: center;
}

.head-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.head h2 {
  color: var(--primary-color);
  display: block;
  line-height: .7;
  margin: 0;
  padding: 0;
  font-size: 3rem;
}

.head small {
  margin: 0;
  font-size: 2.5vh;
  line-height: 1.9;
  padding: 0 .2rem;
  color: var(--text-color);
}

.profile--container {
  position: relative;
  width: 7.5vh;
  height: 7.5vh;
  overflow: hidden;
  border-radius: 50%;
  border: 1rem;
  background-color: var(--primary-color);
  box-shadow: 0px 0px 0px .5vh var(--primary-color);
}
</style>
