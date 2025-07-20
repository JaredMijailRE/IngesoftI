import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/LogIn.vue'),
    meta: {
      title: 'USport - Iniciar Sesión',
    },
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/SignUp.vue'),
    meta: {
      title: 'Sign Up',
    },
  },
    {
    path: '/selecteventtype',
    name: 'SelectEventType',
    component: () => import('@/views/SelectEventType.vue'),
    meta: {
      title: 'Select Event Type',
    },
  },
  {
    path: '/sportevent',
    name: 'SportEvent',
    component: () => import('@/views/SportEvent.vue'),
    meta: {
      title: 'Sport Event',
    },
  },
    {
    path: '/classevent',
    name: 'ClassEvent',
    component: () => import('@/views/ClassEvent.vue'),
    meta: {
      title: 'Class Event',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
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
