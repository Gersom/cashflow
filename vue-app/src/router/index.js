import { createWebHistory, createRouter } from 'vue-router'

import App from '@pages/App/App.vue'
import Categories from '@pages/App/Categories/index.vue'
import Home from '@pages/App/Home/index.vue'
import Designs from '@pages/App/Designs/index.vue'
import Profile from '@pages/App/Profile/index.vue'

import Login from '@pages/Login/Login.vue'
import Register from '@pages/Register/Register.vue'

const routes = [
  {
    path: '/',
    redirect: '/iniciar-sesion'
  },
  {
    path: '/iniciar-sesion',
    name: 'Login',
    component: Login
  },
  {
    path: '/registrarse',
    name: 'Register',
    component: Register
  },
  {
    path: '/app',
    name: 'App',
    component: App,
    children: [
      {
        path: '/app/',
        name: 'AppHome',
        component: Home,
        alias: '/app/inicio',
        meta: { title: 'Bienvenido' }
      },
      {
        path: '/app/mi-perfil',
        name: 'AppProfile',
        component: Profile,
        alias: '/app/perfil',
        meta: { title: 'Mi Perfil' }
      },
      {
        path: '/app/mis-categorias',
        name: 'AppCategories',
        component: Categories,
        alias: '/app/categorias',
        meta: { title: 'Mis Categorías' }
      },
      {
        path: '/app/my-designs',
        name: 'AppDesigns',
        component: Designs,
        alias: '/app/designs',
        meta: { title: 'Mis Diseños' }
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router