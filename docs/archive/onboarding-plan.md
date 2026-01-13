# Static Onboarding Flow Implementation Plan

**Author:** Gemini Agent  
**Date:** January 9, 2026  
**Status:** 🔴 PENDING REVIEW - DO NOT IMPLEMENT YET  
**Last Updated:** January 9, 2026 @ 10:17 AM

---

## 1. Executive Summary

This plan introduces a **Static Section Loader** system to handle a deterministic, multi-step onboarding flow that precedes the current AI-powered dynamic experience. The static flow provides a controlled, predictable user journey through **6 configurable steps** before transitioning to the dynamic welcome experience.

### Key Principles

1. **Flexible Step Count** — Any number of static templates can be strung together in a defined flow order
2. **Visual Continuity** — Static templates render in the **exact same space** as the Dynamic Section Loader, ensuring no visual "jump" on transition
3. **Always Onboard** — Users go through onboarding every time (always start from Home Page, even returning users)
4. **Seamless Transition** — After resume upload (or skip), an animation reveals the existing welcome experience
5. **Consistent Background** — All static templates use `background-empty.png` (teal gradient) as page background
6. **Logo Always Visible** — Logo remains in top-left corner for both static and dynamic experiences
7. **No Style Differences** — Static and dynamic templates use identical glass card styles, colors, icons

---

## 2. Clarified Requirements

| Question | Answer |
|----------|--------|
| Home page sidebar | **No sidebar** — full-width split layout |
| "Watch How It Works" button | **Non-functional** — decorative preview of what the experience looks like |
| Back navigation | **Basic back/forth** — navigate between steps as needed |
| Skip visibility (Basic Info & Resume) | **More obvious** — not tiny muted link, use "Skip for now" text |
| Skip on Resume step | **Triggers transition animation** (same as completing) |
| Data persistence mid-flow | **None** — always start from Home Page on refresh/return |

---

## 3. Onboarding Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         STATIC ONBOARDING FLOW                              │
│   Background: background-empty.png | Logo: Always visible top-left         │
│   No Avatar | No Navigation Menu | No Teleglass Icons                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐ │
│   │ STEP 1   │──▶│ STEP 2   │──▶│ STEP 3   │──▶│ STEP 4   │──▶│ STEP 5   │ │
│   │ Home     │   │ Login ID │   │ Phone +  │   │ Basic    │   │ Upload   │ │
│   │ Page     │   │ Verify   │   │ OTP      │   │ Info     │   │ Resume   │ │
│   │          │   │          │   │          │   │          │   │          │ │
│   │ NO       │   │ HAS      │   │ HAS      │   │ HAS      │   │ HAS      │ │
│   │ SIDEBAR  │   │ SIDEBAR  │   │ SIDEBAR  │   │ SIDEBAR  │   │ SIDEBAR  │ │
│   │          │   │          │   │          │   │ +SKIP    │   │ +SKIP    │ │
│   └──────────┘   └──────────┘   └──────────┘   └──────────┘   └──────────┘ │
│                                                       │              │      │
│                                                       │   Skip ──────┼──────┤
│                                                       │              │      │
│                                                       └──────────────┼──────┤
│                                                                      ▼      │
└──────────────────────────────────────────────────────────────────────│──────┘
                                                                       │
                                                                       ▼  
┌─────────────────────────────────────────────────────────────────────────────┐
│                         TRANSITION ANIMATION                                │
│   Resume uploaded OR skipped → Animation → Welcome experience loads        │
├─────────────────────────────────────────────────────────────────────────────┤
│   Background switches: empty → hero                                        │
│   Navigation menu fades in                                                  │
│   Teleglass icons fade in                                                   │
│   Avatar auto-connects                                                      │
│   Welcome carousel appears                                                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Static Template Specifications

### 4.1 Step 1: StaticHomePage

**Layout:** Full-width split layout — **NO SIDEBAR**

