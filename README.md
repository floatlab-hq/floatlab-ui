# FloatLab UI

[View Storybook](https://floatlab-hq.github.io/floatlab-ui/) · [Dashboard workspace](https://floatlab-hq.github.io/floatlab-ui/?path=/story/2-pattern-dashboard-workspace--host-detail-open)

GitHub Actions tests and publishes Storybook to GitHub Pages on every push to `main`.


Vue 3 components extracted from the FloatLab dashboard mock, with typed fixture data, component tests, and an interactive Histoire component gallery.

## Tech stack

- Vue 3 single-file components with TypeScript
- Vite for local development and production builds
- Vitest, Vue Test Utils, and jsdom for component tests
- ESLint for Vue and TypeScript linting
- Histoire for isolated component stories
- pnpm for package management

## Setup and development

Install dependencies:

```sh
pnpm install
```

Start the dashboard locally:

```sh
pnpm dev
```

Create a production build:

```sh
pnpm build
```

## Tests and checks

Run the tests once:

```sh
pnpm test --run
```

Run tests in watch mode while developing:

```sh
pnpm test
```

Run the remaining checks:

```sh
pnpm lint
pnpm typecheck
```

## Component stories with Histoire

Start the interactive component gallery:

```sh
pnpm story:dev
```

Open the local URL printed by Histoire. Stories live beside their components as `*.story.vue` files and provide isolated examples of component states and props.

Build the static story gallery:

```sh
pnpm story:build
```

Preview the built gallery locally:

```sh
pnpm story:preview
```

The shared story setup is in `src/histoire.setup.ts`, and Histoire configuration is in `histoire.config.ts`.

## Colour tokens

Global palette and opacity tokens are defined in `src/styles.css` under `:root`. Components should reference these custom properties rather than introduce literal colours. SVG asset colours remain embedded in their files.

## Storybook (local)

Storybook is the new foundation gallery. Existing Histoire stories remain available.

```sh
pnpm storybook
```

Open http://127.0.0.1:6006. Use the **Theme** toolbar to change the palette across
all stories. Everforest is the default. The gallery includes Colors (original
Omarchy swatches and FloatLab UI roles), Typography, Tabler Filled Icons, Radius, and
interactive stories for the existing Button and Input. Figma screens are not
implemented yet.

```sh
pnpm storybook:build
```

The static build is written to the ignored `storybook-static/` directory. Nothing
is published. Storybook configuration lives in `.storybook/`; Vue stories are
colocated `*.stories.ts` files. Keep the existing Primitive / Pattern / Layout
hierarchy and reuse components when adding future mock screens.

### Theme sources and custom palettes

The 23 official palettes are pinned to Omarchy commit
`35a55fd236598598130711249a647e0071532e9a`. Original `colors.toml` files live in
`src/themes/palettes/`; `src/themes/source.json` records the upstream source.
This is a local snapshot, with no automatic upstream updates.

Add a custom theme using a local file, an HTTPS URL to `colors.toml`, or a GitHub
repository with `colors.toml` at its root on the default branch:

```sh
pnpm theme:add my-theme /path/to/colors.toml
pnpm theme:add my-theme https://github.com/OWNER/THEME-REPO
```

Choose one source per theme. For a specific branch, commit, or a repo hosted
elsewhere, supply its raw HTTPS file URL or a locally checked-out `colors.toml`.
The importer downloads only the palette, validates it, and refuses to overwrite
an existing theme. Restart Storybook after adding a file; it appears in the toolbar
automatically. No registration code is needed.

Supported palettes use Omarchy's named semantic colors, or legacy bg/fg and
ANSI color0–color15 aliases. Colors must be six-digit hex values. Optional neutral
stops fall back to the core palette; mode is inferred if absent. Non-color desktop
settings and wallpaper are not used.

All original colors are exposed as `--omarchy-<key>` (underscores become hyphens).
FloatLab UI roles in `src/styles.css` map background, panel, void, raised, text,
border, accent, success, warning, and error onto those colors. Existing `--green`
references use the accent; `--success` uses the palette's green. Mixed hover,
opacity, and alert colors derive from the selected palette. Components should
use these variables instead of literal colors. Existing SVG assets retain their
embedded colors; new icons use Tabler filled variants (`Icon…Filled`) from `@tabler/icons-vue`
and inherit `currentColor`. If an icon has no filled variant, choose an alternative
filled icon or resolve that exception against the Figma reference.

IBM Plex Mono weights 400, 500, 600, and 700 are bundled locally. `--radius` is
2px. Typography story sizes are samples, pending the Figma component references.
The app and Histoire also load the shared Everforest foundation; their existing
layouts and interactions are preserved.

## Dashboard from Figma

The **2. Pattern / Lab Dashboard** Storybook story composes the Figma dashboard
from reusable navigation, event-log, host-directory, and app-directory patterns.
Node Plate, Health Mark, Status Badge, Telemetry, and Asset Icon are listed under
**1. Primitive**. All stories use the same global Omarchy theme. Color and
Typography stories now include the dashboard's role mappings and size scale.

See [dashboard design-system mapping](docs/dashboard-design-system.md) for exact
colors, font sizes, heading roles, row heights, normalization decisions, and the
provisional abbreviation convention. Node shapes reuse the existing version-6
Bauhaus generator, seeded from the full node name independently of the theme.
The command palette works locally; other actions emit events for an application
or a Storybook demo to handle. No infrastructure is connected.

The **Dashboard Workspace** stories demonstrate the responsive dashboard/detail
split, host tabs and API-driven add-host, add-app and alert-settings forms.
See [detail workspace mapping](docs/detail-workspace.md). Run `pnpm forms:sync`
after updating the sibling floatlab-core OpenAPI contracts.
