import Home from '@pages/app/pages/home/HomePage.vue'
import Profile from '@pages/app/pages/profile/ProfilePage.vue'
import Categories from '@pages/app/pages/categories/CategoriesPage.vue'

export const routesApp = [
  {
    path: '/app',
    name: 'AppHome',
    component: Home,
    alias: ['inicio', 'home'],
    meta: { title: 'Bienvenido' }
  },
  {
    path: 'mi-perfil',
    name: 'AppProfile',
    component: Profile,
    alias: ['perfil', 'profile'],
    meta: { title: 'Mi Perfil' }
  },
  {
    path: 'mis-categorias',
    name: 'AppCategories',
    component: Categories,
    alias: ['categorias', 'categories'],
    meta: { title: 'Mis Categorías' }
  },
  {
    path: 'disenos',
    alias: ['designs', 'my-designs', 'mis-disenos'],
    redirect: '/disenos'
  }
]
