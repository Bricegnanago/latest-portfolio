# Quickstart: Fix Project Cards Layout

**Branch**: `006-fix-project-cards-layout` | **Date**: 2026-02-27

## Vue d'ensemble

1 fichier à modifier, 3 changements de 1 ligne chacun.

```
Fichier unique : components/shared/ProjectCard.tsx
  Changement 1 : motion.div wrapper → ajouter className="h-full"
  Changement 2 : <TiltCard> → ajouter className="h-full"
  Changement 3 : boutons div → flex → flex flex-wrap
```

---

## Changement 1 — motion.div wrapper (h-full)

**Avant** :
```tsx
<motion.div
  initial={{ opacity: 0, y: 30, scale: 0.97 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: index * 0.15 }}
>
```

**Après** :
```tsx
<motion.div
  initial={{ opacity: 0, y: 30, scale: 0.97 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: index * 0.15 }}
  className="h-full"
>
```

---

## Changement 2 — TiltCard (h-full)

**Avant** :
```tsx
<TiltCard>
```

**Après** :
```tsx
<TiltCard className="h-full">
```

---

## Changement 3 — Boutons (flex-wrap)

**Avant** :
```tsx
<div className="flex gap-2 pt-2">
```

**Après** :
```tsx
<div className="flex flex-wrap gap-2 pt-2">
```

---

## Checklist de validation

- [ ] Sur desktop (3 colonnes) : les 3 cartes d'une même rangée ont la même hauteur
- [ ] Sur desktop : les zones de boutons sont alignées verticalement au bas de chaque carte
- [ ] Carte QR Order System (3 boutons) : aucun bouton n'est coupé ou déborde
- [ ] Sur mobile (colonne unique) : les cartes ont la hauteur de leur contenu, pas d'espace vide inutile
- [ ] Effet tilt au survol toujours fonctionnel
- [ ] Animation d'entrée (fade + slide + scale) toujours fonctionnelle
- [ ] Carte avec 1 bouton uniquement : disposition inchangée