| Element | Content |
|---------|---------|
| **Badge** | "Backed by PIF" (credibility badge) |
| **Headline** | "Your Skills. Your Future. Your First Tech Career." |
| **Subtext** | Saudi Arabia's premier talent platform description |
| **Primary CTA** | "Start Your Journey →" → `onNext()` |
| **Secondary CTA** | "Watch How It Works ▶" → **Non-functional** (decorative preview) |
| **Right Card** | "Your Journey Starts Here" — preview of Skills Assessment, Skills Twin, Job Opportunities |
| **Skip** | Subtle "Skip for now" at bottom |

---

### 4.2 Step 2: StaticLoginIDVerify

**Layout:** Sidebar + Form Card

| Element | Content |
|---------|---------|
| **Badge** | "🔒 Secure Verification" |
| **Title** | "Verify Your Login ID" |
| **Subtitle** | "We need to confirm your identity to create your secure account." |
| **Input** | Login ID Number (10-digit) |
| **Info Box** | Privacy info |
| **CTA** | "Continue to Phone Verification →" |
| **Back** | ← Goes to Home Page |
| **Skip** | Subtle "Skip for now" |

**Mock:** Accept any 10-digit number

---

### 4.3 Step 3a: StaticPhoneEntry

**Layout:** Sidebar + Form Card

| Element | Content |
|---------|---------|
| **Badge** | "📱 Phone Verification" |
| **Title** | "Enter Your Phone Number" |
| **Input** | Country code dropdown (+966) + Phone field |
| **CTA** | "Send Verification Code →" |
| **Back** | "← Back to ID Verification" |
| **Skip** | Subtle "Skip for now" |

**Mock:** Accept any valid phone format

---

### 4.4 Step 3b: StaticOTPVerify

**Layout:** Sidebar + Form Card

| Element | Content |
|---------|---------|
| **Badge** | "📱 Phone Verification" |
| **Title** | "Enter Verification Code" |
| **Subtitle** | "We've sent a 6-digit code to [phone number]" |
| **Input** | 6 individual OTP boxes |
| **CTA** | "Verify Phone Number →" |
| **Resend** | "Resend Code" (just shows toast) |
| **Change** | "Change Phone Number" → back to phone entry |
| **Skip** | Subtle "Skip for now" |

**Mock:** Accept any 6-digit code, no expiry

---

### 4.5 Step 4: StaticBasicInfo

**Layout:** Sidebar + Form Card

| Element | Content |
|---------|---------|
| **Badge** | "👤 Basic Information" |
| **Title** | "Tell Us About Yourself" |
| **Fields** | First Name, Last Name, Email, DOB, Gender, City |
| **CTA** | "Continue to Upload CV →" |
| **Back** | "← Back to Phone Verification" |
| **Skip** | **More visible** — "Skip for now" (triggers next step) |

**Mock:** Basic validation

---

### 4.6 Step 5: StaticResumeUpload

**Layout:** Sidebar + Form Card

| Element | Content |
|---------|---------|
| **Badge** | "📄 Upload CV" |
| **Title** | "Upload Your Resume" |
| **Upload Zone** | Drag-drop area, "Browse Files" button |
| **Formats** | PDF, DOC, DOCX (Max 5MB) |
| **CTA** | "Complete Setup →" → triggers transition |
| **Back** | "← Back to Basic Information" |
| **Skip** | **More visible** — "Skip for now" → **triggers transition animation** |

**Mock:** Accept any file with valid extension

---

### 4.7 Transition Animation

| Phase | Time | What Happens |
|-------|------|--------------|
| Start | 0ms | Overlay fades in |
| | 0-500ms | "Building your Skills Twin..." |
| | 500-1000ms | Background: empty → hero |
| | 1000-1500ms | Navigation fades in |
| | 1500-2000ms | Teleglass icons fade in |
| | 2000-2500ms | Avatar connection starts |
| | 2500-3000ms | Overlay fades out |
| Complete | 3000ms | Welcome carousel visible |

---

## 5. Navigation Logic

### 5.1 Back/Forth Between Steps

```
Home ←→ Login ID ←→ Phone Entry ←→ OTP ←→ Basic Info ←→ Resume
                                              ↓             ↓
                                           (skip)       (skip or complete)
                                              ↓             ↓
                                              └──────→ Transition Animation
```

