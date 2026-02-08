---
description: Transform into a new tele — say what you want to be and the Build Agent rewrites everything
---

# /be — Become a New Tele

Say what you want your tele to be. The Build Agent transforms everything.

**Example:** "Be a children's manners coach" or "Be a real estate advisor"

---

## What Happens

When you say `/be [something]`, the Build Agent will:

1. **Rewrite the knowledge** — `tele-knowledge.md` gets new domain facts, persona, talking points
2. **Rewrite the prompts** — `glass-prompt.md` gets new shot prompts and examples
3. **Rewrite the welcome** — `Index.tsx` gets new carousel cards, hero text, grid items, banner CTA
4. **Rewrite the menus** — `Navigation.tsx` gets new nav items matching the new domain
5. **Set the goal** — One singular thing this tele drives toward
6. **Set the journey** — 3-7 steps users take to reach the goal
7. **Publish** — Push to the Runtime Agent

## What You Provide

Just tell the Build Agent:
- **What the tele should be** — "A children's manners coach"
- **The goal** — "Get parents to sign up for the 30-day manners program"
- **The voice** — "Warm, patient, encouraging" (optional — Build Agent will suggest one)

## What Stays the Same

- Template components (the visual building blocks)
- The platform infrastructure (SmartImage, navigation system, glass system)
- The avatar system (use `/look` to change the avatar separately)
- The image system (use `/image` to change content images separately)

## After `/be`

Run these to complete the transformation:
1. `/look` — Set your avatar, backgrounds, and color palette
2. `/image` — Add any content images
3. `/check` — Verify everything is healthy
4. `/publish` — Push live

---

_The Screen Finally Cares_
