<template>
  <v-card title="availablity" class="mb-6">
    <v-text-field
      v-model="from"
      type="date"
      label="From"
      name="availablity-from"
      :min="range.min"
      :max="range.max"
      hide-details
      class="mt-4"
    />
    <v-text-field
      v-model="to"
      type="date"
      label="to"
      name="availablity-to"
      :min="range.min"
      :max="range.max"
      hide-details
      class="mt-4"
    />
  </v-card>
</template>
<script setup lang="ts">
import type { TravelDurationFilter, TravelFilterOptions } from '~/types/travels'
type Props = TravelDurationFilter &{
  range: Pick<TravelFilterOptions, 'duration'>
}
type Emits = {
  (e: 'update:from', value: TravelDurationFilter): void
  (e: 'update:to', value: TravelDurationFilter): void
}
const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const from = useVModel(props, 'from', emit)
const to = useVModel(props, 'to', emit)
</script>
