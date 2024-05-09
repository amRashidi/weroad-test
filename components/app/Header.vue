<template>
  <header class="app_header">
    <div class="app_header_logo">
      <NuxtLink to="/">
        Tour Guid
      </NuxtLink>
    </div>
    <nav class="app_header_nav">
      <ul class="app_header_list">
        <li v-for="item,i in navs" :key="i" class="app_header_list_item">
          <NuxtLink class="app_header_list_link" :to="{name: item.link}">
            {{ item.name }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script setup lang="ts">
const navs = [
  { name: 'Travels', link: 'index' },
  { name: 'Booking', link: 'booking' }
]
</script>
