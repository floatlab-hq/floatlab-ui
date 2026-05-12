<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { listPools } from '@/api/store'
import type { ZfsPool } from '@/types/models'
import ResBar from '@/components/instrument/ResBar.vue'
import StatusBadge from '@/components/instrument/StatusBadge.vue'
import Skeleton from '@/components/shared/Skeleton.vue'
import EmptyState from '@/components/shared/EmptyState.vue'

const props = defineProps<{ nodeId: string }>()

const pools = ref<ZfsPool[]>([])
const loading = ref(true)

async function load() {
  loading.value = true
  try {
    const all = await listPools()
    pools.value = all.filter(p => p.node_id === props.nodeId)
  } finally {
    loading.value = false
  }
}

watchEffect(load)

function poolStatus(state: string): string {
  if (state === 'ONLINE') return 'running'
  if (state === 'DEGRADED') return 'warning'
  return 'error'
}

function fmtBytes(b: number): string {
  if (b > 1e12) return `${(b / 1e12).toFixed(1)} TB`
  if (b > 1e9) return `${(b / 1e9).toFixed(1)} GB`
  return `${(b / 1e6).toFixed(0)} MB`
}
</script>

<template>
  <div style="display:flex;flex-direction:column;gap:var(--sp-4)">
    <Skeleton v-if="loading" :rows="3" />
    <EmptyState v-else-if="!pools.length" title="No pools" message="No ZFS pools found for this node." icon="◫" />
    <div v-else v-for="pool in pools" :key="pool.name" class="panel">
      <div class="panel__header">
        {{ pool.name }}
        <div class="panel__header-actions">
          <StatusBadge :status="poolStatus(pool.state)" :label="pool.state" />
        </div>
      </div>
      <div class="panel__body" style="display:flex;flex-direction:column;gap:var(--sp-3)">
        <ResBar
          :value="pool.cap_pct / 100"
          :label="pool.name"
          :value-label="`${fmtBytes(pool.alloc_bytes)} / ${fmtBytes(pool.size_bytes)}`"
        />
        <div style="display:flex;gap:var(--sp-4);font-size:10px;color:var(--text-muted)">
          <span>free: {{ fmtBytes(pool.free_bytes) }}</span>
          <span>cap: {{ pool.cap_pct.toFixed(1) }}%</span>
          <span>health: {{ pool.health }}</span>
        </div>
        <div v-if="pool.vdevs.length" style="margin-top:var(--sp-2);display:flex;flex-direction:column;gap:var(--sp-1)">
          <div v-for="v in pool.vdevs" :key="v.name" style="display:flex;justify-content:space-between;font-size:11px">
            <span style="color:var(--text-muted)">{{ v.name }}</span>
            <span :style="{ color: v.state === 'ONLINE' ? 'var(--green-400)' : 'var(--red-400)' }">{{ v.state }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
