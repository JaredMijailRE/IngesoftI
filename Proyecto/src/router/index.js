import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/main',
    name: 'Main',
    component: () => import('@/views/Main.vue'),
    meta: { title: 'Main', requiresAuth: true },
  },

  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/LogIn.vue'),
    meta: {
      title: 'USport - Iniciar Sesión',
      requiresAuth: false,
    },
  },
  {
    path: '/dashboard',
    name: 'PlanEntrenamientoManager',
    component: () => import('@/views/PlanEntrenamientoManager.vue'),
    meta: { title: 'Gestión de Planes y Ejercicios', requiresAuth: true },
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/SignUp.vue'),
    meta: {
      title: 'Sign Up',
      requiresAuth: false,
    },
  },
  {
    path: '/formstudent', //formstudent
    name: 'FormStudent',
    component: () => import('@/views/FormStudent.vue'),
    meta: {
      title: 'Form Student',
      requiresAuth: true,
    },
  },
  {
    path: '/selecteventtype',
    name: 'SelectEventType',
    component: () => import('@/views/SelectEventType.vue'),
    meta: {
      title: 'Select Event Type',
      requiresAuth: true,
    },
  },
  {
    path: '/sportevent',
    name: 'SportEvent',
    component: () => import('@/views/SportEvent.vue'),
    meta: {
      title: 'Sport Event',
      requiresAuth: true,
    },
  },
  {
    path: '/classevent',
    name: 'ClassEvent',
    component: () => import('@/views/ClassEvent.vue'),
    meta: {
      title: 'Class Event',
      requiresAuth: true,
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
    meta: { title: 'Grupos', requiresAuth: true },
  },
  {
    path: '/grupos/:id/dashboard',
    name: 'GrupoDashboard',
    component: () => import('@/views/GrupoDashboard.vue'),
    meta: { title: 'Dashboard del Grupo', requiresAuth: true },
  },
  {
    path: '/grupos/new',
    name: 'FormGroup',
    component: () => import('@/views/FormGroup.vue'),
    meta: { title: 'Crear Nuevo Grupo', requiresAuth: true },
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
router.beforeEach(async (to, from, next) => {
  // Update document title
  document.title = to.meta.title || 'USport'

  // Verificar si la ruta requiere autenticación
  if (to.meta.requiresAuth) {
    // Verificar autenticación usando Electron API si está disponible
    const isElectron = typeof window !== 'undefined' && window.electronAPI
    let isAuthenticated = false

    if (isElectron) {
      try {
        const result = await window.electronAPI.auth.checkAuth()
        isAuthenticated = result.isAuthenticated
      } catch (error) {
        console.error('Error checking auth:', error)
      }
    }

    if (!isAuthenticated) {
      // Redirigir al login si no está autenticado
      next('/')
    } else {
      next()
    }
  } else {
    // Si la ruta no requiere autenticación, permitir acceso
    next()
  }
})

export default router
