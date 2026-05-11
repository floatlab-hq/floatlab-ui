import { ref, watch, onUnmounted } from 'vue'
import { getStackDataset, listSnapshots, listReplicationJobs } from '@/api/store'
import type { ZfsDataset, Snapshot, ReplicationJob } from '@/types/models'

export function useStorage(stackId: () => string | null) {
  const dataset = ref<ZfsDataset | null>(null)
  const snapshots = ref<Snapshot[]>([])
  const replication = ref<ReplicationJob[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function load() {
    const id = stackId()
    if (!id) { dataset.value = null; snapshots.value = []; return }
    loading.value = true
    try {
      const [d, s, r] = await Promise.all([
        getStackDataset(id),
        listSnapshots(id),
        listReplicationJobs(),
      ])
      dataset.value = d
      snapshots.value = s
      replication.value = r.filter(j => j.stack_id === id)
      error.value = null
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load storage'
    } finally {
      loading.value = false
    }
  }

  watch(stackId, load, { immediate: true })
  const timer = setInterval(() => { if (stackId()) load() }, 15_000)
  onUnmounted(() => clearInterval(timer))

  return { dataset, snapshots, replication, loading, error, refresh: load }
}
