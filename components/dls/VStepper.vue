<template>
  <div class="v-stepper">
    <div class="v-stepper_header">
      <div class="v-stepper_container">
        <div class="v-stepper_line">
          <div class="v-stepper_line_active" :style="{width: activeLine}" />
        </div>
        <div v-for="item, i in items" :key="i" class="text-center">
          <div :class="item.class">
            <v-icon v-if="i < model" name="tick-square" />
            <v-icon v-else-if="item.icon" :name="item.icon" />
            <span v-else>{{ i }}</span>
          </div>
          <span class="text-xs">{{ item.title }}</span>
        </div>
      </div>
    </div>
    <div class="v-stepper_body">
      <slot />
    </div>
    <slot name="action" />
  </div>
</template>
<script setup lang="ts">
import type IconList from '~/assets/icons'

type Props = {
  step: number;
  steps: {
    key: string;
    title: string;
    icon: keyof typeof IconList
  }[]
}
type Emits = {
  (e:'update:step', value: number) :void
}
const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const model = useVModel(props, 'step', emit)
const items = computed(() => {
  return props.steps.map((item, i) => ({
    ...item,
    class: ['v-stepper_step mx-auto',
      { 'v-stepper_step--active': i === model.value },
      { 'v-stepper_step--checked': i < model.value }
    ]
  }))
})
const activeLine = computed(() => `calc(((100% / ${props.steps.length - 1}) * ${model.value}))`)

</script>

<style lang="scss">
.v-stepper {
  @apply flex flex-col justify-between;
  &_header {
    @apply mx-4 lg:mx-14 py-3 mb-6;
  }
  &_container {
    @apply grid grid-flow-col justify-between relative;
  }
  &_line {
    @apply absolute h-1 bg-gray-100 z-0 top-4 lg:top-5 left-2  right-2;
    &_active {
      @apply bg-secondary h-full;
    transition: all .3s linear
    }
  }
  &_step {
    @apply w-8 h-8 lg:w-10 lg:h-10 bg-gray-200 flex justify-center items-center text-white rounded-full relative [&>*]:w-4 [&>*]:h-4 lg:[&>*]:w-6 lg:[&>*]:h-6;
    &--active {
      @apply bg-primary [&>*]:text-white;
    }
    &--checked {
      @apply bg-lime-500 [&>*]:text-white;
    }
    transition: all .3s linear
  }
  &_body {
    @apply grow overflow-y-auto;
  }
}
</style>
