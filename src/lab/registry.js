import { lazy } from 'react'

/**
 * Interactive experiments, rendered inside their /lab/<slug> page.
 * Add a component to this folder and a line here; delete both when it's done.
 */
const registry = {
  'pricy-again': lazy(() => import('./PricyAgain.jsx')),
  'only-at-night': lazy(() => import('./OnlyAtNight.jsx')),
}

export const getLivePage = (slug) => registry[slug]
