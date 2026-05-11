<script setup lang="ts">
import type { SortDirection } from '@/types/ui'

export interface Column {
  key: string
  label: string
  sortable?: boolean
  width?: string
}

const props = defineProps<{
  columns: Column[]
  rows: Record<string, unknown>[]
  sortKey?: string
  sortDir?: SortDirection
  selectedId?: string
}>()

const emit = defineEmits<{
  sort: [key: string]
  select: [row: Record<string, unknown>]
}>()

function sortIcon(key: string): string {
  if (props.sortKey !== key) return ' ↕'
  return props.sortDir === 'asc' ? ' ↑' : ' ↓'
}
</script>

<template>
  <table class="data-table">
    <thead>
      <tr>
        <th
          v-for="col in columns"
          :key="col.key"
          :class="col.sortable ? 'sortable' : ''"
          :style="col.width ? `width:${col.width}` : ''"
          @click="col.sortable && emit('sort', col.key)"
        >
          {{ col.label }}<span v-if="col.sortable" style="color:var(--green-600)">{{ sortIcon(col.key) }}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, i) in rows"
        :key="String(row.id ?? i)"
        :class="{ 'row--selected': selectedId && row.id === selectedId }"
        @click="emit('select', row)"
      >
        <td v-for="col in columns" :key="col.key">
          <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
            {{ row[col.key] }}
          </slot>
        </td>
      </tr>
      <tr v-if="!rows.length">
        <td :colspan="columns.length" style="text-align:center;padding:var(--sp-8);color:var(--text-muted)">
          No items
        </td>
      </tr>
    </tbody>
  </table>
</template>
