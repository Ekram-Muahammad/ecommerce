import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'
import categories from '../views/categories.vue'
import favourites from '../views/favourites.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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
  ],
})

export default router
