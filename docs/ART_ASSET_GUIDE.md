# Guide des assets

## Conventions

- Format runtime : glTF binaire (`.glb`), dans `public/assets/models/<catégorie>/`.
- Échelle : 1 unité = 1 mètre. Axe vertical : +Y. Avant du modèle : +Z.
- Pivot des personnages : entre les pieds, au niveau du sol.
- Chaque asset externe est inscrit dans [`public/assets/LICENSES.md`](../public/assets/LICENSES.md) avec son origine, sa licence et son statut.

## Statuts

| Statut | Signification |
| --- | --- |
| `provisoire` | Remplaçant technique, ne représente pas Cotonou |
| `en production` | Asset réaliste en cours de création |
| `validé` | Vérifié dans la scène (échelle, collisions, coût de rendu) |

## Inventaire actuel

| Asset | Fichier | Origine | Licence | Statut | Poids |
| --- | --- | --- | --- | --- | --- |
| Mannequin joueur + animations | `models/characters/mannequin.glb` | Quaternius, Universal Animation Library (Standard) | CC0 1.0 | provisoire | 2,1 Mo |
| Bâtiments de test | générés en code (`data/locations/test-district.json`) | Projet | — | provisoire | — |
| PNJ et objet de test | primitives en code | Projet | — | provisoire | — |

## Régénérer le personnage

Le GLB est produit à partir du glTF d'origine en ne gardant que les clips utiles :

```bash
pnpm assets:character /chemin/AnimationLibrary_Godot_Standard.gltf public/assets/models/characters/mannequin.glb
```

Clips conservés : `Idle_Loop`, `Walk_Loop`, `Jog_Fwd_Loop`, `Sprint_Loop`, `Interact`, `Idle_Talking_Loop`, `Driving_Loop` (ce dernier pour la Phase 2).
