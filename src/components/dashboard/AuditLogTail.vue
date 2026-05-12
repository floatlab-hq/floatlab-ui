<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { getAuditLog } from '@/api/logs'
import type { LogLine } from '@/types/models'

const lines = ref<LogLine[]>([])
const loading = ref(true)

async function load() {
  try {
    lines.value = await getAuditLog(50)
  } finally {
    loading.value = false
  }
}

load()
const timer = setInterval(load, 30_000)
onUnmounted(() => clearInterval(timer))

function levelColor(level: string): string {
  if (level === 'error') return 'var(--red-400)'
  if (level === 'warn') return 'var(--amber-400)'
  if (level === 'debug') return 'var(--text-disabled)'
  return 'var(--text-secondary)'
}
</script>

<template>
  <div class="terminal" style="height:200px;overflow-y:auto;font-size:11px;padding:var(--sp-3)">
    <div v-if="loading" style="color:var(--text-disabled)">Loading audit log…</div>
    <div v-else-if="!lines.length" style="color:var(--text-disabled)">No audit entries.</div>
    <div
      v-else
      v-for="(line, i) in lines"
      :key="i"
      style="display:flex;gap:var(--sp-3);line-height:1.6"
    >
      <span style="color:var(--text-disabled);flex-shrink:0">{{ new Date(line.timestamp).toLocaleTimeString() }}</span>
      <span :style="{ color: levelColor(line.level), flexShrink: 0, minWidth: '36px' }">{{ line.level }}</span>
      <span style="color:var(--text-secondary)">{{ line.message }}</span>
    </div>
  </div>
</template>
