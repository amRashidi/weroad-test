<template>
  <div :class="classes">
    <label class="v-checkbox__label">
      <input v-model="model" v-bind="inputAttrs">
      {{ label }}
    </label>
    <small v-if="detail" class="v-checkbox__detail">{{ detail }}</small>
  </div>
</template>
<script setup lang="ts">
import { useField } from 'vee-validate'

interface Props {
  modelValue: string | string[];
  value?: string;
  name: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  hideDetails?: boolean;
  hint?: string;
}
interface Emit {
  (event: 'update:modelValue'): Props['modelValue'];
  (event: 'change'): void;
  (event: 'focus'): void;
  (event: 'blur'): void;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  value: undefined,
  name: 'input',
  label: undefined,
  error: undefined,
  disabled: undefined,
  hint: undefined
})
const emits = defineEmits<Emit>()
const model = useVModel(props, 'modelValue', emits)
const name = toRef(props, 'name')
const {
  checked,
  errorMessage,
  handleBlur,
  handleChange,
  meta
} = useField(name, undefined, {
  checkedValue: props.value,
  type: 'checkbox'
})
const isFocued = ref(false)

const detail = computed(() => !props.hideDetails && (errorMessage.value || props.hint))

const inputAttrs = computed(() => ({
  modelValue: props.modelValue,
  value: props.value,
  checked: checked?.value,
  name: name.value,
  type: 'checkbox',
  disabled: props.disabled,
  class: 'v-checkbox__input',
  onInput () {
    handleChange(props.value)
  },
  onFocus () {
    emits('focus', isFocued.value)
  },
  onBlur (e: FocusEvent) {
    handleBlur(e)
    emits('blur', isFocued.value)
  }
}))

const classes = computed(() => ([
  'v-checkbox',
  {
    'v-checkbox--disabled': props.disabled,
    'v-checkbox--hide-detailes': props.hideDetails,
    'v-checkbox--error': !meta.valid
  }
]))
</script>

<style lang="scss">
.v-checkbox {
  @apply relative w-full;
  &:not(.v-checkbox--hide-detailes) {
    @apply mb-6;
  }
  &__label {
    @apply flex gap-4 mb-1 w-full;
  }
  &__wrapper {
    @apply flex gap-2 items-center rounded-md px-3 py-4 outline-0 bg-gray-50 w-full focus:border-gray-200 h-10;
    transition: border-color 0.3s ease-in-out, color 0.3s ease-in-out,
    background-color 0.3s ease-in-out;
  }
  &__input {
    @apply bg-transparent;
  }
}

</style>
