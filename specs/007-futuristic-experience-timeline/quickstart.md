# Quickstart: Futuristic Animated Experience Timeline

**Feature**: `007-futuristic-experience-timeline`
**Date**: 2026-02-28

---

## Implementation Order

1. **globals.css** — Add glow utilities (no component can render glow before the class exists)
2. **ExperienceSection.tsx** — Add timeline container + axis line (structural change)
3. **ExperienceCard.tsx** — Alternating layout + node + animations (visual change)

---

## Smoke Test Checklist

After implementation, manually verify each item in the browser:

### Desktop (≥ 768px)

- [ ] Vertical glowing axis line is visible and centered
- [ ] Experience 1 (index 0) card is on the LEFT of the axis
- [ ] Experience 2 (index 1) card is on the RIGHT of the axis
- [ ] Experience 3 (index 2) card is on the LEFT of the axis
- [ ] Each card has a glowing node on the axis at its vertical center
- [ ] Node has a pulsing outer ring animation
- [ ] Scrolling down triggers cards to slide in from their respective sides
- [ ] Animation fires exactly once (scroll back up → scroll down again → no re-animation)
- [ ] All content is readable (position, company, dates, description, responsibilities)

### Mobile (< 768px)

- [ ] Axis line is on the LEFT edge (not centered)
- [ ] All cards are stacked on the RIGHT of the axis line
- [ ] No horizontal overflow or content clipping
- [ ] Works at 320px viewport width

### Dark Mode

- [ ] Axis line and node are visible with glow effect
- [ ] Text remains readable (no glow interference with text)
- [ ] Toggle theme → timeline looks correct in both modes

### Light Mode

- [ ] Axis line and node are visible (slightly less intense glow)
- [ ] Text remains readable

### Accessibility

- [ ] Enable "Reduce Motion" in OS settings → cards appear immediately (no slide animation)
- [ ] Enable "Reduce Motion" → node is static (no pulsing)
- [ ] All content is still present and readable with motion disabled

---

## Key Code Patterns

### globals.css — Glow utilities

```css
@layer utilities {
  .glow-primary {
    box-shadow:
      0 0 12px 2px oklch(0.55 0.2 260 / 0.6),
      0 0 24px 4px oklch(0.55 0.2 260 / 0.3);
  }
  .glow-primary-sm {
    box-shadow: 0 0 6px 1px oklch(0.55 0.2 260 / 0.5);
  }
  .timeline-axis {
    background: linear-gradient(
      to bottom,
      transparent,
      oklch(0.55 0.2 260 / 0.8) 10%,
      oklch(0.55 0.2 260) 50%,
      oklch(0.55 0.2 260 / 0.8) 90%,
      transparent
    );
    box-shadow: 0 0 8px 2px oklch(0.55 0.2 260 / 0.4);
  }
}
```

### ExperienceSection.tsx — Timeline container

```tsx
export function ExperienceSection() {
  return (
    <section id="experiences" className="py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionTitle title="Expériences" subtitle="Mon parcours professionnel" />
        <div className="relative">
          {/* Vertical axis line */}
          <div className="timeline-axis absolute left-4 top-0 bottom-0 w-0.5 md:left-1/2 md:-translate-x-1/2" />
          <div className="space-y-12 py-4">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.company}
                experience={experience}
                index={index}
                total={experiences.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

### ExperienceCard.tsx — Node + alternating layout

```tsx
export function ExperienceCard({ experience, index, total }: ExperienceCardProps) {
  const reducedMotion = useReducedMotion()
  const isLeft = index % 2 === 0

  return (
    <div className={cn(
      "relative flex items-start gap-4",
      // Desktop: alternate left/right; Mobile: always right of axis
      "pl-10 md:pl-0",
      isLeft ? "md:flex-row-reverse md:pr-[calc(50%+1.5rem)]" : "md:pl-[calc(50%+1.5rem)]"
    )}>
      {/* Node on the axis */}
      <div className="absolute left-4 top-6 -translate-x-1/2 md:left-1/2">
        <div className="relative flex items-center justify-center h-6 w-6">
          {/* Pulsing ring */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/30"
            animate={reducedMotion ? {} : { scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
          />
          {/* Solid core */}
          <div className="relative z-10 h-3 w-3 rounded-full bg-primary glow-primary-sm" />
        </div>
      </div>

      {/* Content card */}
      <motion.div
        className="w-full"
        initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.15 }}
      >
        <Card>
          {/* ...existing CardHeader and CardContent... */}
        </Card>
      </motion.div>
    </div>
  )
}
```

---

## Pitfalls to Avoid

1. **`z-index` on the axis**: The axis `<div>` is `absolute` — give it `z-0` and cards `z-10` to ensure cards render above
2. **Node centering**: The node wrapper needs `absolute left-4 top-6 -translate-x-1/2` on mobile and `md:left-1/2` on desktop — the `top-6` aligns it with the card header visually
3. **Scroll re-trigger**: Always use `viewport={{ once: true }}` — without it, the animation re-fires on every scroll pass
4. **Light mode glow**: The OKLCH color is the same hue — light mode renders it at lower perceived brightness naturally. No extra class needed
5. **`total` prop**: Passed to `ExperienceCard` for potential "last node" styling (e.g., no connecting line below the last entry) — use `index === total - 1` to skip bottom connector if added
