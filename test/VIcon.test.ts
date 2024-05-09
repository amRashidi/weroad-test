import { mount } from '@vue/test-utils'
import { describe, expect, it, beforeEach } from 'vitest'
import Icon from './../components/dls/VIcon.vue'

const defaultProps = {
  name: '',
  size: ''
}

const IconFactory = (props = {}) =>
  mount(Icon, {
    props: {
      ...defaultProps,
      ...props
    } as InstanceType<typeof Icon>['$props']
  })

describe('render Icon correctly', () => {
  let wrapper: ReturnType<typeof IconFactory> | null = null
  beforeEach(() => {
    wrapper = IconFactory()
  })
  it('should not render Icon', () => {
    expect(wrapper?.vm).toBeTruthy()
    expect(wrapper?.html()).toEqual('')
  })
  it('should render raw Icon correctly', async () => {
    wrapper?.setProps({ name: 'chev-right' })
    await nextTick()
    expect(wrapper?.classes()).toEqual(['v-icon', 'w-4', 'h-4'])
  })
  it('should render raw Icon correctly', async () => {
    wrapper?.setProps({ name: 'chev-right', size: '8' })
    await nextTick()
    expect(wrapper?.classes()).toEqual(['v-icon', 'w-8', 'h-8'])
  })
})
