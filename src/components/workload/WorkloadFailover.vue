<script setup lang="ts">
import { ref } from 'vue'
import { triggerFailover, restoreStack } from '@/api/config'
import ConfirmModal from '@/components/shared/ConfirmModal.vue'
import StatusBadge from '@/components/instrument/StatusBadge.vue'
import type { Stack } from '@/types/models'

const props = defineProps<{ stack: Stack | null }>()

const showFailover = ref(false)
const showRestore = ref(false)
const working = ref(false)
const result = ref<string | null>(null)

async function doFailover() {
  if (!props.stack) return
  working.value = true
  showFailover.value = false
  try {
    await triggerFailover(props.stack.id)
    result.value = 'Failover triggered successfully'
  } catch (e) {
    result.value = e instanceof Error ? e.message : 'Failover failed'
  } finally {
    working.value = false
  }
}

async function doRestore() {
  if (!props.stack) return
  working.value = true
  showRestore.value = false
  try {
    await restoreStack(props.stack.id)
    result.value = 'Restore initiated'
  } catch (e) {
    result.value = e instanceof Error ? e.message : 'Restore failed'
  } finally {
    working.value = false
  }
}
</script>

<template>
  <div v-if="stack" style="display:flex;flex-direction:column;gap:var(--sp-5)">
    <div class="panel">
      <div class="panel__header">Current State</div>
      <div class="panel__body" style="display:flex;flex-direction:column;gap:var(--sp-4)">
        <div style="display:flex;gap:var(--sp-6)">
          <div>
            <div class="label-upper" style="margin-bottom:var(--sp-2)">State</div>
            <StatusBadge
              :status="stack.state === 'RunningPrimary' ? 'running' : stack.state === 'RunningBackup' ? 'warning' : 'stopped'"
              :label="stack.state"
            />
          </div>
          <div>
            <div class="label-upper" style="margin-bottom:var(--sp-2)">Mode</div>
            <span style="font-size:12px">{{ stack.failover_mode }}</span>
          </div>
          <div>
            <div class="label-upper" style="margin-bottom:var(--sp-2)">Trigger After</div>
            <span style="font-size:12px">{{ stack.auto_trigger_after || '—' }}</span>
          </div>
        </div>

        <div v-if="result" :style="{ color: result.includes('fail') ? 'var(--red-400)' : 'var(--green-400)', fontSize: '11px' }">
          {{ result }}
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel__header">Actions</div>
      <div class="panel__body" style="display:flex;gap:var(--sp-4)">
        <button
          class="btn btn--danger"
          :disabled="working || stack.state === 'RunningBackup' || stack.state === 'FailingOver'"
          @click="showFailover = true"
        >
          Trigger Failover
        </button>
        <button
          class="btn btn--outline"
          :disabled="working || stack.state !== 'RunningBackup'"
          @click="showRestore = true"
        >
          Restore Primary
        </button>
      </div>
    </div>

    <ConfirmModal
      :open="showFailover"
      title="Trigger Failover"
      :message="`This will promote the secondary node to active for '${stack.name}'. Continue?`"
      confirm-label="Failover"
      :danger="true"
      @confirm="doFailover"
      @cancel="showFailover = false"
    />

    <ConfirmModal
      :open="showRestore"
      title="Restore Primary"
      :message="`This will restore '${stack.name}' back to the primary node. Continue?`"
      confirm-label="Restore"
      @confirm="doRestore"
      @cancel="showRestore = false"
    />
  </div>

  <div v-else style="color:var(--text-disabled);font-size:11px">Loading stack…</div>
</template>
