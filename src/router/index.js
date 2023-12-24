import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductPage from '../components/pages/ProductPage'
import EmployeePage from '../components/pages/EmployeePage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/products',
    name: 'products',
    component: ProductPage
  },
  {
    path: '/employees',
    name: 'employees',
    component: EmployeePage
  }
  /*
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ //'../components/pages/ProductPage')
  //}
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
