import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/p',
    name: 'PlanEntrenamientoManager',
    component: () => import('@/views/PlanEntrenamientoManager.vue'),
    meta: { title: 'Gestión de Planes y Ejercicios' },
  },

  {
    path: '/l',
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
    path: '/', //formstudent
    name: 'FormStudent',
    component: () => import('@/views/FormStudent.vue'),
    meta: {
      title: 'Form Student',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
  {
    path: '/g',
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
  {
    path: '/grupos/new',
    name: 'FormGroup',
    component: () => import('@/views/FormGroup.vue'),
    meta: { title: 'Crear Nuevo Grupo' },
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
