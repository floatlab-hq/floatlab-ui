<script setup lang="ts">
import { ref, watch, defineAsyncComponent } from 'vue'
import { updateStackCompose } from '@/api/config'
import type { Stack } from '@/types/models'

const CodeMirrorEditor = defineAsyncComponent(() =>
  import('./CodeMirrorEditor.vue')
)

const props = defineProps<{ stack: Stack | null }>()

const content = ref('')
const saving = ref(false)
const saved = ref(false)

watch(() => props.stack?.compose_file, (v) => {
  if (v != null) content.value = v
}, { immediate: true })

async function save() {
  if (!props.stack) return
  saving.value = true
  try {
    await updateStackCompose(props.stack.id, content.value)
    saved.value = true
    setTimeout(() => { saved.value = false }, 2000)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div style="display:flex;flex-direction:column;gap:var(--sp-3)">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <span class="label-upper">compose.yml</span>
      <button
        class="btn btn--primary btn--sm"
        :disabled="saving"
        @click="save"
      >{{ saved ? 'Saved ✓' : saving ? 'Saving…' : 'Save' }}</button>
    </div>
    <Suspense>
      <CodeMirrorEditor v-model="content" />
      <template #fallback>
        <div class="skeleton" style="height:300px" />
      </template>
    </Suspense>
  </div>
</template>
