import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SignUp from '../SignUp.vue'

describe('SignUp.vue', () => {
  it('debe renderizar el componente correctamente', () => {
    const wrapper = mount(SignUp)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h2').text()).toContain('SportU')
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

    const registerBtn = wrapper.find('button')
    expect(registerBtn.exists()).toBe(true)
    expect(registerBtn.text()).toBe('Registrarse')
  })
  it('debe enviar el formulario con datos válidos', async () => {
    const mockSubmit = vi.fn()

    const wrapper = mount(SignUp, {
      methods: {
        onSubmit: mockSubmit, // si usas un <form @submit="onSubmit">
      },
    })

    // Rellenar los campos simulando typing
    await wrapper
      .find('input[placeholder="Correo"]')
      .setValue('test@example.com')
    await wrapper
      .find('input[placeholder="Nombre de Usuario"]')
      .setValue('usuario123')
    await wrapper.find('input[placeholder="Nombres"]').setValue('Juan')
    await wrapper.find('input[placeholder="Apellidos"]').setValue('Pérez')
    await wrapper.find('input[type="date"]').setValue('2000-01-01')
    await wrapper.find('input[placeholder="Genero"]').setValue('Masculino')
    await wrapper.find('input[placeholder="Contraseña"]').setValue('12345678')
    await wrapper
      .find('input[placeholder="Verificar Contraseña"]')
      .setValue('12345678')

    // Hacer click en el botón de registro
    await wrapper.find('button').trigger('click')

    // Validar que se llamó a la función de envío
    expect(mockSubmit).toHaveBeenCalled()
  })
})
