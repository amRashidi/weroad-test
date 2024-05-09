export default function () {
  const items = ref<BookingItem[]>([])
  const {
    data,
    pending,
    execute
  } = useAPI<{items: BookingItem[]}>('/bookings',
    {
      key: 'booked-items',
      transform: res => res?.items ?? []
    })

  async function getBookings () {
    try {
      await execute()
      items.value = data.value
    } catch (e) {}
  }

  function handleRemoveBooking (travelID: string) {
    const index = items.value.findIndex(({ id }) => travelID === id)
    if (index === -1) {
      return
    }
    items.value.splice(index, 1)
  }

  function handleUpdateList (edited = false, item: BookingResult) {
    if (edited) {
      const index = items.value.findIndex(({ id }) => item.id === id)
      if (index === -1) { return }
      items.value[index] = { ...item }
    } else {
      items.value.unshift(item)
    }
  }

  onMounted(getBookings)

  return {
    pending,
    items,
    handleRemoveBooking,
    handleUpdateList
  }
}
