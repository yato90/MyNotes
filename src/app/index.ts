import './styles/style.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

const app = createApp(App).use(createPinia()).use(router)

export default app
