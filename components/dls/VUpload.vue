<template>
  <div :class="classes">
    <div class="v-upload_box" v-on="onEvents">
      <v-icon name="document-upload" class="w-8 h-8" />
      <span>
        {{ uploadText }}
      </span>
    </div>
    <div class="v-upload_text">
      <div class="mb-4">
        Files Supported: <span class="uppercase">{{ acceptText }}</span>
      </div>
      <div v-for="item,i in selectedFileNames" :key="item" class="flex items-center gap-2 mb-2 text-xs">
        <img :src="item.src" :alt="item.name" class="rounded-2xl w-4 h-4 object-scale-down">
        <span>
          {{ `${item.name} - ${item.size}` }}
        </span>
        <v-btn icon="trash" class="w-4 h-4 inline-flex" dense @click="removeFile(i)" />
      </div>
    </div>
    <input
      ref="fileInput"
      type="file"
      :accept="acceptText"
      hidden
      multiple
      @change="handleFileChange"
    >
  </div>
</template>
<script setup lang="ts">
import type { StringLiteral } from 'typescript'
import type { InputHTMLAttributes } from 'vue'
import { computed } from 'vue'
type FileTypes = 'jpg' | 'jpeg' | 'png' | 'pdf'
type Props = {
  modelValue: null | File;
  uploadText?: StringLiteral;
  multiple?: boolean;
  accept?: Array<FileTypes>;
}
type Emit = {
  (e: 'update:modelValue', v: null | File): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  multiple: false,
  uploadText: 'Drag and drop files here',
  accept: () => ['jpg' | 'jpeg' | 'png' | 'pdf']
})

const emit = defineEmits<Emit>()

const model = useVModel(props, 'modelValue', emit)

const selectedFileNames = ref([])

const fileInput = ref<InputHTMLAttributes | undefined>()

const isDragged = ref(false)

const acceptText = computed(() => props.accept.join(', ').toString())

function openFileInput () {
  fileInput.value.click()
}
function handleFileChange (event: Event) {
  const fileList = event.target.files || event.dataTransfer.files

  for (let i = 0; i < fileList.length; i++) {
    const newFile = {
      name: fileList[i].name,
      size: formatFileSize(fileList[i].size),
      src: ''
    }
    const reader = new FileReader()
    reader.readAsDataURL(fileList[i])
    reader.onloadend = () => {
      newFile.src = reader.result
    }
    selectedFileNames.value.push(newFile)
  }
  model.value = [...fileList]
}
function formatFileSize (size) {
  const units = ['B', 'KB', 'MB', 'GB']
  let index = 0

  while (size >= 1024 && index < units.length - 1) {
    size /= 1024
    index++
  }

  return `${size.toFixed(2)} ${units[index]}`
}
function removeFile (index) {
  selectedFileNames.value.splice(index, 1)
  model.value.splice(index, 1)
}

const onEvents = computed(() => ({
  dragenter: (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    isDragged.value = true
  },
  dragover: (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    isDragged.value = true
  },
  dragleave: (e: DragEvent) => {
    if (e.relatedTarget !== null) {
      return
    }
    isDragged.value = false
  },
  drop: (e: DragEvent) => {
    e.preventDefault()
    handleFileChange(e)
    isDragged.value = false
  },
  click: openFileInput
}))

const classes = computed(() => ({
  'v-upload': true,
  'v-upload-active': isDragged.value
}))
</script>
<style lang="scss" scoped>
.v-upload {
  &_box {
    @apply px-4 py-3 bg-gray-50 border-dashed border-gray-300 border-2 flex justify-center items-center gap-4 text-gray-400;
  }
  &_text {
    @apply capitalize text-xs mt-2 text-gray-700;
  }
  &-active > .v-upload_box {
    @apply border-gray-100 bg-gray-600 text-white;
  }
}
</style>
