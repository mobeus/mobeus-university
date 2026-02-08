---
description: Show your tele how to respond to specific questions or requests
---

# /respond — Show Your Tele How to Respond

Teach your tele what to say and show when users ask specific things.

---

## What Is a Response?

A response is a "shot prompt" — a pre-written example of how the tele should handle a specific question.

**Example:** When someone asks "What is Mobeus?", the tele:
1. **Says** something conversational (2-3 sentences)
2. **Shows** visual templates (a hero section, some cards, a call-to-action)

## How to Add

Tell the Build Agent what the user might ask and how you want the tele to respond:

- "When someone asks about pricing, show a comparison table with our three plans"
- "When someone says 'help', show a welcome hero and a carousel of popular questions"
- "When someone asks 'who built this', show the founder story with their photos"

The Build Agent will:
1. Write the shot prompt with the right template JSON
2. Add it to the prompt files
3. Make sure the templates match what the frontend expects

## Guidelines

- **Use 2-3 templates per response** — One template feels thin, multiple feels rich
- **Keep the spoken part warm** — Natural, conversational, not robotic
- **End with direction** — A question or suggestion that moves toward the goal
- **Match the journey** — Early questions get awareness content, later ones get action CTAs

## After Adding

1. `/check` — Verify template schemas are valid
2. `/publish` — Push live

---

_The Screen Finally Cares_
