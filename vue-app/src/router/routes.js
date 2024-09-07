import { routesApp } from './routesApp'
import App from '@pages/app/AppPage.vue'
import Designs from '@pages/designs/DesignsPage.vue'
import Login from '@pages/login/LoginPage.vue'
import RecoverPassword from '@pages/recover-password/RecoverPasswordPage.vue'
import Register from '@pages/register/RegisterPage.vue'
import VerifyEmail from '@pages/verify-email/VerifyEmail.vue'

export const routes = [
  {
    path: '/',
    redirect: '/ingresar'
  },
  {
    path: '/ingresar',
    name: 'Login',
    alias: ['/login', '/entrar', '/iniciar-sesion'],
    component: Login
  },
  {
    path: '/recuperar-contrasena',
    name: 'RecoverPassword',
    alias: ['/recover-password', '/recover', '/recuperar'],
    component: RecoverPassword
  },
  {
    path: '/registrarse',
    name: 'Register',
    alias: ['/registro', '/register', '/signup'],
    component: Register
  },
  {
    path: '/verify-email',
    name: 'VerifyEmail',
    component: VerifyEmail
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
    alias: ['/designs', '/disenos', '/my-designs'],
  },
]