import Vue from 'vue'
import Index from '@/components/pages/Index.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Index,
        },
        {
            path: '/about',
            component: () => import('@/components/pages/About.vue'),
        }
    ],
    mode: 'history',
    base: '/',
})

export default router