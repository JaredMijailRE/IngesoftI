import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ExerciseForm from '../ExerciseForm.vue'

describe('ExerciseForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debe renderizar el formulario correctamente', () => {
    const wrapper = mount(ExerciseForm)

    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.findAll('select')).toHaveLength(4)
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').text()).toBe('Añadir Ejercicio')
  })

  it('debe tener los campos correctos', () => {
    const wrapper = mount(ExerciseForm)

    // Verificar que todos los campos están presentes
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('textarea').exists()).toBe(true)
    
    // Verificar que hay 4 selects (unidad, área de impacto, tipo, exigencia)
    const selects = wrapper.findAll('select')
    expect(selects).toHaveLength(4)
  })

  it('debe tener las opciones correctas en el select de unidad', () => {
    const wrapper = mount(ExerciseForm)
    
    const unitSelect = wrapper.findAll('select')[0]
    const options = unitSelect.findAll('option')
    
    expect(options[0].text()).toBe('Selecciona')
    expect(options[1].text()).toBe('Repeticiones')
    expect(options[2].text()).toBe('Distancia')
    expect(options[3].text()).toBe('Tiempo')
    expect(options[4].text()).toBe('Peso')
  })

  it('debe tener las opciones correctas en el select de área de impacto', () => {
    const wrapper = mount(ExerciseForm)
    
    const impactSelect = wrapper.findAll('select')[1]
    const options = impactSelect.findAll('option')
    
    expect(options[0].text()).toBe('Ninguna')
    expect(options[1].text()).toBe('Tronco Inferior')
    expect(options[2].text()).toBe('Tronco Superior')
    expect(options[3].text()).toBe('Tronco Medio')
    expect(options[4].text()).toBe('Cuerpo Completo')
  })

  it('debe tener las opciones correctas en el select de tipo', () => {
    const wrapper = mount(ExerciseForm)
    
    const typeSelect = wrapper.findAll('select')[2]
    const options = typeSelect.findAll('option')
    
    expect(options[0].text()).toBe('Ninguno')
    expect(options[1].text()).toBe('Fuerza')
    expect(options[2].text()).toBe('Resistencia')
    expect(options[3].text()).toBe('Elasticidad')
    expect(options[4].text()).toBe('Tonificación')
  })

  it('debe tener las opciones correctas en el select de exigencia', () => {
    const wrapper = mount(ExerciseForm)
    
    const exigencySelect = wrapper.findAll('select')[3]
    const options = exigencySelect.findAll('option')
    
    expect(options[0].text()).toBe('Ninguna')
    expect(options[1].text()).toBe('Baja')
    expect(options[2].text()).toBe('Media')
    expect(options[3].text()).toBe('Alta')
  })
})
