<script setup lang="ts">
import { onMounted, onUnmounted, watch, ref } from 'vue'
import { EditorState } from '@codemirror/state'
import { EditorView, keymap, lineNumbers, highlightActiveLineGutter } from '@codemirror/view'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { yaml } from '@codemirror/lang-yaml'
import { oneDark } from '@codemirror/theme-one-dark'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const container = ref<HTMLElement | null>(null)
let view: EditorView | null = null

onMounted(() => {
  if (!container.value) return

  const state = EditorState.create({
    doc: props.modelValue,
    extensions: [
      history(),
      lineNumbers(),
      highlightActiveLineGutter(),
      keymap.of([...defaultKeymap, ...historyKeymap]),
      yaml(),
      oneDark,
      EditorView.updateListener.of(update => {
        if (update.docChanged) {
          emit('update:modelValue', update.state.doc.toString())
        }
      }),
      EditorView.theme({
        '&': { background: 'var(--bg-void)', height: '360px' },
        '.cm-content': { fontFamily: 'var(--font-mono)', fontSize: '12px' },
        '.cm-gutters': { background: 'var(--bg-panel)', border: 'none' },
      }),
    ],
  })

  view = new EditorView({ state, parent: container.value })
})

watch(() => props.modelValue, (val) => {
  if (!view) return
  const current = view.state.doc.toString()
  if (current !== val) {
    view.dispatch({ changes: { from: 0, to: current.length, insert: val } })
  }
})

onUnmounted(() => view?.destroy())
</script>

<template>
  <div ref="container" style="border:1px solid var(--border-default);border-radius:var(--r-md);overflow:hidden" />
</template>
