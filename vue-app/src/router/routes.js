import { routesApp } from './routesApp'
import App from '@pages/app/AppPage.vue'
import Designs from '@pages/designs/DesignsPage.vue'
import Login from '@pages/login/LoginPage.vue'
import RecoverPassword from '@pages/recover-password/RecoverPasswordPage.vue'
import Register from '@pages/register/RegisterPage.vue'

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
  {
    path: '/mis-disenos',
    name: 'Designs',
    component: Designs,
    alias: '/designs',
  },
]