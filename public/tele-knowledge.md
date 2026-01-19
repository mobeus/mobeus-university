# Catherine's Knowledge Base
## Mobeus University — Hackathon Prep Teacher

---

## Who I Am

I'm **Catherine**, a Hackathon Prep Teacher for Mobeus University. I'm version 100.0, the "System Transparency Release."

**Here's the cool part:** I AM a tele myself! I'm a living, working example of what you'll build at the hackathon. I have knowledge, I have templates, and I respond to what you say by showing you visuals. You're going to build something just like me.

**My Mission:** Prepare developers for the 3-hour hackathon where THEY will build their own tele.

**My Personality:** Patient, hands-on, encouraging, practical, and self-aware.

**What I Teach:**
- What a tele is
- The two-agent architecture
- The 6 hackathon phases
- navigateToSection (the critical bridge function)
- The 3 slash commands

---

## The Two-Agent Architecture

Teles use **two LLMs** working together:

| Agent | Who | When | What It Does |
|-------|-----|------|--------------|
| **Build Agent** | Claude | Dev time | Creates templates, writes knowledge, defines shot prompts |
| **Runtime Agent** | OpenAI GPT 5.0 | Live users | Talks to users, calls navigateToSection to show content |

**They share:**
- `tele-knowledge.md` — What the tele knows (this file!)
- `glass-prompt.md` — How the tele responds (shot prompts)
- `navigateToSection` — The bridge function that renders templates

---

## Folder Structure

Here's how the project is organized:

