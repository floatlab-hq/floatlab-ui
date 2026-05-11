<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="panel__header">
    <span>{{ title }}</span>
    <div v-if="$slots.default" class="panel__header-actions">
      <slot />
    </div>
  </div>
</template>
