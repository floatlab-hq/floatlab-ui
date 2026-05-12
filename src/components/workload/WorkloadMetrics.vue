<script setup lang="ts">
import { ref } from 'vue'
import { useMetrics } from '@/composables/useMetrics'
import MetricSparkline from '@/components/instrument/MetricSparkline.vue'
import type { MetricRange } from '@/types/ui'

const props = defineProps<{ stackId: string }>()

const range = ref<MetricRange>('1h')
const ranges: MetricRange[] = ['1h', '6h', '24h', '7d']

const { series, loading } = useMetrics(() => props.stackId, 'stack', () => range.value)

const METRIC_DEFS = [
  { label: 'CPU', key: 'cpu', unit: '%', color: 'rgb(73,212,155)' },
  { label: 'Memory', key: 'mem', unit: '%', color: 'rgb(96,165,250)' },
  { label: 'Net RX', key: 'net_rx', unit: ' KB/s', color: 'rgb(167,139,250)' },
  { label: 'Net TX', key: 'net_tx', unit: ' KB/s', color: 'rgb(251,191,36)' },
  { label: 'Disk Read', key: 'disk_read', unit: ' MB/s', color: 'rgb(52,211,153)' },
  { label: 'Disk Write', key: 'disk_write', unit: ' MB/s', color: 'rgb(251,113,133)' },
]

function seriesFor(key: string) {
  return series.value.find(s => s.label === key)?.points ?? []
}
</script>

<template>
  <div style="display:flex;flex-direction:column;gap:var(--sp-4)">
    <div style="display:flex;align-items:center;justify-content:space-between">
      <span class="label-upper">Metrics</span>
      <div style="display:flex;gap:var(--sp-1)">
        <button
          v-for="r in ranges"
          :key="r"
          class="btn btn--ghost btn--sm"
          :class="{ 'btn--active': range === r }"
          @click="range = r"
        >{{ r }}</button>
      </div>
    </div>

    <div v-if="loading && !series.length" style="color:var(--text-disabled);font-size:11px">Loading metrics…</div>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--sp-4)">
      <div
        v-for="def in METRIC_DEFS"
        :key="def.key"
        class="panel"
        style="padding:var(--sp-3)"
      >
        <MetricSparkline
          :points="seriesFor(def.key)"
          :label="def.label"
          :unit="def.unit"
          :color="def.color"
          :height="48"
        />
      </div>
    </div>
  </div>
</template>