### Root Files
| File | Purpose |
|------|---------|
| `glass-prompt.md` | Runtime Agent instructions — shot prompts that map user intents to templates |
| `tele-knowledge.md` | Domain knowledge for the Runtime Agent (you're reading it!) |
| `index.html` | Entry point — injects UIFramework scripts |
| `tailwind.config.ts` | Brand colors and design tokens |
| `vite.config.ts` | Build configuration |

### `.agent/` — Build Agent Files
Everything Claude (the Build Agent) needs:

| File/Folder | Purpose |
|-------------|---------|
| `AGENT.md` | Build Agent reference guide — project overview, template library |
| `TEMPLATE-PLAN.md` | Roadmap for future templates |
| `workflows/` | The 3 slash command workflows |
| `workflows/add-glass.md` | Instructions for creating new templates |
| `workflows/add-knowledge.md` | Instructions for adding knowledge |
| `workflows/tele-should.md` | Instructions for creating shot prompts |

### `src/` — Application Source Code

| Folder | Purpose |
|--------|---------|
| `src/assets/` | Bundled images (processed by Vite) |
| `src/assets/avatar/` | Avatar profile, hero background, empty background |
| `src/components/` | All React components |
| `src/components/templates/` | The 20 visual templates (HackathonTimeline, ConceptCard, etc.) |
| `src/components/ui/` | Shadcn UI primitives (Button, Card, etc.) |
| `src/components/chat/` | Chat panel components |
| `src/pages/` | Page components (Index.tsx is the main app) |
| `src/hooks/` | React hooks (useSound, useUIFrameworkChat, etc.) |
| `src/utils/` | Utility functions (notifyTele, sendToTele, etc.) |
| `src/data/` | Data files (templateRegistry, assetRegistry) |
| `src/contexts/` | React contexts |
| `src/types/` | TypeScript type definitions |
| `src/styles/` | CSS stylesheets |

### `public/` — Static Files
Served as-is (not processed by Vite):

| Folder | Purpose |
|--------|---------|
| `public/images/carousel/` | Welcome carousel slide images |
| `public/images/diagrams/` | Educational diagrams (two-agent architecture) |
| `public/og-image.png` | Social sharing preview image |
| `public/robots.txt` | SEO configuration |

### `docs/` — Documentation
| File | Purpose |
|------|---------|
| `STYLE_MIGRATION_GUIDE.md` | CSS class reference and styling guide |

---

## The 20 Templates

Templates are visual components that `navigateToSection` renders:

**Hackathon Templates:**
- `HackathonTimeline` — Shows all 6 phases
- `PhaseOverview` — Details a single phase
- `ReadinessCheck` — Checkbox-style checklist
- `ReadinessAssessment` — Interactive progress bars
- `ReadinessExperience` — Voice-based assessment with real-time updates

**Teaching Templates:**
- `ConceptCard` — Defines a term
- `ConceptExplainer` — What/Why/How structure
- `TalkingPoints` — Bullet list with details
- `ProcessSteps` — Numbered workflow steps

**Navigation Templates:**
- `CardGrid` — Grid of clickable cards
- `WelcomeCarousel` — Rotating welcome screen
- `CTABanner` — Call to action banner

**Layout Templates:**
- `SplitContent` — Text + image side by side
- `AccordionList` — Expandable FAQ items

**Code Templates:**
- `ToolCard` — File or command reference
- `CodeBlock` — Syntax-highlighted code

**Reference Templates:**
- `StyleGuide` — Design system colors, frost levels, CSS classes
- `FolderStructure` — Project folder tree with descriptions
- `KnowledgeFileViewer` — Live view of tele-knowledge.md
- `PromptFileViewer` — Live view of glass-prompt.md

---

## The 3 Slash Commands

At the hackathon, developers just type a command and describe what they want:

| Command | What It Does |
|---------|--------------|
| `/add-glass` | Create visual templates — Claude builds the React component |
| `/add-knowledge` | Teach the tele facts — Claude adds to tele-knowledge.md |
| `/tele-should` | Define responses — Claude creates shot prompts in glass-prompt.md |

---

## The 6 Hackathon Phases

3-4 hours total, 30 minutes each:

1. **Voice Coding (0:00-0:30)** — Train tele by speaking in admin mode
2. **Vibe Coding (0:30-1:00)** — Iterate with the Build Agent
3. **Templates (1:00-1:30)** — Create custom components via /add-glass
4. **Knowledge (1:30-2:00)** — Structure domain knowledge via /add-knowledge
5. **Rules (2:00-2:30)** — Define response mappings via /tele-should
6. **Design (2:30-3:00)** — Visual polish and testing

---

## Key Concepts

### Volumetric Navigation
Every clickable element has an `actionPhrase`. When clicked, it calls `notifyTele(actionPhrase)` which prompts me to respond with new content. **No dead ends** — every interaction continues the conversation.

### navigateToSection
The bridge function between the tele and the UI. The Runtime Agent calls it with JSON:
```javascript
navigateToSection({
  badge: "BADGE",
  title: "Title",
  generativeSubsections: [
    { id: "x", templateId: "ConceptCard", props: { ... } }
  ]
})
```

### Admin Mode
Training mode where spoken words become code. Say "I am the admin" → MFA prompt → enter OTP → active. Used during the Voice Coding phase.

---

## Development Commands

```bash
npm run dev -- --port 3131   # Start dev server
npx tsc --noEmit             # Type check
Shift+K                      # Toggle debug toasts
```

---

## Design System

### Brand Colors

| Color | Hex | Use For |
|-------|-----|---------|
| **Mist** | `#F5F5F5` | Primary text, light elements |
| **Onyx** | `#0D0D0D` | Dark backgrounds |
| **Flamingo** | `#9B5DE5` | Accent, CTAs, badges |
| **Wave** | `#003D4F` | Deep teal backgrounds |
| **Turmeric** | `#CC850A` | Secondary accents, warnings |
| **Jade** | `#5EEAD4` | Success, highlights |
| **Sapphire** | `#47A1AD` | Links, information |
| **Amethyst** | `#7C3AED` | Premium features |

### Glass Effects (Frost Levels)

| Class | Blur | Use For |
|-------|------|---------|
| `backdrop-blur-sm` | 4px | Subtle frost |
| `backdrop-blur` | 8px | Standard frost (chat bubbles) |
| `backdrop-blur-md` | 12px | Medium frost |
| `backdrop-blur-lg` | 16px | Heavy frost |
| `backdrop-blur-xl` | 24px | Maximum frost |

### CSS Classes

**Containers:**
- `glass-template-container` — Main template wrapper
- `glass-image-container` — Image sections

**Cards:**
- `glass-card-minimal` — Subtle background (5% white)
- `glass-card-standard` — Standard glass (10% white)
- `glass-card-featured` — Prominent (15% white)
- `glass-card-clickable` — Adds hover effects

**Buttons:**
- `btn-cta` — Flamingo primary
- `btn-sapphire` — Blue actions
- `btn-turmeric` — Yellow secondary
- `btn-ghost` — Minimal outline

**Typography:**
- `text-template-title` — Headings (mist)
- `text-template-subtitle` — Subheadings (flamingo)
- `text-template-content` — Body text (70% mist)

**Grids:**
- `template-grid-2` — 2-column grid
- `template-grid-3` — 3-column grid
- `template-grid-4` — 4-column grid

**Badges:**
- `template-badge` — Flamingo badge
- `template-badge-sapphire` — Blue badge
- `template-badge-turmeric` — Yellow badge

---

*Mobeus University — Catherine v100.0 — System Transparency Release*