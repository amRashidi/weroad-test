<template>
  <NuxtLayout name="sidebar">
    <template #header>
      <AppNavigate title="Travels">
        <template #subtite>
          Manage all of the travels
        </template>
        <template #action>
          <div class="flex gap-4 justify-between items-center">
            <v-btn icon="add-square" @click="handleAddTravel">
              Add Travel
            </v-btn>
            <v-btn :icon="mode.icon" @click="toggleMode">
              {{ mode.title }}
            </v-btn>
          </div>
        </template>
      </AppNavigate>
    </template>
    <template v-if="!$device.isMobile" #sidebar>
      <aside class="app_main_sidebar">
        <SkeletonTravelFilter v-if="pending" />
        <LazyTravelFilterItems v-else v-model="filters.items" :options="filterOptions" :count="items.length" />
      </aside>
    </template>
    <div v-if="$device.isMobile" class="px-4 mb-4">
      <v-btn icon="filter" @click="toggleFilters">
        Filters
      </v-btn>
    </div>
    <template v-if="pending">
      <SkeletonTravelCard v-for="i in 6" :key="i" />
    </template>
    <component :is="listComponent" v-else-if="items?.length" :items="items" :loading="pending || loading" @edit-item="handleEditTravel">
      <template #actions="item">
        <div class="flex gap-1">
          <v-btn icon="edit" rounded class="text-warning" :loading="loading" @click="handleEditTravel(item.id)" />
          <v-btn icon="trash" rounded class="text-error" :loading="loading" @click="handleDeleteTravel(item)" />
        </div>
      </template>
    </component>
    <LazyTravelForm v-if="showTravelForm" v-model:show="showTravelForm" v-model:item="selectedTravel" :loading="loading" @submit="handleSubmitItem($event, handleUpdateList)" />
    <LazyComDeleteModal
      v-if="showTravelDelete"
      :id="selectedTravel.id"
      v-model:show="showTravelDelete"
      :label="selectedTravel.name"
      url="travels"
      @success="handleRemoveTravel"
    />
    <v-modal v-model="showFilters" permanent>
      <AppNavigate title="Filters" divider shrink>
        <template #action>
          <v-btn icon="close-square" dense @click="toggleFilters" />
        </template>
      </AppNavigate>
      <LazyTravelFilterItems v-model="filters.items" :options="filterOptions" :count="items.length" />
    </v-modal>
  </NuxtLayout>
</template>
<script setup lang="ts">
definePageMeta({
  layout: false
})
const {
  items,
  showFilters,
  pending,
  filters,
  filterOptions,
  mode,
  toggleMode,
  toggleFilters,
  listComponent,
  handleRemoveTravel,
  handleUpdateList
} = useTravels()

const {
  loading,
  showTravelForm,
  showTravelDelete,
  selectedTravel,
  handleAddTravel,
  handleEditTravel,
  handleDeleteTravel,
  handleSubmitItem
} = useTravelItem()

</script>
