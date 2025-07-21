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
    path: '/dashboard',
    name: 'PlanEntrenamientoManager',
    component: () => import('@/views/PlanEntrenamientoManager.vue'),
    meta: { title: 'Gestión de Planes y Ejercicios' },
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
    path: '/formstudent', //formstudent
    name: 'FormStudent',
    component: () => import('@/views/FormStudent.vue'),
    meta: {
      title: 'Form Student',
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

  // Proteger rutas que requieren autenticación
  if (to.path === '/dashboard' && !isAuthenticated()) {
    next('/')
  } else {
    next()
  }
})

// Función para verificar si el usuario está autenticado
function isAuthenticated() {
  // Aquí puedes implementar la lógica para verificar si el usuario está autenticado
  // Por ahora, permitimos acceso al dashboard
  return true
}

export default router
