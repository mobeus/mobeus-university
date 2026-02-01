---
description: Add a new experience/template to the platform
---

# Add Glass Workflow

Create a new visual template component.

## Steps

1. **Create the template file:**
   ```
   src/components/templates/[TemplateName].tsx
   ```

2. **Use the skeleton:**
   ```tsx
   import React from 'react';
   import { notifyTele } from '@/utils/acknowledgmentHelpers';
   import { useSound } from '@/hooks/useSound';

   interface Props {
     // Define props
   }

   export const TemplateName: React.FC<Props> = ({ ...props }) => {
     const { playClick } = useSound();

     const handleAction = (actionPhrase: string) => {
       playClick();
       notifyTele(actionPhrase);
     };

     return (
       <div className="glass-medium rounded-2xl p-6">
         {/* Template content */}
       </div>
     );
   };
   ```

3. **Register in `src/data/templateRegistry.ts`**

4. **Add schema to `public/prompts/glass-prompt.md`**

5. **Verify:** `npx tsc --noEmit`

## Rules

- Every clickable calls `notifyTele(actionPhrase)`
- Use centralized CSS classes from `src/index.css`
- Use Smart Image for AI-generated visuals

---

## 🎨 Glass System — Rule of 3

### 15 Glass Classes (3 Levels × 5 Colors)

| Color | Light (16px) | Medium (24px) | Heavy (40px) |
|-------|--------------|---------------|--------------|
| Neutral | `.glass-light` | `.glass-medium` | `.glass-heavy` |
| Dark | `.glass-light-dark` | `.glass-medium-dark` | `.glass-heavy-dark` |
| Primary | `.glass-light-primary` | `.glass-medium-primary` | `.glass-heavy-primary` |
| Secondary | `.glass-light-secondary` | `.glass-medium-secondary` | `.glass-heavy-secondary` |
| Accent | `.glass-light-accent` | `.glass-medium-accent` | `.glass-heavy-accent` |

### Usage Guidelines

| Use Case | Class |
|----------|-------|
| Standard content cards | `glass-medium` |
| Background elements | `glass-light` |
| Modals, overlays | `glass-heavy` |
| Chat panels | `glass-heavy-dark` |
| Highlighted content | `glass-medium-primary` |
| Info boxes | `glass-medium-secondary` |
| Special emphasis | `glass-medium-accent` |

### ⚠️ Legacy Classes (Deprecated)

These still work but should be migrated:
- `glass-subtle` → `glass-light`
- `glass-strong` → `glass-heavy`
- `glass-prominent` → `glass-heavy`
- `glass-template-container` → `glass-medium rounded-2xl p-6`

---

_The Screen Finally Cares_

