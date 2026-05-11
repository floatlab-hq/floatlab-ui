<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useLogs } from '@/composables/useLogs'
import { getStackContainers } from '@/api/config'
import type { Container } from '@/types/models'

const props = defineProps<{ stackId: string }>()

const containers = ref<Container[]>([])
const selectedContainer = ref<string | null>(null)
const logEl = ref<HTMLElement | null>(null)

async function loadContainers() {
  containers.value = await getStackContainers(props.stackId)
  if (containers.value.length && !selectedContainer.value) {
    selectedContainer.value = containers.value[0].id
  }
}

watch(() => props.stackId, loadContainers, { immediate: true })

const { lines, isStreaming } = useLogs(() => selectedContainer.value)

const levelClass: Record<string, string> = {
  info: 'log-line__level--info',
  warn: 'log-line__level--warn',
  error: 'log-line__level--error',
  debug: 'log-line__level--debug',
}

watch(lines, async () => {
  await nextTick()
  if (logEl.value) logEl.value.scrollTop = logEl.value.scrollHeight
})
</script>

<template>
  <div style="display:flex;flex-direction:column;gap:var(--sp-3)">
    <div style="display:flex;align-items:center;gap:var(--sp-3)">
      <select
        v-if="containers.length"
        v-model="selectedContainer"
        class="input"
        style="max-width:220px"
      >
        <option v-for="c in containers" :key="c.id" :value="c.id">{{ c.name }}</option>
      </select>
      <span style="font-size:10px;color:var(--text-muted)">
        {{ isStreaming ? '● streaming' : '○ disconnected' }}
      </span>
    </div>

    <div ref="logEl" class="terminal" style="height:400px;overflow-y:auto">
      <div v-if="!lines.length" style="color:var(--text-disabled)">No log lines yet…</div>
      <div v-for="(line, i) in lines" :key="i" class="log-line">
        <span class="log-line__time">{{ line.timestamp }}</span>
        <span class="log-line__level" :class="levelClass[line.level] ?? ''">{{ line.level.toUpperCase() }}</span>
        <span class="log-line__msg">{{ line.message }}</span>
      </div>
    </div>
  </div>
</template>
