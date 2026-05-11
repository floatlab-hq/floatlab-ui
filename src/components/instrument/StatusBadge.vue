<script setup lang="ts">
defineProps<{
  status: string
  label?: string
}>()
</script>

<template>
  <span class="badge" :class="`badge--${status}`">
    <span class="badge__dot" :class="`badge__dot--${status}`" />
    {{ label ?? status }}
  </span>
</template>
