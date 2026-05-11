<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { CommandResult } from '@/types/ui'

const props = defineProps<{
  open: boolean
  commands: CommandResult[]
}>()

const emit = defineEmits<{
  close: []
}>()

const query = ref('')
const activeIndex = ref(0)

const filtered = computed(() => {
  const q = query.value.toLowerCase()
  if (!q) return props.commands
  return props.commands.filter(c => c.label.toLowerCase().includes(q) || c.meta?.toLowerCase().includes(q))
})

function select(cmd: CommandResult) {
  cmd.action()
  emit('close')
}

function onKeydown(e: KeyboardEvent) {
  if (!props.open) return
  if (e.key === 'Escape') { emit('close'); return }
  if (e.key === 'ArrowDown') { activeIndex.value = Math.min(activeIndex.value + 1, filtered.value.length - 1); e.preventDefault() }
  if (e.key === 'ArrowUp') { activeIndex.value = Math.max(activeIndex.value - 1, 0); e.preventDefault() }
  if (e.key === 'Enter' && filtered.value[activeIndex.value]) { select(filtered.value[activeIndex.value]); e.preventDefault() }
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="palette">
      <div
        v-if="open"
        style="position:fixed;inset:0;z-index:2000;display:flex;align-items:flex-start;justify-content:center;padding-top:80px;background:rgba(7,14,12,0.6)"
        @click.self="emit('close')"
      >
        <div class="cmd-palette">
          <div class="cmd-palette__input-row">
            <span style="color:var(--text-muted)">⌕</span>
            <input
              v-model="query"
              class="cmd-palette__input"
              placeholder="Type a command…"
              autofocus
            />
          </div>
          <div class="cmd-palette__results">
            <div
              v-for="(cmd, i) in filtered"
              :key="cmd.id"
              class="cmd-result"
              :class="{ 'cmd-result--active': i === activeIndex }"
              @click="select(cmd)"
              @mouseover="activeIndex = i"
            >
              <span class="cmd-result__icon">{{ cmd.icon }}</span>
              <span class="cmd-result__label">{{ cmd.label }}</span>
              <span v-if="cmd.meta" class="cmd-result__meta">{{ cmd.meta }}</span>
            </div>
            <div v-if="!filtered.length" style="padding:var(--sp-5) var(--sp-4);color:var(--text-muted);font-size:11px">
              No results for "{{ query }}"
            </div>
          </div>
          <div class="cmd-palette__footer">
            <span>↑↓ navigate</span>
            <span>↵ select</span>
            <span>esc close</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.palette-enter-active, .palette-leave-active { transition: opacity var(--dur-mid) var(--ease-out); }
.palette-enter-from, .palette-leave-to { opacity: 0; }
</style>
