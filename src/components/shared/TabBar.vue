<script setup lang="ts">
defineProps<{
  tabs: { id: string; label: string }[]
  active: string
}>()

const emit = defineEmits<{
  change: [id: string]
}>()
</script>

<template>
  <div class="tabs">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      class="tab"
      :class="{ 'tab--active': active === tab.id }"
      @click="emit('change', tab.id)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>
