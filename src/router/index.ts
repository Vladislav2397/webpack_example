import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../components/pages/Index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Index
        }
    ],
    mode: 'history',
    base: '/',
})

export default router