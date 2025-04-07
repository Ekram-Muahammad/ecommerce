import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'
import categories from '../views/categories.vue'
import favourites from '../views/favourites.vue'
import categoryProducts from '../views/categoryProducts.vue'
import product from '../views/product.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:category?',
      name: 'home',
      component: home,
    },
    {
      path: '/categories',
      name: 'categories',
      component: categories,
    },
    {
      path: '/favorites',
      name: 'favourites',
      component: favourites,
    },
    {
      path: '/category/:slug',
      name: 'categoryProducts',
      component: categoryProducts,
    },
    {
      path: '/product/:slug',
      name: 'product',
      component: product,
    },
  ],
})

export default router
