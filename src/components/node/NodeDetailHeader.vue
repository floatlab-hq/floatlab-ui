<script setup lang="ts">
import type { Node } from '@/types/models'
import NodeIsoIcon from '@/components/instrument/NodeIsoIcon.vue'
import StatusBadge from '@/components/instrument/StatusBadge.vue'

defineProps<{
  node: Node
  latencyMs?: number
}>()
</script>

<template>
  <div class="node-info-card">
    <div class="node-info-card__icon">
      <NodeIsoIcon :status="node.status" :size="52" />
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
    <div class="node-info-card__divider" />
    <div class="node-info-card__meta">
      <span class="node-info-card__key">Latency</span>
      <span class="node-info-card__val">{{ latencyMs != null ? `${latencyMs}ms` : '—' }}</span>
    </div>
  </div>
</template>
