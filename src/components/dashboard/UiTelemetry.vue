<script setup lang="ts">
import ResourceTrack from '../ResourceTrack.vue'

defineProps<{ cpu: string; memory: number; disk: number }>()
</script>

<template>
  <span class="telemetry">
    <span :aria-label="`CPU history ${cpu}`">C {{ cpu }}</span>
    <span class="telemetry-meter" :aria-label="`Memory ${memory}%`">M <ResourceTrack :percent="memory" compact /></span>
    <span class="telemetry-meter" :aria-label="`Disk ${disk}%`">D <ResourceTrack :percent="disk" compact /></span>
  </span>
</template>

<style scoped>
.telemetry { display: inline-flex; align-items: center; gap: 6px; color: var(--text-secondary); font-size: var(--text-meta); font-weight: var(--weight-ui); line-height: var(--line-meta); white-space: nowrap; }
.telemetry-meter { display: inline-flex; align-items: center; gap: var(--space-1); }
</style>
