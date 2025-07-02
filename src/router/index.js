import LandingPage from '@/views/landingPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'superVUE',
      component: LandingPage,
    },
  ],
})

export default router
