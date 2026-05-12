<script setup lang="ts">
import type { Notification } from '@/types/models'
import AlertItem from './AlertItem.vue'
import EmptyState from '@/components/shared/EmptyState.vue'
import Skeleton from '@/components/shared/Skeleton.vue'

defineProps<{
  notifications: Notification[]
  loading?: boolean
}>()

defineEmits<{
  resolve: [id: string]
  silence: [id: string]
}>()

</script>

<template>
  <div style="display:flex;flex-direction:column;gap:var(--sp-3)">
    <Skeleton v-if="loading" :rows="4" />
    <EmptyState v-else-if="!notifications.length" title="No active alerts" message="All clear — no active notifications." icon="◬" />
    <AlertItem
      v-else
      v-for="n in notifications"
      :key="n.id"
      :notification="n"
      @resolve="$emit('resolve', $event)"
      @silence="$emit('silence', $event)"
    />
  </div>
</template>
