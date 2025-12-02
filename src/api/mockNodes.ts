import { FLNode, FLNodeRole, FLNodeStatus } from "./types.ts";
import { ref } from "vue";
import { v4 as uuid4 } from "uuid";
function genNode(name: string, roles: FLNodeRole[]): FLNode {
  const commonCores = [
    2, 4, 4, 4, 6, 6, 6, 8, 8, 8, 8, 8, 12, 12, 16, 16, 24, 32, 64, 96, 128,
  ];
  const bigCores = commonCores[Math.floor(Math.random() * commonCores.length)];
  const littleCores = Math.random() > 0.7 ? 8 : 0;
  const commonDimms = [1, 2, 2, 2, 4, 4, 6, 8, 12];
  const commonCaps = [8, 16, 16, 16, 16, 24, 24, 24, 32];
  const dimms = commonDimms[Math.floor(Math.random() * commonDimms.length)];
  const memory =
    dimms * 1024 * commonCaps[Math.floor(Math.random() * commonCaps.length)];
  const statusList = [
    FLNodeStatus.ONLINE,
    FLNodeStatus.ONLINE,
    FLNodeStatus.ONLINE,
    FLNodeStatus.ONLINE,
    FLNodeStatus.OFFLINE,
    FLNodeStatus.UNREACHABLE,
    FLNodeStatus.REBOOTING,
    FLNodeStatus.MAINTENANCE,
  ];
  return {
    name,
    uuid: uuid4(),
    info: {
      bigCores,
      littleCores,
      cpuThreads: bigCores * 2 + littleCores,
      memory,
      dimms,
    },
    volumes: [],
    roles,
    state: statusList[Math.floor(Math.random() * statusList.length)],
  };
}

export function mockNodes() {
  const nodes = ref([
    genNode("alpha", ["containers"]),
    genNode("helios", ["containers"]),
    genNode("atlantis", ["backup"]),
    genNode("apollo", ["containers", "backup"]),
    genNode("alpha-2.floatlab.cloud", ["tunnel", "backup"]),
  ]);

  function restart(_uuid: string): void {}

  function maintenence(_uuid: string): void {}

  function stop(): void {}

  return { stop, nodes, maintenence, restart };
}
