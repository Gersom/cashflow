import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { toastOptions } from './config/toast.js'
import App from './App.vue'
import router from './router/index.js'
import Toast from 'vue-toastification'
import VueApexCharts from 'vue3-apexcharts'

const pinia = createPinia()
const app = createApp(App)

app.use(Toast, toastOptions)
app.use(VueApexCharts)
app.use(pinia)
app.use(router)

app.mount('#app')
