<template>
  <v-card title="theme" self>
    <v-list :items="options" flat>
      <template #list-item="{label, value}">
        <v-check-box v-model="model" hide-details :value="value" :label="label" name="destination" />
      </template>
    </v-list>
  </v-card>
</template>
<script setup lang="ts">
type Props = {
  modelValue: string[];
  options: string[]
}
type Emits = {
  (e: 'update:modelValue', value: string[]): void
}
const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const model = useVModel(props, 'modelValue', emit)
</script>
