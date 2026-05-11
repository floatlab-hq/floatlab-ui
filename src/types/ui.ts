export type TabId = 'status' | 'logs' | 'compose' | 'storage' | 'networking' | 'failover'
  | 'resources' | 'zfs' | 'containers' | 'network' | 'history'

export type SortDirection = 'asc' | 'desc'

export interface FilterState {
  q: string
  sort: string
  dir: SortDirection
  page: number
}

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

export interface ToastMessage {
  id: string
  variant: ToastVariant
  title: string
  message?: string
  duration?: number
}

export interface CommandResult {
  id: string
  icon: string
  label: string
  meta?: string
  action: () => void
}

export type MetricRange = '1h' | '6h' | '24h' | '7d'

export interface ResPopoverRow {
  name: string
  value: string
  pct: number
  variant?: 'warn' | 'error' | 'normal'
}
