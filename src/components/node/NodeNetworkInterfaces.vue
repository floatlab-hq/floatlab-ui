<script setup lang="ts">
import type { Node } from '@/types/models'
import EmptyState from '@/components/shared/EmptyState.vue'

defineProps<{ node: Node }>()
</script>

<template>
  <div style="display:flex;flex-direction:column;gap:var(--sp-4)">
    <div class="panel">
      <div class="panel__header">Node Addresses</div>
      <EmptyState v-if="!node.addresses.length" title="No addresses" message="No network addresses configured." icon="◎" />
      <table v-else class="data-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Interface</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="addr in node.addresses" :key="addr.address">
            <td class="td-muted">{{ addr.type }}</td>
            <td class="td-muted">{{ addr.interface }}</td>
            <td style="font-family:var(--font-mono);color:var(--cyan-400)">{{ addr.address }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
