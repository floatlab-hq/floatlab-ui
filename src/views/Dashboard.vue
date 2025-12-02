<template>
  <div class="dashboard-container">
    <div
      class="main-header flex justify-content-between align-items-center mb-4"
    >
      <div class="flex align-items-center gap-3">
        <i class="pi pi-box text-4xl text-primary"></i>
        <div>
          <h1 class="m-0 text-2xl font-bold">Nodes</h1>
          <span class="text-sm text-gray-400 font-monospace"
            >SSL GOTO NETWORKING</span
          >
        </div>
      </div>
      <div class="flex gap-2">
        <Button icon="pi pi-bars" text plain />
        <Button label="ADD NODE" outlined class="font-bold" />
      </div>
    </div>

    <div class="card-dark mb-3">
      <DataTable
        :value="nodesData"
        responsiveLayout="scroll"
        class="transparent-table"
      >
        <Column field="name" header="NODE">
          <template #body="slotProps">
            <div class="flex align-items-center gap-2 font-bold">
              <i class="pi pi-server text-primary"></i>
              {{ slotProps.data.name }}
            </div>
          </template>
        </Column>

        <Column field="status" header="STATUS">
          <template #body="slotProps">
            <div class="flex flex-column">
              <Tag
                :value="
                  slotProps.data.status === 'error'
                    ? 'Error'
                    : slotProps.data.status
                "
                :severity="getStatusSeverity(slotProps.data.status)"
                class="status-tag font-bold"
              />
              <small
                v-if="slotProps.data.errorMessage"
                class="text-red-400 mt-1 font-bold"
              >
                {{ slotProps.data.errorMessage }}
              </small>
            </div>
          </template>
        </Column>

        <Column field="uptime" header="UPTIME" class="font-monospace"></Column>

        <Column header="CPU">
          <template #body="slotProps">
            <ResourceBlocks
              :label="slotProps.data.cpuLabel"
              :total-blocks="8"
              :active-blocks="slotProps.data.cpuUsage"
            />
          </template>
        </Column>

        <Column header="MEM">
          <template #body="slotProps">
            <ResourceBlocks
              :label="slotProps.data.memLabel"
              :total-blocks="4"
              :active-blocks="slotProps.data.memUsage"
            />
          </template>
        </Column>

        <Column header="DISK">
          <template #body="slotProps">
            <ResourceBlocks
              :label="slotProps.data.diskLabel"
              :total-blocks="4"
              :active-blocks="slotProps.data.diskUsage"
            />
          </template>
        </Column>

        <Column field="osVer" header="OS VER" class="font-monospace"></Column>

        <Column field="network" header="NETWORK">
          <template #body="slotProps">
            <div class="flex align-items-center gap-2 font-monospace">
              <i class="pi pi-sitemap"></i>
              {{ slotProps.data.roles }}
            </div>
          </template>
        </Column>

        <Column bodyStyle="text-align: center; overflow: visible">
          <template #body>
            <Button
              icon="pi pi-ellipsis-v"
              text
              plain
              rounded
              @click="toggleMenu"
              aria-haspopup="true"
              aria-controls="overlay_menu"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <div
      class="flex justify-content-center gap-5 text-gray-400 font-monospace mb-5"
    >
      <span>64 GB</span>
      <span>26 TB</span>
    </div>

    <div
      class="main-header flex justify-content-between align-items-center mb-4"
    >
      <div class="flex align-items-center gap-3">
        <i class="pi pi-box text-4xl text-primary"></i>
        <h1 class="m-0 text-2xl font-bold">Container Apps</h1>
      </div>
      <div class="flex gap-2">
        <Button icon="pi pi-filter" text plain />
        <Button label="ADD APP" outlined class="font-bold" />
      </div>
    </div>

    <div class="card-dark">
      <DataTable
        :value="appsData"
        responsiveLayout="scroll"
        class="transparent-table"
      >
        <Column field="name" header="NAME">
          <template #body="slotProps">
            <div class="flex align-items-center gap-2 font-bold">
              <i
                v-if="slotProps.data.name === 'Immich'"
                class="pi pi-images text-primary"
              ></i>
              <i
                v-else-if="slotProps.data.name.includes('Minecraft')"
                class="pi pi-box text-green-500"
              ></i>
              <i v-else class="pi pi-globe text-red-400"></i>
              {{ slotProps.data.name }}
            </div>
          </template>
        </Column>

        <Column field="state" header="STATE">
          <template #body="slotProps">
            <Tag
              :value="slotProps.data.state"
              :severity="getStatusSeverity(slotProps.data.state.toLowerCase())"
              class="status-tag font-bold"
            />
          </template>
        </Column>

        <Column header="DOMAIN NAME">
          <template #body="slotProps">
            <div
              v-if="slotProps.data.domains"
              class="flex flex-column font-monospace text-sm"
            >
              <a
                href="#"
                class="no-underline hover:underline text-white mb-1"
                >{{ slotProps.data.domains.primary }}</a
              >
              <a
                v-if="slotProps.data.domains.secondary"
                href="#"
                class="no-underline hover:underline text-gray-400"
                >{{ slotProps.data.domains.secondary }}</a
              >
            </div>
            <span v-else>-</span>
          </template>
        </Column>

        <Column header="HOST NODE">
          <template #body="slotProps">
            <Chip
              :label="slotProps.data.hostNode"
              icon="pi pi-server"
              class="node-chip bg-primary-reverse font-bold cursor-pointer"
            />
          </template>
        </Column>

        <Column header="REPLICATED">
          <template #body="slotProps">
            <Chip
              :label="slotProps.data.replicated"
              icon="pi pi-database"
              class="node-chip bg-primary-reverse font-bold cursor-pointer"
            />
          </template>
        </Column>

        <Column field="backup" header="BACKUP" class="font-monospace"></Column>

        <Column
          field="storage"
          header="STORAGE"
          class="font-monospace"
        ></Column>

        <Column bodyStyle="text-align: center; overflow: visible">
          <template #body>
            <Button
              icon="pi pi-ellipsis-v"
              text
              plain
              rounded
              @click="toggleMenu"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true" />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from "vue";
