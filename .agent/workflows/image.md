---
description: Add images to your tele — content images, pre-generated assets, and the asset registry
---

# /image — Add Images to Your Tele

Manage the images your tele uses in content — carousel photos, hero banners, founder headshots, and more.

---

## Three Ways Images Work

### 1. Pre-Generated (Fastest)

Images saved in the repo. They load instantly.

**Where they live:** `public/images/`

Examples:
- `public/images/carousel-morning-coffee.png`
- `public/images/founders/richie-etwaru.png`
- `public/images/hero-background.png`

**To add one:** Tell the Build Agent:
- "Add an image of a happy family at dinner for the carousel"
- "Save this founder headshot" (provide the image)

### 2. Live-Generated (Automatic)

When a template needs an image that doesn't exist locally, `SmartImage` generates one using AI on the fly. It shows a loading shimmer while generating, then caches it for the session.

**You don't need to do anything** — this happens automatically for any image not in the registry.

### 3. Asset Registry (Best of Both)

The registry maps image IDs to local files. If an image is in the registry, it loads locally. If not, SmartImage generates it live.

**Where it lives:** `src/data/assetRegistry.ts`

**To register an image:** Tell the Build Agent:
- "Register the carousel coffee image so it loads instantly instead of generating"
- "Pre-load my hero banner"

## When to Pre-Generate vs. Let It Generate Live

| Pre-Generate (save to repo) | Let It Generate Live |
|-----|-----|
| Images that appear on first load (carousel, hero) | Images deep in content the user may never see |
| Brand-critical images (logos, founder photos) | Decorative or supporting visuals |
| Images that must look exactly right | Images where variety is fine |

## After Adding Images

1. `/check` — Verify everything renders
2. `/publish` — Push live (if prompt files changed)

---

_The Screen Finally Cares_
