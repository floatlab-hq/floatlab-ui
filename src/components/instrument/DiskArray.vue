<script setup lang="ts">
import DiskCyl from './DiskCyl.vue'

export interface DiskState {
  fill?: number
  state?: 'active' | 'warn' | 'error' | 'offline' | 'idle'
}

defineProps<{
  disks: DiskState[]
}>()
</script>

<template>
  <div class="disk-array">
    <DiskCyl
      v-for="(disk, i) in disks"
      :key="i"
      :fill="disk.fill ?? 0"
      :state="disk.state ?? 'idle'"
    />
  </div>
</template>
