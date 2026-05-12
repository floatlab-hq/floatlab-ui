<script setup lang="ts">
import { ref } from 'vue'
import Modal from '@/components/layout/Modal.vue'
import { silenceNotification } from '@/api/notify'

const props = defineProps<{ notificationId: string | null }>()
const emit = defineEmits<{ close: []; silenced: [] }>()

const duration = ref('1h')
const working = ref(false)

const options = [
  { label: '1 hour', value: '1h' },
  { label: '6 hours', value: '6h' },
  { label: '24 hours', value: '24h' },
  { label: '7 days', value: '7d' },
]

function untilFromDuration(d: string): string {
  const ms: Record<string, number> = { '1h': 3600, '6h': 21600, '24h': 86400, '7d': 604800 }
  const until = new Date(Date.now() + (ms[d] ?? 3600) * 1000)
  return until.toISOString()
}

async function confirm() {
  if (!props.notificationId) return
  working.value = true
  try {
    await silenceNotification(props.notificationId, untilFromDuration(duration.value))
    emit('silenced')
    emit('close')
  } finally {
    working.value = false
  }
}
</script>

<template>
  <Modal :open="!!notificationId" title="Silence Alert" @close="$emit('close')">
    <div style="display:flex;flex-direction:column;gap:var(--sp-4)">
      <p style="font-size:12px;color:var(--text-secondary)">Silence this alert for:</p>
      <div style="display:flex;gap:var(--sp-2);flex-wrap:wrap">
        <button
          v-for="opt in options"
          :key="opt.value"
          class="btn btn--sm"
          :class="duration === opt.value ? 'btn--primary' : 'btn--outline'"
          @click="duration = opt.value"
        >{{ opt.label }}</button>
      </div>
    </div>
    <template #footer>
      <button class="btn btn--ghost btn--sm" @click="$emit('close')">Cancel</button>
      <button class="btn btn--primary btn--sm" :disabled="working" @click="confirm">
        {{ working ? '…' : 'Silence' }}
      </button>
    </template>
  </Modal>
</template>
