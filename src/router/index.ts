import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'
import categories from '../views/categories.vue'
import favourites from '../views/favourites.vue'
import categoryProducts from '../views/categoryProducts.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
  ],
})

export default router
