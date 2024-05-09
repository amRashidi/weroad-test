<template>
  <div :class="classes">
    <label v-if="label" :for="name" class="v-textarea_label">{{ label }}</label>
    <textarea v-model="localValue" v-bind="inputAttrs" />
    <small v-if="showDetail">{{ hint }}</small>
  </div>
</template>
<script setup lang="ts">
interface Props {
  modelValue: string | number;
  placeholder?: string;
  name: string;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
}
interface Emit {
  (event: 'update:modelValue'): Props['modelValue'];
  (event: 'change'): void;
  (event: 'focus'): void;
  (event: 'blur'): void;
}
const props = defineProps<Props>()
const emits = defineEmits<Emit>()

const localValue = computed({
  get: () => {
    return props.modelValue
  },
  set: (value) => {
    emits('update:modelValue', value)
  }
})

const showDetail = computed(() => !!props.hint || !!props.error)

const inputAttrs = computed(() => ({
  modelValue: props.modelValue,
  name: props.name,
  disabled: props.disabled,
  placeholder: props.placeholder,
  class: 'v-textarea_input',
  blur () {
    emits('blur', localValue.value)
  },
  focus () {
    emits('focus', localValue.value)
  }
}))

const classes = computed(() => ([
  'v-textarea',
  {
    'v-textarea--disabled': props.disabled,
    'v-textarea--error': props.error
  }
]))
</script>
<style lang="scss" scoped>
.v-textarea {
  @apply relative w-full;
  &:not(.v-textarea--hide-detailes) {
    @apply mb-6;
  }
  &_label {
    @apply block mb-1.5 w-full capitalize font-light w-full block;
  }
  &_input {
    @apply bg-transparent bg-gray-50 h-full grow outline-0 w-full min-h-40 resize-none p-4;
    &::placeholder {
    @apply text-sm font-light;
    }
  }
}
</style>
