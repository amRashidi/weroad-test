import { BookingList } from '~/server/mocks/bookings'
import { TravelList } from '~/server/mocks/travels'
import onDelay from '~/server/utils/onDelay'
import { BookingItem } from '~/types/booking'

export default defineEventHandler(async (event) => {
  let item = {}
  const body = await readBody<BookingItem>(event)
  const {
    travel,
    payment,
    note,
    ...passenger
  } = body
  const travelItem = TravelList.find(item => item.id === travel)
  if (!travelItem) { throw new Error('Wrong Travel Selected') }
  await onDelay(() => {
    item = {
      id: String(Number(BookingList[BookingList.length - 1].id) + 1),
      travel: travelItem?.name,
      route: `${travelItem?.origin}-${travelItem?.destination}`,
      departureDate: travelItem?.departureDate,
      returnDate: travelItem?.returnDate,
      price: travelItem.price,
      status: 'pending',
      passenger,
      payment,
      note
    }
  })
  return {
    items: item
  }
})
