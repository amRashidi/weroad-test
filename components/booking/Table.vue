<template>
  <v-table :headers="headers" :items="items" :loading="loading">
    <template #cell-actions="item">
      <slot name="actions" v-bind="{...item.row}" />
    </template>
  </v-table>
</template>

<script setup lang="ts">

type Props = {
  items: TravelResult[];
  loading?: boolean;
}

const { $dayjs } = useNuxtApp()

defineProps<Props>()

const headers = [
  { title: 'Travel', key: 'travel', class: 'text-center', cellClass: 'max-w-[200px] truncate text-center' },
  { title: 'route', key: 'route', class: 'text-center', cellClass: 'text-center' },
  {
    title: 'From',
    key: 'departureDate',
    class: 'text-center',
    cellClass: 'text-center',
    formatter: (date: string) => {
      return $dayjs(date).format('YYYY-MM-YY')
    }
  },
  {
    title: 'To',
    key: 'returnDate',
    class: 'text-center',
    cellClass: 'text-center',
    formatter: (date: string) => {
      return $dayjs(date).format('YYYY-MM-YY')
    }
  },
  {
    title: 'total price',
    key: 'price',
    class: 'text-center',
    cellClass: 'text-center',
    formatter: (price: number) => {
      return price.toLocaleString('en-US', { currency: 'USD', style: 'currency' })
    }
  },
  { title: 'Status', key: 'status', cellClass: 'text-center' },
  { title: 'note', key: 'note', class: 'text-center', cellClass: 'text-center' },
  { title: 'actions', key: 'actions', class: 'text-center', cellClass: 'text-center' }
]

</script>
