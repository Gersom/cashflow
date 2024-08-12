import Categories from '@pages/App/Categories/CategoriesPage.vue'
import Home from '@pages/App/Home/HomePage.vue'
import Designs from '@pages/App/Designs/DesignsPage.vue'
import Profile from '@pages/App/Profile/ProfilePage.vue'

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
  {
    path: '/app/mis-disenos',
    name: 'AppDesigns',
    component: Designs,
    alias: '/app/designs',
    meta: { title: 'Mis Diseños' }
  },
]
