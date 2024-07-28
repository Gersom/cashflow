import { createWebHistory, createRouter } from 'vue-router'

import Categories from '@pages/Categories/index.vue'
import Home from '@pages/Home/Index.vue'
import Designs from '@pages/Designs/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/categorias',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/designs',
    name: 'Designs',
    component: Designs
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router