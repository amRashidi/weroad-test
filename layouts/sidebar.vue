<template>
  <NuxtLayout name="default">
    <template #header>
      <slot name="header" />
    </template>
    <div class="app_main_grid_wrapper">
      <slot name="sidebar" />

      <section class="app_main_box">
        <slot />
      </section>
    </div>
  </NuxtLayout>
</template>
