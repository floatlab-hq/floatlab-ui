import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import type { CommandResult } from '@/types/ui'

export function useCommandPalette() {
  const router = useRouter()
  const open = ref(false)

  const commands: CommandResult[] = [
    { id: 'goto-dashboard',  icon: '⊞', label: 'Go to Dashboard',  action: () => router.push('/') },
    { id: 'goto-workloads',  icon: '⬡', label: 'Go to Workloads',  action: () => router.push('/workloads') },
    { id: 'goto-nodes',      icon: '◈', label: 'Go to Nodes',      action: () => router.push('/nodes') },
    { id: 'goto-alerts',     icon: '◇', label: 'Go to Alerts',     action: () => router.push('/alerts') },
    { id: 'goto-settings',   icon: '⚙', label: 'Go to Settings',   action: () => router.push('/settings') },
  ]

  function onKeydown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      open.value = !open.value
    }
  }

  onMounted(() => document.addEventListener('keydown', onKeydown))
  onUnmounted(() => document.removeEventListener('keydown', onKeydown))

  return {
    open,
    commands,
    close: () => { open.value = false },
  }
}
