export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  page_size: number
}

export interface ApiError {
  status: number
  message: string
  code?: string
}

export interface MetricPoint {
  timestamp: number
  value: number
}

export interface MetricSeries {
  label: string
  unit: string
  points: MetricPoint[]
}

export interface HealthResponse {
  status: 'ok' | 'degraded' | 'unavailable'
  version: string
  uptime_seconds: number
}

export interface RaftHealthResponse {
  leader: string
  state: 'Leader' | 'Follower' | 'Candidate' | 'Shutdown'
  peers: string[]
  commit_index: number
  last_log_index: number
}
