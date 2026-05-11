<script setup lang="ts">
import RamStick from './RamStick.vue'

export type RamSlotState = 'active' | 'warn' | 'error' | 'idle'

defineProps<{
  slots: RamSlotState[]
}>()
</script>

<template>
  <div class="ram-sticks">
    <RamStick v-for="(s, i) in slots" :key="i" :state="s" />
  </div>
</template>
