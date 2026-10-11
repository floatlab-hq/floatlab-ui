<script setup lang="ts">
import LabEventLog from './LabEventLog.vue'
import { events } from '../../dashboard/fixtures'
</script>

<template>
  <Story title="2. Pattern/Lab Event Log">
    <LabEventLog :events="events" />
  </Story>
</template>
