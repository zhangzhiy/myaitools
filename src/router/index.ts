import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '工作台', icon: 'HomeFilled' },
      },
      {
        path: 'projects',
        name: 'Projects',
        component: () => import('@/views/projects/index.vue'),
        meta: { title: '项目管理', icon: 'FolderOpened' },
      },
      {
        path: 'projects/:id',
        name: 'ProjectDetail',
        component: () => import('@/views/projects/detail.vue'),
        meta: { title: '项目详情', hidden: true },
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/users/index.vue'),
        meta: { title: '用户管理', icon: 'User' },
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/settings/index.vue'),
        meta: { title: '系统设置', icon: 'Setting' },
      },
      {
        path: 'wechat-chat',
        name: 'WechatChat',
        component: () => import('@/views/wechat-chat/index.vue'),
        meta: { title: '商机汇报群', icon: 'ChatDotRound' },
      },
      {
        path: 'wechat-chat/:id',
        name: 'WechatChatDetail',
        component: () => import('@/views/wechat-chat/detail.vue'),
        meta: { title: '商机汇报详情', hidden: true },
      },
      {
        path: 'phone-auth',
        name: 'PhoneAuth',
        component: () => import('@/views/phone-auth/index.vue'),
        meta: { title: '手机号授权', icon: 'Iphone' },
      },
    ],
  },
  {
    path: '/business-report-detail',
    component: () => import('@/layouts/BlankLayout.vue'),
    meta: { title: '预览商机汇报详情' },
    children: [
      {
        path: '',
        name: 'BusinessReportDetail',
        component: () => import('@/views/business-report-detail/index.vue'),
        meta: { title: '预览商机汇报详情' },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: { title: '404' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  const title = to.meta.title as string
  if (title) {
    document.title = `${title} - ProductDemo`
  }
  next()
})

export default router
