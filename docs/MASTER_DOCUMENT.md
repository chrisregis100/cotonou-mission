# Cotonou Mission --- Document maître

**Version 0.2 · 11 octobre 2026**\
**Statut :** décisions produit validées, spécifications de production à
préciser pendant le prototype\
**Nom de travail :** Cotonou Mission

## 1. Décisions de direction

Les décisions suivantes constituent la base officielle de la version
actuelle du projet :

-   **Rendu visuel :** 3D réaliste.
-   **Périmètre initial :** un quartier jouable.
-   **Gameplay dominant :** aventure scénarisée.
-   **Plateforme :** navigateur web, ordinateur en priorité, mobile à
    évaluer.
-   **Mode de jeu initial :** solo.
-   **Priorité de production :** une petite expérience complète,
    crédible et mesurable, plutôt qu'une grande ville inachevée.

### Vision produit

Cotonou Mission est un jeu d'aventure urbaine en 3D jouable dans le
navigateur. Le joueur incarne un personnage qui explore un quartier
inspiré de Cotonou, rencontre des habitants, conduit une moto, accomplit
des missions et découvre une histoire ancrée dans le contexte béninois.

La promesse n'est pas seulement de regarder une ville en 3D : le joueur
doit pouvoir se déplacer dans un espace cohérent, reconnaître des
détails locaux, comprendre où il se trouve et agir sur le monde.

### Principes directeurs

1.  **Authenticité locale :** l'environnement s'appuie sur des
    références photographiques, cartographiques et des observations de
    terrain.
2.  **Narration intégrée au monde :** les missions donnent une raison
    concrète de traverser les rues et de rencontrer les personnages.
3.  **Interaction physique :** les déplacements, les véhicules et les
    objets appartiennent au monde 3D, pas à une suite de menus.
4.  **Qualité avant étendue :** le quartier initial doit être soigné et
    jouable avant toute extension géographique.
5.  **Réalisme maîtrisé :** les matériaux, l'éclairage et les
    proportions seront réalistes, mais les effets coûteux et le
    photoréalisme absolu ne sont pas des exigences du MVP.
6.  **Performance web :** la scène doit rester fluide sur des appareils
    représentatifs de la cible, pas uniquement sur la machine de
    développement.

## 2. Public et plateforme

  -----------------------------------------------------------------------
  Sujet                               Décision actuelle
  ----------------------------------- -----------------------------------
  Public principal                    Joueurs curieux des jeux
                                      d'aventure, de l'exploration
                                      urbaine et du contexte béninois

  Plateforme                          Navigateur web

  Appareil de référence               Ordinateur portable récent ou
                                      intermédiaire

  Cible secondaire                    Smartphone Android récent, après
                                      validation des contrôles tactiles

  Installation                        Aucune installation traditionnelle
                                      obligatoire

  Mode initial                        Solo

  Langue de lancement                 Français

  Autres langues                      À envisager après le MVP

  Modèle économique                   Non défini ; priorité à la
                                      validation de l'expérience
  -----------------------------------------------------------------------

## 3. Périmètre du MVP

### Inclus

-   Une zone continue représentant un quartier précis ou une zone
    composite clairement présentée comme inspirée de Cotonou.
-   Plusieurs rues, intersections et points de repère.
-   Un personnage jouable à la troisième personne.
-   Marche, course, rotation et interaction.
-   Une moto conduisible, avec entrée et sortie.
-   Une physique de conduite simplifiée mais convaincante.
-   Des bâtiments extérieurs, commerces, enseignes et mobilier urbain.
-   Quelques PNJ narratifs avec dialogues.
-   Une mission principale complète avec plusieurs objectifs.
-   Des marqueurs de destination, un HUD minimal et un menu de mission.
-   Une sauvegarde locale de la progression.
-   Une ambiance sonore de base.
-   Une scène d'introduction et une conclusion à la première mission.
-   Tests de performance et de stabilité dans les navigateurs ciblés.

