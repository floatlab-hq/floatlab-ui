import { ref, watch, onUnmounted } from 'vue'
import { createContainerLogStream } from '@/api/logs'
import type { LogLine } from '@/types/models'

const MAX_LINES = 2000

export function useLogs(containerId: () => string | null) {
  const lines = ref<LogLine[]>([])
  const isStreaming = ref(false)
  const error = ref<string | null>(null)

  let source: EventSource | null = null

  function stop() {
    source?.close()
    source = null
    isStreaming.value = false
  }

  function start() {
    const id = containerId()
    if (!id) return
    stop()
    lines.value = []
    source = createContainerLogStream(id)
    isStreaming.value = true

    source.onmessage = (ev) => {
      try {
        const line: LogLine = JSON.parse(ev.data)
        lines.value.push(line)
        if (lines.value.length > MAX_LINES) lines.value.splice(0, lines.value.length - MAX_LINES)
      } catch {
        // ignore malformed
      }
    }

    source.onerror = () => {
      error.value = 'Log stream disconnected'
      isStreaming.value = false
    }
  }

  watch(containerId, (id) => {
    if (id) start()
    else stop()
  }, { immediate: true })

  onUnmounted(stop)

  return { lines, isStreaming, error, start, stop }
}
