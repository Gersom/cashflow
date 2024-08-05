import { defineStore } from 'pinia'
import { version } from '@src/../package.json'

export const useAppStore = defineStore('app', {
  state: () => ({
    description: 'Esta aplicación está diseñada para ayudarte a gestionar tus finanzas personales de manera eficiente. Puedes registrar todos tus movimientos financieros, ya sean ingresos o egresos, y mantener un control detallado de cada uno de ellos. Además, la aplicación ofrece estadísticas completas, la opción de ordenar por categorías y muchas otras funcionalidades avanzadas.',
    version: 'v' + version,
    developers: {
      gersom: {
        name: 'Gersom Alaja', 
        role: 'CEO', 
        link: 'https://google.com'
      },
      david: {
        name: 'David Romero', 
        role: 'FullStack Developer', 
        link: 'https://google.com'
      }
    }
  }),
  getters: {
    devGersom: state => state.developers.gersom,
    devDavid: state => state.developers.david,
  },
  actions: {
  }
})