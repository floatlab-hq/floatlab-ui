<script setup lang="ts">
defineProps<{
  state?: 'active' | 'warn' | 'error' | 'idle'
}>()
</script>

<template>
  <div class="ram-stick" :class="state && state !== 'idle' ? `ram-stick--${state}` : ''" />
</template>
