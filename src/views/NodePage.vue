<script setup lang="ts">
import { useNode } from '@/composables/useNode'
import StatusBadge from '@/components/instrument/StatusBadge.vue'
import NodeIsoIcon from '@/components/instrument/NodeIsoIcon.vue'
import Panel from '@/components/layout/Panel.vue'
import Skeleton from '@/components/shared/Skeleton.vue'

const props = defineProps<{ nodeId: string }>()
const { node, health, loading } = useNode(() => props.nodeId)
</script>

<template>
  <div style="padding:var(--sp-6);display:flex;flex-direction:column;gap:var(--sp-5);overflow-y:auto;height:100%">
    <Skeleton v-if="loading && !node" :rows="3" />

    <template v-else-if="node">
      <div class="node-info-card">
        <div class="node-info-card__icon">
          <NodeIsoIcon :status="node.status" :size="56" />
        </div>
        <div class="node-info-card__divider" />
        <div class="node-info-card__meta">
          <span class="node-info-card__key">Hostname</span>
          <span class="node-info-card__val">{{ node.hostname }}</span>
        </div>
        <div class="node-info-card__divider" />
        <div class="node-info-card__meta">
          <span class="node-info-card__key">Status</span>
          <StatusBadge :status="node.status" />
        </div>
        <div class="node-info-card__divider" />
        <div class="node-info-card__meta">
          <span class="node-info-card__key">Role</span>
          <span class="node-info-card__val">{{ node.role }}</span>
        </div>
        <div class="node-info-card__divider" />
        <div class="node-info-card__meta">
          <span class="node-info-card__key">ZFS Pool</span>
          <span class="node-info-card__val">{{ node.zfs_pool }}</span>
        </div>
        <template v-if="health">
          <div class="node-info-card__divider" />
          <div class="node-info-card__meta">
            <span class="node-info-card__key">Latency</span>
            <span class="node-info-card__val">{{ health.latency_ms }}ms</span>
          </div>
        </template>
      </div>

      <div class="two-col">
        <Panel title="System">
          <div style="display:flex;flex-direction:column;gap:var(--sp-3)">
            <div style="display:flex;justify-content:space-between;font-size:11px">
              <span style="color:var(--text-muted)">OS</span>
              <span>{{ node.os_version }}</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:11px">
              <span style="color:var(--text-muted)">Kernel</span>
              <span>{{ node.kernel_version }}</span>
            </div>
          </div>
        </Panel>

        <Panel title="Addresses">
          <div style="display:flex;flex-direction:column;gap:var(--sp-2)">
            <div v-for="addr in node.addresses" :key="addr.address" style="display:flex;justify-content:space-between;font-size:11px">
              <span style="color:var(--text-muted)">{{ addr.type }}</span>
              <span style="color:var(--cyan-400)">{{ addr.address }}</span>
            </div>
            <div v-if="!node.addresses.length" style="color:var(--text-disabled);font-size:11px">No addresses</div>
          </div>
        </Panel>
      </div>
    </template>

    <div v-else style="color:var(--text-disabled);font-size:11px">Node not found.</div>
  </div>
</template>
