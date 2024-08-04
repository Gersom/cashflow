<script setup>
defineEmits(['vnode-unmounted'])
import { useRoute } from 'vue-router'
import { reactive, computed } from 'vue'
import {getCurrentMonthName} from '../../utils/date.js'

const route = useRoute()

const month = getCurrentMonthName()

const routerTitleMap = {
  Home: 'Bienvenido',
  //dashboard: 'configuracion',
}

const titleName = computed(()=>{
  return routerTitleMap[route.name] || route.name;
})

const props = defineProps({
  userName: {
    type: String,
    default: 'User 1223314'
  },
  month: {
    type: String,
    default: 'Octubre'
  },
  year: {
    type: String,
    default: '2022'
  }
});

defineOptions({
  name: 'Head'
})

</script>

<template>
  <header class="page-header">
    <div class="header-content">
      <div class="info">
        <h2 class="page-title">{{titleName}}</h2>
        <small class="user-name">{{props.userName}}</small>
      </div>
      <div class="user-avatar">
        <img
          src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="User profile image">
      </div>
    </div>

    <div class="header-date">
      <time :datetime="`${Date.now.month} ${Date.now.year}`">
        <span>
          {{month}} 
        </span>
        <span>
          {{Date.now.year}}
        </span>
      </time>
    </div>
  </header>
</template>

<style  scoped>
.head{
  display: flex;
  justify-content: space-between;
}

.greater{
  height: 10vh;
  display: flex;
  gap: 2rem;
  align-items: center;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.left h2 {
  color: var(--primary-color);
  display: block;
  line-height: .7;
  margin: 0;
  padding: 0;
  font-size: 3rem;
}

.left small {
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

.right .month h2{
  color: var(--subtitle-color);

}

</style>
