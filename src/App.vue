<script setup lang="ts">
import AppTopbar from "./components/AppTopBar.vue";
import AppFooter from "./components/AppFooter.vue";
import Dashboard from "./views/Dashboard.vue";
import { provide } from "vue";
import { mockNodes } from "./api/mockNodes.ts";

provide("nodes", mockNodes());
</script>

<template>
  <div class="layout-container">
    <AppTopbar />
    <Dashboard />
    <AppFooter />
  </div>
</template>
