<template>
  <div class="v-data">
    <table class="v-data__table">
      <thead>
        <tr>
          <slot v-for="header in headers" :key="header.key" :name="`head-${header.key}`">
            <th :class="header.class">
              {{ header.title }}
            </th>
          </slot>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row,i in rows" :key="i">
          <td v-for="header in headers" :key="header.key" :class="header.cellClass">
            <v-skeleton v-if="loading" class="w-full h-6" />
            <slot v-else :name="`cell-${header.key}`" v-bind="{row}">
              {{ !!header.formatter ? header.formatter(row[header.key]) : row[header.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
type TableHeaderItem = {
    title: string;
    key: string;
    class?: string
    cellClass?: string;
    formatter?:<T> (value) => T
  }
type TableRowItem = Record<string, keyof typeof TableHeaderItem['key']>

type Props = {
  headers: TableHeaderItem[]
  items: TableRowItem
  loading?: boolean;
}
const mockData = new Array(10).fill(null)
const props = defineProps<Props>()
const rows = computed(() => props.loading ? mockData : props.items)
</script>
<style lang="scss">
.v-data {
  @apply overflow-x-auto;
  &__table {
    @apply w-full mb-4 px-2;
    > thead {
      @apply text-gray-700;
       th {
        @apply py-3 px-2 border-b-2 border-b-gray-300 capitalize;
      }
    }
    td {
      @apply py-3 px-2 border-t-2 border-t-gray-300 text-base;
    }
  }
}
</style>
