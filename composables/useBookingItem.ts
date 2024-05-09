import { BookingFormModel } from '@/utils/models'
import type { BookingItem, BookingResult } from '~/types/booking'
import type { BookingItem } from '~/types/travels'

export default function () {
  const loading = ref(false)
  const showBookingForm = ref(false)
  const showBookingDelete = ref(false)
  const bookingItem = reactive<BookingItem>({
    id: '',
    travel: '',
    name: '',
    age: '',
    email: '',
    number: '',
    gender: '',
    payment: '',
    note: ''
  })

  function bookingItemAdapter (item?: BookingResult) {
    if (!item) { return { ...BookingFormModel } }
    const {
      passenger,
      id,
      travel,
      payment,
      note
    } = item
    return {
      id,
      travel,
      payment,
      note,
      ...passenger
    }
  }

  const { data, execute } = useAPI<booki>(() => `/bookings/${bookingItem.id}`,
    {
      key: `bookings/${bookingItem.id}`,
      transform: res => bookingItemAdapter(res?.items)

    })

  function handleResetTravel () {
    Object.keys(BookingFormModel).forEach((key) => {
      bookingItem[key] = BookingFormModel[key]
    })
  }

  function handleAddTravel () {
    handleResetTravel()
    showBookingForm.value = true
  }

  async function handleEditBooking (id: Pick<bookingItem, 'id'>) {
    bookingItem.id = id
    loading.value = true
    try {
      await execute()
      if (data) {
        Object.keys(BookingFormModel).forEach((key) => {
          bookingItem[key] = data.value[key]
        })
      }
      showBookingForm.value = true
    } catch (error) {

    } finally {
      loading.value = false
    }
  }

  async function handleSubmit (next?: Function) {
    const isEdit = !!bookingItem.id

    const BookingItemAPI = useAPI<BookingItem>(() => `/bookings/${bookingItem.id}`, {
      key: isEdit ? 'edit-bookings' : 'create-bookings',
      method: isEdit ? 'PUT' : 'POST',
      transform: res => res?.items,
      body: {
        ...bookingItem,
        id: bookingItem.id || undefined
      }
    })
    try {
      await BookingItemAPI.execute()
      if (BookingItemAPI.data.value.id && next) {
        next(isEdit, BookingItemAPI.data.value)
      }
    } catch (error) {

    } finally {
      showBookingForm.value = false
    }
  }

  function handleShowDelete (item: BookingItem) {
    bookingItem.id = item.id
    bookingItem.name = item.travel
    showBookingDelete.value = true
  }

  return {
    showBookingForm,
    showBookingDelete,
    bookingItem,
    handleSubmit,
    handleResetTravel,
    handleAddTravel,
    handleEditBooking,
    handleShowDelete
  }
}
