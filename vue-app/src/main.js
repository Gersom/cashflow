import './assets/styles/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'
import router from './router/index.js';
import App from './App.vue';

const pinia = createPinia()
const app = createApp(App)

app.use(VueApexCharts)
app.use(pinia)
app.use(router)
app.mount('#app')
