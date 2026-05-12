<script setup lang="ts">
import { useNode } from '@/composables/useNode'
import NodeDetailHeader from '@/components/node/NodeDetailHeader.vue'
import NodeResources from '@/components/node/NodeResources.vue'
import NodeZfsPools from '@/components/node/NodeZfsPools.vue'
import NodeContainers from '@/components/node/NodeContainers.vue'
import NodeNetworkInterfaces from '@/components/node/NodeNetworkInterfaces.vue'
import TabBar from '@/components/shared/TabBar.vue'
import Skeleton from '@/components/shared/Skeleton.vue'
import Panel from '@/components/layout/Panel.vue'
import { ref } from 'vue'

const props = defineProps<{ nodeId: string }>()
const { node, health, loading } = useNode(() => props.nodeId)

const activeTab = ref('resources')
const tabs = [
  { id: 'resources', label: 'Resources' },
  { id: 'zfs', label: 'Storage' },
  { id: 'workloads', label: 'Workloads' },
  { id: 'network', label: 'Network' },
]
</script>

<template>
  <div style="display:flex;flex-direction:column;height:100%;overflow:hidden">
    <Skeleton v-if="loading && !node" :rows="2" style="padding:var(--sp-5)" />

    <template v-else-if="node">
      <div style="padding:var(--sp-5) var(--sp-5) 0">
        <NodeDetailHeader :node="node" :latency-ms="health?.latency_ms" />
      </div>

      <div style="padding:0 var(--sp-5)">
        <TabBar :tabs="tabs" :active="activeTab" @change="activeTab = $event" />
      </div>

      <div style="flex:1;overflow-y:auto;padding:var(--sp-4) var(--sp-5)">
        <NodeResources v-if="activeTab === 'resources'" :node-id="nodeId" />
        <NodeZfsPools v-else-if="activeTab === 'zfs'" :node-id="nodeId" />
        <NodeContainers v-else-if="activeTab === 'workloads'" :node-id="nodeId" />
        <NodeNetworkInterfaces v-else-if="activeTab === 'network'" :node="node" />
      </div>
    </template>

    <div v-else style="padding:var(--sp-6);color:var(--text-disabled);font-size:11px">
      Node not found.
    </div>
  </div>
</template>
