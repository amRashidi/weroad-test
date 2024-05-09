import type { TravelFilterOptions, TravelItem } from '~/types/travels'
import { DefaultTravelFilter } from '~/utils/models'
export default function (travels: Ref<TravelItem[]>) {
  const { $dayjs } = useNuxtApp()
  const route = useRoute()
  const router = useRouter()
  const defaultQuery = computed(() => ({ view: route.query.view || '' }))
  const filteredItems = ref<TravelItem[]>([])
  const filters = ref({
    items: {
      from: route.query?.from || '',
      to: route.query?.to || '',
      duration: route.query?.duration || 0,
      tags: route.query?.tags ? route.query?.tags.split(',') : [],
      destinations: route.query?.destinations ? route.query.destinations.split(',') : []
    },
    sort: ''
  })

  const travelTags = new Set()
  const travelDestinations = new Set()
  const travelDurations = new Set()
  const travelDates = new Set()

  const filterOptions = ref<TravelFilterOptions>({ ...DefaultTravelFilter })

  function generateFilters () {
    travels.value.forEach((travel) => {
      const { destination, tags, departureDate: startDate, returnDate: endDate } = travel
      const departureDate = $dayjs(startDate)
      const returnDate = $dayjs(endDate)

      // tags
      tags.forEach((tag) => {
        if (!travelTags.has(tag.value)) {
          filterOptions.value.tags.push(tag)
          travelTags.add(tag.value)
        }
      })

      // destinations
      if (!travelDestinations.has(destination.value)) {
        travelDestinations.add(destination.value)
        filterOptions.value.destinations.push(destination)
        travelDestinations.add(destination)
      }

      // fill duration stack
      travelDurations.add(travel.duration)

      // fill dates stack
      travelDates.add($dayjs(departureDate).format('YYYY-MM-DD'))
      travelDates.add($dayjs(returnDate).format('YYYY-MM-DD'))
    })
    // availablity range
    const dates = Array.from(travelDates).sort((a: string, b: string) => a.localeCompare(b))
    filterOptions.value.availablity.min = dates[0]
    filterOptions.value.availablity.max = dates[dates.length - 1]

    // duration
    const duraitions = Array.from(travelDurations).sort()
    filterOptions.value.duration.min = duraitions[0]
    filterOptions.value.duration.max = duraitions[duraitions.length - 1]
  }

  function handleFilter (filters: unknown[]) {
    const {
      from,
      to,
      tags = [],
      destinations = [],
      duration
    } = queryTranformer({ ...filters, ...route.query })

    let results = [...travels.value]
    results = results.filter((result) => {
      let condition = true
      // tags condition
      if (tags.length) {
        condition = condition && result.tags.some((tag) => {
          return tags.includes(tag.value)
        })
      }

      // destination condition
      if (destinations.length) {
        condition = condition && destinations.includes(result.destination.value)
      }

      // durations condition
      if (duration && duration > 0) {
        condition = condition && (+duration === result.duration)
      }

      // availabilty from condition
      if (from) {
        const isSooner = $dayjs(result.departureDate).diff(from, 'days')
        condition = condition && (isSooner >= 0)
      }

      // availabilty to condition
      if (to) {
        const isLater = $dayjs(to).diff(result.returnDate, 'days')
        condition = condition && (isLater >= 0)
      }
      return condition
    })

    filteredItems.value = [...results]
  }

  watch(() => filters.value, (next) => {
    const isEqual = false
    if (!isEqual) {
      const newQuery = queryTranformer(next.items)
      router.replace({ path: route.path, query: { ...defaultQuery.value, ...newQuery } }).then(() => {
        requestAnimationFrame(() => handleFilter(next))
      })
    }
  }, { deep: true })
  return {
    filters,
    filterOptions,
    filteredItems,
    generateFilters,
    handleFilter
  }
}
