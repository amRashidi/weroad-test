<template>
  <div :class="classes">
    <label v-if="label" :for="name" class="v-textfield__label">{{ label }}</label>
    <div class="v-textfield__wrapper">
      <slot name="prefix" />
      <input v-bind="inputAttrs">
      <slot name="suffix" />
    </div>
    <small v-if="detail" class="v-textfield__detail">{{ detail }}</small>
  </div>
</template>
<script setup lang="ts">
import { useField } from 'vee-validate'
import type { inputTypes } from '~/types/input'

interface Props {
  modelValue: string | number | null | undefined;
  placeholder?: string;
  name: string;
  type?: inputTypes;
  label?: string;
  hint?: string;
  error?: string;
  loading?: boolean;
  disabled?: boolean;
  hideDetails?: boolean;
  readonly?: boolean;
  rules?: () => boolean
  min?: string;
  max?: string;
}
interface Emit {
  (event: 'update:modelValue'): Props['modelValue'];
  (event: 'change'): void;
  (event: 'focus'): void;
  (event: 'blur'): void;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  placeholder: undefined,
  name: 'input',
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
})
const emits = defineEmits<Emit>()
const name = toRef(props, 'name')
const {
  value: inputValue,
  handleBlur,
  handleChange,
  errorMessage,
  meta
} = useField(name, props.rules, {
  controlled: props.controlled,
  initialValue: props.modelValue
})
const isFocused = ref(false)

const detail = computed(() => !props.hideDetails && (props.error || errorMessage.value || props.hint))

const inputAttrs = computed(() => ({
  value: inputValue.value,
  name: name.value,
  type: props.type,
  disabled: props.disabled,
  placeholder: props.placeholder,
  readonly: props.readonly,
  min: props.min,
  max: props.max,
  autocomplete: 'off',
  class: 'v-textfield__input',
  onInput (e: Event) {
    handleChange(e)
    emits('update:modelValue', inputValue.value)
  },
  onFocus () {
    isFocused.value = true
    emits('focus', isFocused.value)
  },
  onBlur (e: FocusEvent) {
    handleBlur(e)
    isFocused.value = false
    emits('blur', isFocused.value)
  }
}))

const classes = computed(() => ([
  'v-textfield',
  {
    'v-textfield--disabled': props.disabled || props.loading,
    'v-textfield--loading': props.loading,
    'v-textfield--hide-detailes': props.hideDetails,
    'v-textfield--hasValue': inputValue.value,
    'v-textfield--focused': isFocused.value,
    'v-textfield--error': (!!errorMessage.value || !meta.valid) && meta.validated
  }
]))
watch(() => props.modelValue, (next) => {
  inputValue.value = next
})
</script>

<style lang="scss">
.v-textfield {
  @apply relative w-full;
  &:not(.v-textfield--hide-detailes) {
    @apply mb-6;
  }
  &__label {
    @apply block mb-1.5 w-full capitalize font-light;
  }
  &__wrapper {
    @apply flex gap-2 items-center rounded-md outline-0 px-3 bg-gray-50 w-full h-10 border border-transparent;
    transition: border-color 0.3s linear, color 0.3s linear,
    background-color 0.3s linear;
  }
  &__input {
    @apply bg-transparent h-full grow outline-0;
    &::placeholder {
    @apply text-sm font-light;
    }
  }
  &__detail {
    @apply text-xs;
  }
  &--hasValue {
    .v-textfield__wrapper {
      @apply border-gray-100;
    }
  }
  &--focused {
    .v-textfield__wrapper {
      @apply border-gray-400;
    }
  }
  &--error {
    @apply text-error;
    .v-textfield__wrapper {
      @apply  border-error;
    }
  }
}
</style>
