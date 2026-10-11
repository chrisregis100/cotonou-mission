# Rapports de phase

Chaque phase se termine par un résumé des fichiers modifiés, des tests exécutés, des résultats et des risques connus (document maître, §13 règle 12).

## Bootstrap — 11 octobre 2026

- Dépôt initialement vide. Scaffold `create-next-app` (Next.js 16.4, TypeScript strict, Tailwind 4, ESLint, App Router, Turbopack).
- Dépendances ajoutées : three, @react-three/fiber, @react-three/drei, @react-three/rapier, zustand, zod ; dev : @types/three, vitest, @playwright/test, @gltf-transform/*.
- Vérifications : `pnpm typecheck`, `pnpm lint`, `pnpm build` passent.

## Phase 0 — Prototype technique — 11 octobre 2026

### Livré

- Route `/play` : runtime 3D chargé par `next/dynamic` (`ssr: false`), détection WebGL, error boundary avec écran explicite, écran de chargement (assets + initialisation Rapier).
- Quartier de test fictif décrit en JSON (`data/locations/test-district.json`, validé par zod) : sol, carrefour, trottoirs surélevés de 15 cm, 9 volumes de bâtiments, murs de limite invisibles.
- Personnage de test (capsule) piloté par le `KinematicCharacterController` de Rapier : gravité, autostep (montée des trottoirs), snap au sol, réapparition en cas de chute.
- Caméra 3e personne orbitale : pointer lock au clic, souris, molette, suivi amorti.
- Entrées ZQSD + WASD + flèches simultanément, Maj pour courir.
- Éclairage unique fin d'après-midi (ciel, soleil avec ombres, hémisphère).

### Fichiers principaux

`app/play/*`, `components/game-ui/{game-loader,hud,loading-screen,fps-meter,webgl-error-boundary}.tsx`, `game/core/*`, `game/camera/*`, `game/player/{player-controller,placeholder-character}.tsx`, `game/world/*`, `data/locations/test-district.json`, `tests/unit/*`, `tests/e2e/smoke.spec.ts`.

### Tests exécutés

| Commande | Résultat |
| --- | --- |
| `pnpm typecheck`, `pnpm lint`, `pnpm build` | OK |
| `pnpm test` | 27 tests OK (entrées, maths caméra, données du quartier) |
| `PLAYWRIGHT_CHANNEL=chrome pnpm test:e2e` | 2 tests OK : accueil → scène sans erreur ; marche avant puis collision avec un bâtiment |
| Test manuel (navigateur Cursor, dev) | Marche 2,2 m/s, course 5,5 m/s, montée du trottoir (y = 0,17), arrêt contre le mur à x = −6,63 ; 60 FPS sur le MacBook de développement |

### Risques et limites

- La caméra traverse les murs (pas de raycast).
- Le téléchargement du Chromium de Playwright a bloqué dans cet environnement ; les tests e2e ont été lancés avec Chrome installé (`PLAYWRIGHT_CHANNEL=chrome`).
- Le rendu WebGL headless (SwiftShader) est très lent : les tests e2e attendent des positions plutôt que des durées.
- Les performances n'ont été mesurées que sur la machine de développement.
