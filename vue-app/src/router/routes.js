import Login from '@pages/Login/Login.vue'
import Register from '@pages/Register/Register.vue'
import RecoverPassword from '@pages/RecoverPassword/RecoverPassword.vue'
import App from '@pages/App/AppPage.vue'
import { routesApp } from './routesApp'

export const routes = [
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
    path: '/recuperar-contrasena',
    name: 'RecoverPassword',
    component: RecoverPassword
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
    children: routesApp
  },
]