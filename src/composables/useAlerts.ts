import { ref, computed, onUnmounted } from 'vue'
import { listNotifications } from '@/api/notify'
import type { Notification } from '@/types/models'

export function useAlerts() {
  const notifications = ref<Notification[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  const unreadCount = computed(() => notifications.value.filter(n => n.state === 'unread').length)

  async function load() {
    try {
      notifications.value = await listNotifications()
      error.value = null
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load alerts'
    } finally {
      loading.value = false
    }
  }

  load()
  const timer = setInterval(load, 30_000)
  onUnmounted(() => clearInterval(timer))

  return { notifications, unreadCount, loading, error, refresh: load }
}