### Exclu du MVP

-   Reconstitution complète de Cotonou.
-   Monde multijoueur.
-   Système économique complexe et marché d'objets.
-   Grande flotte de véhicules.
-   Trafic routier avancé avec simulation de conduite pour chaque
    véhicule.
-   Zémidjan autonome comme passager, sauf si cette fonctionnalité
    devient essentielle à la mission.
-   Cycle jour/nuit complet et météo dynamique.
-   Intérieurs accessibles pour tous les bâtiments.
-   Missions générées par IA.
-   Système criminel, combat ou poursuites complexes, sauf si le
    scénario validé l'exige.
-   Application mobile native.

### Durée cible de la première séquence

La mission de démonstration devrait durer environ **10 à 20 minutes**, à
ajuster après les tests. Le quartier doit être assez petit pour être
maîtrisé, mais assez riche pour offrir des choix de déplacement et des
découvertes.

## 4. Choix du quartier

Le quartier n'est pas encore définitivement sélectionné. Il faut choisir
la zone en fonction du récit, de l'intérêt visuel, de la diversité des
rues et de la possibilité de documenter les lieux.

### Critères de sélection

-   Présence de repères visuels reconnaissables.
-   Mélange de rues principales et secondaires.
-   Possibilité d'inclure commerces, habitations et points de rencontre.
-   Intérêt narratif pour la mission d'introduction.
-   Disponibilité de références photographiques et cartographiques.
-   Taille raisonnable pour un premier lot d'assets.
-   Possibilité de créer une zone de test pour la conduite de moto.

Fidjrossè, Ganhi, une zone commerçante ou un quartier résidentiel
peuvent être étudiés. Aucun ne doit être déclaré choisi avant la
validation de la carte et du scénario.

### Fidélité géographique et visuelle

Deux niveaux doivent être distingués :

-   **Fidélité géographique :** positions relatives, rues,
    intersections, itinéraires et distances approximatives.
-   **Fidélité visuelle :** façades, matériaux, couleurs, enseignes,
    végétation, mobilier, motos et ambiance.

Les lieux clés de la mission doivent viser une fidélité supérieure aux
bâtiments de fond. Si le niveau de fidélité est adapté ou si une rue est
fictive, le document de production doit le signaler clairement.

### Documentation du quartier

Avant la modélisation détaillée, produire :

1.  Une carte de référence avec le périmètre.
2.  Une liste des rues et points d'intérêt.
3.  Un dossier de photos de référence par lieu.
4.  Des mesures ou estimations des largeurs de rue et des proportions.
5.  Un schéma des itinéraires de mission.
6.  Une liste des lieux accessibles, interactifs et décoratifs.
7.  Une liste des éléments réels, modifiés et fictifs.

Ne pas utiliser une carte ou des photos comme preuve qu'un modèle 3D est
fidèle si aucune comparaison n'a été effectuée.

## 5. Direction artistique : 3D réaliste

### Objectif visuel

Créer une ville crédible avec proportions cohérentes, matériaux
réalistes, éclairage naturel et détails locaux. La priorité est une
impression d'authenticité à hauteur de joueur, et non la quantité de
polygones ou d'effets spectaculaires.

### Priorités visuelles

1.  Routes, trottoirs, intersections et bordures.
2.  Façades, murs, portails, toitures et commerces proches.
3.  Motos et personnage principal.
4.  Signalétique, poteaux, câbles, lampadaires et mobilier urbain.
5.  Végétation et détails du sol.
6.  PNJ de proximité.
7.  Bâtiments éloignés et éléments de décor.

### Matériaux

Utiliser des matériaux PBR lorsque cela est pertinent : albédo,
roughness, normal maps et autres textures nécessaires. Les matériaux
doivent être cohérents avec les surfaces locales : béton, enduit, tôle,
métal peint, bitume, sable, verre et bois.

