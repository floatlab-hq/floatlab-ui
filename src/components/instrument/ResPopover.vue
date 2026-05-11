<script setup lang="ts">
import ResBar from './ResBar.vue'
import type { ResPopoverRow } from '@/types/ui'

defineProps<{
  title: string
  total?: string
  rows: ResPopoverRow[]
  value: number
  label?: string
  valueLabel?: string
}>()
</script>

<template>
  <div class="res-popover-wrap">
    <ResBar :value="value" :label="label" :value-label="valueLabel" />
    <div class="res-popover">
      <div class="res-popover__title">{{ title }}</div>
      <div v-if="total" class="res-popover__total">
        <span class="res-popover__total-label">Total</span>
        <span class="res-popover__total-val">{{ total }}</span>
      </div>
      <div v-for="row in rows" :key="row.name" class="res-popover__row">
        <span class="res-popover__row-name">{{ row.name }}</span>
        <div class="res-popover__row-bar">
          <div
            class="res-popover__row-fill"
            :style="{
              width: `${row.pct * 100}%`,
              background: row.variant === 'error' ? 'var(--red-400)'
                        : row.variant === 'warn' ? 'var(--amber-400)'
                        : 'var(--green-400)'
            }"
          />
        </div>
        <span
          class="res-popover__row-val"
          :class="row.variant ? `res-popover__row-val--${row.variant}` : ''"
        >{{ row.value }}</span>
      </div>
    </div>
  </div>
</template>
