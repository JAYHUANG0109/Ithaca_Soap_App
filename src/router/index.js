import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Cart from '../views/Cart.vue'
import Confirmation from '../views/Confirmation.vue'
import Products    from '../views/Products.vue'
import Individual  from '../views/individual.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/products', //
      name: 'products',
      component: Products,
    },

    {
      path: '/demos',
      name: 'demos',
      component: () => import('../views/Demos.vue')
    },
    {
      path: '/products/:id',
      name: 'individual',
      component: Individual,
      props: true
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/Checkout.vue')
    },
    {
      path: '/confirmation',
      name: 'confirmation',
      component: Confirmation
    }

  ],
})

export default router
