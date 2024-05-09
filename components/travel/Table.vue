<template>
  <v-table :headers="headers" :items="items" :loading="loading">
    <template #cell-picture="{row}">
      <img :src="row.picture" class="w-10 h-10 my-3">
    </template>
    <template #cell-actions>
      <slot name="actions" />
    </template>
  </v-table>
</template>

<script setup lang="ts">
type Props = {
  items: TravelResult[];
  loading?: boolean;
}
defineProps<Props>()

const { $dayjs } = useNuxtApp()

const headers = [
  { title: 'picture', key: 'picture', class: 'text-center', cellClass: 'text-center' },
  { title: 'name', key: 'name', class: 'text-center', cellClass: 'text-center' },
  { title: 'origin', key: 'origin', class: 'text-center', cellClass: 'text-center' },
  {
    title: 'destination',
    key: 'destination',
    class: 'text-center',
    cellClass: 'text-center',
    formatter: (destination: {label: string}) => {
      return destination.label
    }
  },
  {
    title: 'from',
    key: 'departureDate',
    class: 'text-center',
    cellClass: 'text-center',
    formatter: (date: string) => {
      return $dayjs(date).format('YYYY-MM-YY')
    }
  },
  {
    title: 'to',
    key: 'returnDate',
    class: 'text-center',
    cellClass: 'text-center',
    formatter: (date: string) => {
      return $dayjs(date).format('YYYY-MM-YY')
    }
  },
  { title: 'price', key: 'price', class: 'text-center', cellClass: 'text-center' },
  { title: 'reviews', key: 'reviews', class: 'text-center', cellClass: 'text-center' },
  { title: 'rating', key: 'rating', class: 'text-center', cellClass: 'text-center' },
  {
    title: 'tags',
    key: 'tags',
    class: 'text-center',
    cellClass: 'text-xs text-center',
    formatter: (tags: string[]) => {
      return tags.map(({ label }) => label).join(',')
    }
  },
  { title: 'actions', key: 'actions', class: 'text-center', cellClass: 'text-center' }
]

</script>