import ResourceBlocks from "../components/ResourceBlocks.vue";
import { FLNode, FLNodeStatus } from "../api/types.ts"; // Import custom component

// --- Data Setup (Mocking the image data) ---

const { nodes } = inject<{ nodes: Ref<FLNode[]> }>("nodes");

const nodesData = computed(() =>
  nodes.value.map((n: FLNode, idx) => ({
    id: idx + 1,
    name: n.name,
    state: n.state,
    status: FLNodeStatus[n.state],
    uptime: "12h",
    cpuLabel: `${n.info.bigCores}C ${n.info.cpuThreads}T`,
    cpuUsage: 4, // roughly 50% active blocks
    memLabel: `${Math.round(n.info.memory / 1024)} GiB`,
    memUsage: 2,
    diskLabel: "12TB",
    diskUsage: 3,
    osVer: "v25.3.1",
    roles: n.roles.join(" "),
  })),
);

const appsData = ref([
  {
    id: 1,
    name: "Immich",
    state: "Online",
    uptime: "12h",
    domains: {
      primary: "immich.lab.seufert.co",
      secondary: "phpmyadmin.local + 5more",
    },
    hostNode: "Jekkyl",
    replicated: "Dustin",
    backup: "24h 14d 6m 1y",
    storage: "16TB (4TB + 12TB)",
  },
  {
    id: 2,
    name: "Cloudflare-ddns",
    state: "Error",
    uptime: "43w",
    domains: null,
    hostNode: "Jekkyl",
    replicated: "Dustin",
    backup: "3d 3m 1y",
    storage: "1Gbe, 10Gbe, 1Gbe",
  },
  {
    id: 3,
    name: "Minecraft-Public",
    state: "Online",
    uptime: "12h",
    domains: { primary: "minecraft.lab.seufert.co" },
    hostNode: "Jekkyl",
    replicated: "Dustin",
    backup: "3d 3m 1y",
    storage: "1Gbe, 10Gbe",
  },
  {
    id: 4,
    name: "Minecraft-Local1",
    state: "Offline",
    uptime: "",
    domains: null,
    hostNode: "",
    replicated: "",
    backup: "1y",
    storage: "1Gbe, 10Gbe",
  },
]);

// --- Logic ---

// Helper to map status strings to PrimeVue severities
const getStatusSeverity = (status) => {
  switch (status.toLowerCase()) {
    case "online":
      return "success";
    case "error":
      return "danger";
    case "offline":
      return "warning"; // or secondary
    default:
      return "info";
  }
};

// Menu handling
const menu = ref();
const menuItems = ref([
  { label: "View Details", icon: "pi pi-fw pi-search" },
  { label: "Restart", icon: "pi pi-fw pi-refresh" },
  { separator: true },
  { label: "Delete", icon: "pi pi-fw pi-trash", class: "text-red-400" },
]);

const toggleMenu = (event) => {
  menu.value.toggle(event);
};
</script>

<style lang="scss">
/* Global styles to match the dark technical aesthetic */
body {
  background-color: #0d1117; /* Deep dark background */
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;
  color: #e2e8f0;
}

.font-monospace {
  font-family:
    "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
}

.dashboard-container {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* Custom Card Style for Tables */
.card-dark {
  background-color: #161b22; /* Slightly lighter than body */
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 1rem;
  overflow: hidden;
}

/* --- PrimeVue Component Overrides for exact look --- */

/* Transparent Table background to let card color show through */
.transparent-table .p-datatable-bg {
  background: transparent !important;
}

/* Table Header Styling */
.p-datatable .p-datatable-thead > tr > th {
  background: transparent !important;
  color: #8b949e !important; /* Muted text color for headers */
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 1px;
  border-bottom: 1px solid #30363d;
  padding: 1rem 0.5rem;
}

/* Table Body Row Styling */
.p-datatable .p-datatable-tbody > tr {
  background: transparent !important;
  color: #e2e8f0;
}

.p-datatable .p-datatable-tbody > tr > td {
  border-bottom: 1px solid #21262d; /* Subtle row separators */
  padding: 1.5rem 0.5rem;
  vertical-align: middle;
}

/* Status Tag customization */
.status-tag {
  background: transparent !important;
  padding: 0;
  font-size: 1rem;
  justify-content: flex-start;
}
.status-tag.p-tag-success {
  color: var(--green-500) !important;
}
.status-tag.p-tag-danger {
  color: var(--red-500) !important;
}
.status-tag.p-tag-warning {
  color: var(--gray-500) !important;
}

/* Chip customization */
.node-chip {
  background: rgba(56, 189, 248, 0.15) !important; /* Subtle primary color bg */
  color: var(--primary-color) !important;
  border-radius: 4px;
}
.node-chip .p-chip-icon {
  color: var(--primary-color);
}

/* Primary color definition (matching the image's cyan) */
:root {
  --primary-color: #2dd4bf !important;
  --primary-color-300: #5eead4 !important;
}
</style>
