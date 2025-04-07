import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueLazyLoad from 'vue3-lazyload'

import './styles/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// Lazy load
app.use(VueLazyLoad, {
  loading: '@/assets/loading.gif',
  error: 'https://placehold.co/200x200',
  attempt: 1,
  preLoad: 1.3,
  observer: true,
  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1,
  },
})

app.mount('#app')
