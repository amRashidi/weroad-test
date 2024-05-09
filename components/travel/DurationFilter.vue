<template>
  <v-card title="duration">
    <div class="v-range_slider">
      <span :style="style" class="v-range_space" />
      <input
        id="lower"
        v-model.lazy="model"
        type="range"
        :min="range.min"
        :max="range.max"
        class="v-range_input"
      >
    </div>
    <div class="v-range_content">
      <span class="v-range_label">{{ range.min }} day</span>
      <span v-if="model" class="v-range_label">{{ model }} day</span>
      <span class="v-range_label">{{ range.max }} day</span>
    </div>
  </v-card>
</template>
<script setup lang="ts">
import type { TravelFilterOptions } from '~/types/travels'

type Props = {
  modelValue: number
  range: Pick<TravelFilterOptions, 'duration'>
}
type Emits = {
  (e: 'updatev-model', value: number): void;
}
const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const model = useVModel(props, 'modelValue', emit)
const style = computed(() => {
  const range = props.range.max - props.range.min
  return `right: ${model.value / range}%`
})
</script>
<style lang="scss">
.v-range {
  &_slider {
    @apply relative mt-4 pb-8;
  }
  &_space {
    @apply absolute top-0 h-2 left-0 bg-gray-200 z-[1] rounded-sm pointer-events-none;
  }
  &_input {
    @apply w-full absolute outline-0 cursor-pointer h-2 rounded-sm bg-transparent appearance-none z-[2];
    &::-webkit-slider-thumb {
      @apply w-3 h-3 bg-primary appearance-none cursor-e-resize rounded-sm;
    }
  }
  &:after {
    @apply content-[''] absolute left-0 right-0 top-0 h-2 rounded-sm bg-gray-50 z-0;
  }
  &_content {
    @apply flex gap-2 justify-between items-center text-sm capitalize font-light;
  }
  /** FF*/
}
</style>
