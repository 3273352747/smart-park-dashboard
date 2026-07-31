import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/overview',
      name: 'overview',
      component: () => import('../views/OverviewView.vue'),
    },
    {
      path: '/devices',
      name: 'devices',
      component: () => import('../views/DeviceView.vue'),
    },
    {
      path: '/work-order',
      name: 'work-order',
      component: () => import('../views/WorkOrderView.vue'),
    },
    {
      path: '/data-query',
      name: 'data-query',
      component: () => import('../views/DataQueryView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router