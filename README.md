# Cotonou Mission

Jeu d'aventure urbaine en 3D inspiré de Cotonou, jouable dans le navigateur (Next.js, React Three Fiber, Rapier).

Statut : prototype technique (Phases 0 et 1). Voir [`docs/`](docs/) pour le document maître, l'architecture et les rapports de phase.

## Démarrage

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Scripts

| Commande | Rôle |
| --- | --- |
| `pnpm dev` | Serveur de développement |
| `pnpm build` / `pnpm start` | Build et serveur de production |
| `pnpm typecheck` | Vérification TypeScript |
| `pnpm lint` | ESLint |
| `pnpm test` | Tests unitaires (Vitest) |
| `pnpm test:e2e` | Smoke tests navigateur (Playwright ; `pnpm exec playwright install chromium`, ou `PLAYWRIGHT_CHANNEL=chrome` pour utiliser Chrome installé) |
| `pnpm assets:character <in.gltf> <out.glb>` | Régénère le GLB du personnage de test |
