export interface FLNode {
  uuid: string;
  name: string;
  info: FLNodeInfo;
  volumes: FLNodeVol[];
  roles: FLNodeRole[];
  state: FLNodeStatus;
}

export type FLNodeRole = "backup" | "containers" | "tunnel";

export const enum FLNodeStatus {
  OFFLINE = 0,
  UNREACHABLE = 2,
  REBOOTING = 4,
  MAINTENANCE = 8,
  ONLINE = 64,
}

export interface FLNodeVol {
  name: string;
  size: number;
  live: number;
  snaps: number;
}

export interface FLNodeInfo {
  bigCores: number;
  littleCores: number;
  cpuThreads: number;
  memory: number;
  dimms: number;
}

export type FLNodeStatType = "cpu" | "mem" | "storage" | "diskio" | "netio";
export interface FLNodeStats {
  type: FLNodeStatType;
  hist: number[];
}
