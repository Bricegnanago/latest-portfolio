# Research: Animated Hero Section

**Feature**: `010-animated-hero`
**Date**: 2026-02-28

---

## R-001: Cinétique typographique — letter-by-letter spring

**Decision**: Découper `personalInfo.name` en tableau de caractères, chaque lettre enveloppée dans un `<motion.span>` avec `initial={{ opacity: 0, y: 20, scale: 0.8 }}` et `animate={{ opacity: 1, y: 0, scale: 1 }}` + `transition={{ type: "spring", stiffness: 300, damping: 24, delay: index * 0.04 }}`.

**Rationale**:
- Framer Motion spring natif = rebond élastique sans easing manuel
- Stagger par index de caractère = arrivée en cascade naturelle
- Pas de librairie supplémentaire (`react-spring`, `splitting.js`, etc.)
- Compatible `useReducedMotion` : si `reducedMotion === true`, on passe à un simple `animate={{ opacity: 1 }}` global

**Alternatives considérées**:
- `framer-motion`'s `staggerChildren` dans variants — viable, mais le stagger via index est plus précis pour des vitesses différenciées par caractère
- `splitting.js` — trop lourd, ajoute une dépendance externe

---

## R-002: Word stagger pour la description

**Decision**: Découper `personalInfo.bio` en tableau de mots (`bio.split(" ")`), chaque mot dans un `<motion.span>` avec `whileInView={{ opacity: 1, y: 0 }}` et `initial={{ opacity: 0, y: 10 }}`, stagger via `delay: index * 0.03`.

**Rationale**:
- Plus fluide que lettre par lettre pour un bloc de texte
- Delay court (0.03 s/mot) évite l'effet trop lent sur des bios de 30+ mots
- `whileInView` déclenche même si l'utilisateur scrolle jusqu'au Hero plus tard

**Alternatives considérées**:
- Typing effect (cursor clignotant) — trop "retro 2010", ne correspond pas au vibe 2026 souhaité
- Fade global du paragraphe — trop sobre, perd l'effet cinétique

---

## R-003: Avatar lévitation et parallaxe

**Decision**:
- Lévitation : `animate={{ y: [0, -14, 0] }}` avec `transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}` — simple boucle sinusoïdale GPU-friendly
- Parallaxe : réutiliser le hook existant `useMouseParallax({ strength: 12, inverted: false })` — déjà implémenté et optimisé
- Image : `<Image src="/images/profile.jpg" ... className="rounded-full" />` via `next/image`

**Rationale**:
- `profile.jpg` existe déjà dans `/public/images/`
- `useMouseParallax` est déjà dans le codebase avec gestion `prefers-reduced-motion` et `(hover: hover)` media query
- Animation `y` oscillante sur motion value = 0 repaints, GPU composited

**Alternatives considérées**:
- CSS `@keyframes float` — fonctionne, mais difficile à combiner avec le parallaxe motion value de Framer Motion
- `useSpring` sur y — plus complexe sans gain visible

---

## R-004: Hover glow sur texte et boutons

**Decision**:
- Nom/titre : `whileHover` avec `style={{ textShadow: "0 0 20px color-mix(in oklch, var(--primary) 80%, transparent)" }}` — inline, pas de classe CSS
- Boutons : wrapping dans `<motion.div whileHover={{ scale: 1.04 }}>` + utilisation de `box-shadow` via classe `.glow-primary` existante au hover (`className="... hover:glow-primary"`)

**Rationale**:
- `textShadow` via Framer Motion style = animé avec spring automatique, pas de classe supplémentaire
- La classe `.glow-primary` est déjà définie dans `globals.css`
- `whileHover={{ scale: 1.04 }}` suffit pour le CTA principal sans surcharge visuelle

**Alternatives considérées**:
- CSS `:hover` sur les textes — non animable (pas de transition sur `text-shadow` en Tailwind CSS v4 sans custom)
- `filter: drop-shadow()` — affecte tout le contenu du parent, risque de bords indésirables sur l'avatar

---

## R-005: Background animé subtil

**Decision**: Pseudo-élément CSS `:before` (ou `<div>` absolu) avec un `radial-gradient` tournant très lentement via une animation CSS `@keyframes` définie dans `globals.css`. Gradient : de `oklch(0.55 0.2 260 / 0.08)` vers transparent, centré en haut à droite, animation 8 s de déplacement subtil.

**Rationale**:
- Zéro JavaScript, zéro rafraîchissement de composant
- `pointer-events-none` et `z-0` assurent qu'il ne bloque rien
- OKLCH utilise le même token `--primary` du thème — automatiquement adapté light/dark

**Alternatives considérées**:
- `tsparticles` — trop lourd (~140 kB gzippé), non demandé
- Canvas WebGL — overkill pour cet usage
- Framer Motion `animate` sur un background-position — non supporté nativement (background-position n'est pas une motion value)

---

## R-006: Layout split et responsivité

**Decision**:
- Mobile (< `md`): colonne unique centrée — texte au-dessus, avatar dessous
- Desktop (≥ `md`): flex row — texte à gauche (`flex-1`), avatar à droite (`shrink-0`)
- Layout Tailwind: `flex flex-col items-center gap-12 md:flex-row md:items-center md:justify-between`
- Contrainte max-width: `max-w-5xl mx-auto px-4 sm:px-6`

**Rationale**:
- Pattern "hero split" standard, cohérent avec la tendance portfolio 2026
- Le Hero existant est centré — la refonte passe en split sans casser les autres sections
- `flex-1` sur le texte assure que l'avatar ne pousse pas le texte sur mobile

**Alternatives considérées**:
- CSS Grid — viable, mais flex suffit pour 2 colonnes
- Absolute positioning de l'avatar — fragile sur mobile

---

## R-007: Performance et prefers-reduced-motion

**Decision**: Chaque animation utilise `useReducedMotion()` de Framer Motion pour brancher sur une variante sans mouvement.

**Pattern**:
```tsx
const prefersReducedMotion = useReducedMotion()
const letterVariants = prefersReducedMotion
  ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
  : { hidden: { opacity: 0, y: 20, scale: 0.8 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } } }
```

**Optimisations GPU**:
- Toutes les animations utilisent `transform` (y, scale, x) — pas de layout thrashing
- `will-change: transform` appliqué via Framer Motion automatiquement sur les motion elements
- L'avatar est `<Image>` avec `priority` pour éviter le LCP retardé

---

## Résumé des décisions

| Sujet | Décision |
|-------|----------|
| Letter stagger | `motion.span` par caractère, spring stagger par index |
| Word stagger | `motion.span` par mot, delay 0.03s/mot |
| Avatar | `profile.jpg` existant, lévitation y + parallaxe useMouseParallax |
| Hover glow texte | `whileHover textShadow` inline Framer Motion |
| Hover CTA | `whileHover scale` + classe `.glow-primary` au hover |
| Background animé | `@keyframes` CSS radial-gradient, 0 JS |
| Layout | flex col mobile → flex row md+ |
| Reduced motion | `useReducedMotion()` sur toutes les animations de mouvement |
| Nouveaux packages | Aucun — stack existante suffisante |
| Fichiers modifiés | `HeroSection.tsx` (réécriture), `globals.css` (ajout keyframes) |
