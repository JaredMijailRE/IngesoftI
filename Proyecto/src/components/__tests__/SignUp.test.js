import { describe, it, expect } from 'vitest'

describe('Validaciones de Signup', () => {
  it('debe validar formato de correo electrónico', () => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
    
    // Casos válidos
    expect(emailRegex.test('test@email.com')).toBe(true)
    expect(emailRegex.test('user.name@domain.co.uk')).toBe(true)
    expect(emailRegex.test('test123@example.org')).toBe(true)
    
    // Casos inválidos
    expect(emailRegex.test('correo-invalido')).toBe(false)
    expect(emailRegex.test('test@')).toBe(false)
    expect(emailRegex.test('@domain.com')).toBe(false)
    expect(emailRegex.test('test.domain')).toBe(false)
  })

  it('debe validar contraseña con requisitos mínimos', () => {
    const validatePassword = (password) => {
      if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres.'
      if (!/[a-z]/.test(password)) return 'Debe contener al menos una letra minúscula.'
      if (!/[A-Z]/.test(password)) return 'Debe contener al menos una letra mayúscula.'
      if (!/\d/.test(password)) return 'Debe contener al menos un número.'
      return null
    }
    
    // Casos inválidos
    expect(validatePassword('PASSWORD123')).toBe('Debe contener al menos una letra minúscula.')
    expect(validatePassword('password123')).toBe('Debe contener al menos una letra mayúscula.')
    expect(validatePassword('Password')).toBe('Debe contener al menos un número.')
    expect(validatePassword('123')).toBe('La contraseña debe tener al menos 8 caracteres.')
    
    // Caso válido
    expect(validatePassword('Password123')).toBe(null)
  })

  it('debe validar que las contraseñas coincidan', () => {
    const validatePasswordMatch = (password, confirmPassword) => {
      if (!confirmPassword) return 'Debes confirmar la contraseña.'
      if (password !== confirmPassword) return 'Las contraseñas no coinciden.'
      return null
    }
    
    // Casos inválidos
    expect(validatePasswordMatch('Password123', '')).toBe('Debes confirmar la contraseña.')
    expect(validatePasswordMatch('Password123', 'Password456')).toBe('Las contraseñas no coinciden.')
    
    // Caso válido
    expect(validatePasswordMatch('Password123', 'Password123')).toBe(null)
  })
})
