import Home from '@pages/app/pages/home/HomePage.vue'
import Profile from '@pages/app/pages/profile/ProfilePage.vue'
import Categories from '@pages/app/pages/categories/CategoriesPage.vue'

export const routesApp = [
  {
    path: '/app',
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
]
