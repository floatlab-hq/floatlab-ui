<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  status?: 'online' | 'offline' | 'degraded' | 'unknown'
  size?: number
}>(), {
  status: 'unknown',
  size: 48,
})

const accent = computed(() => {
  switch (props.status) {
    case 'online':   return 'rgb(73,212,155)'
    case 'degraded': return 'rgb(245,93,60)'
    case 'offline':  return 'rgb(226,92,117)'
    default:         return 'rgb(40,75,59)'
  }
})

const scale = computed(() => props.size / 48)
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :style="{ transform: `scale(${scale})`, transformOrigin: '0 0' }"
  >
    <!-- isometric server box -->
    <path d="M24 6 L42 16 L42 32 L24 42 L6 32 L6 16 Z" fill="rgb(13,26,27)" stroke="rgb(40,75,59)" stroke-width="1"/>
    <!-- top face -->
    <path d="M24 6 L42 16 L24 26 L6 16 Z" :fill="accent" fill-opacity="0.12" :stroke="accent" stroke-width="1" stroke-opacity="0.5"/>
    <!-- right face -->
    <path d="M42 16 L42 32 L24 42 L24 26 Z" fill="rgb(9,15,17)" fill-opacity="0.6" :stroke="accent" stroke-width="0.5" stroke-opacity="0.3"/>
    <!-- left face -->
    <path d="M6 16 L24 26 L24 42 L6 32 Z" fill="rgb(20,49,44)" fill-opacity="0.4" :stroke="accent" stroke-width="0.5" stroke-opacity="0.3"/>
    <!-- LED strip on front -->
    <rect x="28" y="29" width="10" height="2" rx="1" :fill="accent" :fill-opacity="status === 'online' ? '0.9' : '0.3'"/>
    <!-- status dot top -->
    <circle cx="24" cy="14" r="2" :fill="accent"/>
  </svg>
</template>
