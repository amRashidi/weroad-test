<template>
  <component :is="component" v-bind="attributes">
    <v-icon v-if="icon" :name="icon" />
    <slot />
  </component>
</template>
<script setup lang="ts">
import type { RouteLocationRaw } from '#vue-router'
import type IconList from '@/assets/icon'

interface Props {
  variant?: 'main' | 'link';
  color?: 'primary' | 'secondary' | 'default';
  rounded?: boolean;
  loading?: boolean;
  disabled?: boolean;
  dense?: boolean;
  to?: RouteLocationRaw | null;
  icon?: keyof typeof IconList | null;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'main',
  color: 'default',
  rounded: undefined,
  loading: undefined,
  to: undefined,
  icon: undefined
})

const component = computed(() => props.to ? defineNuxtLink({}) : 'button')

const classes = computed(() => ([
  'v-btn',
  `v-btn__${props.variant}`,
  `v-btn__${props.color}`,
  {
    'v-btn--rounded': props.rounded,
    'v-btn--disabled': props.disabled || props.loading,
    'v-btn--loading': props.loading,
    'v-btn--dense': props.dense,
    'v-btn--extended': !(props.rounded || props.dense)
  }
]))

const attributes = computed(() => ({
  role: props.to ? 'link' : 'button',
  disabled: props.disabled ?? undefined,
  to: props.to,
  class: classes.value
}))
</script>
<style lang="scss">
.v-btn {
  @apply flex gap-4 items-center justify-center rounded-md transition-all duration-300 ease-linear uppercase relative text-sm lg:text-base;
  &--dense {
    @apply p-0;
  }
  &--rounded {
    @apply p-1 w-8 h-8;
  }
  &--extended {
    @apply min-h-10 min-w-28 px-3 py-1;
  }
  &:hover {
    @apply opacity-85 ;
  }
  &__default {
    @apply bg-transparent hover:bg-gray-50;
  }
  &__primary {
    @apply bg-secondary text-white;
  }
  &__danger {
    @apply bg-error text-white;
  }
  &__secondary {
    @apply bg-primary text-white;
  }
  &--loading {
    @apply opacity-50;
  }
}
</style>
