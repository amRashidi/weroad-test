import { BookingList } from '~/server/mocks/bookings'
import onDelay from '~/server/utils/onDelay'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  let booking = {}
  await onDelay(() => {
    const bookingItem = BookingList.find(item => item.id === id)
    booking = bookingItem
  })
  return {
    items: booking
  }
})