- All steps support back navigation to previous step
- Basic Info + Resume have visible "Skip for now" option
- Skip on Basic Info → goes to Resume step
- Skip on Resume → triggers transition animation
- Complete Resume → triggers transition animation

### 5.2 No Data Persistence

- **On refresh:** Start from Home Page
- **On return visit:** Start from Home Page  
- **Track:** `has_onboarded_before = true` in localStorage (for future use)
- **Behavior:** Always show full onboarding regardless

---

## 6. File Structure

### 6.1 New Files to Create

```
src/
├── components/
│   ├── StaticSectionLoader.tsx          # Static section renderer
│   ├── StaticStepSidebar.tsx            # Left sidebar with progress
│   └── static-templates/                 # Static template folder
│       ├── index.ts                      
│       ├── StaticHomePage.tsx            # NO sidebar
│       ├── StaticLoginIDVerify.tsx       # HAS sidebar
│       ├── StaticPhoneEntry.tsx          # HAS sidebar
│       ├── StaticOTPVerify.tsx           # HAS sidebar
│       ├── StaticBasicInfo.tsx           # HAS sidebar + visible skip
│       ├── StaticResumeUpload.tsx        # HAS sidebar + visible skip
│       └── StaticTransitionAnimation.tsx 
│
├── data/
│   ├── staticTemplateRegistry.ts         
│   └── onboardingFlow.ts                 
│
├── types/
│   └── onboarding.ts                     
│
└── hooks/
    └── useOnboardingFlow.ts              
```

### 6.2 Files to Modify

```
src/
├── pages/
│   └── Index.tsx                         # Add onboarding flow
│
├── components/
│   ├── Navigation.tsx                    # Hide during static
│   ├── TeleglassSection.tsx              # Hide during static
│   └── BackgroundLayer.tsx               # Static mode uses empty background
```

---

## 7. Flow Configuration

```typescript
// src/data/onboardingFlow.ts

export const ONBOARDING_FLOW: OnboardingStepConfig[] = [
  { id: 'home', templateId: 'StaticHomePage', showSidebar: false },
  { id: 'login-id', templateId: 'StaticLoginIDVerify', showSidebar: true },
  { id: 'phone', templateId: 'StaticPhoneEntry', showSidebar: true },
  { id: 'otp', templateId: 'StaticOTPVerify', showSidebar: true },
  { id: 'basic-info', templateId: 'StaticBasicInfo', showSidebar: true, hasVisibleSkip: true },
  { id: 'resume', templateId: 'StaticResumeUpload', showSidebar: true, hasVisibleSkip: true, skipTriggersTransition: true },
];
```

---

## 8. Style Consistency Checklist

**Static templates MUST use identical styles as dynamic templates:**

- [ ] Same glass card styles (`bg-white/10`, `backdrop-blur-md`, `border-white/20`)
- [ ] Same color palette (teals, whites, accent colors)
- [ ] Same typography (font families, sizes, weights)
- [ ] Same Lucide icons
- [ ] Same button styles (primary, secondary)
- [ ] Same input field styles
- [ ] Same spacing/padding (`px-4 md:px-8`, `max-w-6xl`)
- [ ] Same hover/focus states
- [ ] Same animations/transitions

---

## 9. Implementation Phases

### Phase 1: Foundation (Day 1)
- [ ] Audit app readiness (background assets, component structure)
- [ ] Create `StaticSectionLoader.tsx`
- [ ] Create `StaticStepSidebar.tsx`
- [ ] Create folder structure
- [ ] Modify `BackgroundLayer.tsx` for static mode

### Phase 2: Static Templates (Day 1-2)
- [ ] Build `StaticHomePage.tsx` (no sidebar)
- [ ] Build `StaticLoginIDVerify.tsx`
- [ ] Build `StaticPhoneEntry.tsx`
- [ ] Build `StaticOTPVerify.tsx`
- [ ] Build `StaticBasicInfo.tsx` (visible skip)
- [ ] Build `StaticResumeUpload.tsx` (visible skip → transition)
- [ ] Build `StaticTransitionAnimation.tsx`

