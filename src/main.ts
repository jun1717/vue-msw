import { createApp } from 'vue'
import App from './App.vue'
import {worker} from './mock/browser';
import './assets/base.css'

// 開発環境のみMSW起動
if (process.env.NODE_ENV === 'development') {
  worker.start()
}

createApp(App).mount('#app')
