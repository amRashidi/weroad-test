<template>
  <div class="app_navigate">
    <div :class="classes">
      <div>
        <h1 class="app_navigate_title">
          {{ title }}
        </h1>
        <div v-if="$slots.subtitle" class="app_navigate_subtitle">
          <slot name="subtitle" />
        </div>
      </div>
      <div v-if="$slots.action" class="app_navigate_action">
        <slot name="action" />
      </div>
    </div>

    <hr v-if="divider">
  </div>
</template>
<script setup lang="ts">
type Props = {
  title: string;
  shrink?: boolean;
  divider?: boolean
}

const props = defineProps<Props>()
const classes = computed(() => ([
  'app_navigate_box',
  {
    'app_navigate--shrink': props.shrink
  }
]))

</script>
