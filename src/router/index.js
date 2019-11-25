import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/index')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index')
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import('@/views/form/index')
  },
  {
    path: '/mime',
    name: 'Mime',
    component: () => import('@/views/mime/index')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/cart/index')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search/index')
  }
]

const router = new VueRouter({
  routes
})

export default router
