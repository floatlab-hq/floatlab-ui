<script setup lang="ts">
import type { Node } from '@/types/models'
import NodeCard from './NodeCard.vue'
import EmptyState from '@/components/shared/EmptyState.vue'
import Skeleton from '@/components/shared/Skeleton.vue'

defineProps<{
  nodes: Node[]
  loading?: boolean
}>()

defineEmits<{ select: [id: string] }>()
</script>

<template>
  <div>
    <Skeleton v-if="loading" :rows="3" />
    <EmptyState v-else-if="!nodes.length" title="No nodes" message="No nodes registered." icon="◈" />
    <div
      v-else
      style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:var(--sp-4)"
    >
      <NodeCard
        v-for="node in nodes"
        :key="node.id"
        :node="node"
        @select="$emit('select', $event)"
      />
    </div>
  </div>
</template>
