<template>
  <v-card :title="`results: ${count}`">
    <v-btn
      v-for="({label, value, key},i) in activeFilters"
      :key="i"
      color="primary"
      icon="trash"
      class="!text-xs mb-2 !min-h-2"
      @click="emit('remove', {value, key})"
    >
      {{ label }}: {{ value }}
    </v-btn>
  </v-card>
</template>
<script setup lang="ts">
import type { TravelFilters } from '~/types/travels'

type Props = {
  count: number;
  items: TravelFilters
}
type Emits = {
  (e: 'remove', p: {value: string, key: string}):void
}
const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const activeFilters = computed(() => {
  return [
    !!props.items.from && { label: 'from', value: props.items.from, key: 'from' },
    !!props.items.to && { label: 'to', value: props.items.to, key: 'to' },
    !!props.items.duration && { label: 'duration', value: props.items.duration, key: 'duration' },
    ...props.items.destinations.map(item => ({
      label: 'destination',
      value: item,
      key: 'destinations'
    })),
    ...props.items.tags.map(item => ({
      label: 'themes',
      value: item,
      key: 'tags'
    }))
  ].filter(Boolean)
})
</script>
