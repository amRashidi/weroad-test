import { LazyTravelList, LazyTravelTable } from '#components'
import type { TravelItem } from '~/types/travels'
import { travelTransformer } from '~/utils/transformers'
export default function () {
  const route = useRoute()
  const router = useRouter()
  const isLoading = ref(true)
  const showFilters = ref(false)
  // travel mode
  const isTableView = computed(() => route?.query.view === 'table')

  const mode = computed(() => ({
    title: isTableView.value ? 'Grid' : 'Table',
    icon: isTableView.value ? 'slider-vertical' : 'grid',
    action: isTableView.value ? 'action' : 'cell-action'
  }))

  function toggleMode () {
    router.push({
      path: route.path,
      query: {
        ...route.query,
        view: !isTableView.value ? 'table' : 'grid'
      }
    })
  }

  function toggleFilters () {
    showFilters.value = !showFilters.value
  }

  // fetch travels

  const { data: travels, execute } = useAPI<{ items: TravelItem[] }>('/travels',
    {
      key: 'travel-items',
      transform: res => res?.items.map(item => travelTransformer(item)) ?? []
    })

  const {
    filters,
    filterOptions,
    filteredItems,
    generateFilters,
    handleFilter
  } = useTravelFilter(travels)

  async function searchTravels () {
    isLoading.value = true
    try {
      await execute()
      generateFilters(travels)
      handleFilter(filters.value.items)
    } catch (error) {

    } finally {
      isLoading.value = false
    }
  }

  function handleUpdateList (edited = false, item: TravelItem) {
    if (edited) {
      const index = items.value.findIndex(({ id }) => item.id === id)
      if (index === -1) { return }
      items.value[index] = { ...item }
    } else {
      items.value.push(item)
    }
  }

  function handleRemoveTravel (travelID: string) {
    const index = filteredItems.value.findIndex(({ id }) => travelID === id)
    if (index === -1) { return }
    filteredItems.value.splice(index, 1)
  }

  onMounted(searchTravels)
  return {
    items: filteredItems,
    pending: isLoading,
    showFilters,
    filters,
    filterOptions,
    mode,
    toggleMode,
    toggleFilters,
    listComponent: computed(() => isTableView.value ? LazyTravelTable : LazyTravelList),
    handleRemoveTravel,
    handleUpdateList
  }
}
