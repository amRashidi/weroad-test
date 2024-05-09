import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import CheckBox from './../components/dls/VCheckBox.vue'

const defaultProps = {
  disabled: undefined,
  hideDetails: undefined,
  modelValue: '',
  name: 'name'
}

const checkBoxFactory = (props = {} as InstanceType<typeof CheckBox>['$props']) =>
  mount(CheckBox, {
    props: {
      ...defaultProps,
      ...props
    } as InstanceType<typeof CheckBox>['$props'],
    slots: {
      default: () => defaultSlot
    }
  })

describe('render CheckBox correctly', () => {
  let wrapper: ReturnType<typeof checkBoxFactory> | null = null
  beforeEach(() => {
    wrapper = checkBoxFactory({})
  })
  const modes = [
    { key: 'disabled', title: 'disabled', className: 'v-checkbox--disabled' },
    { key: 'hideDetails', title: 'hide details', className: 'v-checkbox--hide-detailes' }
  ]
  modes.forEach(({ key, title, className }) => {
    it(`should render checkbox with ${title} correctly`, async () => {
      await wrapper?.setProps({ [key]: true })
      expect(wrapper?.vm).toBeTruthy()
      expect(wrapper?.classes()).toContain(className)
    })
  })
  it('should render label correctly', async () => {
    await wrapper?.setProps({ label: 'label' })
    expect(wrapper?.find('.v-checkbox__label').html()).contain('label')
  })
  it('should render label correctly', async () => {
    await wrapper?.setProps({ hint: 'hint' })
    expect(wrapper?.find('.v-checkbox__detail').html()).contain('hint')
  })
})

describe('render checkbox input correctly', () => {
  let wrapper: ReturnType<typeof checkBoxFactory> | null = null
  beforeEach(() => {
    wrapper = checkBoxFactory({})
  })
  const properties = [
    { key: 'name', title: 'name', value: 'name' },
    { key: 'value', title: 'value', value: 'value' },
    { key: 'disabled', title: 'disabled', value: true }
  ]
  properties.forEach(({ key, title, value }) => {
    it(`should render checkbox with ${title} attribute correctly`, async () => {
      await wrapper?.setProps({ [key]: value })
      expect(wrapper?.find('input').attributes()[key]).toBeDefined()
    })
  })
})
