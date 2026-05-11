<script setup lang="ts">
import { useRoute } from 'vue-router'
import SidebarItem from './SidebarItem.vue'

const route = useRoute()

const navItems = [
  { label: 'Dashboard', path: '/', icon: '◈' },
  { label: 'Workloads', path: '/workloads', icon: '▦' },
  { label: 'Alerts', path: '/alerts', icon: '◬' },
  { label: 'Settings', path: '/settings', icon: '⚙' },
]

function isActive(path: string): boolean {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <nav>
    <div style="padding:var(--sp-3) var(--sp-2);margin-bottom:var(--sp-2)">
      <span class="label-upper">Navigation</span>
    </div>
    <SidebarItem
      v-for="item in navItems"
      :key="item.path"
      :label="item.label"
      :icon="item.icon"
      :active="isActive(item.path)"
      :to="item.path"
    />
  </nav>
</template>
