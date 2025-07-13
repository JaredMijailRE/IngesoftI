import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/main',
    name: 'Main',
    component: () => import('@/views/Main.vue'),
    meta: { title: 'Main' },
  },

  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/LogIn.vue'),
    meta: {
      title: 'USport - Iniciar Sesión',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
  {
    path: '/grupos',
    name: 'Grupos',
    component: () => import('@/views/Grupos.vue'),
    meta: { title: 'Grupos' },
  },
  {
    path: '/grupos/:id/dashboard',
    name: 'GrupoDashboard',
    component: () => import('@/views/GrupoDashboard.vue'),
    meta: { title: 'Dashboard del Grupo' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// Navigation guards
router.beforeEach((to, from, next) => {
  // Update document title
  document.title = to.meta.title || 'USport'
  next()
})

export default router
