import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/circle.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'circle',
      component: HomeView
    },
    {
      path: '/square',
      name: 'square',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/square.vue')
    }
  ]
})

export default router
