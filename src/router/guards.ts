import type { Router } from 'vue-router'

export function installGuards(router: Router): void {
  router.onError((err) => {
    if (err.message?.includes('Failed to fetch dynamically imported module')) {
      window.location.reload()
    }
  })
}
