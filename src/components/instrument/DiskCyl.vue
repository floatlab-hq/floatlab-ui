<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  fill?: number
  state?: 'active' | 'warn' | 'error' | 'offline' | 'idle'
}>(), {
  fill: 0,
  state: 'idle',
})

const fillColor = computed(() => {
  switch (props.state) {
    case 'error':   return 'rgb(226,92,117)'
    case 'warn':    return 'rgb(245,93,60)'
    case 'active':  return 'rgb(73,212,155)'
    default:        return 'rgb(40,75,59)'
  }
})

const fillHeight = computed(() => `${Math.min(100, Math.max(0, props.fill * 100))}%`)
</script>

<template>
  <div class="disk-cyl" :class="`disk-cyl--${state}`">
    <div class="disk-cyl__body">
      <div
        class="disk-cyl__fill"
        :style="{ height: fillHeight, background: fillColor }"
      />
    </div>
    <div class="disk-cyl__cap" />
  </div>
</template>
