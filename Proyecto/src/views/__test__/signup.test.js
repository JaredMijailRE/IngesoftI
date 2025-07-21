import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SignUp from '../SignUp.vue'

// Mock del router
const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush
  })
}))

// Mock del composable useAuth
vi.mock('../../composables/useAuth.js', () => ({
  useAuth: () => ({
    user: { value: null }
  })
}))

// Mock de window.electronAPI
global.window = {
  electronAPI: {
    auth: {
      signup: vi.fn()
    }
  }
}

describe('SignUp.vue', () => {
  it('debe renderizar el componente correctamente', () => {
    const wrapper = mount(SignUp)

    expect(wrapper.exists()).toBe(true)
    // Cambio h2 por h1 que es lo que realmente existe en el componente
    expect(wrapper.find('h1').text()).toContain('SportU')
    expect(wrapper.text()).toContain('Crea tu cuenta')
  })

  it('debe tener todos los campos necesarios', () => {
    const wrapper = mount(SignUp)

    expect(wrapper.find('input[placeholder="Correo"]').exists()).toBe(true)
    expect(
      wrapper.find('input[placeholder="Nombre de Usuario"]').exists()
    ).toBe(true)
    expect(wrapper.find('input[placeholder="Nombres"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Apellidos"]').exists()).toBe(true)
    expect(wrapper.find('input[type="date"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Genero"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Contraseña"]').exists()).toBe(true)
    expect(
      wrapper.find('input[placeholder="Verificar Contraseña"]').exists()
    ).toBe(true)
  })

  it('debe tener el botón de registrarse', () => {
    const wrapper = mount(SignUp)

    // Verificar que existe al menos un botón
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBeGreaterThan(0)
    
    // Verificar que el HTML del componente contiene el texto "Registrarse"
    expect(wrapper.html()).toContain('Registrarse')
  })

  it('debe enviar el formulario con datos válidos', async () => {
    // Mock de la respuesta exitosa del electronAPI
    const mockSignup = vi.fn().mockResolvedValue({
      success: true,
      user: { id: 1, username: 'usuario123' }
    })
    window.electronAPI.auth.signup = mockSignup

    const wrapper = mount(SignUp)

    // Simular datos del formulario directamente en las variables reactivas
    // Usar contraseña que pase todas las validaciones: minúscula, mayúscula, número
    wrapper.vm.email = 'test@example.com'
    wrapper.vm.username = 'usuario123'
    wrapper.vm.firstnames = 'Juan'
    wrapper.vm.lastnames = 'Pérez'
    wrapper.vm.birthdate = '2000-01-01'
    wrapper.vm.gender = 'Masculino'
    wrapper.vm.password = 'Password123'  // Contraseña válida: mayúscula, minúscula, número
    wrapper.vm.verifypassword = 'Password123'

    // Llamar directamente al método handleSubmit
    await wrapper.vm.handleSubmit()

    // Verificar que se llamó al mock con los datos correctos
    expect(mockSignup).toHaveBeenCalledWith({
      email: 'test@example.com',
      username: 'usuario123',
      firstnames: 'Juan',
      lastnames: 'Pérez',
      birthdate: '2000-01-01',
      gender: 'Masculino',
      password: 'Password123'
    })
  })
})
