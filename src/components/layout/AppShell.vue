<script setup lang="ts">
import TopBar from './TopBar.vue'
import Sidebar from './Sidebar.vue'
import CommandPalette from '@/components/shared/CommandPalette.vue'
import { useCommandPalette } from '@/composables/useCommandPalette'

const { open, commands, close } = useCommandPalette()
</script>

<template>
  <div class="app-shell">
    <TopBar class="app-topbar" />
    <Sidebar class="app-sidebar" />
    <main class="app-main">
      <slot />
    </main>
    <CommandPalette :open="open" :commands="commands" @close="close" />
  </div>
</template>
