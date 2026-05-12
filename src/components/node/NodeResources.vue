<script setup lang="ts">
import { ref } from 'vue'
import { useMetrics } from '@/composables/useMetrics'
import MetricSparkline from '@/components/instrument/MetricSparkline.vue'
import ResBar from '@/components/instrument/ResBar.vue'
import Panel from '@/components/layout/Panel.vue'
import type { MetricRange } from '@/types/ui'

const props = defineProps<{ nodeId: string }>()

const range = ref<MetricRange>('1h')
const ranges: MetricRange[] = ['1h', '6h', '24h', '7d']

const { series } = useMetrics(() => props.nodeId, 'node', () => range.value)

function seriesFor(key: string) {
  return series.value.find(s => s.label === key)?.points ?? []
}

function latestPct(key: string): number {
  const pts = seriesFor(key)
  if (!pts.length) return 0
  return Math.min(pts[pts.length - 1].value / 100, 1)
}
</script>

<template>
  <div style="display:flex;flex-direction:column;gap:var(--sp-4)">
    <div style="display:flex;align-items:center;justify-content:space-between">
      <span class="label-upper">Resources</span>
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

    <div class="two-col">
      <Panel title="CPU Usage">
        <div style="display:flex;flex-direction:column;gap:var(--sp-3)">
          <ResBar :value="latestPct('cpu')" :label="'CPU'" :value-label="`${(latestPct('cpu') * 100).toFixed(0)}%`" />
          <MetricSparkline :points="seriesFor('cpu')" label="CPU" unit="%" :height="40" />
        </div>
      </Panel>
      <Panel title="Memory Usage">
        <div style="display:flex;flex-direction:column;gap:var(--sp-3)">
          <ResBar :value="latestPct('mem')" :label="'Memory'" :value-label="`${(latestPct('mem') * 100).toFixed(0)}%`" color="cyan" />
          <MetricSparkline :points="seriesFor('mem')" label="Memory" unit="%" color="rgb(96,165,250)" :height="40" />
        </div>
      </Panel>
    </div>

    <Panel title="Network">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-4)">
        <MetricSparkline :points="seriesFor('net_rx')" label="RX" unit=" KB/s" color="rgb(167,139,250)" :height="40" />
        <MetricSparkline :points="seriesFor('net_tx')" label="TX" unit=" KB/s" color="rgb(251,191,36)" :height="40" />
      </div>
    </Panel>
  </div>
</template>
