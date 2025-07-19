import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import LogIn from '../LogIn.vue'

// Mock del composable useAuth
const mockLogin = vi.fn()
const mockLogout = vi.fn()
const mockIsLoading = { value: false }
const mockError = { value: null }
const mockUser = { value: null }

describe('LogIn', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockIsLoading.value = false
    mockError.value = null
    mockUser.value = null
  })

  it('debe renderizar el componente correctamente', () => {
    const wrapper = mount(LogIn)
    
    // Verificar que el componente se renderiza
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h2').text()).toBe('USport')
    expect(wrapper.find('p').text()).toBe('Iniciar Sesión')
  })

  
}) 