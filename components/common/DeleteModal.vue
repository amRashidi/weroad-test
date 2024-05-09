<template>
  <v-modal v-model="show" width="400px">
    <AppNavigate title="Alert" divider>
      <template #action>
        <v-btn icon="close-square" dense @click="show = false" />
      </template>
    </AppNavigate>
    <p class="text-lg font-medium">
      you are going to delete {{ label }}
    </p>
    <div class="flex mt-10">
      <v-btn color="danger" @click="handleDelete">
        accept
      </v-btn>
    </div>
  </v-modal>
</template>
<script lang="ts" setup>

type Props = {
  id: string;
  url: string;
  label: string;
  show: boolean;
  deleteTask: (id: string) => Promise<boolean>
}
type Emits = {
  (e:'fail', erorr: unknown): void
  (e:'success',): void
  (e:'update:show', show: boolean): void
}
const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const show = useVModel(props, 'show', emit)

async function handleDeleteItem (id: string) {
  const travelItemAPI = useAPI<{success: true}>(() => `${props.url}/${id}`, {
    key: `delete-${id}`,
    method: 'DELETE'
  })
  try {
    await travelItemAPI.execute()
    return travelItemAPI.data.value.success
  } catch (error) {

  } finally {
    show.value = false
  }
}

async function handleDelete () {
  try {
    const isSuccess = await !!props.deleteTask ? props.deleteTask(props.id) : handleDeleteItem(props.id)
    if (isSuccess) {
      emit('success', props.id)
    }
  } catch (error) {
    emit('fail', error)
  } finally {
    show.value = false
  }
}
</script>
