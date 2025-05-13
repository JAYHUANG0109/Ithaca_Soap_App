import './assets/main.css'

import { createApp } from 'vue'
import {createBootstrap} from 'bootstrap-vue-next'
import { registerSW } from 'virtual:pwa-register'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

registerSW({ immediate: true })

const app = createApp(App)

app.use(router)

app.use(createBootstrap())

import fixtures from './fixtures.json'
app.config.globalProperties.fixtures = fixtures;
app.config.globalProperties.baseDir = import.meta.env.BASE_URL ?? '/';

app.mount('#app')
