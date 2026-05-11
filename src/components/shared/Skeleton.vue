<script setup lang="ts">
withDefaults(defineProps<{
  width?: string
  height?: string
  rows?: number
}>(), {
  width: '100%',
  height: '12px',
  rows: 1,
})
</script>

<template>
  <div style="display:flex;flex-direction:column;gap:8px">
    <div
      v-for="i in rows"
      :key="i"
      class="skeleton"
      :style="{ width, height }"
    />
  </div>
</template>
