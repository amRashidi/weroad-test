<template>
  <div :class="classes">
    <div v-if="title" class="v-card_title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div class="v-card_body">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
type Props = {
  title?: String;
  flat?: boolean;
  self?: boolean;
}
const props = defineProps<Props>()
const classes = computed(() => ([
  'v-card',
  { 'v-card--flat': props.flat },
  { 'v-card--self': props.self }
]))

</script>

<style lang="scss" scoped>
.v-card {
  &:not(.v-card--flat) {
    @apply shadow-md rounded-sm bg-[#fff];
  }
  &:not(.v-card--self) {
    > .v-card_body {
      @apply px-4 py-2 grow;
    }
  }
  &_title {
    @apply text-sm font-medium px-3 py-2 border-b uppercase;
  }
}
</style>
