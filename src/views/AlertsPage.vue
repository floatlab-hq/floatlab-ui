<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAlerts } from '@/composables/useAlerts'
import { resolveNotification } from '@/api/notify'
import AlertList from '@/components/alerts/AlertList.vue'
import AlertHistory from '@/components/alerts/AlertHistory.vue'
import SilenceModal from '@/components/alerts/SilenceModal.vue'
import TabBar from '@/components/shared/TabBar.vue'

const { notifications, loading, refresh } = useAlerts()

const activeTab = ref('active')
const tabs = [
  { id: 'active', label: 'Active' },
  { id: 'history', label: 'History' },
]

const active = computed(() => notifications.value.filter(n => n.state !== 'read' && !n.resolved_at))
const history = computed(() => notifications.value.filter(n => n.state === 'read' || !!n.resolved_at))

const silencingId = ref<string | null>(null)

async function resolve(id: string) {
  await resolveNotification(id)
  await refresh()
}

function silence(id: string) {
  silencingId.value = id
}

async function onSilenced() {
  await refresh()
}
</script>

<template>
  <div style="padding:var(--sp-6);display:flex;flex-direction:column;gap:var(--sp-4);overflow-y:auto;height:100%">
    <div style="display:flex;align-items:center;justify-content:space-between;padding-bottom:var(--sp-2)">
      <span class="label-upper">Alerts &amp; Notifications</span>
      <button class="btn btn--ghost btn--sm" @click="refresh()">Refresh</button>
    </div>

    <TabBar :tabs="tabs" :active="activeTab" @change="activeTab = $event" />

    <AlertList
      v-if="activeTab === 'active'"
      :notifications="active"
      :loading="loading"
      @resolve="resolve"
      @silence="silence"
    />
    <AlertHistory
      v-else
      :notifications="history"
      :loading="loading"
    />

    <SilenceModal
      :notification-id="silencingId"
      @close="silencingId = null"
      @silenced="onSilenced"
    />
  </div>
</template>
