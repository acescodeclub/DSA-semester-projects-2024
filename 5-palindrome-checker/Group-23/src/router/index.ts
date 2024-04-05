import { createRouter, createWebHistory } from 'vue-router'
import WordleBoard from '@/components/WordleBoard.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'WordleBoard',
      component: WordleBoard
    }
  ]
})

export default router
