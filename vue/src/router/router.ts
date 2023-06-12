import Main from '../pages/Main.vue';
import About from '../pages/About.vue';
import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/about/:id',
        component: About
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router
