import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login-register/index')
  },
  {
    path: '/mime',
    name: 'Mime',
    component: () => import('@/views/mime/index')
  }
]

const router = new VueRouter({
  routes
})

export default router
