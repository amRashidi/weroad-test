import { TravelList } from '~/server/mocks/travels'
import onDelay from '~/server/utils/onDelay'
import { TravelItem } from '~/types/travels'

export default defineEventHandler(async (event) => {
  let item = {}
  const body = await readBody<TravelItem>(event)
  await onDelay(() => {
    item = {
      ...TravelList[TravelList.length - 1],
      ...body,
      tags: body.tags.split(',')
    }
    item.id = String(Number(TravelList[TravelList.length - 1].id) + 1)
    // we upload picture in a seperated url so here we have a image url for that
    item.picture = TravelList[TravelList.length - 1].picture
  })
  return {
    items: item
  }
})
