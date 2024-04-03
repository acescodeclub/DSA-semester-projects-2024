import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import SweetAlert from 'vue-sweetalert2'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(SweetAlert)

app.mount('#app')
