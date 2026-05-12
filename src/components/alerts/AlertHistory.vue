<script setup lang="ts">
import type { Notification } from '@/types/models'
import StatusBadge from '@/components/instrument/StatusBadge.vue'
import EmptyState from '@/components/shared/EmptyState.vue'
import Skeleton from '@/components/shared/Skeleton.vue'

defineProps<{
  notifications: Notification[]
  loading?: boolean
}>()

function severityStatus(s: string): string {
  if (s === 'critical') return 'error'
  if (s === 'warning') return 'warning'
  return 'info'
}
</script>

<template>
  <div>
    <Skeleton v-if="loading" :rows="4" />
    <EmptyState v-else-if="!notifications.length" title="No history" message="No resolved or silenced notifications." icon="◬" />
    <table v-else class="data-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Severity</th>
          <th>State</th>
          <th>Created</th>
          <th>Resolved</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="n in notifications" :key="n.id">
          <td>{{ n.title }}</td>
          <td><StatusBadge :status="severityStatus(n.severity)" :label="n.severity" /></td>
          <td class="td-muted">{{ n.state }}</td>
          <td class="td-muted">{{ new Date(n.created_at).toLocaleString() }}</td>
          <td class="td-muted">{{ n.resolved_at ? new Date(n.resolved_at).toLocaleString() : '—' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
