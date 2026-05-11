import type { ApiError } from '@/types/api'

const BASE = import.meta.env.VITE_API_BASE ?? '/api/v1'

export class ApiClientError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly code?: string
  ) {
    super(message)
    this.name = 'ApiClientError'
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  })

  if (!res.ok) {
    let err: ApiError = { status: res.status, message: res.statusText }
    try {
      err = await res.json()
    } catch {
      // fallback to statusText
    }
    throw new ApiClientError(res.status, err.message, err.code)
  }

  if (res.status === 204) return undefined as T
  return res.json()
}

export function get<T>(path: string): Promise<T> {
  return request<T>(path)
}

export function post<T>(path: string, body?: unknown): Promise<T> {
  return request<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined })
}

export function put<T>(path: string, body?: unknown): Promise<T> {
  return request<T>(path, { method: 'PUT', body: body ? JSON.stringify(body) : undefined })
}

export function del<T>(path: string): Promise<T> {
  return request<T>(path, { method: 'DELETE' })
}

export function createEventSource(path: string): EventSource {
  return new EventSource(`${BASE}${path}`)
}
