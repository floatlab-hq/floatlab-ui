import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useUrlState() {
  const route = useRoute()
  const router = useRouter()

  const selectedStack = computed(() => route.query.stack as string | undefined)
  const activeTab = computed(() => (route.query.tab as string) || 'status')
  const searchQuery = computed(() => (route.query.q as string) || '')
  const sortKey = computed(() => (route.query.sort as string) || 'name')
  const sortDir = computed(() => ((route.query.dir as string) || 'asc') as 'asc' | 'desc')

  function selectStack(id: string | null) {
    router.push({ query: { ...route.query, stack: id ?? undefined, tab: undefined } })
  }

  function setTab(tab: string) {
    router.replace({ query: { ...route.query, tab } })
  }

  function setSearch(q: string) {
    router.replace({ query: { ...route.query, q: q || undefined } })
  }

  function setSort(key: string) {
    const newDir = sortKey.value === key && sortDir.value === 'asc' ? 'desc' : 'asc'
    router.replace({ query: { ...route.query, sort: key, dir: newDir } })
  }

  return { selectedStack, activeTab, searchQuery, sortKey, sortDir, selectStack, setTab, setSearch, setSort }
}
