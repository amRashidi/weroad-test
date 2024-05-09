import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Button from './../components/dls/VBtn.vue'

const defaultProps = {
  variant: 'main',
  color: 'primary',
  size: 'nl'
}

const btnFactory = (props = {}) =>
  mount(Button, {
    props: {
      ...defaultProps,
      ...props
    } as InstanceType<typeof Button>['$props'],
    slots: {
      default: () => 'TEST'
    }
  })

describe('render as button', () => {
  it('should not have link attrs', async () => {
    const button = btnFactory()
    expect(button?.vm).toBeTruthy()
    expect(button.attributes('href')).toBeFalsy()
    expect(button.attributes('rel')).toBeFalsy()
    expect(button.attributes('target')).toBeFalsy()
    await button.setProps({ disabled: true })
    expect(button.attributes('disabled')).toBeDefined()
  })
})

describe('render as an anchor tag', () => {
  it('should render external link correctly', () => {
    const link = btnFactory({ to: 'https://weroad.com/' })
    expect(link?.vm).toBeTruthy()
    expect(link.attributes('href')).toEqual('https://weroad.com/')
    expect(link.attributes('role')).toBe('link')
    expect(link.attributes('rel')).toBe('noopener noreferrer')
  })

  it('should internal link correctly', () => {
    const link = btnFactory({ to: '/' })
    expect(link?.vm).toBeTruthy()
    expect(link.attributes('to')).toEqual('/')
    expect(link.attributes('role')).toBe('link')
  })
})

const variants = [['main'], ['link']]
const colors = [['primary'], ['secondary'], ['simple']]

describe('styles', () => {
  it.each(variants)('should render variant %s', (variant) => {
    const button = btnFactory({ variant })
    expect(button.classes()).toContain(`v-btn__${variant}`)
  })

  it.each(colors)('should render color %s', (color) => {
    const button = btnFactory({ color })
    expect(button.classes()).toContain(`v-btn__${color}`)
  }
  )

  it('should render correctly with disabled attr', () => {
    const button = btnFactory({ disabled: true })
    expect(button.classes()).toContain('v-btn--disabled')
  })

  it('should render correctly with dense style', () => {
    const button = btnFactory({ dense: true })
    expect(button.classes()).toContain('v-btn--dense')
  })
})
