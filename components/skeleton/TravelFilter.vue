<template>
  <div>
    <v-card class="mb-6" title="blob">
      <template #title>
        <v-skeleton class="w-20 h-4" />
      </template>
      <v-skeleton class="w-full h-10 mt-6" />
      <v-skeleton class="w-full h-10 mt-6" />
    </v-card>
    <v-card class="mb-6" title="blob">
      <template #title>
        <v-skeleton class="w-20 h-4" />
      </template>
      <div v-for="i in 5" :key="i" class="flex gap-1 py-4">
        <v-skeleton class="w-4 h-4" />
        <v-skeleton class="w-1/2 h-6" />
      </div>
    </v-card>
    <v-card class="mb-6" title="blob">
      <template #title>
        <v-skeleton class="w-20 h-4" />
      </template>
      <div v-for="i in 5" :key="i" class="flex gap-1 py-4">
        <v-skeleton class="w-4 h-4" />
        <v-skeleton class="w-1/2 h-6" />
      </div>
    </v-card>
    <v-card class="mb-6" title="blob">
      <template #title>
        <v-skeleton class="w-20 h-4" />
      </template>
      <v-skeleton class="w-full h-4" />
    </v-card>
  </div>
</template>
