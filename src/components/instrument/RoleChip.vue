<script setup lang="ts">
defineProps<{
  role: 'APP' | 'REP' | 'TUN' | 'BAC'
}>()
</script>

<template>
  <span class="role-chip" :class="`role-chip--${role.toLowerCase()}`">{{ role }}</span>
</template>
