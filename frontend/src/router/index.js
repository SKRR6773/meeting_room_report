import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/topic/:topic_id',
      name: 'topic vote',
      component: () => import('../views/TopicVoteView.vue')
    },
    {
      path: '/topic_review/:topic_id',
      name: 'topic review',
      component: () => import('../views/TopicResultVoteView.vue')
    },
    {
      path: '/topics',
      name: 'topic table',
      component: () => import('../views/TopicTablesView.vue')
    },
    {
      path: '/report_all',
      name: 'report page'
    },
    {
      path: '/admin',
      name: 'admin view',
      component: () => import('../views/Admin/AdminHomeView.vue'),
      children: [
        {
          path: 'home',
          name: 'first admin view',
          component: () => import('../components/AdminComponents/AdminFirstComponent.vue')
        },
        {
          path: 'report_all',
          name: 'admin report all',
          component: () => import('../views/Admin/childrens/ReportAllView.vue')
        }
      ]
    },
  ]
})

export default router
