import { BookingList } from '~/server/mocks/bookings'
import onDelay from '~/server/utils/onDelay'

export default defineEventHandler(async () => {
  let bookings = []
  await onDelay(() => {
    bookings = BookingList
  })
  return {
    items: bookings
  }
})
