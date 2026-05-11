<script setup lang="ts">
defineProps<{
  title: string
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="modal-backdrop" @click.self="emit('close')">
        <div class="modal" role="dialog" :aria-label="title">
          <div class="modal__header">
            <span class="modal__title">{{ title }}</span>
            <button class="modal__close" @click="emit('close')">✕</button>
          </div>
          <div class="modal__body">
            <slot />
          </div>
          <div v-if="$slots.footer" class="modal__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active { transition: opacity var(--dur-mid) var(--ease-out); }
.modal-enter-from,
.modal-leave-to { opacity: 0; }
.modal-enter-active .modal,
.modal-leave-active .modal { transition: transform var(--dur-mid) var(--ease-out); }
.modal-enter-from .modal   { transform: translateY(-8px) scale(0.97); }
.modal-leave-to .modal     { transform: translateY(4px) scale(0.99); }
</style>
