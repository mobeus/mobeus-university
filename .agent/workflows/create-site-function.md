---
description: Create a new site function that the Runtime Agent (Catherine) can call to operate the Glass
---

# Create Site Function Workflow

Site functions are how the **Runtime Agent (Catherine)** operates the **Glass (React app)**. They are registered in the UIFramework and discovered by the backend on first connection.

## Prerequisites

- Function name should be camelCase (e.g., `flashTele`, `zoomLevel`, `externalCall`)
- Define what parameters the function accepts and returns
- Understand the purpose: What should Catherine be able to do with this function?

## ⚠️ CRITICAL: Backend Discovery

**After completing all steps, the app MUST be loaded and connected to the backend for the new function to be discovered and registered.** The function won't be available to Catherine until this discovery happens.

---

## Steps

### Step 1: Create Bridge in `index.html`

// turbo
1. Open `index.html` and find the `registerUIFrameworkSiteFunctions()` function (around line 130)

2. Create a bridge object for your function (before where `existingRegistry` is defined):

```javascript
const myFunctionBridge = {
  myNewFunction(param1, param2) {
    // Validate parameters
    if (typeof param1 !== "string") return undefined;
    
    // Check if the window function exists and call it
    if (
      typeof window !== "undefined" &&
      typeof window.myNewFunction === "function"
    ) {
      return window.myNewFunction(param1, param2);
    }
    return undefined;
  },
};
```

3. add tool call accepted type as a coment above the function. For example

```javascript
// Output Format Schema:
// {
//   "type": "object",
//   "properties": {
//     "badge": { "type": "string" },
//     "title": { "type": "string" },
//     "subtitle": { "type": "string" },
//     "generativeSubsections": {
//       "type": "array",
//       "items": {
//         "type": "object",
//         "properties": {
//           "id": { "type": "string" },
//           "templateId": { "type": "string" },
//           "title": { "type": "string" },
//           "props": {
//             "type": "object",
//             "additionalProperties": true
//           }
//         },
//         "required": ["id", "templateId", "props"],
//         "additionalProperties": false
//       }
//     }
//   },
//   "required": ["badge", "title", "subtitle", "generativeSubsections"],
//   "additionalProperties": false
// }
```


3. Merge your bridge into the registry:

```javascript
window.UIFrameworkSiteFunctions = {
  ...existingRegistry,
  ...navigationBridge,
  ...flashBridge,
  // ... other bridges
  ...myFunctionBridge,  // Add your new bridge here
};
```

4. (Optional) Expose as global shortcut:

```javascript
if (
  typeof window !== "undefined" &&
  typeof window.myNewFunction !== "function"
) {
  window.myNewFunction = (param1, param2) => 
    myFunctionBridge.myNewFunction(param1, param2);
}
```

---



### Step 2: Implement Function in `Index.tsx` Or anywhere in the application

// turbo
1. Open `src/pages/Index.tsx`

2. Find the `teleNavigation` object (around line 798) inside the main useEffect

3. Add your function implementation:

```typescript
const teleNavigation = {
  navigateToSection: (...navigationData: any[]) => { /* existing */ },
  getCurrentSection: () => activeSection,
  flashTele: () => { /* existing */ },
  
  // Your new function
  myNewFunction: (param1: string, param2?: number) => {
    console.log('[myNewFunction] Called with:', param1, param2);
    
    // Your implementation logic
    // Can access React state, call other functions, etc.
    
    return true;
  },
};
```

---

### Step 3: Clean Up on Unmount

// turbo
1. In the same useEffect in `Index.tsx`, find the cleanup return function

2. Add cleanup for your global:

```typescript
return () => {
  window.removeEventListener("keydown", handleKeyDown);
  window.removeEventListener("closeCurrentSection", handleCloseCurrentSection);
  delete (window as any).teleNavigation;
  delete (window as any).navigateToSection;
  delete (window as any).myNewFunction;  // Add your cleanup
  delete (window as any).navigationHistory;
};
```

---

### Step 4: Verify TypeScript Compiles

