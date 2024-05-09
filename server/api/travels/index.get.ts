import { TravelList } from '~/server/mocks/travels'
import onDelay from '~/server/utils/onDelay'

export default defineEventHandler(async (event) => {
  const { search = '' } = getQuery<{search?: string}>(event)
  let travels = []
  await onDelay(() => {
    travels = [...TravelList]
    if (search && search.length) {
      travels = travels.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
  })
  return {
    items: travels
  }
})
