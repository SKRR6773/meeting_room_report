import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {
        path: '/topic/'
      }
    },
    {
      path: '/topic/:topic_id?',
      name: 'topic vote',
      component: () => import('../views/TopicVoteView.vue')
    }
  ]
})

export default router
