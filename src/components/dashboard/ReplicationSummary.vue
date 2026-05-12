<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { listReplicationJobs } from '@/api/store'
import type { ReplicationJob } from '@/types/models'
import StatusBadge from '@/components/instrument/StatusBadge.vue'
import Skeleton from '@/components/shared/Skeleton.vue'

const jobs = ref<ReplicationJob[]>([])
const loading = ref(true)

async function load() {
  try {
    jobs.value = await listReplicationJobs()
  } finally {
    loading.value = false
  }
}

load()
const timer = setInterval(load, 15_000)
onUnmounted(() => clearInterval(timer))

function jobStatus(state: string): string {
  if (state === 'success') return 'running'
  if (state === 'failed') return 'error'
  if (state === 'running') return 'pending'
  return 'stopped'
}

function fmtBytes(b: number): string {
  if (b > 1e9) return `${(b / 1e9).toFixed(1)} GB`
  if (b > 1e6) return `${(b / 1e6).toFixed(1)} MB`
  return `${(b / 1e3).toFixed(0)} KB`
}
</script>

<template>
  <div>
    <Skeleton v-if="loading" :rows="3" />
    <table v-else class="data-table">
      <thead>
        <tr>
          <th>Stack</th>
          <th>State</th>
          <th>Sent</th>
          <th>Started</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="job in jobs" :key="job.id">
          <td class="td-muted" style="font-family:var(--font-mono)">{{ job.stack_id.slice(0, 8) }}</td>
          <td><StatusBadge :status="jobStatus(job.state)" :label="job.state" /></td>
          <td class="td-muted">{{ fmtBytes(job.bytes_sent) }}</td>
          <td class="td-muted">{{ new Date(job.started_at).toLocaleTimeString() }}</td>
          <td class="td-muted">{{ job.completed_at ? new Date(job.completed_at).toLocaleTimeString() : '—' }}</td>
        </tr>
        <tr v-if="!jobs.length">
          <td colspan="5" style="text-align:center;padding:var(--sp-6);color:var(--text-muted)">No replication jobs</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
