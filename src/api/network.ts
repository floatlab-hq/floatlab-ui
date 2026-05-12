import { get, del } from './client'
import type { IpReservation } from '@/types/models'

export const listAllocations = (stackId?: string) =>
  get<IpReservation[]>(`/network/allocations${stackId ? `?stack_id=${stackId}` : ''}`)

export const deleteAllocation = (id: string) => del<void>(`/network/allocations/${id}`)