// turbo
```bash
npx tsc --noEmit
```

---

### Step 5: Test Backend Discovery

1. Start the dev server:
   ```bash
   npm run dev -- --port 3131
   ```

2. Open the app in browser

3. **Connect to the avatar** (click the connect button)
   - This triggers the backend to read `window.UIFrameworkSiteFunctions`
   - Backend discovers and registers new functions

4. Verify in browser console:
   ```javascript
   window.UIFrameworkSiteFunctions  // Should include your function
   window.myNewFunction             // Should be defined
   ```

5. Test the function manually:
   ```javascript
   window.myNewFunction("test", 42)
   ```

---

## Bridge Pattern Reference

### Simple Function (no params)
```javascript
const flashBridge = {
  flashTele() {
    const nav = typeof window !== "undefined" ? window.teleNavigation : undefined;
    const fn = nav && typeof nav.flashTele === "function" ? nav.flashTele : undefined;
    if (fn) return fn.call(nav);
    return undefined;
  },
};
```

### Function with Validation
```javascript
const volumeBridge = {
  setVolume(level) {
    if (typeof level !== "number") return undefined;

    if (typeof window !== "undefined" && 
        window.teleVolume && 
        typeof window.teleVolume.setVolume === "function") {
      window.teleVolume.setVolume(level);
      return true;
    }
    return undefined;
  },
};
```

### Async Function
```javascript
const externalCallBridge = {
  async externalCall(question) {
    if (typeof question !== "string" || !question.trim()) return undefined;

    try {
      const response = await fetch('/api/endpoint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question.trim() })
      });

      if (!response.ok) return undefined;
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      return undefined;
    }
  },
};
```

---

## Existing Site Functions Reference

| Function | Purpose | Parameters |
|----------|---------|------------|
| `navigateToSection` | Main navigation tool | `(data: NavigationData)` |
| `flashTele` | Flash avatar ring | `()` |
| `setVolume` | Set avatar volume | `(level: number)` |
| `adjustVolume` | Adjust volume | `(delta: number)` |
| `getVolume` | Get current volume | `()` |
| `startWebcam` | Start webcam | `()` |
| `stopWebcam` | Stop webcam | `()` |
| `zoomLevel` | Adjust UI zoom | `(zoom: -1\|0\|1)` |
| `externalCall` | External API call | `(question: string)` |
| `dynamicDataLoader` | Load dynamic JSON | `(payload: string)` |
| `auther` | Send auth code | `(name: string)` |
| `checker` | Verify auth code | `(code: string)` |
| `getCookieValue` | Get auth cookie | `()` |

---

## ⚠️ Common Mistakes

### 1. Forgot to Connect After Deployment
```
❌ Added function but it's not available to Catherine
✅ Must load app and connect to trigger backend discovery
```

### 2. Bridge Returns Wrong Type
```javascript
// ❌ Wrong - returns nothing
if (fn) fn.call(nav);

// ✅ Correct - returns result
if (fn) return fn.call(nav);
return undefined;
```

### 3. No Validation
```javascript
// ❌ Wrong - no type checking
myFunction(param) {
  window.myFunction(param);
}

// ✅ Correct - validate before calling
myFunction(param) {
  if (typeof param !== "string") return undefined;
  if (typeof window.myFunction === "function") {
    return window.myFunction(param);
  }
  return undefined;
}
```

### 4. Missing Cleanup
```javascript
// ❌ Memory leak - global persists after unmount
// ✅ Add to cleanup: delete (window as any).myFunction;
```

---

## Verification Checklist

After creating a site function, verify ALL boxes:

```
□ Bridge added to index.html
□ Bridge merged into UIFrameworkSiteFunctions
□ TypeScript types in vite-env.d.ts
□ NavigationAPI interface updated
□ Function implemented in Index.tsx teleNavigation object
□ Cleanup added in useEffect return
□ TypeScript compiles: npx tsc --noEmit
□ App loaded and connected (backend discovery)
□ Function callable from console: window.myFunction()
□ Catherine can invoke function during conversation
```