# Template Style Migration Guide
## Dark Glass Aesthetic — Mobeus University

> **Catherine v63.0 | Zero Friction Release**
> Last updated: January 18, 2026

### ⚠️ Key Principle: Use Centralized CSS Classes
Templates MUST use **centralized CSS classes** from `src/index.css`, not inline Tailwind.
See classes like `.glass-template-container`, `.glass-card-standard`, `.text-template-title` etc.

---

## Brand Color Palette (8 Colors)

| Color Name | Hex Code | Purpose |
|------------|----------|---------|
| **Mist** | `#F5F5F5` | Text, icons, light elements |
| **Onyx** | `#0D0D0D` | Dark backgrounds |
| **Flamingo** | `#9B5DE5` | Primary accent (purple), CTAs |
| **Wave** | `#003D4F` | Dark teal backgrounds |
| **Turmeric** | `#CC850A` | Secondary buttons, warnings |
| **Jade** | `#5EEAD4` | Success states, teal accents |
| **Sapphire** | `#47A1AD` | Default buttons, links |
| **Amethyst** | `#7C3AED` | Deep purple accents |

---

## Centralized CSS Classes Reference

### Containers
| Class | Use |
|-------|-----|
| `.glass-template-container` | Main template wrapper |
| `.glass-image-container` | Image sections |

### Cards
| Class | Use |
|-------|-----|
| `.glass-card-minimal` | Subtle, low-emphasis cards |
| `.glass-card-standard` | Standard content cards |
| `.glass-card-featured` | High-emphasis, highlighted cards |
| `.glass-card-clickable` | Add for interactive cards |

### Typography
| Class | Use |
|-------|-----|
| `.text-template-title` | Headings (mist/white) |
| `.text-template-subtitle` | Subtitles (flamingo accent) |
| `.text-template-content` | Body text (mist/70) |
| `.text-template-bullet` | List items (mist/80) |

### Buttons
| Class | Use |
|-------|-----|
| `.btn-cta` | Primary CTA (flamingo/purple) |
| `.btn-sapphire` | Default button (sapphire blue) |
| `.btn-turmeric` | Secondary button (turmeric yellow) |
| `.btn-ghost` | Minimal outline button |

### Grids
| Class | Use |
|-------|-----|
| `.template-grid-2` | 2-column grid |
| `.template-grid-3` | 3-column grid |
| `.template-grid-4` | 4-column grid |

### Badges
| Class | Use |
|-------|-----|
| `.template-badge` | Default badge (flamingo) |
| `.template-badge-sapphire` | Sapphire badge |
| `.template-badge-turmeric` | Turmeric badge |
| `.template-badge-mist` | Mist/white badge |

---

## Color Token Mapping (Legacy → Dark Glass)

| Light Mode (Legacy) | Dark Glass Mode (Current) |
|---------------------|---------------------------|
| `bg-white/90` | `bg-white/10` |
| `bg-white` | `bg-white/5` or `bg-white/10` |
| `bg-gray-100` | `bg-white/10` |
| `bg-gray-200` | `bg-white/20` |
| `border-black/10` | `border-white/10` |
| `border-gray-200` | `border-white/10` |
| `border-gray-300` | `border-white/20` |
| `text-gray-900` | `text-white` |
| `text-gray-800` | `text-white/90` |
| `text-gray-700` | `text-white/80` |
| `text-gray-600` | `text-white/70` |
| `text-gray-500` | `text-white/60` |
| `text-gray-400` | `text-white/50` |
| `text-black` | `text-white` |
| `hover:bg-gray-100` | `hover:bg-white/10` |
| `hover:bg-gray-200` | `hover:bg-white/20` |

---

## Status Colors

| Status | Class Pattern |
|--------|---------------|
| Success | `text-jade`, `bg-jade/20` |
| Warning | `text-turmeric`, `bg-turmeric/20` |
| Error | `text-red-400`, `bg-red-400/20` |
| Info | `text-sapphire`, `bg-sapphire/20` |
| Pending | `text-white/60`, `bg-white/10` |

---

## Template Pattern Examples

### ❌ DON'T — Inline Tailwind
```tsx
<div className="bg-mist/10 border border-mist/20 rounded-2xl p-6 backdrop-blur-sm">
  <h3 className="text-gray-900 font-bold">Title</h3>
  <p className="text-gray-600">Content</p>
</div>
```

### ✅ DO — Centralized Classes
```tsx
<div className="glass-template-container">
  <h3 className="text-template-title">Title</h3>
  <p className="text-template-content">Content</p>
</div>
```

---

## Button Patterns

### ❌ DON'T
```tsx
<button className="bg-primary text-white rounded-lg px-4 py-2">
```

### ✅ DO
```tsx
<button className="btn-cta">
```

---

## Adding New Styles

If existing classes don't cover your need:

1. **Add it to `src/index.css`** in the appropriate section
2. **Name it semantically** (e.g., `.glass-card-pricing`)
3. **Document it** in this guide
4. **Use the class name** in templates

---

*Mobeus University | Catherine v63.0 | Zero Friction Release*
