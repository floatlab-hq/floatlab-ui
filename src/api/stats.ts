import { get } from './client'
import type { MetricSeries } from '@/types/api'
import type { MetricRange } from '@/types/ui'

export const getNodeStats = (nodeId: string, range: MetricRange = '1h') =>
  get<MetricSeries[]>(`/stats/nodes/${nodeId}?range=${range}`)

export const getStackStats = (stackId: string, range: MetricRange = '1h') =>
  get<MetricSeries[]>(`/stats/stacks/${stackId}?range=${range}`)

export const getStorageStats = (nodeId: string, range: MetricRange = '1h') =>
  get<MetricSeries[]>(`/stats/storage/${nodeId}?range=${range}`)

export const queryMetrics = (query: string, range: MetricRange = '1h') =>
  get<MetricSeries[]>(`/stats/query?q=${encodeURIComponent(query)}&range=${range}`)
