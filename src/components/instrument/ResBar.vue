<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  value: number
  segments?: number
  color?: 'auto' | 'green' | 'amber' | 'red' | 'cyan'
  label?: string
  valueLabel?: string
}>(), {
  segments: 24,
  color: 'auto',
})

const resolvedColor = computed(() => {
  if (props.color !== 'auto') return props.color
  if (props.value >= 0.85) return 'red'
  if (props.value >= 0.65) return 'amber'
  return 'green'
})

const activeSegs = computed(() => Math.round(props.value * props.segments))

function segClass(i: number): string {
  if (i >= activeSegs.value) return ''
  return `seg--on-${resolvedColor.value}`
}
</script>

<template>
  <div class="res-bar-wrap">
    <div v-if="label || valueLabel" class="res-bar-header">
      <span v-if="label">{{ label }}</span>
      <span v-if="valueLabel">{{ valueLabel }}</span>
    </div>
    <div class="res-bar-track">
      <span
        v-for="i in segments"
        :key="i"
        class="seg"
        :class="segClass(i - 1)"
      />
    </div>
  </div>
</template>
