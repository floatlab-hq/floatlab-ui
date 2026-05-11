<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  count: number
  active?: number
  warn?: number
  error?: number
}>()

type DotState = 'active' | 'warn' | 'error' | 'dim'

const dots = computed<DotState[]>(() => {
  const result: DotState[] = []
  const errorCount = props.error ?? 0
  const warnCount = props.warn ?? 0
  const activeCount = props.active ?? 0

  for (let i = 0; i < props.count; i++) {
    if (i < errorCount) result.push('error')
    else if (i < errorCount + warnCount) result.push('warn')
    else if (i < errorCount + warnCount + activeCount) result.push('active')
    else result.push('dim')
  }
  return result
})
</script>

<template>
  <div class="dot-matrix">
    <span
      v-for="(state, i) in dots"
      :key="i"
      class="dot-matrix__dot"
      :class="`dot-matrix__dot--${state}`"
    />
  </div>
</template>
