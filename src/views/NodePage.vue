<script setup lang="ts">
defineProps<{
  nodeId: string
}>()
</script>

<template>
  <main>
    <h1>Node {{ nodeId }}</h1>
  </main>
</template>