<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="panel">
    <div v-if="title || $slots.actions" class="panel__header">
      <span>{{ title }}</span>
      <div v-if="$slots.actions" class="panel__header-actions">
        <slot name="actions" />
      </div>
    </div>
    <div class="panel__body">
      <slot />
    </div>
  </div>
</template>
