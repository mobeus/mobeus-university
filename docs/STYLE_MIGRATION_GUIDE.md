# Template Style Migration Guide
## From Light Mode → Static Template Dark Glass Style

### Color Token Mapping

| Light Mode (Current) | Dark Glass Mode (Target) |
|---------------------|-------------------------|
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
| `text-black` | `text-white` or `text-black` (for primary buttons only) |
| `hover:bg-gray-100` | `hover:bg-white/10` |
| `hover:bg-gray-200` | `hover:bg-white/20` |
| `shadow-black/20` | `shadow-lg shadow-black/30` |

### Card Patterns

**Container Card:**
```diff
- bg-white/90 backdrop-blur-sm border border-black/10 rounded-2xl
+ backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl
```

**Inner Card/Item:**
```diff
- bg-gray-100/80 rounded-lg
+ bg-white/5 border border-white/10 rounded-xl
```

**Highlighted/Active Card:**
```diff
- bg-blue-50 border-blue-200
+ bg-primary/10 border border-primary/20
```

### Typography

**Headings:**
```diff
- text-gray-900 font-bold
+ text-white font-bold
```

**Subheadings:**
```diff
- text-gray-700 font-semibold
+ text-white font-semibold
```

**Body Text:**
```diff
- text-gray-600
+ text-white/70
```

**Muted/Secondary:**
```diff
- text-gray-500
+ text-white/60
```

**Timestamps/Meta:**
```diff
- text-gray-400 text-xs
+ text-white/50 text-xs
```

### Buttons

**Primary CTA:**
```diff
- bg-primary text-white rounded-lg
+ bg-primary text-black font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-105
```

**Secondary/Ghost:**
```diff
- bg-gray-100 text-gray-700 rounded-lg
+ bg-white/10 text-white rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300
```

### Icon Containers

**Large (48x48):**
```diff
- bg-gray-100 rounded-lg
+ w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center
```

**Small (badge-style):**
```diff
- bg-blue-100 p-1.5 rounded
+ p-2 bg-primary/20 rounded-lg
```

**Icon Colors:**
```diff
- text-gray-600
+ text-primary (or text-secondary for success/positive)
```

### Hover States

```diff
- hover:bg-gray-100
+ hover:bg-white/10

- hover:border-gray-300
+ hover:border-primary/30

- hover:shadow-md
+ hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20
```

### Status Colors (keep semantic meaning)

| Status | Light Mode | Dark Glass Mode |
|--------|-----------|-----------------|
| Success | `text-green-600`, `bg-green-100` | `text-secondary`, `bg-secondary/20` |
| Warning | `text-yellow-600`, `bg-yellow-100` | `text-amber-400`, `bg-amber-400/20` |
| Error | `text-red-600`, `bg-red-100` | `text-red-400`, `bg-red-400/20` |
| Info | `text-blue-600`, `bg-blue-100` | `text-primary`, `bg-primary/20` |
| Pending | `text-gray-500`, `bg-gray-100` | `text-white/60`, `bg-white/10` |

### Progress Bars

```diff
- bg-gray-200 (track) + bg-primary (fill)
+ bg-white/20 (track) + bg-primary (fill)
```

### Badges/Tags

```diff
- bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs
+ bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium
```

### Dividers

```diff
- border-gray-200
+ border-white/10
```

### Section Borders

```diff
- border-t border-gray-100
+ border-t border-white/10
```
