<script setup lang="ts">
import type { Notification } from '@/types/models'
import StatusBadge from '@/components/instrument/StatusBadge.vue'

defineProps<{
  notification: Notification
}>()

defineEmits<{
  resolve: [id: string]
  silence: [id: string]
}>()

function severityStatus(s: string): string {
  if (s === 'critical') return 'error'
  if (s === 'warning') return 'warning'
  return 'info'
}

function dotColor(s: string): string {
  if (s === 'critical') return 'var(--red-400)'
  if (s === 'warning') return 'var(--amber-400)'
  return 'var(--cyan-400)'
}
</script>

<template>
  <div class="alert-item" :class="{ 'alert-item--unread': notification.state === 'unread' }">
    <div class="alert-item__indicator">
      <div class="alert-item__dot" :style="{ background: dotColor(notification.severity) }" />
    </div>
    <div class="alert-item__body">
      <div class="alert-item__header">
        <span class="alert-item__title">{{ notification.title }}</span>
        <span class="alert-item__time">{{ new Date(notification.created_at).toLocaleTimeString() }}</span>
      </div>
      <div class="alert-item__msg">{{ notification.body }}</div>
    </div>
    <div style="display:flex;align-items:center;gap:var(--sp-2);flex-shrink:0">
      <StatusBadge :status="severityStatus(notification.severity)" :label="notification.severity" />
      <button class="btn btn--ghost btn--sm" @click.stop="$emit('silence', notification.id)">Silence</button>
      <button class="btn btn--ghost btn--sm" @click.stop="$emit('resolve', notification.id)">Resolve</button>
    </div>
  </div>
</template>