Éviter le recours excessif aux textures haute résolution. La qualité
doit être obtenue par des références précises, des matériaux cohérents,
une lumière maîtrisée et une bonne composition.

### Éclairage

Pour le MVP, choisir une seule période de la journée --- par exemple
matin ou fin d'après-midi --- et la maîtriser visuellement. Le cycle
jour/nuit et les variations météo sont reportés.

Prévoir : - une lumière principale cohérente ; - des ombres avec un coût
maîtrisé ; - un éclairage d'ambiance ; - un ton de couleur naturel ; -
des tests sur écran d'ordinateur portable et téléphone cible.

### Animation

Le personnage doit disposer au minimum d'animations de repos, marche,
course, rotation, interaction, montée sur la moto, conduite et descente.
Les transitions entre animations doivent éviter les glissements évidents
et les changements brusques de position.

### Son

Prévoir des sons spatialisés et contextuels : moteurs, circulation,
klaxons, pas, conversations, commerces et ambiances spécifiques à la
zone. Les sons doivent varier avec la distance et ne pas jouer en
permanence au même volume.

## 6. Assets et pipeline de production

La 3D réaliste implique un travail d'assets plus important que la 3D
stylisée. Il faut prévoir un inventaire, une origine pour chaque asset,
son statut de validation et son budget de performance.

### Catégories d'assets

  -----------------------------------------------------------------------
  Catégorie               MVP                     Exigences
  ----------------------- ----------------------- -----------------------
  Personnage joueur       Obligatoire             Modèle optimisé, rig,
                                                  animations essentielles

  Moto principale         Obligatoire             Modèle identifiable,
                                                  roues fonctionnelles,
                                                  matériaux, point de
                                                  montage

  Bâtiments proches       Obligatoire             Modèles ou kits
                                                  modulaires inspirés de
                                                  références locales

  Bâtiments éloignés      Obligatoire             Versions simplifiées,
                                                  détails limités

  Route et trottoirs      Obligatoire             Maillage praticable,
                                                  collisions, matériaux
                                                  crédibles

  Enseignes et devantures Obligatoire             Textes lisibles,
                                                  références locales ou
                                                  fictives clairement
                                                  assumées

  Mobilier urbain         Obligatoire             Poteaux, lampadaires,
                                                  poubelles, barrières et
                                                  éléments utiles

  PNJ narratifs           Obligatoire             Modèles, rig et
                                                  animations de base

  PNJ d'ambiance          Limité                  Variantes réutilisées,
                                                  animations simples

  Véhicules               Facultatif              Seulement si
  supplémentaires                                 nécessaires au récit

  Intérieurs              Très limités            Uniquement les
                                                  intérieurs traversés
                                                  pendant la mission

  Végétation              Obligatoire             Variété suffisante,
                                                  instancing si adapté

  Audio                   Obligatoire             Boucles d'ambiance et
                                                  effets ponctuels
  -----------------------------------------------------------------------

### Règles de création et d'import

-   Favoriser le format glTF/GLB pour le runtime web.
-   Utiliser Blender pour créer, nettoyer, optimiser et exporter les
    modèles.
-   Définir une échelle et une orientation standard pour tous les
    assets.
-   Vérifier les pivots, collisions, normales, UV et matériaux avant
    intégration.
-   Utiliser des kits modulaires pour les éléments répétitifs sans
    donner un aspect cloné à toute la rue.
-   Prévoir plusieurs niveaux de détail (LOD) lorsque le gain est
    mesurable.
-   Réutiliser les matériaux et les textures lorsque cela ne nuit pas au
    réalisme.
-   Documenter les licences des assets externes.
-   Ne pas utiliser d'assets sans licence compatible avec le projet.
-   Identifier les assets provisoires, générés ou non vérifiés.
-   Ne pas présenter un asset générique comme une reproduction fidèle
    d'un lieu réel.

### Pipeline d'asset

