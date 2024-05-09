<template>
  <component :is="component" />
</template>

<script setup lang="ts">
import { VIcon } from '#components'
type Props = {
  total?: number;
  value: number;
}

const props = withDefaults(defineProps<Props>(), {
  total: 5,
  value: 0
})

const component = computed(() =>
  h('div', { class: 'v-star' },
    Array(props.total).fill(null).map((_, i) => {
      const isEmpty = i >= props.value
      return h(VIcon, {
        name: `star${isEmpty ? '' : '-filled'}`,
        class: `w-5 h-5 v-star--${isEmpty ? 'empty' : 'filled'}`
      })
    }))
)
</script>

<style lang="scss">
.v-star {
  @apply flex gap-2 items-center;
  &--filled {
    @apply text-warning;
  }
  &--empty {
    @apply text-gray-500
  }
}
</style>
