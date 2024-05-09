<template>
  <div>
    <v-text-field v-model="travel" name="select-travel" class="mb-10" label="Select Travel" placeholder="Enter Travel Name ..." />
    <div class="travels">
      <TravelList v-if="travel && items?.length" :items="items" :loading="pending" class="mx-3" @click-item="handleSelectItem" />
      <div v-else class="travels--empty">
        please Select a Travel
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TravelItem } from '~/types/travels'

type Props = {
  modelValue: string;
  defaultName?: string
}
type Emits = {
  (e: 'update:modelValue', value: string): void
  (e: 'select'): void
}
const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const model = useVModel(props, 'modelValue', emit)
const travel = ref('')
function handleSelectItem (item: TravelItem) {
  model.value = item.id
  emit('select')
}
const { data: items, execute, pending } = useAPI<{items: TravelItem[]}>('/travels', {
  key: 'find-travel-item',
  query: {
    search: travel
  },
  lazy: true,
  transform: res => res?.items.map(item => travelTransformer(item)) ?? []
})

onMounted(() => {
  travel.value = props.defaultName || ''
})

watchDebounced(
  travel,
  () => (travel.value && travel.value.length > 1) && execute(),
  { debounce: 500, maxWait: 100 }
)

</script>
<style lang="scss" scoped>
.travels {
  &--empty {
    @apply border border-dashed border-gray-300 text-gray-700 py-10 text-center text-sm capitalize my-10;
  }

}
</style>
