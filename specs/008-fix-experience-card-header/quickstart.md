# Quickstart: Fix Experience Card Header Layout

**Feature**: `008-fix-experience-card-header`
**Date**: 2026-02-28

---

## The Fix (single change)

**File**: `components/shared/ExperienceCard.tsx`

**Before**:
```tsx
<div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
  <CardTitle className="text-lg">{experience.position}</CardTitle>
  <span className="text-sm text-muted-foreground">
    {experience.startDate} — {experience.endDate}
  </span>
</div>
```

**After**:
```tsx
<div className="flex flex-col gap-1">
  <CardTitle className="text-lg">{experience.position}</CardTitle>
  <span className="text-sm text-muted-foreground">
    {experience.startDate} — {experience.endDate}
  </span>
</div>
```

---

## Smoke Test Checklist

After applying the fix, verify in browser:

- [ ] Long title (≥4 words): title renders fully on its own line(s), date appears below — no floating
- [ ] Short title (1-3 words): title and date still stacked cleanly, no layout break
- [ ] Mobile (320px): title then date vertically, no overflow
- [ ] Desktop (1440px): same vertical stack, clean and readable
- [ ] Dark mode: no visual regression
- [ ] Light mode: no visual regression
- [ ] Timeline animations still work (scroll-triggered slide-in)
- [ ] Node pulse animation still works
- [ ] Alternating left/right card layout (feature 007) still works
- [ ] Company + location row (CardDescription) unchanged

---

## Non-Regression Check

These elements must look identical before and after the fix:

| Element | Expected |
|---------|---------|
| Company name + Briefcase icon | Unchanged |
| Location + MapPin icon | Unchanged (or hidden if absent) |
| Description paragraph | Unchanged |
| Responsibilities bullet list | Unchanged |
| Timeline axis line | Unchanged |
| Glowing node (pulse) | Unchanged |
| Card entrance slide animation | Unchanged |
