<script setup lang="ts">
import TopBar from './TopBar.vue'
import Sidebar from './Sidebar.vue'
</script>

<template>
  <div class="app-shell">
    <TopBar class="app-topbar" />
    <Sidebar class="app-sidebar" />
    <main class="app-main">
      <slot />
    </main>
  </div>
</template>
