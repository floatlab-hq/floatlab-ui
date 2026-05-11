<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps<{
  label: string
  icon?: string
  active?: boolean
  to: string
  status?: 'error' | 'warning' | 'ok'
}>()

const router = useRouter()
</script>

<template>
  <div
    class="sidebar-item"
    :class="{ 'sidebar-item--active': active }"
    @click="router.push(to)"
  >
    <span v-if="icon" style="font-size:12px;width:16px;text-align:center;flex-shrink:0">{{ icon }}</span>
    <span class="sidebar-item__name">{{ label }}</span>
    <span v-if="status" class="sidebar-item__status" :class="`sidebar-item__status--${status}`">
      {{ status === 'error' ? '●' : status === 'warning' ? '●' : '' }}
    </span>
  </div>
</template>
