<script setup lang="ts">
import UiTelemetry from './UiTelemetry.vue'
</script>

<template>
  <Story title="1. Primitive/Telemetry">
    <UiTelemetry cpu="⠴⠼⠦" :memory="38" :disk="40" />
  </Story>
</template>
