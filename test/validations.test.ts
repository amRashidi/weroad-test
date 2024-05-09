import { describe, expect, it } from 'vitest'
import { emailRule, phoneRule, requiredRule } from '../utils/validations'

describe('render textfield correctly', () => {
  const items = [
    { label: 'valid email', fn: emailRule, value: 'amirrashidi.work@gmail.com', result: true },
    { label: 'invalid email', fn: emailRule, value: 'amirrashidi', result: false },
    { label: 'valid phone', fn: phoneRule, value: '989120356652', result: true },
    { label: 'invalid phone', fn: phoneRule, value: '123', result: false },
    { label: 'valid require', fn: requiredRule, value: 'valied', result: true },
    { label: 'invalid require', fn: requiredRule, value: undefined, result: 'field is required' }
  ]
  items.forEach(({ label, fn, value, result }) => {
    it(`should validate ${label}`, () => {
      expect(fn(value)).toBe(result)
    })
  })
})
