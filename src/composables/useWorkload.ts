import { ref, watch, onUnmounted } from 'vue'
import { getStack, getStackContainers } from '@/api/config'
import type { Stack, Container } from '@/types/models'

export function useWorkload(id: () => string | null) {
  const stack = ref<Stack | null>(null)
  const containers = ref<Container[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function load() {
    const currentId = id()
    if (!currentId) { stack.value = null; containers.value = []; return }
    loading.value = true
    try {
      const [s, c] = await Promise.all([getStack(currentId), getStackContainers(currentId)])
      stack.value = s
      containers.value = c
      error.value = null
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load stack'
    } finally {
      loading.value = false
    }
  }

  watch(id, load, { immediate: true })

  const timer = setInterval(() => {
    if (id()) load()
  }, 5_000)
  onUnmounted(() => clearInterval(timer))

  return { stack, containers, loading, error, refresh: load }
}
