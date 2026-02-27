# Research: Fix Project Cards Layout

**Branch**: `006-fix-project-cards-layout` | **Date**: 2026-02-27

## Contexte

Bug fix CSS pur — aucune recherche externe nécessaire. Analyse effectuée par lecture directe du code source.

---

## Décision 1 — Propagation de hauteur dans la grille CSS

**Question**: Pourquoi les cartes n'ont-elles pas la même hauteur malgré `h-full` sur `Card` ?

**Decision**: `h-full` sur un enfant ne fonctionne que si son parent a une hauteur définie. La chaîne actuelle est cassée à deux niveaux : le `motion.div` de ProjectCard et le `motion.div` de TiltCard n'ont pas `h-full`.

**Rationale**:
- La grille CSS (`grid`) étire les cellules à la hauteur de la plus grande — c'est correct.
- Mais les éléments enfants de la cellule (`motion.div` → `TiltCard` → `Card`) doivent chacun avoir `h-full` pour que la hauteur se propage jusqu'au dernier enfant.
- `Card` a `flex h-full flex-col` mais son parent (`TiltCard`'s `motion.div`) n'a pas `h-full`, donc `h-full` sur `Card` ne fait référence à rien.

**Fix minimal**:
1. `motion.div` (ProjectCard) : ajouter `className="h-full"`
2. `<TiltCard>` : passer `className="h-full"` — TiltCard accepte `className` via `cn("relative", className)` → devient `relative h-full`

**Alternatives considérées**:
- Modifier `TiltCard.tsx` pour toujours avoir `h-full` → rejetée : changement global qui pourrait casser d'autres usages de TiltCard
- Utiliser `min-h-full` → rejetée : moins précis que `h-full` pour ce cas
- Utiliser `align-items: stretch` sur la grille → déjà en place par défaut, ce n'est pas le problème

---

## Décision 2 — Gestion du débordement des boutons

**Question**: Comment empêcher les boutons de déborder sans changer leur apparence ?

**Decision**: Ajouter `flex-wrap` au conteneur de boutons : `flex flex-wrap gap-2 pt-2`.

**Rationale**:
- `flex-wrap` autorise les éléments flex à passer à la ligne quand ils n'ont plus assez d'espace.
- Le `gap-2` existant s'applique aussi bien horizontalement que verticalement avec `flex-wrap`.
- Aucun changement visuel quand les boutons tiennent sur une ligne (cas à 1 ou 2 boutons).
- Sur les cartes à 3 boutons (QR Order System avec Captures + Voir la démo + Code), les boutons passeront à la ligne si nécessaire.

**Alternatives considérées**:
- `overflow-hidden` sur le conteneur → rejetée : cache les boutons sans les rendre accessibles
- Réduire la taille des boutons (`size="xs"`) → rejetée : change l'apparence
- Passer à une disposition en colonne → rejetée : change trop le design
- `flex-wrap gap-x-2 gap-y-1` → alternative valide mais `gap-2` homogène est plus simple
