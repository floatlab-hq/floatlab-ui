<script setup lang="ts">
import Modal from '@/components/layout/Modal.vue'

defineProps<{
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  danger?: boolean
}>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<template>
  <Modal :open="open" :title="title" @close="emit('cancel')">
    <p style="color:var(--text-secondary);font-size:12px;line-height:1.6">{{ message }}</p>
    <template #footer>
      <button class="btn btn--ghost btn--sm" @click="emit('cancel')">Cancel</button>
      <button
        class="btn btn--sm"
        :class="danger ? 'btn--danger' : 'btn--primary'"
        @click="emit('confirm')"
      >
        {{ confirmLabel ?? 'Confirm' }}
      </button>
    </template>
  </Modal>
</template>
