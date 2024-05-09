<template>
  <v-card class="mb-4 shadow-sm flex items-center">
    <div class="lg:flex gap-4">
      <v-skeleton class="w-full lg:w-[150px] h-[140px]" />
      <div class="py-4 lg:py-4 grow">
        <div class="flex gap-4">
          <v-skeleton class="w-[100px] h-[28px]" />
          <span class="text-gray-300">|</span>
          <v-skeleton class="w-[100px] h-[28px]" />
        </div>
        <v-skeleton class="w-full h-[28px] my-5" />
        <div class="flex gap-4 items-center text-sm font-normal text-gray-200">
          <v-skeleton class="w-16 h-5" /> |
          <v-skeleton class="w-16 h-5" /> |
          <v-skeleton class="w-16 h-5" />
        </div>
      </div>
      <div class="flex lg:flex-col justify-between lg:justify-center items-center lg:px-4">
        <v-skeleton class="w-14 h-6 mt-4" />
        <v-skeleton class="w-12 h-4 mt-2" />
      </div>
    </div>
  </v-card>
</template>
