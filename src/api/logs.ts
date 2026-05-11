import { get, createEventSource } from './client'
import type { LogLine } from '@/types/models'

export const searchLogs = (query: string, limit = 200) =>
  get<LogLine[]>(`/logs/search?q=${encodeURIComponent(query)}&limit=${limit}`)

export const getAuditLog = (limit = 100) =>
  get<LogLine[]>(`/logs/audit?limit=${limit}`)

export const getNodeLogs = (nodeId: string, limit = 200) =>
  get<LogLine[]>(`/logs/nodes/${nodeId}?limit=${limit}`)

export const getStackLogs = (stackId: string, limit = 200) =>
  get<LogLine[]>(`/logs/stacks/${stackId}?limit=${limit}`)

export function createContainerLogStream(containerId: string): EventSource {
  return createEventSource(`/logs/containers/${containerId}?follow=true`)
}
