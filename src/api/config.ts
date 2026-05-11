import { get, post, put, del } from './client'
import type { Stack, Node } from '@/types/models'

export const listStacks = () => get<Stack[]>('/stacks')
export const getStack = (id: string) => get<Stack>(`/stacks/${id}`)
export const createStack = (payload: Partial<Stack>) => post<Stack>('/stacks', payload)
export const updateStackCompose = (id: string, compose: string) =>
  put<Stack>(`/stacks/${id}/compose`, { compose_file: compose })
export const deleteStack = (id: string) => del<void>(`/stacks/${id}`)
export const startStack = (id: string) => post<void>(`/stacks/${id}/start`)
export const stopStack = (id: string) => post<void>(`/stacks/${id}/stop`)
export const triggerFailover = (id: string) => post<void>(`/stacks/${id}/failover`)
export const restoreStack = (id: string) => post<void>(`/stacks/${id}/restore`)
export const getStackState = (id: string) => get<{ state: string }>(`/stacks/${id}/state`)
export const getStackContainers = (id: string) =>
  get<import('@/types/models').Container[]>(`/stacks/${id}/containers`)

export const listNodes = () => get<Node[]>('/nodes')
export const getNode = (id: string) => get<Node>(`/nodes/${id}`)
export const registerNode = (payload: Partial<Node>) => post<Node>('/nodes', payload)
export const updateNode = (id: string, payload: Partial<Node>) => put<Node>(`/nodes/${id}`, payload)
export const deleteNode = (id: string) => del<void>(`/nodes/${id}`)
export const getNodeHealth = (id: string) =>
  get<{ status: string; latency_ms: number }>(`/nodes/${id}/health`)
