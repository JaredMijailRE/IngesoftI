import { config } from '@vue/test-utils'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

// Mock de console para evitar ruido en tests
global.console = {
  ...console,
  log: vi.fn(),
  error: vi.fn(),
  warn: vi.fn()
} 