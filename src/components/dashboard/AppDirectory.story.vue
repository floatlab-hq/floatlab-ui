<script setup lang="ts">
import AppDirectory from './AppDirectory.vue'
import { apps } from '../../dashboard/fixtures'
</script>

<template>
  <Story title="2. Pattern/App Directory">
    <AppDirectory :apps="apps" />
  </Story>
</template>
