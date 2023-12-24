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
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
