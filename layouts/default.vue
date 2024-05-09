<template>
  <AppHeader />
  <slot name="header" />
  <main class="app_main">
    <div class="app_main_container">
      <slot />
    </div>
  </main>
  <AppFooter />
</template>
