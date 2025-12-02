# FloatLab UI

A Vue 3 + Vite Progressive Web App for managing FloatLab floating container infrastructure.

This guide will help you get the app running locally and explains how to contribute changes.

## Quick start

Prerequisites:
- Node.js 18+ (20+ recommended)
- Yarn package manager (Classic or Berry)

If you don’t have Yarn installed and you use Node 18+:

```
corepack enable
corepack prepare yarn@stable --activate
```

Clone and run:

```
git clone https://github.com/floatlab-hq/floatlab-ui.git
cd floatlab-ui
yarn install
yarn dev
```

Open http://localhost:5173 in your browser (default Vite port).

To use a different port:

```
yarn dev --port 3000
```

## Scripts

All commands are run with `yarn <script>`

- `dev` — start the local Vite dev server with HMR
- `build` — type-check then build production assets
- `build-only` — build without type-checking
- `type-check` — run TypeScript checks using `vue-tsc`
- `preview` — preview the production build locally

## Tech stack

- Vue 3 + TypeScript
- Vite for dev/build/preview
- PrimeVue + PrimeIcons + @primeuix/themes
- Chart.js

## Project layout

- `src/main.ts` — app entry point
- `src/App.vue` — root component/shell
- `src/views/Dashboard.vue` — example view
- `src/components/*` — shared components (e.g., top bar, footer)
- `public/` — static assets served at the root
- `vite.config.ts` — Vite configuration

## Building for production

```
yarn build
```

The output is written to `dist/`. To preview the production build locally:

```
yarn preview
```

### Base path configuration (for GitHub Pages and other subpaths)

This project reads the base path from the environment during build:

- Preferred: `VITE_BASE` (e.g., `/floatlab-ui/`)
- Fallback: `BASE`
- Default: `/`

Examples:

```
# Regular build (serves from root '/')
yarn build

# Build for GitHub Pages under https://<org>.github.io/floatlab-ui/
VITE_BASE=/floatlab-ui/ yarn build
```

The included GitHub Actions workflow sets `VITE_BASE=/floatlab-ui/` automatically when deploying to Pages.

## Code style & formatting

Prettier is included. You can format the code with your IDE or from the CLI:

```
npx prettier --write .
```

Type safety:

```
yarn type-check
```

## Contributing

We welcome issues and pull requests! To contribute:

1. Fork the repo and create a feature branch
   - Suggested naming: `feat/<short-name>`, `fix/<short-name>`, or `chore/<short-name>`
2. Install dependencies with Yarn: `yarn install`
3. Run the dev server and make changes: `yarn dev`
4. Ensure the project builds and passes type checks:
   - `yarn type-check`
   - `yarn build`
5. Commit your changes and open a PR against `main`

Notes:
- Please keep changes focused and include screenshots/GIFs for UI changes when possible.
- If adding dependencies, prefer small, well‑maintained packages.

## Troubleshooting

- Node/Yarn version issues
  - Ensure Node 18+ (20+ recommended). If you use `nvm`:
    - `nvm install 20 && nvm use 20`
  - Ensure Yarn is active (via Corepack):
    - `corepack enable && corepack prepare yarn@stable --activate`

- Clean install if builds fail unexpectedly
  - Delete `node_modules` and the lockfile, then reinstall:
    - `rm -rf node_modules && rm -f yarn.lock && yarn install`

- Vite cache
  - If hot reload acts oddly, stop dev server and remove `.vite` cache in `node_modules/.vite/` then `yarn dev` again.

## License

Apache License 2.0 — see `LICENSE` for details.
