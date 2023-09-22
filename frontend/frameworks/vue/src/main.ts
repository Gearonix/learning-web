import { createApp } from 'vue'
import App from './App.vue'
import Button from './components/Button.vue';
import router from './router/router';
import VIntersection from './directives/VIntersection'
import store from './store'

const app = createApp(App)


app.directive('intersection', VIntersection)

app.component('Button', Button)

app
    .use(router)
    .use(store)
    .mount('#app')