### Phase 3: Integration (Day 2)
- [ ] Modify `Navigation.tsx` (hide during static)
- [ ] Modify `TeleglassSection.tsx` (hide during static)
- [ ] Modify `Index.tsx` for onboarding flow
- [ ] Implement back/forth navigation

### Phase 4: Polish (Day 2-3)
- [ ] Step-to-step transitions
- [ ] Transition animation sequence
- [ ] Avatar auto-connect
- [ ] Full flow testing

---

## 10. Decisions Log

| Item | Decision |
|------|----------|
| Home page layout | Full-width, no sidebar |
| "Watch How It Works" | Non-functional, decorative |
| Back navigation | Full back/forth between all steps |
| Skip visibility | Obvious on Basic Info + Resume ("Skip for now") |
| Skip on Resume | Triggers transition animation |
| Data persistence | None — always start from Home |
| Style differences | None — identical to dynamic templates |
| OTP expiry | None |
| Validation errors | None |
| Analytics | None |

---

## 11. Pre-Implementation Audit Required

Before implementation, verify the app has:

- [ ] `src/assets/background-empty.png` exists and works
- [ ] `src/assets/background-hero.png` exists and works
- [ ] `BackgroundLayer.tsx` can be modified for mode switching
- [ ] `Navigation.tsx` can be conditionally hidden
- [ ] `TeleglassSection.tsx` can be conditionally hidden
- [ ] `DynamicSectionLoader.tsx` container styles are documented
- [ ] Glass card styles are reusable/extractable
- [ ] Logo component is independent of navigation

---

---

## 12. Pre-Implementation Audit Results

**Audit Date:** January 9, 2026 @ 10:17 AM  
**Status:** ✅ **READY FOR IMPLEMENTATION**

### 12.1 Background Assets

| Asset | Status | Location |
|-------|--------|----------|
| `background-empty.png` | ✅ Exists (9.7 KB) | `/src/assets/background-empty.png` |
| `background-hero.png` | ✅ Exists (2.6 MB) | `/src/assets/background-hero.png` |
| Both exported from index | ✅ Yes | `/src/assets/index.ts` |

**Visual Confirmation:**
- `background-empty.png`: Teal gradient (left-bright to right-dark), no avatar
- `background-hero.png`: Same teal gradient with avatar figure in business suit (right side)

### 12.2 BackgroundLayer Component

| Check | Status | Notes |
|-------|--------|-------|
| Component exists | ✅ Yes | `/src/components/BackgroundLayer.tsx` |
| Accepts `image` prop | ✅ Yes | `{ image: string }` interface |
| Can switch backgrounds | ✅ Yes | Just pass different image URL |
| Current logic for avatar state | ⚠️ Needs modification | Currently switches based on `avatarState`, will need onboarding state |

**Current Background Logic (Index.tsx lines 1254-1264):**
```typescript
let imageBackground = backgroundHero;
if (showWelcomeVideo) {
  if (avatarState !== "off") {
    imageBackground = backgroundEmpty;
  }
} else {
  if (avatarState === "connected") {
    imageBackground = backgroundEmpty;
  }
}
```

**For Static Onboarding:** Need to add condition like:
```typescript
if (!isOnboardingComplete) {
  imageBackground = backgroundEmpty;  // Always empty during static flow
}
```

### 12.3 Navigation Component

| Check | Status | Notes |
|-------|--------|-------|
| Component exists | ✅ Yes | `/src/components/Navigation.tsx` |
| Logo is in Navigation | ✅ Yes | Lines 117-123 |
| Logo uses `trainco-logo.png` | ✅ Yes | Imported at line 4 |
| Can be conditionally hidden | ⚠️ Needs modification | Currently always renders |

**Logo Implementation (Lines 110-123):**
- Logo is a `<button>` that navigates to welcome section
- Located inside `<Navigation>` component
- **Action Required:** Extract logo to standalone component OR conditionally render Navigation without hiding logo

