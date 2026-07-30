import {
  createRouter,
  createWebHistory,
} from 'vue-router'

const router = createRouter({
  history: createWebHistory(),

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