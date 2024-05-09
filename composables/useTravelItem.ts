import type { TravelItem, TravelResult } from '~/types/travels'
import { TravelFormModel } from '@/utils/models'

export default function () {
  const { $dayjs } = useNuxtApp()
  const loading = ref(false)
  const showTravelForm = ref(false)
  const showTravelDelete = ref(false)
  const selectedTravel = reactive({
    id: '',
    name: '',
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    picture: '',
    price: 0,
    tags: ''
  })

  function travelItemAdapter (item?: TravelResult) {
    if (!item) { return { ...TravelFormModel } }
    return {
      ...item,
      departureDate: $dayjs(item.departureDate).format('YYYY-MM-DD'),
      returnDate: $dayjs(item.returnDate).format('YYYY-MM-DD'),
      tags: item.tags.join(',')
    }
  }

  const { data: travelItem, execute } = useAPI<TravelItem>(() => `/travels/${selectedTravel.id}`,
    {
      key: `travels/${selectedTravel.id}`,
      transform: res => travelItemAdapter(res?.items)

    })

  function handleResetTravel () {
    Object.keys(TravelFormModel).forEach((key) => {
      selectedTravel[key] = TravelFormModel[key]
    })
  }

  function handleAddTravel () {
    handleResetTravel()
    showTravelForm.value = true
  }
  async function handleEditTravel (id: Pick<TravelItem, 'id'>) {
    selectedTravel.id = id
    loading.value = true
    try {
      await execute()
      if (travelItem.value) {
        Object.keys(TravelFormModel).forEach((key) => {
          selectedTravel[key] = travelItem.value[key]
        })
      }
      showTravelForm.value = true
    } catch (error) {

    } finally {
      loading.value = false
    }
  }

  async function handleSubmitItem (values: TravelItem, next?: Function) {
    const isEdit = values?.id
    const travelItemAPI = useAPI<TravelItem>(() => `/travels/${values.id}`, {
      key: isEdit ? 'edit-travel' : 'create-travel',
      method: isEdit ? 'PUT' : 'POST',
      transform: res => travelTransformer(res?.items),
      body: {
        ...values
      }
    })
    try {
      await travelItemAPI.execute()
      if (travelItemAPI.data.value.id && next) {
        next(isEdit, travelItemAPI.data.value)
      }
    } catch (error) {

    } finally {
      showTravelForm.value = false
    }
  }

  function handleDeleteTravel (item: TravelItem) {
    selectedTravel.id = item.id
    selectedTravel.name = item.name
    showTravelDelete.value = true
  }

  async function handleDeleteItem (id: string) {
    const travelItemAPI = useAPI<{success: true}>(() => `/travels/${id}`, {
      key: 'delete-travel',
      method: 'DELETE'
    })
    try {
      await travelItemAPI.execute()
      return travelItemAPI.data.value.success
    } catch (error) {

    } finally {
      showTravelDelete.value = false
    }
  }

  return {
    loading,
    showTravelForm,
    showTravelDelete,
    selectedTravel,
    handleAddTravel,
    handleEditTravel,
    handleDeleteTravel,
    handleDeleteItem,
    handleSubmitItem
  }
}
