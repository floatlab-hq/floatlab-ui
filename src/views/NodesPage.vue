<script setup lang="ts">
import { useNodes } from '@/composables/useNodes'
import { useRouter } from 'vue-router'
import NodeGrid from '@/components/node/NodeGrid.vue'

const { nodes, loading } = useNodes()
const router = useRouter()
</script>

<template>
  <div style="padding:var(--sp-6);display:flex;flex-direction:column;gap:var(--sp-5);overflow-y:auto;height:100%">
    <div style="display:flex;align-items:center;justify-content:space-between">
      <span class="label-upper">Nodes</span>
    </div>
    <NodeGrid :nodes="nodes" :loading="loading" @select="router.push(`/nodes/${$event}`)" />
  </div>
</template>
