<template>
  <div class="sticky top-4">
    <TravelTotalFilter
      class="filter-card"
      :items="model"
      :count="count"
      @remove="handleRemove"
    />
    <TravelAvailablityFilter
      v-model:from="model.from"
      v-model:to="model.to"
      :range="options.availablity"
      :min="options.dateMin"
      :max="options.dateMin"
      class="filter-card"
    />
    <TravelThemeFilter v-model="model.tags" class="filter-card" :options="options.tags" />
    <TravelDestinationFilter v-model="model.destinations" :options="options.destinations" class="filter-card" />
    <TravelDurationFilter v-model="model.duration" :range="options.duration" />
  </div>
</template>
<script setup lang="ts">
import type { TravelFilterOptions, TravelFilters } from '@/types/travels'
import { TravelFilterModel } from '~/utils/models'
type Props = {
  modelValue: TravelFilters;
  options: TravelFilterOptions;
  count: number;
}
type Emits = {
  (e: 'update:modelValue', value: TravelFilters): void
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: {
    ...TravelFilterModel
  },
  options: () => ({
    availablity: {
      min: '',
      max: ''
    },
    duration: {
      min: 0,
      max: 0
    },
    tags: [],
    destinations: []
  })
})
const emit = defineEmits<Emits>()
const model = useVModel(props, 'modelValue', emit)
function handleRemove (item: {key: string; value: string}) {
  const { key, value } = item
  const filterItem = model.value[key]
  if (!filterItem) { return }
  if (Array.isArray(filterItem)) {
    const index = filterItem.findIndex(filter => value === filter)
    if (index > -1) {
      model.value[key].splice(index, 1)
    }
  } else {
    model.value[key] = TravelFilterModel[key]
  }
}
</script>
<style lang="scss">
.filter-card {
  @apply mb-4 pb-2;
  .v-card_body {
    @apply pb-4 max-h-52 overflow-y-auto;
  }
}
</style>
