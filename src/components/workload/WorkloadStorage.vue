<script setup lang="ts">
import { ref } from 'vue'
import { useStorage } from '@/composables/useStorage'
import { createSnapshot, deleteSnapshot } from '@/api/store'
import ResBar from '@/components/instrument/ResBar.vue'
import Skeleton from '@/components/shared/Skeleton.vue'

const props = defineProps<{ stackId: string }>()
const { dataset, snapshots, loading, refresh } = useStorage(() => props.stackId)

const snapshotName = ref('')
const creating = ref(false)

async function doCreate() {
  if (!snapshotName.value.trim()) return
  creating.value = true
  try {
    await createSnapshot(props.stackId, snapshotName.value.trim())
    snapshotName.value = ''
    await refresh()
  } finally {
    creating.value = false
  }
}

async function doDelete(name: string) {
  await deleteSnapshot(props.stackId, name)
  await refresh()
}

function fmtBytes(b: number): string {
  if (b > 1e9) return `${(b / 1e9).toFixed(1)} GB`
  if (b > 1e6) return `${(b / 1e6).toFixed(1)} MB`
  return `${(b / 1e3).toFixed(1)} KB`
}
</script>

<template>
  <div style="display:flex;flex-direction:column;gap:var(--sp-4)">
    <Skeleton v-if="loading && !dataset" :rows="3" />

    <div v-if="dataset" class="panel">
      <div class="panel__header">Dataset</div>
      <div class="panel__body" style="display:flex;flex-direction:column;gap:var(--sp-3)">
        <ResBar
          :value="dataset.used_bytes / (dataset.quota_bytes ?? dataset.used_bytes + dataset.avail_bytes)"
          :label="dataset.name"
          :value-label="`${fmtBytes(dataset.used_bytes)} / ${fmtBytes(dataset.quota_bytes ?? dataset.avail_bytes + dataset.used_bytes)}`"
        />
        <div style="display:flex;gap:var(--sp-6);font-size:10px;color:var(--text-muted)">
          <span>compress: {{ dataset.compression }}</span>
          <span>block: {{ dataset.block_size }}</span>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel__header">
        Snapshots
        <div class="panel__header-actions">
          <input v-model="snapshotName" class="input" style="max-width:140px" placeholder="snapshot name" />
          <button class="btn btn--outline btn--sm" :disabled="creating || !snapshotName" @click="doCreate">
            {{ creating ? '…' : '+ Snap' }}
          </button>
        </div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Size</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in snapshots" :key="s.name">
            <td style="font-family:var(--font-mono)">{{ s.name }}</td>
            <td class="td-muted">{{ s.type }}</td>
            <td class="td-muted">{{ fmtBytes(s.size_bytes) }}</td>
            <td class="td-muted">{{ new Date(s.created_at).toLocaleString() }}</td>
            <td>
              <button class="btn btn--danger btn--sm" @click="doDelete(s.name)">Del</button>
            </td>
          </tr>
          <tr v-if="!snapshots.length">
            <td colspan="5" style="text-align:center;padding:var(--sp-6);color:var(--text-muted)">No snapshots</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
