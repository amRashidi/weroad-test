<template>
  <NuxtLayout name="default">
    <template #header>
      <AppNavigate title="Bookings">
        <template #subtitle>
          Manage all of the Bookings
        </template>
        <template #action>
          <div class="flex gap-4 items-center mt-4 lg:mt-0">
            <v-btn icon="add-square" @click="handleAddTravel">
              Add Booking
            </v-btn>
          </div>
        </template>
      </AppNavigate>
    </template>
    <BookingTable :items="items" :loading="pending">
      <template #actions="item">
        <div class="flex gap-1">
          <v-btn icon="edit" rounded class="text-warning" :loading="loading" @click="handleEditBooking(item.id)" />
          <v-btn icon="trash" rounded class="text-error" :loading="loading" @click="handleShowDelete(item)" />
        </div>
      </template>
    </BookingTable>
    <LazyBookingForm v-if="showBookingForm" v-model:show="showBookingForm" v-model:item="bookingItem" @submit="handleSubmit(handleUpdateList)" />
    <LazyComDeleteModal
      v-if="showBookingDelete"
      :id="bookingItem.id"
      v-model:show="showBookingDelete"
      :label="bookingItem.name"
      url="bookings"
      @success="handleRemoveBooking"
    />
  </NuxtLayout>
</template>
<script setup lang="ts">
definePageMeta({
  layout: false
})
const {
  pending,
  items,
  handleRemoveBooking,
  handleUpdateList
} = useBookings()

const {
  showBookingForm,
  showBookingDelete,
  bookingItem,
  handleSubmit,
  handleAddTravel,
  handleEditBooking,
  handleShowDelete
} = useBookingItem()

</script>
