import type { TravelResult } from '~/types/travels'
const queryTranformer = (q: T) => {
  const query:Record<string> = {}
  Object.keys(q).forEach((key) => {
    switch (true) {
      case Array.isArray(q[key]) && !!q[key].length:
        query[key] = q[key].join(',')
        break
      case typeof q[key] !== 'object' && !!q[key]:
        query[key] = String(q[key])
        break
      default:
        break
    }
  })
  return query
}
const travelTransformer = (travel: TravelResult) => {
  const { $dayjs } = useNuxtApp()
  if (!travel) { return {} }
  return {
    ...travel,
    tags: travel.tags.map(tag => ({
      label: tag,
      value: String(tag).split(' ').join('').toLowerCase()
    })),
    destination: {
      label: travel.destination,
      value: String(travel.destination).split(' ').join('').toLowerCase()
    },
    duration: $dayjs(travel.returnDate).diff(travel.departureDate, 'days')
  }
}

export {
  queryTranformer,
  travelTransformer
}
