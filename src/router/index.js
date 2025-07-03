import LandingPage from '@/views/landingPage.vue'
import LoginView from '@/views/loginView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '@/views/registerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'superVUE',
      component: LandingPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
  ],
})

export default router
