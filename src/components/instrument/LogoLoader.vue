<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'blink' | 'cascade' | 'scan'
  size?: number
}>(), {
  variant: 'blink',
  size: 32,
})
</script>

<template>
  <div
    class="logo-loader"
    :style="{ width: `${size}px`, height: `${size}px`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }"
  >
    <svg :width="size" :height="size" viewBox="0 0 32 32" fill="none">
      <!-- FloatLab F mark simplified as segmented bars -->
      <rect x="6" y="6" width="4" height="20" rx="1" fill="rgb(73,212,155)" :style="variant === 'cascade' ? 'animation: blink 1.2s step-end infinite 0s' : ''"/>
      <rect x="12" y="6" width="14" height="4" rx="1" fill="rgb(73,212,155)" :style="variant === 'cascade' ? 'animation: blink 1.2s step-end infinite 0.15s' : ''"/>
      <rect x="12" y="13" width="10" height="4" rx="1" fill="rgb(73,212,155)" :style="variant === 'cascade' ? 'animation: blink 1.2s step-end infinite 0.3s' : ''"/>
    </svg>
    <div
      v-if="variant === 'scan'"
      :style="{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '2px',
        background: 'rgba(73,212,155,0.6)',
        animation: 'scan 1.5s linear infinite',
      }"
    />
  </div>
</template>
