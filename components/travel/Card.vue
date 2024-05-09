<template>
  <v-card class="mb-4 shadow-sm lg:flex lg:items-center">
    <div class="lg:flex gap-4">
      <img :src="item.picture" :alt="item.name" loading="lazy" class="w-full lg:w-[150px] h-[140px] object-cover">
      <div class="py-4 lg:py-4 grow">
        <div class="flex gap-4">
          <div class="bg-primary text-white text-sm font-medium px-2 py-1 rounded-md capitalize">
            {{ tagItems }}
          </div>
          <span class="text-gray-300">|</span>
          <v-star :value="item.rating" />
        </div>
        <h2 class="my-5 capitalize text-lg font-medium">
          {{ item.name }}
        </h2>
        <div class="lg:flex lg:gap-2 lg:items-center text-sm font-normal">
          <template v-for="(spec,i) in TravelSpecs" :key="i">
            <div class="flex items-center gap-2 text-coolGray-900">
              <v-icon :name="spec.icon" class="w-4 h-4" />
              <span>{{ spec.value }}</span>
            </div>
            <div v-if="i < TravelSpecs.length - 1" class="px-2 text-gray-200">
              |
            </div>
          </template>
        </div>
      </div>
      <div class="flex lg:flex-col justify-between lg:justify-center items-center lg:px-4">
        <h5 class="text-primaryight font-medium lg:mt-4">
          {{ price }}
        </h5>
        <div class="text-gray-500 font-light text-xs">
          Per Person
        </div>
        <slot name="action" v-bind="{item}" />
      </div>
    </div>
  </v-card>
</template>
<script setup lang="ts">
import type { TravelItem } from '@/types/travels'
type Props = {
  item: TravelItem
}
const props = defineProps<Props>()
const dates = [props.item.departureDate, props.item.returnDate]
  .map(date => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })).join(' - ')
const routing = `${props.item.origin} - ${props.item.destination.label}`
const TravelSpecs = computed(() => {
  return [
    { icon: 'calendar', value: dates },
    { icon: 'route', value: routing }
    // { icon: 'message', value: reviews }
  ]
})
const price = computed(() => props.item.price.toLocaleString('en-US', { currency: 'USD', style: 'currency' }))
const tagItems = computed(() => props.item.tags.map(tag => tag.label).join(', '))
</script>
