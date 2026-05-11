export type NodeRole = 'primary' | 'secondary'
export type NodeStatus = 'online' | 'offline' | 'degraded' | 'unknown'
export type StackState =
  | 'Provisioning' | 'Idle' | 'Starting' | 'RunningPrimary'
  | 'FailingOver' | 'RunningBackup' | 'Restoring' | 'Stopping'
  | 'Updating' | 'RollingBack' | 'Failed'
export type ContainerStatus = 'running' | 'stopped' | 'error' | 'starting' | 'paused'
export type SnapshotType = 'user' | 'scheduled' | 'replication'
export type AlertSeverity = 'critical' | 'warning' | 'info'
export type AlertState = 'active' | 'silenced' | 'resolved'

export interface NodeAddress {
  type: 'LAN-6' | 'WAN-6' | 'Overlay-6'
  address: string
  interface: string
}

export interface Node {
  id: string
  name: string
  hostname: string
  addresses: NodeAddress[]
  status: NodeStatus
  role: NodeRole
  zfs_pool: string
  os_version: string
  kernel_version: string
  created_at: string
  updated_at: string
}

export interface Stack {
  id: string
  name: string
  state: StackState
  primary_node: string
  secondary_node: string
  compose_file: string
  dataset_path: string
  created_at: string
  updated_at: string
  failover_mode: 'manual' | 'auto'
  auto_trigger_after: string
}

export interface Container {
  id: string
  name: string
  image: string
  status: ContainerStatus
  health: 'healthy' | 'unhealthy' | 'starting' | 'none'
  node_id: string
  stack_id: string
  cpu_pct: number
  mem_bytes: number
  mem_limit: number
  started_at: string
}

export interface ZfsPool {
  node_id: string
  name: string
  state: 'ONLINE' | 'DEGRADED' | 'FAULTED' | 'OFFLINE' | 'REMOVED' | 'UNAVAIL'
  size_bytes: number
  alloc_bytes: number
  free_bytes: number
  cap_pct: number
  health: string
  vdevs: ZfsVdev[]
}

export interface ZfsVdev {
  name: string
  type: string
  state: string
}

export interface ZfsDataset {
  stack_id: string
  name: string
  used_bytes: number
  avail_bytes: number
  quota_bytes: number | null
  compression: string
  block_size: string
  mount_point: string
}

export interface Snapshot {
  stack_id: string
  dataset: string
  name: string
  type: SnapshotType
  created_at: string
  size_bytes: number
  referenced_bytes: number
}

export interface ReplicationJob {
  id: string
  stack_id: string
  source_node: string
  dest_node: string
  state: 'running' | 'success' | 'failed' | 'pending'
  bytes_sent: number
  bytes_total: number
  started_at: string
  completed_at: string | null
  error: string | null
}

export interface Alert {
  id: string
  rule_id: string
  stack_id: string | null
  node_id: string | null
  severity: AlertSeverity
  kind: string
  state: AlertState
  message: string
  silenced_until: string | null
  resolved_at: string | null
  created_at: string
}

export interface Notification {
  id: string
  alert_id: string
  kind: string
  severity: AlertSeverity
  title: string
  body: string
  state: 'unread' | 'read'
  created_at: string
  resolved_at: string | null
}

export interface LogLine {
  timestamp: string
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
  stream: 'stdout' | 'stderr'
  container: string
}

export interface Network {
  id: string
  name: string
  prefix: string
  stack_id: string | null
}

export interface IpReservation {
  id: string
  stack_id: string
  service: string
  address: string
  prefix_pool: string
  allocated_at: string
}
