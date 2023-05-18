import { createApp } from 'vue'
import App from './App.vue'
import Button from './components/Button.vue';
import router from './router/router';

const app = createApp(App)

app.component('Button', Button)

app.use(router).mount('#app')
