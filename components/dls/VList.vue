<template>
  <v-card :flat="flat" self>
    <ul class="v-list">
      <li
        v-for="(item) in list"
        :key="item.key"
        :class="
          ['v-list_item', {'v-list_item--active': active === item.index}]"
        @click="$emit('select', item)"
      >
        <slot :name="`list-item`" v-bind="{...item}" />
      </li>
    </ul>
  </v-card>
</template>
<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  items: Array;
  flat?: boolean;
  active?: number
}
type Emits = {
  (e: 'select', value: keyof Props['items']): void ;
}
const props = defineProps<Props>()
defineEmits<Emits>()
const list = computed(() => props.items.map((item, i) => ({ ...item, index: i, key: `item-${i}` })))
</script>
<style lang="scss">
.v-list {
  @apply py-2 rounded;
  &_item {
    @apply px-6 py-4 cursor-pointer;
    &:hover, &--active {
      @apply bg-gray-50;
    }
  }
}
</style>
