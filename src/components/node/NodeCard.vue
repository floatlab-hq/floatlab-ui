<script setup lang="ts">
import type { Node } from '@/types/models'
import NodeIsoIcon from '@/components/instrument/NodeIsoIcon.vue'
import StatusBadge from '@/components/instrument/StatusBadge.vue'

defineProps<{ node: Node }>()
defineEmits<{ select: [id: string] }>()
</script>

<template>
  <div class="panel node-card" @click="$emit('select', node.id)">
    <div style="display:flex;align-items:flex-start;gap:var(--sp-3)">
      <NodeIsoIcon :status="node.status" :size="44" />
      <div style="flex:1;min-width:0">
        <div style="font-weight:600;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ node.name }}</div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:var(--sp-1)">{{ node.hostname }}</div>
        <StatusBadge :status="node.status" style="margin-top:var(--sp-2)" />
      </div>
    </div>
    <div style="margin-top:var(--sp-3);display:flex;gap:var(--sp-4);font-size:11px;color:var(--text-muted)">
      <span>{{ node.role }}</span>
      <span>{{ node.zfs_pool }}</span>
    </div>
  </div>
</template>
