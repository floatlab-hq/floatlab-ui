<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { listAllocations, deleteAllocation } from '@/api/network'
import type { IpReservation } from '@/types/models'
import Skeleton from '@/components/shared/Skeleton.vue'
import EmptyState from '@/components/shared/EmptyState.vue'

const props = defineProps<{ stackId: string }>()

const allocations = ref<IpReservation[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

async function load() {
  if (!props.stackId) return
  loading.value = true
  try {
    allocations.value = await listAllocations(props.stackId)
    error.value = null
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load allocations'
  } finally {
    loading.value = false
  }
}

watchEffect(load)

async function doDelete(id: string) {
  await deleteAllocation(id)
  await load()
}
</script>

<template>
  <div class="panel">
    <div class="panel__header">IP Allocations</div>
    <Skeleton v-if="loading && !allocations.length" :rows="3" />
    <EmptyState v-else-if="!loading && !allocations.length" title="No allocations" message="No IP addresses allocated for this workload." icon="◎" />
    <table v-else class="data-table">
      <thead>
        <tr>
          <th>Service</th>
          <th>Address</th>
          <th>Pool</th>
          <th>Allocated</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="a in allocations" :key="a.id">
          <td>{{ a.service }}</td>
          <td style="font-family:var(--font-mono);color:var(--cyan-400)">{{ a.address }}</td>
          <td class="td-muted">{{ a.prefix_pool }}</td>
          <td class="td-muted">{{ new Date(a.allocated_at).toLocaleString() }}</td>
          <td>
            <button class="btn btn--danger btn--sm" @click="doDelete(a.id)">Release</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="error" style="padding:var(--sp-3);color:var(--red-400);font-size:11px">{{ error }}</div>
  </div>
</template>
