<template>
  <div class="resource-container">
    <span class="resource-label">{{ label }}</span>
    <div class="blocks-wrapper">
      <div
        v-for="n in totalBlocks"
        :key="n"
        class="block"
        :class="{ active: n <= activeBlocks }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
  totalBlocks: {
    type: Number,
    default: 10,
  },
  activeBlocks: {
    type: Number,
    default: 0,
  },
});
</script>

<style scoped>
.resource-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.resource-label {
  font-weight: 600;
  min-width: 60px; /* Ensure alignment */
  font-family: monospace;
}

.blocks-wrapper {
  display: flex;
  gap: 2px;
}

.block {
  width: 8px;
  height: 14px;
  background-color: #374151; /* Dark grey for inactive */
  border-radius: 1px;
}

.block.active {
  background-color: var(
    --primary-color
  ); /* PrimeVue theme primary color (cyan/green) */
  box-shadow: 0 0 8px var(--primary-color-300);
}
</style>