**Recommended Approach:**
```tsx
// In Index.tsx, wrap Navigation but always show logo:
{isOnboardingComplete && <Navigation ... />}
{!isOnboardingComplete && <StandaloneLogoOnly />}  // OR extract logo
```

### 12.4 TeleglassSection Component

| Check | Status | Notes |
|-------|--------|-------|
| Component exists | ✅ Yes | `/src/components/TeleglassSection.tsx` |
| Can be conditionally hidden | ✅ Easy | Just wrap in conditional render |
| Contains Teleglass icons | ✅ Yes | Avatar button, chat glass, etc. |

**Current Render (Index.tsx lines 1298-1305):**
```tsx
<TeleglassSection
  onChatGlassChange={setIsChatGlassOpen}
  avatarState={avatarState}
  ...
/>
```

**For Static Onboarding:** Simply wrap:
```tsx
{isOnboardingComplete && <TeleglassSection ... />}
```

### 12.5 DynamicSectionLoader Container Styles

| Check | Status | Notes |
|-------|--------|-------|
| Container structure identified | ✅ Yes | `max-w-6xl mx-auto` |
| Outer padding | ✅ Yes | `px-4 md:px-8` |
| Render location | ✅ Yes | Inside `min-h-screen squeeze-target` div |

**Container Hierarchy (Index.tsx):**
```tsx
<div className="min-h-screen squeeze-target overflow-auto">
  <div className="no-lightboard flex justify-between align-center container mx-auto max-w-[1400px] px-16 md:px-24 lg:px-32">
    <Navigation ... />
    <TeleglassSection ... />
  </div>
  <div className="min-h-screen squeeze-target" style={{ zIndex: 10 }}>
    <ErrorBoundary>{renderSection()}</ErrorBoundary>
  </div>
</div>
```

**StaticSectionLoader Must Match:** Render inside same position as `renderSection()`.

### 12.6 Glass Card Styles (Reference)

From `SkillsProfile.tsx` line 74:
```tsx
className="backdrop-blur-md bg-white/10 border border-black/20 rounded-3xl overflow-hidden p-6 md:p-8 space-y-6"
```

**Patterns to Reuse:**
- Outer card: `backdrop-blur-md bg-white/10 border border-black/20 rounded-3xl`
- Inner cards: `bg-white/5 border border-black/10 rounded-xl`
- Text colors: `text-white`, `text-white/60`, `text-white/40`
- Padding: `p-6 md:p-8`
- Spacing: `space-y-6`

### 12.7 Logo Asset

| Check | Status | Notes |
|-------|--------|-------|
| Logo file exists | ✅ Yes | `/src/assets/trainco-logo.png` (32 KB) |
| Used in Navigation | ✅ Yes | Imported and rendered |
| Height style | ✅ Yes | `h-[27px] w-auto` |

### 12.8 Summary

| Category | Status |
|----------|--------|
| Background assets | ✅ Ready |
| Background switching | ⚠️ Minor modification needed |
| Navigation visibility | ⚠️ Logo extraction recommended |
| Teleglass visibility | ✅ Easy wrap |
| Container styles | ✅ Documented |
| Glass card styles | ✅ Documented |
| Logo component | ⚠️ Embedded in Navigation |

### 12.9 Pre-Implementation Tasks

Before starting Phase 1, these small prep tasks should be done:

1. **Extract Logo Component** (Optional but recommended)
   - Create `src/components/Logo.tsx` with just the trainco logo
   - Import into both Navigation (for dynamic) and directly in Index (for static)
   
   OR
   
   - Keep logo in Navigation but duplicate logo rendering in Index.tsx for static flow

2. **Add Onboarding State to Index.tsx**
   ```typescript
   const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
   const [currentOnboardingStep, setCurrentOnboardingStep] = useState(0);
   ```

3. **Modify Background Logic**
   - Add onboarding check before avatar state check

---

**Next Steps:**
1. ✅ Review this updated plan
2. ✅ Pre-implementation audit complete
3. ⏳ Approve or request changes
4. ⏳ Begin implementation (Phase 1)
5. ⏳ Push to git (only after explicit approval)
