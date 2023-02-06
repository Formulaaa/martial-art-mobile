import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

/**
 * 静态路由：公共页面
 */
const routes: RouteRecordRaw[] = [
  {
    name: 'hello',
    path: '/',
    component: async () => await import('@/views/HelloWorld/index.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})
export default router
