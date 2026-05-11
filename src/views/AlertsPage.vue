<script setup lang="ts">
import { useAlerts } from '@/composables/useAlerts'
import { resolveNotification } from '@/api/notify'
import StatusBadge from '@/components/instrument/StatusBadge.vue'
import EmptyState from '@/components/shared/EmptyState.vue'
import Skeleton from '@/components/shared/Skeleton.vue'

const { notifications, loading, refresh } = useAlerts()

async function resolve(id: string) {
  await resolveNotification(id)
  await refresh()
}

function severityStatus(s: string): string {
  if (s === 'critical') return 'error'
  if (s === 'warning') return 'warning'
  return 'info'
}
</script>

<template>
  <div style="padding:var(--sp-6);display:flex;flex-direction:column;gap:var(--sp-4);overflow-y:auto;height:100%">
    <div style="display:flex;align-items:center;justify-content:space-between;padding-bottom:var(--sp-4)">
      <span class="label-upper">Alerts &amp; Notifications</span>
      <button class="btn btn--ghost btn--sm" @click="refresh()">Refresh</button>
    </div>

    <Skeleton v-if="loading" :rows="4" />
    <EmptyState v-else-if="!notifications.length" title="No alerts" message="All clear — no active notifications." icon="◬" />

    <div v-else style="display:flex;flex-direction:column;gap:var(--sp-3)">
      <div
        v-for="n in notifications"
        :key="n.id"
        class="alert-item"
        :class="{ 'alert-item--unread': n.state === 'unread' }"
      >
        <div class="alert-item__indicator">
          <div
            class="alert-item__dot"
            :style="{
              background: n.severity === 'critical' ? 'var(--red-400)'
                        : n.severity === 'warning' ? 'var(--amber-400)'
                        : 'var(--cyan-400)'
            }"
          />
        </div>
        <div class="alert-item__body">
          <div class="alert-item__header">
            <span class="alert-item__title">{{ n.title }}</span>
            <span class="alert-item__time">{{ new Date(n.created_at).toLocaleTimeString() }}</span>
          </div>
          <div class="alert-item__msg">{{ n.body }}</div>
        </div>
        <div style="display:flex;align-items:center;gap:var(--sp-3);flex-shrink:0">
          <StatusBadge :status="severityStatus(n.severity)" :label="n.severity" />
          <button class="btn btn--ghost btn--sm" @click.stop="resolve(n.id)">Resolve</button>
        </div>
      </div>
    </div>
  </div>
</template>
