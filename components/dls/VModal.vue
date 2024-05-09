<template>
  <teleport to="body">
    <div
      v-if="show"
      ref="modal-backdrop"
      class="v-modal_backdrop"
      @click="handleClickOutSide"
    >
      <div
        class="v-modal_wrapper"
      >
        <div
          ref="modal"
          class="v-modal_inner"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
          :style="{width}"
        >
          <slot />
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
type Props = {
  modelValue: boolean;
  permanent?: boolean
  width?: string
}
type Emits = {
  (e: 'update:modelValue', show: boolean): void
}
const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const show = useVModel(props, 'modelValue', emit)
function handleClose () {
  show.value = false
}
function handleClickOutSide () {
  if (props.permanent) { return }
  handleClose()
}

</script>
<style lang="scss" scoped>
.v-modal{
  &_backdrop {
    @apply fixed z-10 inset-0 lg:overflow-y-auto bg-black bg-opacity-50;
  }
  &_wrapper {
    @apply flex items-start justify-center min-h-screen h-full overflow-auto lg:pt-24 text-center;
  }
  &_inner {
    @apply bg-white lg:rounded-lg text-left overflow-auto lg:overflow-hidden shadow-xl p-4 lg:p-8 w-full h-full lg:h-auto lg:w-1/2;
  }
}
</style>
