<template>
  <div>
    <TransitionGroup name="list">
      <TravelCard v-for="item in items" :key="item.id" :item="item" @click="$emit('click-item', item)">
        <template #action>
          <slot name="actions" v-bind="item" />
        </template>
      </TravelCard>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import type { TravelResult } from '~/types/travels'

type Props = {
  items: TravelResult[];
  loading?: boolean;
}
type Emits = {
  (e: 'click-item', id: Pick<TravelResult, 'id'>): void
}
defineProps<Props>()
defineEmits<Emits>()

</script>

<style lang="scss" scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
