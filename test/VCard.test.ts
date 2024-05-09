import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import Card from './../components/dls/VCard.vue'

const defaultProps = {
  title: undefined,
  flat: undefined,
  self: undefined
}

const defaultSlot = 'TEST'

const cardFactory = (props = {} as InstanceType<typeof Card>['$props']) =>
  mount(Card, {
    props: {
      ...defaultProps,
      ...props
    } as InstanceType<typeof Card>['$props'],
    slots: {
      default: () => defaultSlot
    }
  })

describe('render Card correctly', () => {
  let wrapper: ReturnType<typeof cardFactory> | null = null
  beforeEach(() => {
    wrapper = cardFactory({})
  })
  const modes = [
    { key: 'title', value: 'title', title: 'raw', className: 'v-card' },
    { key: 'flat', value: true, title: 'flat', className: 'v-card--flat' },
    { key: 'self', value: true, title: 'self', className: 'v-card--self' }
  ]
  modes.forEach(({ key, title, value, className }) => {
    it(`should render ${title} card correctly`, async () => {
      await wrapper?.setProps({ [key]: value })
      expect(wrapper?.vm).toBeTruthy()
      expect(wrapper?.classes()).toContain(className)
    })
  })
  it('should not render title slot', () => {
    expect(wrapper?.find('.v-card_title').exists()).toBe(false)
  })
  it('should render title slot correctly', () => {
    expect(wrapper?.html()).toContain(defaultSlot)
  })
})
