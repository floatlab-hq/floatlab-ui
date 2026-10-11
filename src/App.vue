<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import CommandPalette from './components/CommandPalette.vue'
import DashboardHeader from './components/DashboardHeader.vue'
import ServerPanel from './components/ServerPanel.vue'
import { apps, commands, server } from './data'

const paletteOpen = ref(false)
const selectedCommand = ref<string>()

function openPalette(event: KeyboardEvent) {
  const target = event.target
  if (
    event.key !== '/' ||
    (!event.metaKey && !event.ctrlKey) ||
    (target instanceof HTMLElement &&
      (target.matches('input, textarea, select') || target.isContentEditable))
  )
    return

  event.preventDefault()
  paletteOpen.value = true
}

onMounted(() => window.addEventListener('keydown', openPalette))
onUnmounted(() => window.removeEventListener('keydown', openPalette))
</script>

<template>
  <DashboardHeader
    version="v1.43"
    uptime="24d"
    @open-command-palette="paletteOpen = true"
  />
  <ServerPanel :server="server" :apps="apps" />
  <CommandPalette
    :open="paletteOpen"
    :commands="commands"
    @close="paletteOpen = false"
    @select="selectedCommand = $event"
  />
</template>
