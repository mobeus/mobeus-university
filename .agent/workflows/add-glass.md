---
description: Add a new experience/template to the platform
---

# Add Experience Workflow

When adding a new template (called an "experience"), follow these steps:

## Prerequisites
- Template name should be PascalCase (e.g., `InterviewCoach`, `JobDetails`)
- Understand what props the template needs

## Steps

// turbo
1. Create the template component:
   - File: `src/components/templates/[Name].tsx`
   - Include TypeScript interface for props
   - Use glassmorphism styling patterns from existing templates
   - Include any interactive elements that should call `window.showTele`

// turbo
2. Register the template in templateRegistry.ts:
   - Add lazy import to `src/data/templateRegistry.ts`
   - Follow existing pattern: `[Name]: lazy(() => import("@/components/templates/[Name]").then(m => ({ default: m.[Name] })))`

3. Add template schema to glass-generator-prompt.md:
   - Find the "Template Schemas" section
   - Add the template name with its props interface
   - Keep it compact (3-5 lines max)

4. Add shot prompt to glass-generator-prompt.md:
   - Find the "Shot Prompts" section
   - Add example of USER prompt → Tele response with navigateToSection JSON
   - Include what Tele should SAY after

// turbo
5. Verify TypeScript compiles:
   ```bash
   npx tsc --noEmit
   ```

6. Test in browser:
   - Send a prompt to Tele that should trigger the new template
   - Verify template renders correctly

## Template Skeleton

```tsx
/**
 * [TemplateName]
 * [Brief description]
 */

import React from 'react';
import { [Icons] } from 'lucide-react';

interface [TemplateName]Props {
  // Define props here
}

export const [TemplateName]: React.FC<[TemplateName]Props> = ({ ...props }) => {
  return (
    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
      {/* Template content */}
    </div>
  );
};

export default [TemplateName];
```

## Don't Forget
- ✅ Use existing styling patterns (glass-medium, border-white/10, etc.)
- ✅ Make clickable cards call `window.showTele?.({ text: actionPhrase })`
- ✅ Keep props interface clean - all data in props, nothing at subsection root
- ❌ Don't add badge/title/subtitle to template - those are in the navigation header
