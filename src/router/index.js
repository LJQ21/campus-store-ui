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
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index')
  },
  {
    path: '/home',
    redirect: { name: 'Home' }
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
  },
  {
    path: '/classify',
    name: 'Classify',
    component: () => import('@/views/classify/index')
  },
  {
    path: '/details',
    name: 'Details',
    component: () => import('@/views/details/index')
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import('@/views/address/index'),
    children: [
      {
        path: '/address/edit',
        name: 'Edit',
        component: () => import('@/views/address/edit-address/index')
      },
      {
        path: '/address/list',
        name: 'List',
        component: () => import('@/views/address/list-address/index')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
