# Quickstart: Animated Hero Section

**Feature**: `010-animated-hero`
**Date**: 2026-02-28

---

## Changes Summary

### `app/globals.css`

Ajouter dans `@layer utilities` (après les règles existantes) :

```css
/* Hero background pulse */
@keyframes hero-bg-pulse {
  0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.6; }
  50%       { transform: scale(1.15) translate(3%, -3%); opacity: 1; }
}

.hero-bg-blob {
  animation: hero-bg-pulse 8s ease-in-out infinite;
}
```

### `components/sections/HeroSection.tsx`

Réécriture complète du composant :

1. **Import** : ajouter `Image` from `"next/image"`, `useReducedMotion` from `"framer-motion"`
2. **Supprimer** les 4 appels `useMouseParallax` (remplacés par 1 seul pour l'avatar)
3. **Letter stagger** : `personalInfo.name.split("")` → tableau de `<motion.span>` avec spring + stagger index
4. **Subtitle slide-up** : `motion.p` avec `initial={{ opacity: 0, y: 16 }}` + `animate` après délai 1 s
5. **Word stagger** : `personalInfo.bio.split(" ")` → tableau de `<motion.span>` inline
6. **CTA pop** : `motion.div` wrapping les boutons avec `initial={{ opacity: 0, scale: 0.9 }}` + spring
7. **Avatar** :
   - `<motion.div>` avec `animate={{ y: [0, -14, 0] }}` loop
   - `style={{ x: avatarParallax.x, y: avatarParallax.y }}` pour le parallaxe
   - `<Image src="/images/profile.jpg" alt="Brice GNANAGO" width={320} height={320} priority className="rounded-full object-cover w-56 h-56 md:w-72 md:h-72" />`
   - `ring-2 ring-primary/40` + `.glow-primary-sm` sur le wrapper
8. **Background blob** : `<div aria-hidden className="hero-bg-blob absolute -top-32 right-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none -z-10" />`
9. **Hover glow texte** : `whileHover={{ filter: "drop-shadow(0 0 8px color-mix(in oklch, var(--primary) 70%, transparent))" }}` sur le h1 et le titre

**Layout** :
```
<section> ← min-h-screen, flex items-center
  <div> ← max-w-5xl, flex flex-col md:flex-row gap-12, items-center
    <div> ← flex-1, text block (left on desktop)
      <p> ← "Bienvenue"
      <h1> ← letter stagger
      <p> ← title slide-up
      <p> ← bio word stagger
      <div> ← CTA buttons pop
    </div>
    <div> ← shrink-0, avatar block (right on desktop)
      avatar + glow ring
    </div>
  </div>
  <ArrowDown> ← scroll indicator (bottom center, absolute)
</section>
```

---

## Smoke Test Checklist

- [ ] Charger la page → séquence d'animation complète visible (nom lettre par lettre, puis titre, puis bio, puis boutons, puis avatar)
- [ ] Séquence termine en < 3 s
- [ ] Survoler le nom → glow subtil sur le texte
- [ ] Survoler "Voir mes projets" → scale légèrement
- [ ] Survoler "Me contacter" → scale légèrement
- [ ] Déplacer la souris → avatar suit légèrement en parallaxe
- [ ] Avatar flotte doucement en boucle (animation continue)
- [ ] Fond : halo gradient subtil visible (notamment en dark mode)
- [ ] Mobile 375 px : colonne unique, avatar sous le texte, aucun débordement
- [ ] Tablette md (768 px) : layout split deux colonnes
- [ ] Activer prefers-reduced-motion → plus d'animation de mouvement, simple fade
- [ ] Cliquer "Voir mes projets" → scroll vers section #projets
- [ ] Cliquer "Me contacter" → scroll vers section #contact
- [ ] Flèche bas → scroll vers section suivante (#a-propos)

---

## Non-Regression Check

| Comportement | Attendu |
|--------------|---------|
| Sections suivantes (À propos, Compétences, Projets, Expériences, Contact) | ✅ Non affectées |
| Navigation header / liens d'ancrage | ✅ Inchangés |
| Toggle dark/light mode | ✅ Hero s'adapte automatiquement |
| Données affichées (nom, titre, bio) | ✅ Tirées de `personalInfo`, non modifiées |
| Lighthouse Performance > 90 | ✅ `next/image priority` + animations GPU-only |
