<script setup lang="ts">
import { computed } from 'vue'
import type { MetricPoint } from '@/types/api'

const props = withDefaults(defineProps<{
  points: MetricPoint[]
  label: string
  unit?: string
  color?: string
  height?: number
}>(), {
  unit: '',
  color: 'rgb(73,212,155)',
  height: 40,
})

const latest = computed(() => {
  if (!props.points.length) return '—'
  const v = props.points[props.points.length - 1].value
  return `${v.toFixed(1)}${props.unit}`
})

const path = computed(() => {
  const pts = props.points
  if (pts.length < 2) return ''
  const w = 120
  const h = props.height
  const minV = Math.min(...pts.map(p => p.value))
  const maxV = Math.max(...pts.map(p => p.value))
  const range = maxV - minV || 1

  return pts.map((p, i) => {
    const x = (i / (pts.length - 1)) * w
    const y = h - ((p.value - minV) / range) * (h - 4) - 2
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
})
</script>

<template>
  <div style="display:flex;flex-direction:column;gap:4px;min-width:120px">
    <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-muted)">
      <span>{{ label }}</span>
      <span style="color:var(--text-secondary)">{{ latest }}</span>
    </div>
    <svg :width="120" :height="height" style="display:block;overflow:visible">
      <path
        v-if="path"
        :d="path"
        fill="none"
        :stroke="color"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <text
        v-if="!path"
        x="60" :y="height / 2"
        text-anchor="middle"
        font-size="10"
        fill="var(--text-disabled)"
      >no data</text>
    </svg>
  </div>
</template>
