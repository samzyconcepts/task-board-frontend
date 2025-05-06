import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import axios from 'axios'

axios.defaults.baseURL = 'https://task-board-be.onrender.com/api'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
