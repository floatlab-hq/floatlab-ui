<script setup lang="ts">
import LogoLoader from '@/components/instrument/LogoLoader.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="topbar">
    <div class="topbar__logo" @click="router.push('/')" style="cursor:pointer">
      <LogoLoader :size="20" variant="blink" />
      <span style="font-family:var(--font-mono);font-size:13px;font-weight:700">FloatLab</span>
    </div>

    <div class="topbar__center" />

    <div class="topbar__right">
      <slot name="right" />
    </div>
  </div>
</template>
