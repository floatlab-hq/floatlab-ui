import { ref, onUnmounted } from 'vue'
import { listNodes } from '@/api/config'
import type { Node } from '@/types/models'

export function useNodes() {
  const nodes = ref<Node[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  async function load() {
    try {
      nodes.value = await listNodes()
      error.value = null
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load nodes'
    } finally {
      loading.value = false
    }
  }

  load()
  const timer = setInterval(load, 10_000)
  onUnmounted(() => clearInterval(timer))

  return { nodes, loading, error, refresh: load }
}
