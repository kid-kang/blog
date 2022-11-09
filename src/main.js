import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'

import App from './App.vue'
import router from './router'
import $axios from './assets/axios'
import './assets/base.css'

const app = createApp(App)

app.config.globalProperties.$axios = $axios;

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
