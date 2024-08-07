import { createWebHistory, createRouter } from 'vue-router'

import Categories from '@pages/Categories/index.vue'
import Home from '@pages/Home/index.vue'
import Designs from '@pages/Designs/index.vue'
import Profile from '@pages/Profile/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/categories',
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