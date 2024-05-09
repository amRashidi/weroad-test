<template>
  <div ref="activator">
    <slot name="activator" @click="handleOpen" />
  </div>
  <Teleport to="body">
    <Transition name="slide" :appear="model" mode="in-out">
      <div v-if="model" class="v-menu" :style="style">
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>
<script setup lang="ts">
type Props = {
  modelValue: boolean
}
type Emits = {
  (e: 'update:modelValue', value: boolean) :void;
  (e: 'open') :void;
}
const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const { isMobile } = useDevice()
const activator = ref<HTMLElement>()
const model = useVModel(props, 'modelValue', emit)
const style = computed(() => {
  const attrs = { top: '0', right: '0', left: '0', width: '0' }
  if (isMobile) { return { ...attrs, top: 'auto', bottom: '0', width: '100%' } }
  const nodeRects = activator.value?.getBoundingClientRect()
  if (nodeRects) {
    const { left, right, height, top, width } = nodeRects
    attrs.left = `${left}px`
    attrs.right = `${right}px`
    attrs.top = `${height + top}px`
    attrs.width = `${width}px`
  }
  return attrs
})
function handleOpen () {
  emit('open')
}

</script>

<style lang="scss">
.v-menu {
  @apply fixed lg:absolute top-10 left-0 right-0 overflow-hidden z-20;
  transform-origin: top;
  transition: transform .15s linear;
}
.slide-enter, .slide-leave-to{
  transform: scaleY(0);
}
</style>
