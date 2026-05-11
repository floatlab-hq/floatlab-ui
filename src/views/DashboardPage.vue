<script setup lang="ts">
import { computed } from 'vue'
import { useWorkloads } from '@/composables/useWorkloads'
import { useNodes } from '@/composables/useNodes'
import { useAlerts } from '@/composables/useAlerts'
import Panel from '@/components/layout/Panel.vue'
import StatusBadge from '@/components/instrument/StatusBadge.vue'
import NodeIsoIcon from '@/components/instrument/NodeIsoIcon.vue'
import Skeleton from '@/components/shared/Skeleton.vue'
import { useRouter } from 'vue-router'

const { stacks, loading: stacksLoading } = useWorkloads()
const { nodes, loading: nodesLoading } = useNodes()
const { notifications } = useAlerts()
const router = useRouter()

const running = computed(() => stacks.value.filter(s => s.state === 'RunningPrimary' || s.state === 'RunningBackup').length)
const faulted = computed(() => stacks.value.filter(s => s.state === 'Failed' || s.state === 'FailingOver').length)
const unread = computed(() => notifications.value.filter(n => n.state === 'unread').length)
</script>

<template>
  <div style="padding:var(--sp-6);display:flex;flex-direction:column;gap:var(--sp-6);overflow-y:auto;height:100%">
    <div style="display:flex;gap:var(--sp-4)">
      <Panel title="Workloads" style="flex:1">
        <Skeleton v-if="stacksLoading" :rows="2" />
        <div v-else style="display:flex;flex-direction:column;gap:var(--sp-3)">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:24px;font-weight:700;color:var(--text-primary)">{{ stacks.length }}</span>
            <StatusBadge status="running" :label="`${running} running`" />
          </div>
          <div v-if="faulted > 0" style="font-size:11px;color:var(--red-400)">{{ faulted }} faulted</div>
        </div>
      </Panel>

      <Panel title="Nodes" style="flex:1">
        <Skeleton v-if="nodesLoading" :rows="2" />
        <div v-else style="display:flex;gap:var(--sp-4);align-items:flex-end;flex-wrap:wrap">
          <div
            v-for="node in nodes"
            :key="node.id"
            style="display:flex;flex-direction:column;align-items:center;gap:var(--sp-2);cursor:pointer"
            @click="router.push(`/nodes/${node.id}`)"
          >
            <NodeIsoIcon :status="node.status" :size="40" />
            <span style="font-size:10px;color:var(--text-muted)">{{ node.name }}</span>
          </div>
          <div v-if="!nodes.length" style="font-size:11px;color:var(--text-disabled)">No nodes registered</div>
        </div>
      </Panel>

      <Panel title="Alerts" style="flex:1">
        <div style="display:flex;flex-direction:column;gap:var(--sp-3)">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:24px;font-weight:700;color:var(--text-primary)">{{ notifications.length }}</span>
            <span v-if="unread > 0" class="badge badge--warning">
              <span class="badge__dot badge__dot--warning" />
              {{ unread }} unread
            </span>
          </div>
          <button class="btn btn--ghost btn--sm" style="align-self:flex-start" @click="router.push('/alerts')">View all →</button>
        </div>
      </Panel>
    </div>

    <Panel title="Workloads">
      <table class="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>State</th>
            <th>Primary</th>
            <th>Secondary</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="stack in stacks.slice(0, 8)"
            :key="stack.id"
            @click="router.push(`/workloads?stack=${stack.id}`)"
          >
            <td>{{ stack.name }}</td>
            <td>
              <StatusBadge
                :status="stack.state === 'RunningPrimary' ? 'running' : stack.state === 'Failed' ? 'error' : 'pending'"
                :label="stack.state"
              />
            </td>
            <td class="td-muted">{{ stack.primary_node }}</td>
            <td class="td-muted">{{ stack.secondary_node || '—' }}</td>
          </tr>
          <tr v-if="!stacks.length">
            <td colspan="4" style="text-align:center;padding:var(--sp-8);color:var(--text-muted)">No workloads — create one to get started</td>
          </tr>
        </tbody>
      </table>
    </Panel>
  </div>
</template>
