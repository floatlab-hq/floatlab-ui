<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useWorkloads } from '@/composables/useWorkloads'
import { useWorkload } from '@/composables/useWorkload'
import { useUrlState } from '@/composables/useUrlState'
import SearchBar from '@/components/shared/SearchBar.vue'
import TabBar from '@/components/shared/TabBar.vue'
import StatusBadge from '@/components/instrument/StatusBadge.vue'
import ResBar from '@/components/instrument/ResBar.vue'
import Skeleton from '@/components/shared/Skeleton.vue'
import EmptyState from '@/components/shared/EmptyState.vue'

const WorkloadLogs = defineAsyncComponent(() => import('@/components/workload/WorkloadLogs.vue'))
const WorkloadCompose = defineAsyncComponent(() => import('@/components/workload/WorkloadCompose.vue'))
const WorkloadStorage = defineAsyncComponent(() => import('@/components/workload/WorkloadStorage.vue'))
const WorkloadFailover = defineAsyncComponent(() => import('@/components/workload/WorkloadFailover.vue'))
const WorkloadMetrics = defineAsyncComponent(() => import('@/components/workload/WorkloadMetrics.vue'))
const WorkloadNetworking = defineAsyncComponent(() => import('@/components/workload/WorkloadNetworking.vue'))

const { stacks, loading } = useWorkloads()
const { selectedStack, activeTab, searchQuery, sortKey, sortDir, selectStack, setTab, setSearch, setSort } = useUrlState()
const { stack, containers, loading: detailLoading } = useWorkload(() => selectedStack.value ?? null)

const filtered = computed(() => {
  let list = [...stacks.value]
  const q = searchQuery.value.toLowerCase()
  if (q) list = list.filter(s => s.name.toLowerCase().includes(q) || s.state.toLowerCase().includes(q))
  list.sort((a, b) => {
    const aVal = String((a as Record<string, unknown>)[sortKey.value] ?? '')
    const bVal = String((b as Record<string, unknown>)[sortKey.value] ?? '')
    return sortDir.value === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
  })
  return list
})

const detailTabs = [
  { id: 'status', label: 'Status' },
  { id: 'metrics', label: 'Metrics' },
  { id: 'logs', label: 'Logs' },
  { id: 'compose', label: 'Compose' },
  { id: 'storage', label: 'Storage' },
  { id: 'networking', label: 'Networking' },
  { id: 'failover', label: 'Failover' },
]

function stateToStatus(state: string): string {
  if (state === 'RunningPrimary' || state === 'RunningBackup') return 'running'
  if (state === 'Failed') return 'error'
  if (state === 'FailingOver' || state === 'Restoring') return 'warning'
  if (state === 'Stopping' || state === 'Idle') return 'stopped'
  return 'pending'
}
</script>

<template>
  <div class="two-pane">
    <!-- Left pane: stack list -->
    <div class="pane-left">
      <div class="page-toolbar">
        <SearchBar :model-value="searchQuery" @update:model-value="setSearch" placeholder="Search workloads…" />
        <div style="flex:1" />
        <button class="btn btn--primary btn--sm">+ New</button>
      </div>

      <div class="pane-scroll">
        <Skeleton v-if="loading" :rows="6" style="padding:var(--sp-5)" />
        <EmptyState v-else-if="!filtered.length" title="No workloads" message="Create a workload to get started." icon="▦" />
        <table v-else class="data-table">
          <thead>
            <tr>
              <th class="sortable" @click="setSort('name')">Name</th>
              <th class="sortable" @click="setSort('state')">State</th>
              <th>Usage</th>
              <th class="sortable" @click="setSort('primary_node')">Node</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="s in filtered"
              :key="s.id"
              :class="{ 'row--selected': selectedStack === s.id }"
              @click="selectStack(s.id)"
            >
              <td style="font-weight:500">{{ s.name }}</td>
              <td><StatusBadge :status="stateToStatus(s.state)" :label="s.state" /></td>
              <td><ResBar :value="0.3" :segments="12" style="min-width:60px" /></td>
              <td class="td-muted">{{ s.primary_node }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Right pane: detail -->
    <div v-if="selectedStack" class="pane-right">
      <div class="page-header">
        <div style="display:flex;flex-direction:column;gap:var(--sp-2)">
          <span style="font-size:13px;font-weight:600">{{ stack?.name ?? '…' }}</span>
          <StatusBadge v-if="stack" :status="stateToStatus(stack.state)" :label="stack.state" />
        </div>
        <button class="topbar__icon-btn" @click="selectStack(null)">✕</button>
      </div>

      <TabBar :tabs="detailTabs" :active="activeTab" @change="setTab" />

      <div class="pane-scroll" style="padding:var(--sp-4)">
        <Skeleton v-if="detailLoading && !stack" :rows="4" />

        <div v-else-if="activeTab === 'status'">
          <div class="panel">
            <div class="panel__header">Containers</div>
            <table class="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>CPU</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="c in containers" :key="c.id">
                  <td>{{ c.name }}</td>
                  <td><StatusBadge :status="c.status" /></td>
                  <td><ResBar :value="c.cpu_pct / 100" :segments="10" /></td>
                  <td class="td-muted" style="max-width:180px;overflow:hidden;text-overflow:ellipsis">{{ c.image }}</td>
                </tr>
                <tr v-if="!containers.length">
                  <td colspan="4" style="text-align:center;padding:var(--sp-6);color:var(--text-muted)">No containers running</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <WorkloadMetrics v-else-if="activeTab === 'metrics'" :stack-id="selectedStack" />
        <WorkloadLogs v-else-if="activeTab === 'logs'" :stack-id="selectedStack" />
        <WorkloadCompose v-else-if="activeTab === 'compose'" :stack="stack" />
        <WorkloadStorage v-else-if="activeTab === 'storage'" :stack-id="selectedStack" />
        <WorkloadNetworking v-else-if="activeTab === 'networking'" :stack-id="selectedStack" />
        <WorkloadFailover v-else-if="activeTab === 'failover'" :stack="stack" />
      </div>
    </div>

    <div v-else class="pane-right" style="display:flex;align-items:center;justify-content:center">
      <EmptyState title="No workload selected" message="Select a workload from the list to view details." icon="▦" />
    </div>
  </div>
</template>
