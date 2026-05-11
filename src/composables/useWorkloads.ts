import { ref, onUnmounted } from 'vue'
import { listStacks } from '@/api/config'
import type { Stack } from '@/types/models'

export function useWorkloads() {
  const stacks = ref<Stack[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  async function load() {
    try {
      stacks.value = await listStacks()
      error.value = null
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load workloads'
    } finally {
      loading.value = false
    }
  }

  load()
  const timer = setInterval(load, 10_000)
  onUnmounted(() => clearInterval(timer))

  return { stacks, loading, error, refresh: load }
}
