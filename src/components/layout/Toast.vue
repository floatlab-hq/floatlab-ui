<script setup lang="ts">
import { onMounted } from 'vue'
import type { ToastMessage } from '@/types/ui'

const props = defineProps<{
  toast: ToastMessage
}>()

const emit = defineEmits<{
  dismiss: [id: string]
}>()

onMounted(() => {
  const dur = props.toast.duration ?? 4000
  if (dur > 0) {
    setTimeout(() => emit('dismiss', props.toast.id), dur)
  }
})

const icons: Record<string, string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
}
</script>

<template>
  <div class="toast" :class="`toast--${toast.variant}`">
    <span class="toast__icon">{{ icons[toast.variant] }}</span>
    <div class="toast__body">
      <div class="toast__title">{{ toast.title }}</div>
      <div v-if="toast.message" class="toast__msg">{{ toast.message }}</div>
    </div>
    <button
      class="toast__time"
      style="background:none;border:none;cursor:pointer;color:var(--text-disabled)"
      @click="emit('dismiss', toast.id)"
    >✕</button>
  </div>
</template>
