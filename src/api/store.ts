import { get, post, del } from './client'
import type { ZfsPool, ZfsDataset, Snapshot, ReplicationJob } from '@/types/models'

export const listPools = () => get<ZfsPool[]>('/storage/pools')
export const getPool = (nodeId: string, pool: string) =>
  get<ZfsPool>(`/storage/pools/${nodeId}/${pool}`)

export const listDatasets = () => get<ZfsDataset[]>('/storage/datasets')
export const getStackDataset = (stackId: string) =>
  get<ZfsDataset>(`/storage/datasets/${stackId}`)

export const listSnapshots = (stackId: string) =>
  get<Snapshot[]>(`/storage/datasets/${stackId}/snapshots`)

export const createSnapshot = (stackId: string, name: string) =>
  post<Snapshot>(`/storage/datasets/${stackId}/snapshots`, { name })

export const deleteSnapshot = (stackId: string, name: string) =>
  del<void>(`/storage/datasets/${stackId}/snapshots/${encodeURIComponent(name)}`)

export const restoreSnapshot = (stackId: string, name: string) =>
  post<void>(`/storage/datasets/${stackId}/snapshots/${encodeURIComponent(name)}/restore`)

export const listReplicationJobs = () =>
  get<ReplicationJob[]>('/storage/replication')

export const triggerReplication = (stackId: string) =>
  post<ReplicationJob>(`/storage/replication/${stackId}/trigger`)

export const listFaults = () =>
  get<import('@/types/models').Alert[]>('/storage/faults')
