import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
