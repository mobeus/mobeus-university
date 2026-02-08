---
description: Change how your tele looks — avatar, backgrounds, and color palette
---

# /look — Change How Your Tele Looks

Set your tele's visual identity: the face, the backgrounds, and the colors.

---

## The Three Identity Images

Every tele has three images in `.agent/avatar/`:

| Image | What It Is |
|-------|-----------|
| `avatar_profile.png` | **The face** — shown in the top bar, in chat, during loading |
| `background-hero.png` | **Background with avatar** — shown when the tele is off (idle) |
| `background-empty.png` | **Background without avatar** — shown when the tele is connected (live avatar replaces the static one) |

**During connecting:** The hero pulses over the empty background, creating a breathing effect.

## How to Change

Tell the Build Agent what you want:
- "Give my tele a friendly female face with warm tones"
- "Make the background a cozy library setting"
- "I want a professional dark blue corporate look"

The Build Agent will generate or help you place the images in `.agent/avatar/`.

## Colors Come from the Background

The color palette is **derived from the background images**, not chosen randomly:

1. Build Agent evaluates the new backgrounds
2. Extracts dominant colors, mood, and contrast
3. Picks complementary colors for CTAs, text, and glass tints
4. Updates CSS variables in `src/index.css`
5. Updates navigation button styles if needed

**You don't pick colors — the background tells us what colors work.**

## After Changing the Look

1. `/check` — Verify everything renders correctly
2. `/publish` — Push live

---

_The Screen Finally Cares_
