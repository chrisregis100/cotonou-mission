# Plan d'implémentation

Découpage issu du document maître (§11). Les rapports détaillés sont dans [PHASE_REPORTS.md](PHASE_REPORTS.md).

| Phase | Contenu | Statut |
| --- | --- | --- |
| Bootstrap | Next.js 16, R3F, Rapier, Vitest, Playwright | terminé |
| 0 — Prototype technique | Scène 3D, personnage de test, caméra 3e personne, sol, bâtiments provisoires, collisions | terminé |
| 1 — Contrôles du personnage | Marche, course, animations, interaction contextuelle, dialogue de test | terminé |
| 2 — Prototype de moto | Entrée/sortie, conduite, caméra de conduite, sons | à faire |
| 3 — Blocage du quartier | Choix du quartier, carte de référence, rues et volumes | à faire (décision quartier ouverte) |
| 4 — Assets réalistes | Bâtiments, matériaux, moto et personnage finaux | à faire |
| 5 — Systèmes narratifs | MissionManager, missions déclaratives, « Le colis oublié » | à faire |
| 6 — Interface et sauvegarde | HUD complet, journal, sauvegarde locale versionnée | à faire |
| 7 — Optimisation et tests | Profilage, appareils cibles, critères d'acceptation | à faire |

## Prochaines tâches suggérées (Phase 2)

1. Moto provisoire (primitives) avec point de montage et collider.
2. Machine d'états à pied / en moto dans `game/vehicles/`, testée par Vitest.
3. Physique simplifiée : accélération, freinage, braquage, vitesse max.
4. Caméra de conduite distincte, transition depuis la caméra à pied.
5. Raycast caméra pour éviter de traverser les murs.
