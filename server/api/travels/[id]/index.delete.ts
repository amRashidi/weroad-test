import { TravelList } from '~/server/mocks/travels'
import onDelay from '~/server/utils/onDelay'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  let travel = {}
  await onDelay(() => {
    const travelItem = TravelList.find(item => item.id === id)
    travel = travelItem
  })
  return {
    success: !!travel.id
  }
})
