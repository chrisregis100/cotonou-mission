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

## Phase 1 — Contrôles du personnage — 11 octobre 2026

### Livré

- Personnage animé : mannequin Quaternius (CC0, provisoire), GLB élagué à 7 clips (2,1 Mo, 1 Mo gzip) via `pnpm assets:character`. La capsule reste affichée pendant le chargement.
- Sélection d'animation pure (`idle`, `walk`, `run`, `talk`) basée sur la vitesse réellement obtenue après collisions (pas de course sur place contre un mur), cross-fade de 0,2 s, vitesse de lecture ajustée à la vitesse au sol.
- Système d'interaction : registre, sélection de l'interactable le plus proche (10 fois par seconde), marqueur flottant mis en évidence à portée, invite « E » cliquable dans le HUD.
- PNJ et colis de test déclarés dans `data/locations/test-district.json`.
- Dialogues JSON (`data/dialogues/*.json`) validés par zod (références de nœuds vérifiées), moteur pur (`start`, `advance`, `choose`), boîte de dialogue : E / Entrée / Espace pour continuer, chiffres ou clic pour choisir, Échap pour fermer. Le joueur est immobilisé et se tourne vers son interlocuteur ; la souris est libérée.
- Le store garde la liste des dialogues déjà déclenchés (préparation de la sauvegarde).

### Fichiers principaux

`game/player/{animation-state.ts,player-model.tsx,player-controller.tsx}`, `game/interactions/*`, `game/dialogue/*`, `game/core/game-store.ts`, `components/game-ui/{dialogue-box,hud}.tsx`, `data/dialogues/*`, `data/locations/test-district.json`, `public/assets/models/characters/mannequin.glb`, `public/assets/LICENSES.md`, `scripts/build-character.mjs`, `tests/unit/{animation-state,interaction-system,dialogue-engine,game-store}.test.ts`.

### Tests exécutés

| Commande | Résultat |
| --- | --- |
| `pnpm typecheck`, `pnpm lint`, `pnpm build` | OK |
| `pnpm test` | 52 tests OK (7 fichiers) |
| `PLAYWRIGHT_CHANNEL=chrome pnpm test:e2e` | 3 tests OK, dont le parcours complet : approche du PNJ → invite → E → dialogue → choix → fermeture |
| Test manuel (navigateur Cursor, dev) | Modèle à l'échelle, orientation correcte, animation de parole pendant le dialogue, choix au clavier, Échap, réouverture |

### Mesures

- Téléchargement de production : environ 1,3 Mo de JS gzip (dont le bundle WASM de Rapier, le plus gros morceau) + 1 Mo pour le personnage, soit environ 2,4 Mo, loin de la cible de 20 Mo.
- 60 FPS sur le MacBook de développement au premier plan.

### Risques et limites

- La caméra traverse toujours les murs.
- Le mannequin n'a pas d'animation de rotation sur place ; il pivote en marchant.
- En développement, le premier chargement de `/play` peut prendre plus de 10 s (compilation à la demande) ; à mesurer en production sur les appareils cibles.
- Avertissements internes connus des dépendances : `THREE.Clock` déprécié (R3F) et paramètres d'initialisation dépréciés (Rapier). Sans effet actuellement.
- Aucun contrôle tactile.
