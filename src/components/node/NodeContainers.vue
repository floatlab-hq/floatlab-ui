<script setup lang="ts">
import { computed } from 'vue'
import { useWorkloads } from '@/composables/useWorkloads'
import { useRouter } from 'vue-router'
import StatusBadge from '@/components/instrument/StatusBadge.vue'
import Skeleton from '@/components/shared/Skeleton.vue'
import EmptyState from '@/components/shared/EmptyState.vue'

const props = defineProps<{ nodeId: string }>()
const { stacks, loading } = useWorkloads()
const router = useRouter()

const nodeStacks = computed(() =>
  stacks.value.filter(s => s.primary_node === props.nodeId || s.secondary_node === props.nodeId)
)

function stateToStatus(state: string): string {
  if (state === 'RunningPrimary' || state === 'RunningBackup') return 'running'
  if (state === 'Failed') return 'error'
  if (state === 'FailingOver' || state === 'Restoring') return 'warning'
  if (state === 'Stopping' || state === 'Idle') return 'stopped'
  return 'pending'
}

function roleFor(stack: { primary_node: string; secondary_node: string }): string {
  if (stack.primary_node === props.nodeId) return 'primary'
  return 'secondary'
}
</script>

<template>
  <div>
    <Skeleton v-if="loading" :rows="3" />
    <EmptyState v-else-if="!nodeStacks.length" title="No workloads" message="No workloads assigned to this node." icon="▦" />
    <table v-else class="data-table">
      <thead>
        <tr>
          <th>Workload</th>
          <th>State</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="s in nodeStacks"
          :key="s.id"
          style="cursor:pointer"
          @click="router.push(`/workloads?stack=${s.id}`)"
        >
          <td style="font-weight:500">{{ s.name }}</td>
          <td><StatusBadge :status="stateToStatus(s.state)" :label="s.state" /></td>
          <td class="td-muted">{{ roleFor(s) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
