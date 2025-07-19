import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MainPage from '../MainPage.vue'

describe('MainPage', () => {
  it('debe mostrar el saludo con el nombre del usuario', () => {
    const wrapper = mount(MainPage, {
      props: {
        user: { username: 'admin' },
        grupos: [],
        eventos: [],
      },
    })

    expect(wrapper.text()).toContain('Welcome, admin!')
  })

  it('debe mostrar mensaje de que no hay grupos asignados si la lista está vacía', () => {
    const wrapper = mount(MainPage, {
      props: {
        user: { username: 'admin' },
        grupos: [],
        eventos: [],
      },
    })

    expect(wrapper.text()).toContain('No tienes grupos asignados')
  })

  it('debe mostrar mensaje de que no hay eventos si la lista está vacía', () => {
    const wrapper = mount(MainPage, {
      props: {
        user: { username: 'admin' },
        grupos: [],
        eventos: [],
      },
    })

    expect(wrapper.text()).toContain('No tienes eventos programados')
  })
})
