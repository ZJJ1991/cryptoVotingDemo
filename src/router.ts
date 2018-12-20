import Vue from 'vue'
import Router from 'vue-router'
import LocalCrypto from './views/LocalCrypto.vue'
import anonymousvoting from /* webpackChunkName: "about" */ './views/anonymousvoting.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Router)
Vue.use(BootstrapVue)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'localcrypto',
      component: LocalCrypto
    },
    {
      path: '/voting',
      name: 'anonymousvoting',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: anonymousvoting
    }
  ]
})
