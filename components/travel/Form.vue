<template>
  <v-modal v-model="show" permanent>
    <AppNavigate title="Add Travel" divider shrink>
      <template #action>
        <v-btn icon="close-square" dense @click="show = false" />
      </template>
    </AppNavigate>

    <form novalidate @submit.prevent="onSubmit">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div v-for="{model, col=1, ...attrs} in items" :key="attrs.label" :class="`lg:col-span-${col}`">
          <v-text-field v-model="item[model]" v-bind="attrs" :error="errors[model]" />
        </div>
      </div>
      <div>
        <v-upload v-model="picture" class="mb-4" :accept="['jpg','jpeg','png','pdf']" />
        <v-btn color="primary" type="submit">
          Submit
        </v-btn>
      </div>
    </form>
  </v-modal>
</template>
<script lang="ts" setup>
import type { TravelItem, TravelResult } from '~/types/travels'

type Props = {
  item: TravelResult
  show: boolean
}
type Emits = {
  (e:'update:item', item: TravelResult): void
  (e:'update:show', show: boolean): void
  (e:'submit', values: TravelItem): void
}
const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const show = useVModel(props, 'show', emit)
const item = useVModel(props, 'item', emit)
const picture = ref(null)
const { handleSubmit, errors } = useForm<TravelItem>({
  initialValues: item,
  validateOnMount: false
})
const items = reactive([
  { model: 'name', name: 'name', label: 'name', col: 2, rules: [requiredRule] },
  { model: 'origin', name: 'origin', label: 'origin', rules: [requiredRule] },
  { model: 'destination', name: 'destination', label: 'destination', rules: [requiredRule] },
  { model: 'departureDate', name: 'departureDate', label: 'departure date', type: 'date', rules: [requiredRule] },
  { model: 'returnDate', name: 'returnDate', label: 'return date', type: 'date', rules: [requiredRule] },
  { model: 'price', type: 'number', name: 'price', label: 'price', rules: [requiredRule] },
  { model: 'tags', name: 'tags', label: 'tags', hint: 'Split Tags with comma', rules: [requiredRule] }
])

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>
