import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/DashboardPage.vue'),
  },
  {
    path: '/workloads',
    name: 'workloads',
    component: () => import('@/views/WorkloadsPage.vue'),
  },
  {
    path: '/nodes/:nodeId',
    name: 'node',
    component: () => import('@/views/NodePage.vue'),
    props: true,
  },
  {
    path: '/alerts',
    name: 'alerts',
    component: () => import('@/views/AlertsPage.vue'),
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/SettingsPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
