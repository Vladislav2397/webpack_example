import Vue from 'vue'
import router from './router/index.ts'
import Button from '@/components/ui/Button/Button'

Vue.component('button-component', Button)

let App

import('./App.vue').then(app => {

    new Vue({
        render: h => h(app.default),
        router
    }).$mount('#app')
})