1.  Référence et besoin documentés.
2.  Blocage de la forme et validation de l'échelle.
3.  Modélisation.
4.  Matériaux et textures.
5.  UV et optimisation.
6.  Export GLB.
7.  Intégration dans la scène.
8.  Contrôle visuel et collisions.
9.  Mesure du poids et du coût de rendu.
10. Validation ou retour en production.

### Budget de détail

Les objets les plus proches de la caméra et utilisés par le joueur
doivent être détaillés. Les éléments éloignés peuvent utiliser des
silhouettes simplifiées et des textures adaptées. Ne pas consacrer le
même budget à une moto conduite et à un bâtiment visible uniquement à
l'horizon.

## 7. Gameplay et scénario

### Boucle de jeu principale

1.  Le joueur reçoit une mission ou découvre un événement narratif.
2.  Il consulte l'objectif et la destination.
3.  Il se déplace à pied ou utilise la moto.
4.  Il interagit avec un personnage, un objet ou un lieu.
5.  Le jeu met à jour l'objectif.
6.  Le joueur rejoint l'étape suivante.
7.  Une scène, un dialogue ou un événement fait progresser l'histoire.
8.  La mission se termine et la progression est sauvegardée.

### Mission de démonstration proposée

**Titre de travail : « Le colis oublié »**

Un commerçant demande au personnage de livrer un colis à un client avant
la fermeture. Cette mission sert de tutoriel intégré à l'histoire.

Étapes : 1. Scène d'arrivée et rencontre avec le donneur de mission. 2.
Dialogue et acceptation. 3. Déplacement jusqu'au commerce. 4.
Interaction pour récupérer le colis. 5. Choix de marcher ou d'utiliser
la moto. 6. Trajet jusqu'à la destination. 7. Interaction avec le
destinataire. 8. Événement narratif qui révèle un nouvel élément de
l'histoire. 9. Récompense et sauvegarde.

Les lieux de cette mission seront déterminés après le choix du quartier.
Le scénario ne doit pas utiliser de lieux fictifs présentés comme des
lieux réels.

### Système de missions

Chaque mission doit être déclarative et réutilisable. Champs recommandés
:

-   `id`
-   `title`
-   `description`
-   `startTrigger`
-   `objectives`
-   `startLocation`
-   `targetLocations`
-   `requiredItems`
-   `timeLimit`
-   `rewards`
-   `failureConditions`
-   `completionConditions`
-   `nextMissionIds`
-   `dialogueIds`
-   `saveCheckpoint`

États possibles : `locked`, `available`, `active`, `completed`,
`failed`, `abandoned`.

Les transitions doivent être contrôlées. Une mission terminée ne peut
pas payer plusieurs fois sa récompense à cause d'un rechargement ou d'un
double événement.

### Personnages et dialogues

Le MVP doit comporter peu de personnages, mais les rendre mémorables et
utiles à l'histoire. Chaque personnage narratif doit avoir : - un rôle
dans le scénario ; - un emplacement ou une logique de déplacement ; - un
état narratif ; - des dialogues structurés ; - des conditions
d'apparition ou de réponse ; - une interaction testable.

Les comportements de foule avancés sont exclus du MVP. Les PNJ
décoratifs peuvent marcher sur des trajectoires simples ou rester dans
une zone définie.

### Transport

La moto principale est le véhicule prioritaire. Elle doit proposer : -
accélération et freinage ; - direction et rayon de braquage ; - vitesse
maximale contrôlée ; - collision avec les obstacles ; - entrée et sortie
; - caméra de conduite ; - animations et sons essentiels.

La physique peut être simplifiée, mais le contrôle doit être lisible,
stable et distinct de celui d'un personnage à pied. La conduite doit
être testée à basse et haute vitesse.

Le transport en Zémidjan comme passager peut être reporté, à moins qu'il
soit essentiel au scénario. Si ajouté, il doit être un mode distinct :
choix d'une destination, trajet contrôlé par un PNJ et retour au
contrôle du joueur à l'arrivée.

