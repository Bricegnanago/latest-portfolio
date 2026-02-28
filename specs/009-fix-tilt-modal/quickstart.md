# Quickstart: Fix Card Tilt Effect When Modal Is Open

**Feature**: `009-fix-tilt-modal`
**Date**: 2026-02-28

---

## Changes Summary

### `components/shared/TiltCard.tsx`

1. Add `useEffect` to React import
2. Add `disabled?: boolean` to `TiltCardProps`
3. Add `disabled` to the destructured props
4. Add `useEffect` that calls `onMouseLeave()` when `disabled` becomes `true`
5. Conditionally remove handlers when disabled

**Before**:
```tsx
interface TiltCardProps {
  children: React.ReactNode
  className?: string
  tiltOptions?: UseTiltOptions
}

export function TiltCard({ children, className, tiltOptions }: TiltCardProps) {
  // ...
  return (
    <motion.div
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn("relative", className)}
    >
```

**After**:
```tsx
import { useEffect, useMemo } from "react"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  tiltOptions?: UseTiltOptions
  disabled?: boolean
}

export function TiltCard({ children, className, tiltOptions, disabled }: TiltCardProps) {
  // ...
  useEffect(() => {
    if (disabled) {
      onMouseLeave()
    }
  }, [disabled, onMouseLeave])

  return (
    <motion.div
      ref={ref}
      style={style}
      onMouseMove={disabled ? undefined : onMouseMove}
      onMouseLeave={disabled ? undefined : onMouseLeave}
      className={cn("relative", className)}
    >
```

### `components/shared/ProjectCard.tsx`

**Before**:
```tsx
<TiltCard className="h-full">
```

**After**:
```tsx
<TiltCard className="h-full" disabled={isVideoOpen || isGalleryOpen}>
```

---

## Smoke Test Checklist

- [ ] Open image gallery modal → move mouse freely inside modal → project card does NOT tilt
- [ ] Open video modal → move mouse freely inside modal → project card does NOT tilt
- [ ] Open any modal → card is flat (neutral position) immediately on open
- [ ] Close modal → card returns to neutral position (not frozen in tilted state)
- [ ] Close modal → hover over card → tilt effect works normally again
- [ ] Open and close modal 3x rapidly → tilt still resets correctly each time
- [ ] Cards WITHOUT modals open → tilt effect works normally (no regression)
- [ ] Mobile: no change — tilt already disabled on touch devices

---

## Non-Regression Check

| Behaviour | Expected |
|-----------|---------|
| Tilt on cards with no modal open | ✅ Unchanged |
| Glare effect on hover | ✅ Unchanged |
| Gallery navigation (prev/next) | ✅ Unchanged |
| Video playback in modal | ✅ Unchanged |
| Modal open/close animations | ✅ Unchanged |
| `prefers-reduced-motion` still disables tilt | ✅ Unchanged |
