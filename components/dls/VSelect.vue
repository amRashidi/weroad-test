<template>
  <div ref="selectRef" :class="classes" @click="handleClick" @keydown="handelMove">
    <v-menu v-model="isFocused">
      <template #activator>
        <v-text-field v-model="model" v-bind="selectAttrs" class="v-select__input" readonly>
          <template #suffix>
            <v-icon :name="`arrow-${isFocused ? 'up' : 'down'}`" />
          </template>
        </v-text-field>
      </template>
      <v-list :items="options" :active="selectedIndex" @select="handelSelectItem">
        <template #list-item="item">
          <slot name="list-item" v-bind="{item}">
            {{ item.label }}
          </slot>
        </template>
      </v-list>
    </v-menu>
  </div>
</template>
<script setup lang="ts">

interface Props {
  modelValue: string | number | null | undefined;
  placeholder?: string;
  name: string;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  hideDetails?: boolean;
  items: Array;
  valueKey?: string;
  labelKey?: string;
}
interface Emit {
  (event: 'update:modelValue', value: Props['modelValue']): void;
  (event: 'change'): void;
  (event: 'focus'): void;
  (event: 'blur'): void;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  placeholder: undefined,
  name: 'input',
  label: undefined,
  hint: undefined,
  error: undefined,
  disabled: undefined,
  hideDetails: undefined,
  valueKey: 'value',
  labelKey: 'label'
})
const selectRef = ref()
const emits = defineEmits<Emit>()
const model = useVModel(props, 'modelValue', emits)
const name = toRef(props, 'name')
const isFocused = ref(false)
const selectAttrs = computed(() => ({
  name: name.value,
  label: props.label,
  type: 'text',
  disabled: props.disabled,
  placeholder: props.placeholder,
  hideDetails: props.hideDetails,
  class: 'v-textfield__input',
  onFocus (e: boolean) {
    if (props.disabled) { return }
    isFocused.value = true
    emits('focus', e)
  },
  onBlur (e: FocusEvent) {
    isFocused.value = false
    emits('blur', e)
  }
}))
const options = computed(() => props.items.map(item => ({
  ...(typeof item === 'object' ? item : {}),
  label: typeof item === 'object' ? item[props.labelKey] : item,
  value: typeof item === 'object' ? item[props.valueKey] : item
})))
const classes = computed(() => ([
  'v-select',
  {
    'v-select--disabled': props.disabled
  }
]))

const selectedIndex = computed(() => {
  const selectedItem = options.value.findIndex(({ value }) => model.value === value)
  return selectedItem
})

function handleClick () {
  isFocused.value = true
}

function handelMove (e: KeyboardEvent) {
  return e
  // const { key } = e
  // if (key.toLowerCase() === 'arrowdown') {

  // }
}

function handelSelectItem (item: keyof typeof options.value) {
  model.value = item.value
}

onClickOutside(selectRef, () => {
  isFocused.value = false
}, { capture: false })

</script>
<style lang="scss">
.v-select {
  @apply cursor-pointer relative;
  &__input {
    @apply pointer-events-none grow-0 shrink-0;
  }
}
</style>