## 8. Interface et sauvegarde

### HUD

Le HUD doit montrer seulement les informations utiles : - mission et
objectif actif ; - direction ou destination ; - indication d'interaction
; - solde virtuel si utile au récit ; - commandes de déplacement ; -
informations de véhicule en conduite.

Une carte complète n'est pas nécessaire au premier instant. Une
mini-carte ou une indication de direction suffit, à condition qu'elle
aide le joueur à comprendre le trajet.

### Téléphone virtuel

Le téléphone peut apparaître comme une interface intégrée au monde, mais
son système doit rester minimal au MVP : - missions et objectifs ; -
carte ou destinations ; - messages scénarisés ; - contacts liés à
l'histoire.

Ne pas construire une simulation complète de smartphone avant d'avoir
validé la mission principale.

### Sauvegarde

La progression doit conserver : - mission et objectif en cours ; -
position sûre du joueur ; - état de la moto si pertinent ; - objets de
mission ; - dialogues ou événements déjà déclenchés ; - récompenses
attribuées.

Commencer par une sauvegarde locale versionnée. Prévoir une couche
d'abstraction afin de pouvoir ajouter une sauvegarde cloud plus tard. La
restauration doit gérer les données anciennes ou corrompues sans bloquer
le jeu.

## 9. Stack technique recommandée

### Stack de départ

-   **Next.js + TypeScript :** application web, menus, profil et
    interface.
-   **Three.js avec React Three Fiber :** scène 3D et intégration avec
    React.
-   **Rapier 3D :** évaluation pour les collisions et corps physiques.
-   **Blender :** création et optimisation des modèles.
-   **glTF/GLB :** format de livraison des modèles 3D.
-   **Vitest ou équivalent :** tests unitaires des systèmes de logique.
-   **Playwright :** tests de parcours web et smoke tests.
-   **Sauvegarde locale :** première version sans dépendance serveur.
-   **Supabase ou backend équivalent :** uniquement quand comptes et
    sauvegardes cloud deviennent nécessaires.

Cette stack est une hypothèse de départ. Le prototype doit confirmer la
stabilité, les performances, les outils d'animation et le comportement
des collisions avant de s'y engager définitivement.

### Architecture logique

-   `GameRuntime` : initialise et arrête le runtime.
-   `WorldManager` : quartiers, secteurs et points d'intérêt.
-   `PlayerController` : contrôles du personnage.
-   `CameraController` : caméra à pied et en véhicule.
-   `VehicleSystem` : entrée, sortie et conduite.
-   `PhysicsSystem` : collisions et corps physiques.
-   `MissionManager` : états et objectifs.
-   `InteractionSystem` : objets et PNJ interactifs.
-   `DialogueSystem` : dialogues et choix.
-   `SaveManager` : sauvegarde et restauration.
-   `AudioManager` : ambiances et effets.
-   `AssetManager` : chargement, cache et libération des ressources.

Les systèmes doivent communiquer par des interfaces explicites. La
logique de mission ne doit pas dépendre directement du rendu visuel d'un
composant React.

### Structure de fichiers initiale

``` text
cotonou-mission/
├── app/
│   ├── page.tsx
│   ├── play/
│   └── settings/
├── components/
│   ├── game-ui/
│   ├── menus/
│   └── map/
├── game/
│   ├── core/
│   ├── world/
│   ├── player/
│   ├── vehicles/
│   ├── missions/
│   ├── interactions/
│   ├── dialogue/
│   ├── save/
│   └── audio/
├── data/
│   ├── missions/
│   ├── dialogues/
│   └── locations/
├── public/
│   └── assets/
│       ├── models/
│       ├── textures/
│       └── audio/
├── tests/
└── docs/
    ├── MASTER_DOCUMENT.md
    ├── TECHNICAL_ARCHITECTURE.md
    ├── ART_ASSET_GUIDE.md
    └── IMPLEMENTATION_PLAN.md
```

