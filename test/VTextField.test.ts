import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import VTextField from './../components/dls/VTextField.vue'

const defaultProps = {
  modelValue: undefined,
  placeholder: undefined,
  name: 'textfield',
  type: 'text',
  label: undefined,
  hint: undefined,
  error: undefined,
  disabled: undefined,
  loading: undefined,
  hideDetails: undefined,
  readonly: undefined,
  rules: undefined,
  min: undefined,
  max: undefined
}

const textFieldFactory = (props = {} as InstanceType<typeof VTextField>['$props']) =>
  mount(VTextField, {
    props: {
      ...defaultProps,
      ...props
    } as InstanceType<typeof VTextField>['$props'],
    slots: {
      prefix: () => 'prefix',
      suffix: () => 'suffix'
    }
  })

describe('render textfield correctly', () => {
  let wrapper: ReturnType<typeof textFieldFactory> | null = null
  beforeEach(() => {
    wrapper = textFieldFactory({})
  })
  const slots = ['prefix', 'suffix']
  slots.forEach((slot) => {
    it(`should render ${slot} slot correctly`, () => {
      expect(wrapper?.find('.v-textfield__wrapper').html()).toContain(slot)
    })
  })
  const modes = [
    { key: 'loading', title: 'loading', value: true, className: 'v-textfield--disabled' },
    { key: 'disabled', title: 'disabled', value: true, className: 'v-textfield--disabled' },
    { key: 'loading', title: 'loading', value: true, className: 'v-textfield--loading' },
    { key: 'hideDetails', title: 'hide detailes', value: true, className: 'v-textfield--hide-detailes' },
    { key: 'modelValue', title: 'value', value: 'value', className: 'v-textfield--hasValue' }
  ]
  modes.forEach(({ key, title, value, className }) => {
    it(`should render textfield with ${title} correctly`, async () => {
      await wrapper?.setProps({ [key]: value })
      expect(wrapper?.vm).toBeTruthy()
      expect(wrapper?.classes()).toContain(className)
    })
  })
  it('should render label correctly', async () => {
    await wrapper?.setProps({ label: 'label' })
    expect(wrapper?.find('.v-textfield__label').html()).contain('label')
  })
  it('should render label correctly', async () => {
    await wrapper?.setProps({ hint: 'hint' })
    expect(wrapper?.find('.v-textfield__detail').html()).contain('hint')
  })
  it('should focused correctly', async () => {
    const input = wrapper.find('input')
    await input.trigger('focus')
    expect(wrapper?.classes()).toContain('v-textfield--focused')
  })
})
