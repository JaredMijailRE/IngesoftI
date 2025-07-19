import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MainPage from '../Main.vue'



describe('MainPage', () => {
  it('debe renderizar el componente correctamente', () => {
    const wrapper = mount(MainPage, {
      global: {
        mocks: {
          user: { 
            username: 'admin',
            grupos: [],
            eventos: []
           }
        }
      }
    })

    expect(wrapper.text()).toContain('Welcome, admin')
    expect(wrapper.text()).toContain('Grupos')
    expect(wrapper.text()).toContain('Eventos')
  })

  it('debe mostrar mensaje de que no hay grupos asignados si la lista está vacía', () => {
    const wrapper = mount(MainPage, {
      global: {
        mocks: {
          user: { 
            username: 'admin',
            grupos: [],
            eventos: []
           }
        }
      }
    })

    expect(wrapper.text()).toContain('No tienes grupos asignados')
  })

  it('debe mostrar mensaje de que no hay eventos si la lista está vacía', () => {
    const wrapper = mount(MainPage, {
      global: {
        mocks: {
          user: { 
            username: 'admin',
            grupos: [],
            eventos: []
           }
        }
      }
    })

    expect(wrapper.text()).toContain('No tienes eventos programados')
  })
})
