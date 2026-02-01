---
description: Create a new site function that the Runtime Agent (Catherine) can call to operate the Glass
---

# Register Function Workflow

Register a new function that your tele can call to control the Glass.

## Existing Site Functions

| Function | Purpose |
|----------|---------|
| `navigateToSection` | Main tool — renders templates |
| `flashTele` | Flash avatar ring |
| `scrollPage` | Scroll page |
| `setVolume` | Avatar volume |

## Steps to Add New Function

1. **Add bridge in `index.html`:**
   ```javascript
   const myFunctionBridge = {
     myNewFunction(param) {
       if (typeof window.myNewFunction === 'function') {
         return window.myNewFunction(param);
       }
       return undefined;
     }
   };
   ```

2. **Add TypeScript types in `vite-env.d.ts`**

3. **Add to NavigationAPI interface in `uiFrameworkRegistration.ts`**

4. **Implement in `Index.tsx`**

5. **Load the app** — Backend discovers new functions on first connection

---

_The Screen Finally Cares_