La structure peut être adaptée au dépôt existant. Ne pas créer
prématurément un grand nombre de couches ou de packages.

## 10. Performance et critères techniques

Les valeurs suivantes sont des cibles à mesurer, pas des garanties.

  -----------------------------------------------------------------------
  Mesure                              Objectif initial
  ----------------------------------- -----------------------------------
  Fluidité                            30 FPS minimum sur l'appareil de
                                      référence ; 60 FPS souhaités

  Chargement initial                  Viser moins de 10 secondes sur
                                      connexion correcte

  Téléchargement initial              Viser moins de 20 Mo pour le cœur
                                      jouable, contenu différé exclu

  Stabilité                           Aucun blocage connu sur le parcours
                                      principal

  Compatibilité                       Navigateurs récents compatibles
                                      WebGL, testés explicitement

  Mémoire                             Pas de fuite progressive lors des
                                      déplacements répétés

  Sauvegarde                          Reprise correcte après rechargement
  -----------------------------------------------------------------------

### Optimisations à considérer

-   Chargement progressif des assets.
-   Découpage du quartier en secteurs.
-   Textures compressées et résolutions adaptées.
-   Réutilisation des modèles et matériaux.
-   LOD lorsque cela apporte un bénéfice mesuré.
-   Limitation des PNJ animés simultanément.
-   Collisions simplifiées pour les bâtiments.
-   Déchargement explicite des ressources.
-   Gestion des erreurs de chargement WebGL.
-   Profilage régulier sur appareils cibles.

## 11. Plan de développement par étapes

### Phase 0 --- Audit et prototype technique

-   Inspecter le dépôt.
-   Vérifier les versions de dépendances et les scripts existants.
-   Créer une scène 3D minimale.
-   Tester le rendu dans les navigateurs ciblés.
-   Évaluer les performances, la physique et les outils d'animation.
-   Décider si Three.js/R3F/Rapier restent adaptés.

**Critère de sortie :** scène jouable et stable, avec un personnage de
test, une caméra et des collisions.

### Phase 1 --- Contrôles du personnage

-   Déplacement, course, rotation et caméra.
-   Animations de base.
-   Interaction contextuelle.
-   Collisions avec sol et bâtiments de test.

**Critère de sortie :** déplacement fiable, sans traversée des obstacles
majeurs ni glissement visuel excessif.

### Phase 2 --- Prototype de moto

-   Modèle de moto provisoire.
-   Entrée et sortie.
-   Accélération, freinage, direction et caméra.
-   Collision et sons essentiels.

**Critère de sortie :** boucle complète à pied → montée → conduite →
arrêt → descente.

### Phase 3 --- Blocage du quartier

-   Sélection du quartier et du périmètre.
-   Création d'une carte de référence.
-   Construction des rues, volumes de bâtiments et principaux repères.
-   Itinéraire de mission praticable.

**Critère de sortie :** le joueur peut parcourir le trajet de la mission
dans un quartier cohérent, même si les assets sont encore provisoires.

### Phase 4 --- Production des assets réalistes

-   Modélisation et intégration des bâtiments proches.
-   Matériaux et textures.
-   Moto finale et personnage.
-   Signalétique, végétation et mobilier.
-   Éclairage final de la zone.

**Critère de sortie :** qualité visuelle homogène et assets validés dans
la scène, pas seulement dans Blender.

### Phase 5 --- Systèmes narratifs

-   Gestion des missions.
-   Dialogues.
-   Interactions avec PNJ et objets.
-   Objectifs, récompenses et transitions.
-   Événements narratifs de début et de fin.

**Critère de sortie :** mission complète du début à la fin, sans
intervention manuelle de développement.

### Phase 6 --- Interface et sauvegarde

-   HUD.
-   Journal de mission.
-   Indications de destination.
-   Sauvegarde locale versionnée.
-   Reprise après rechargement.

