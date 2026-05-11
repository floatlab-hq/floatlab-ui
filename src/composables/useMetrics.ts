import { ref, watch, onUnmounted } from 'vue'
import { getStackStats, getNodeStats } from '@/api/stats'
import type { MetricSeries } from '@/types/api'
import type { MetricRange } from '@/types/ui'

export function useMetrics(
  targetId: () => string | null,
  type: 'stack' | 'node',
  range: () => MetricRange = () => '1h'
) {
  const series = ref<MetricSeries[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function load() {
    const id = targetId()
    if (!id) { series.value = []; return }
    loading.value = true
    try {
      series.value = type === 'stack'
        ? await getStackStats(id, range())
        : await getNodeStats(id, range())
      error.value = null
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load metrics'
    } finally {
      loading.value = false
    }
  }

  watch([targetId, range], load, { immediate: true })
  const timer = setInterval(load, 30_000)
  onUnmounted(() => clearInterval(timer))

  return { series, loading, error, refresh: load }
}
