<script setup lang="ts">
defineProps<{
  title: string
  message?: string
  icon?: string
}>()
</script>

<template>
  <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:var(--sp-12);gap:var(--sp-4);text-align:center">
    <span v-if="icon" style="font-size:32px;opacity:0.2">{{ icon }}</span>
    <span style="font-size:12px;font-weight:600;color:var(--text-muted);letter-spacing:0.06em;text-transform:uppercase">{{ title }}</span>
    <span v-if="message" style="font-size:11px;color:var(--text-disabled);max-width:320px;line-height:1.6">{{ message }}</span>
    <slot />
  </div>
</template>