**Critère de sortie :** l'utilisateur peut quitter puis reprendre une
mission à un checkpoint valide.

### Phase 7 --- Optimisation et tests

-   Profilage du rendu et de la mémoire.
-   Tests sur plusieurs appareils.
-   Correction des problèmes de commandes.
-   Tests de sauvegarde, de collisions et d'états de mission.
-   Écran de démarrage et erreurs explicites.

**Critère de sortie :** tous les critères d'acceptation du MVP sont
validés et les limites restantes sont documentées.

## 12. Critères d'acceptation du MVP

-   Le jeu se lance dans un navigateur pris en charge.
-   La zone jouable est cohérente et inspirée d'un secteur documenté de
    Cotonou.
-   Le personnage peut marcher, courir et interagir.
-   Le personnage peut monter sur la moto, la conduire et en descendre.
-   Les collisions majeures fonctionnent.
-   La mission peut être commencée, poursuivie et terminée.
-   Les dialogues et objectifs apparaissent au bon moment.
-   Les récompenses ne peuvent pas être attribuées deux fois.
-   La sauvegarde restaure un état cohérent.
-   Les assets provisoires sont identifiés.
-   Les performances sont mesurées sur les appareils cibles.
-   Les erreurs de chargement ne laissent pas l'application sur un écran
    vide.

## 13. Instructions de travail pour Cursor

Cursor doit travailler par petites étapes vérifiables, maintenir la
documentation à jour et ne pas prétendre qu'une fonctionnalité
fonctionne avant de l'avoir testée.

### Règles impératives

1.  Inspecter le dépôt et ses dépendances avant toute modification.
2.  Lire ce document et les spécifications techniques disponibles.
3.  Ne pas construire tout le quartier avant d'avoir validé les
    contrôles.
4.  Ne pas remplacer un vrai environnement 3D par une image statique.
5.  Ne pas inventer de données géographiques présentées comme exactes.
6.  Distinguer assets temporaires et assets validés.
7.  Garder les données de missions et dialogues séparées du code de
    rendu.
8.  Tester les parcours critiques après chaque étape.
9.  Vérifier les performances et la libération des ressources.
10. Documenter les décisions techniques et les limites.
11. Ne pas ajouter de multijoueur, d'IA générative ou de systèmes
    complexes sans validation explicite.
12. Avant toute nouvelle phase, fournir un résumé des fichiers modifiés,
    tests exécutés, résultats et risques connus.

### Première tâche à exécuter

Avant de coder, présenter : - l'état du dépôt ; - la stack actuelle ; -
les dépendances utiles et manquantes ; - les options de rendu et de
physique ; - les risques de performance ; - le plan des premières
tâches.

Ensuite, implémenter uniquement la Phase 0 : une scène 3D réellement
interactive, un personnage de test, une caméra à la troisième personne,
un sol, quelques bâtiments provisoires et des collisions.

Ne pas démarrer la production complète des assets de Cotonou tant que le
prototype n'a pas démontré que la stack et les contrôles fonctionnent.

## 14. Décisions encore ouvertes

Les points suivants doivent être résolus avant la production complète :

1.  Choix exact du quartier.
2.  Synopsis de l'histoire principale et identité du protagoniste.
3.  Durée totale de l'aventure et nombre de missions.
4.  Niveau de fidélité géographique attendu.
5.  Répartition entre assets créés sur mesure et assets sous licence.
6.  Appareils minimums ciblés.
7.  Besoin réel d'un compte utilisateur et d'une sauvegarde cloud.
8.  Modèle économique éventuel après validation du MVP.

## 15. Référence d'inspiration

Jeu de référence : **Chale City**, accessible à l'adresse
https://accra-mission.netlify.app/

S'inspirer des principes généraux d'exploration, de conduite, de
missions et de progression. Ne pas copier le code, les textes, les
personnages, les modèles, la musique ou les autres ressources du jeu.

------------------------------------------------------------------------

**Fin du document maître --- version 0.2**
