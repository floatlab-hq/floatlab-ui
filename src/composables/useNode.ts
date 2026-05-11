import { ref, watch, onUnmounted } from 'vue'
import { getNode, getNodeHealth } from '@/api/config'
import type { Node } from '@/types/models'

export function useNode(id: () => string) {
  const node = ref<Node | null>(null)
  const health = ref<{ status: string; latency_ms: number } | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  async function load() {
    const currentId = id()
    if (!currentId) return
    loading.value = true
    try {
      const [n, h] = await Promise.all([getNode(currentId), getNodeHealth(currentId)])
      node.value = n
      health.value = h
      error.value = null
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load node'
    } finally {
      loading.value = false
    }
  }

  watch(id, load, { immediate: true })
  const timer = setInterval(load, 10_000)
  onUnmounted(() => clearInterval(timer))

  return { node, health, loading, error, refresh: load }
}
