import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PlanEntrenamientoForm from '../PlanEntrenamientoForm.vue'

// Mock del composable useApi
const mockCreatePlan = vi.fn()
const mockLoading = { value: false }
const mockError = { value: null }

vi.mock('@/composables/useApi', () => ({
  useApi: () => ({
    createPlan: mockCreatePlan,
    loading: mockLoading,
    error: mockError,
  }),
}))

describe('PlanEntrenamientoForm', () => {
  const mockEjercicios = [
    { id: 1, name: 'Flexiones' },
    { id: 2, name: 'Sentadillas' },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    mockLoading.value = false
    mockError.value = null
  })

  it('debe renderizar el formulario correctamente', () => {
    const wrapper = mount(PlanEntrenamientoForm, {
      props: { ejercicios: mockEjercicios },
    })

    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('select').exists()).toBe(true)
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
    expect(wrapper.findAll('input[type="checkbox"]')).toHaveLength(2)
  })

  it('debe validar campos requeridos', async () => {
    const wrapper = mount(PlanEntrenamientoForm, {
      props: { ejercicios: mockEjercicios },
    })

    // Intentar enviar sin datos
    await wrapper.find('form').trigger('submit')
    expect(mockError.value).toBe('El nombre es requerido')

    // Llenar solo nombre
    await wrapper.find('input[type="text"]').setValue('Plan de prueba')
    await wrapper.find('form').trigger('submit')
    expect(mockError.value).toBe('El tipo es requerido')
  })

  it('debe enviar datos correctos cuando el formulario es válido', async () => {
    mockCreatePlan.mockResolvedValue({ id: 1 })

    const wrapper = mount(PlanEntrenamientoForm, {
      props: { ejercicios: mockEjercicios },
    })

    // Llenar formulario
    await wrapper.find('input[type="text"]').setValue('Plan de prueba')
    await wrapper.find('select').setValue('Fuerza')
    await wrapper.find('textarea').setValue('Descripción del plan')

    // Seleccionar ejercicio
    await wrapper.findAll('input[type="checkbox"]')[0].setChecked()

    // Enviar formulario
    await wrapper.find('form').trigger('submit')

    // Verificar datos enviados
    expect(mockCreatePlan).toHaveBeenCalledWith({
      name: 'Plan de prueba',
      type: 'Fuerza',
      description: 'Descripción del plan',
      ejercicios: [1],
    })
  })

  it('debe emitir evento created y resetear formulario al crear exitosamente', async () => {
    mockCreatePlan.mockResolvedValue({ id: 1 })

    const wrapper = mount(PlanEntrenamientoForm, {
      props: { ejercicios: mockEjercicios },
    })

    // Llenar y enviar formulario
    await wrapper.find('input[type="text"]').setValue('Plan de prueba')
    await wrapper.find('select').setValue('Fuerza')
    await wrapper.find('form').trigger('submit')

    // Verificar evento emitido
    expect(wrapper.emitted('created')).toBeTruthy()

    // Verificar que se reseteó el formulario
    expect(wrapper.find('input[type="text"]').element.value).toBe('')
    expect(wrapper.find('select').element.value).toBe('')
  })

  it('debe mostrar estado de carga correctamente', async () => {
    mockLoading.value = true

    const wrapper = mount(PlanEntrenamientoForm, {
      props: { ejercicios: mockEjercicios },
    })

    const submitButton = wrapper.find('button[type="submit"]')
    expect(submitButton.text()).toBe('Creando...')
    expect(submitButton.attributes('disabled')).toBeDefined()
  })
})
