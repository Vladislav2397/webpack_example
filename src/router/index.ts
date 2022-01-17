import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: () => import('@/components/pages/Index.vue')
        }
    ],
    mode: 'history',
    base: '/',
})

export default router