# navigateToSection Tool
> v111.0 | Mobeus Tele

## Function Signature

```typescript
navigateToSection(payload: NavigationPayload): void
```

## Payload Schema

```json
{
  "badge": "string (required)",
  "title": "string (required)",
  "generativeSubsections": [
    {
      "id": "string (required)",
      "templateId": "string (required)",
      "props": "object (required)"
    }
  ]
}
```

---

<!-- TEMPLATE-SCHEMAS-START -->

## ---TEMPLATES--- (33)

### Accordion
GENERIC
```json
{"items"?: [{"icon"?: "string", "number"?: 0, "title": "string", "subtitle"?: "string", "description"?: "string", "details"?: ["string"], "actionPhrase"?: "string", "actionLabel"?: "string"}], "allowMultiple"?: false, "ctaLabel"?: "string", "ctaActionPhrase"?: "string"}
```

### Article
RICH GENERIC
```json
{"icon"?: "string", "badge"?: "string", "heroImages"?: [{"url"?: "string", "prompt"?: "string"}], "heroImageUrl"?: "string", "heroImagePrompt"?: "string", "title"?: "string", "subtitle"?: "string", "meta"?: {"author"?: "string", "date"?: "string", "readTime"?: "string", "category"?: "string"}, "blocks"?: [{"type": {}, "content"?: "string", "items"?: ["string"], "imageUrl"?: "string", "imagePrompt"?: "string", "images"?: [{"url"?: "string", "prompt"?: "string", "caption"?: "string"}], "caption"?: "string", "icon"?: "string", "variant"?: {}, "actionPhrase"?: "string"}], "tags"?: ["string"], "relatedLinks"?: [{"label": "string", "actionPhrase": "string"}], "ctaLabel"?: "string", "ctaActionPhrase"?: "string", "secondaryCtaLabel"?: "string", "secondaryCtaActionPhrase"?: "string"}
```

### Banner
RICH GENERIC
```json
{"icon"?: "string", "badge"?: "string", "headline"?: "string", "subheadline"?: "string", "description"?: "string", "imageUrl"?: "string", "imagePrompt"?: "string", "stats"?: [{"value": "string", "label": "string"}], "features"?: [{"icon"?: "string", "text": "string"}], "highlight"?: false, "variant"?: "gradient", "bannerActionPhrase"?: "string", "ctaLabel"?: "string", "ctaActionPhrase"?: "string", "secondaryCtaLabel"?: "string", "secondaryCtaActionPhrase"?: "string"}
```

### Carousel
GENERIC
```json
{"cards"?: [{"title": "string", "subtitle"?: "string", "imageUrl"?: "string", "imagePrompt"?: "string", "actionPhrase": "string"}], "autoScrollSpeed"?: 1}
```

### Compare
RICH GENERIC
```json
{"icon"?: "string", "badge"?: "string", "headline"?: "string", "subtitle"?: "string", "columns"?: [{"icon"?: "string", "badge"?: "string", "imageUrl"?: "string", "imagePrompt"?: "string", "title": "string", "subtitle"?: "string", "value"?: "string", "items": ["string"], "variant": {}, "highlight"?: false, "stats"?: [{"value": "string", "label": "string"}], "actionPhrase"?: "string", "ctaLabel"?: "string"}], "summary"?: {"icon"?: "string", "title": "string", "description"?: "string", "actionPhrase"?: "string"}, "ctaLabel"?: "string", "ctaActionPhrase"?: "string", "secondaryCtaLabel"?: "string", "secondaryCtaActionPhrase"?: "string"}
```

### ConsultationScheduler
```json
{"topic": "string", "imageId"?: "string", "meetingType": "string", "meetingLocation": "string", "date": "string", "time": "string", "status"?: "proposed"}
```

### Feature
GENERIC
```json
{"imageUrl"?: "string", "imagePrompt"?: "string", "badge"?: "string", "title"?: "string", "description"?: "string", "points"?: [{"icon"?: "string", "text": "string"}], "ctaLabel"?: "string", "ctaActionPhrase"?: "string", "secondaryLabel"?: "string", "secondaryPhrase"?: "string", "reversed"?: false}
```

### Form
GENERIC
```json
{"headline"?: "string", "subheadline"?: "string", "fields"?: [{"name": "string", "label": "string", "type": {}, "icon"?: "string", "placeholder"?: "string", "required"?: false}], "infoLabel"?: "string", "infoItems"?: [{"text": "string"}], "submitLabel"?: "string", "submitActionPhrase"?: "string", "values"?: "string", "confirmed"?: false, "confirmationTitle"?: "string", "confirmationMessage"?: "string", "content"?: {"title"?: "string", "subtitle"?: "string", "paragraph"?: "string", "imageUrl"?: "string", "imagePrompt"?: "string", "badges"?: [{"icon"?: "string", "label": "string", "variant"?: {}}]}}
```

### Grid
RICH GENERIC
```json
{"icon"?: "string", "badge"?: "string", "headline"?: "string", "subtitle"?: "string", "sections"?: [{"icon"?: "string", "label"?: "string", "description"?: "string", "cards": [{"icon"?: "string", "badge"?: "string", "imageUrl"?: "string", "imagePrompt"?: "string", "title": "string", "description": "string", "stats"?: [{}], "highlight"?: false, "actionPhrase"?: "string", "ctaLabel"?: "string"}], "variant"?: {}}], "items"?: [{"icon"?: "string", "badge"?: "string", "imageUrl"?: "string", "imagePrompt"?: "string", "title": "string", "description": "string", "stats"?: [{"value": "string", "label": "string"}], "highlight"?: false, "actionPhrase"?: "string", "ctaLabel"?: "string"}], "columns"?: 3, "ctaLabel"?: "string", "ctaActionPhrase"?: "string", "secondaryCtaLabel"?: "string", "secondaryCtaActionPhrase"?: "string"}
```

### Guide
GENERIC
```json
{"modes"?: [{"icon"?: "string", "title": "string", "description": "string", "variant"?: {}, "examples"?: ["string"]}], "commandsLabel"?: "string", "commands"?: [{"cmd": "string", "desc": "string"}], "ctaLabel"?: "string", "ctaActionPhrase"?: "string"}
```

### Hero
GENERIC
```json
{"stat"?: "string", "statLabel"?: "string", "headline"?: "string", "description"?: "string", "features"?: [{"icon"?: "string", "label": "string", "muted"?: false}], "insight"?: {"icon"?: "string", "title": "string", "description": "string"}, "quote"?: "string", "ctaLabel"?: "string", "ctaActionPhrase"?: "string", "variant"?: "default"}
```

### ImageSingle
RICH GENERIC
```json
{"icon"?: "string", "badge"?: "string", "title"?: "string", "subtitle"?: "string", "imageUrl"?: "string", "imagePrompt"?: "string", "images"?: [{"url"?: "string", "prompt"?: "string", "caption"?: "string", "actionPhrase"?: "string"}], "caption"?: "string", "aspectRatio"?: "'1:1',  // Default to square", "showThumbnails"?: false, "imageActionPhrase"?: "string", "ctaLabel"?: "string", "ctaActionPhrase"?: "string", "secondaryCtaLabel"?: "string", "secondaryCtaActionPhrase"?: "string"}
```

### Infographic
GENERIC
```json
{"imageUrl"?: "string", "imagePrompt"?: "string", "title"?: "string", "subtitle"?: "string", "description"?: "string", "points"?: [{"icon"?: "string", "label": "string", "value": "string", "description"?: "string"}], "ctaLabel"?: "string", "ctaActionPhrase"?: "string"}
```

### Lesson
GENERIC
```json
{"title": "string", "subtitle"?: "string", "duration"?: "string", "difficulty"?: "string", "imageUrl"?: "string", "imagePrompt"?: "string", "objectivesLabel"?: "string", "objectives"?: ["string"], "sections"?: [{"icon"?: "string", "title": "string", "content": "string", "imageUrl"?: "string", "imagePrompt"?: "string", "keyPoints"?: ["string"]}], "summaryLabel"?: "string", "summary"?: "string", "keyTakeaways"?: ["string"], "nextLabel"?: "string", "nextPhrase"?: "string", "ctaLabel"?: "string", "ctaActionPhrase"?: "string"}
```

### List
GENERIC
```json
{"headline"?: "string", "subheadline"?: "string", "items"?: [{"icon"?: "string", "title": "string", "description"?: "string", "actionPhrase"?: "string"}], "ctaLabel"?: "string", "ctaActionPhrase"?: "string"}
```

### MediaText
```json
{"layout"?: "imageLeft", "title"?: "string", "subtitle"?: "string", "paragraph"?: "string", "imagePrompt"?: "string", "imageUrl"?: "string", "ctaLabel"?: "string", "ctaActionPhrase"?: "string", "leftColumn"?: "string", "rightColumn"?: "string", "headline"?: "string"}
```

### Metric
GENERIC
```json
{"value": "string", "label": "string", "context"?: "string", "icon"?: "string", "trend"?: "neutral", "variant"?: "default", "ctaLabel"?: "string", "ctaActionPhrase"?: "string"}
```

### Paragraph
RICH GENERIC
```json
{"icon"?: "string", "badge"?: "string", "title"?: "string", "subtitle"?: "string", "content"?: "string", "text"?: "string", "highlights"?: ["string"], "quote"?: "string", "imageUrl"?: "string", "imagePrompt"?: "string", "variant"?: "default", "alignment"?: "left", "contentActionPhrase"?: "string", "ctaLabel"?: "string", "ctaActionPhrase"?: "string", "secondaryCtaLabel"?: "string", "secondaryCtaActionPhrase"?: "string"}
```

### PartyConfirmation
CELEBRATION
```json
{"badge"?: "YOU'RE ON THE LIST", "headline"?: "See You at the Population Party! 🎉", "subheadline"?: "string", "partyDate"?: "March 15, 2026", "partyTime"?: "7:00 PM - Midnight EST", "location"?: "string", "partyHighlights"?: [], "celebrationImage"?: "party-celebration-confirmed", "confirmationMessage"?: "string"}
```

### Quote
RICH GENERIC
```json
{"icon"?: "string", "badge"?: "string", "quote": "string", "author"?: "string", "role"?: "string", "company"?: "string", "avatarUrl"?: "string", "avatarPrompt"?: "string", "rating"?: 0, "source"?: "string", "sourceActionPhrase"?: "string", "variant"?: "default", "ctaLabel"?: "string", "ctaActionPhrase"?: "string", "secondaryCtaLabel"?: "string", "secondaryCtaActionPhrase"?: "string"}
```

### Scorecard
GENERIC
```json
{"title": "string", "subtitle"?: "string", "imageUrl"?: "string", "imagePrompt"?: "string", "periodLabel"?: "string", "period"?: "string", "overallScore"?: 0, "overallGrade"?: "string", "overallLabel"?: "string", "sections"?: [{"title": "string", "imageUrl"?: "string", "imagePrompt"?: "string", "metrics": [{"icon"?: "string", "label": "string", "value": "string", "target"?: "string", "trend"?: {}, "trendValue"?: "string", "grade"?: {}, "status"?: {}}], "overallScore"?: 0, "overallGrade"?: "string"}], "highlights"?: [{"icon"?: "string", "label": "string", "value": "string"}], "ctaLabel"?: "string", "ctaActionPhrase"?: "string"}
```

### Showcase
RICH GENERIC
```json
{"icon"?: "string", "badge"?: "string", "headline"?: "string", "subheadline"?: "string", "heroImageUrl"?: "string", "heroImagePrompt"?: "string", "rating"?: 0, "ratingLabel"?: "string", "benefits"?: [{"icon"?: "string", "badge"?: "string", "title"?: "string", "text"?: "string", "description"?: "string", "stat"?: "string", "highlight"?: false, "actionPhrase"?: "string"}], "items"?: [{"icon"?: "string", "badge"?: "string", "title"?: "string", "text"?: "string", "description"?: "string", "stat"?: "string", "highlight"?: false, "actionPhrase"?: "string"}], "tagline"?: "string", "taglineIcon"?: "string", "taglineActionPhrase"?: "string", "ctaLabel"?: "string", "ctaActionPhrase"?: "string", "secondaryCtaLabel"?: "string", "secondaryCtaActionPhrase"?: "string"}
```

### Split
GENERIC
```json
{"leftIcon"?: "string", "leftHeadline"?: "string", "leftSubheadline"?: "string", "leftItems"?: [{"icon"?: "string", "text": "string"}], "leftConclusion"?: "string", "leftVariant"?: "default", "rightItems"?: [{"icon"?: "string", "value": "string", "label": "string", "actionPhrase"?: "string"}], "ctaLabel"?: "string", "ctaActionPhrase"?: "string"}
```

### Stats
GENERIC
```json
{"stats"?: [{"value": "string", "label": "string", "context"?: "string", "actionPhrase"?: "string"}], "ctaLabel"?: "string", "ctaActionPhrase"?: "string"}
```

### Steps
GENERIC
```json
{"headline"?: "string", "subheadline"?: "string", "steps"?: [{"icon"?: "string", "title": "string", "description"?: "string", "actionPhrase"?: "string"}], "layout"?: "vertical", "ctaLabel"?: "string", "ctaActionPhrase"?: "string"}
```

### Story
GENERIC
```json
{"header"?: "string", "headerLabel"?: "string", "sections"?: [{"icon"?: "string", "label": "string", "content": "string", "highlight"?: false}], "relatedStories"?: [{"title": "string", "subtitle"?: "string", "actionPhrase": "string"}], "ctaLabel"?: "string", "ctaActionPhrase"?: "string", "secondaryCtaLabel"?: "string", "secondaryCtaActionPhrase"?: "string"}
```

### Table
GENERIC
```json
{"title"?: "string", "subtitle"?: "string", "searchPlaceholder"?: "string", "columns"?: [{"key": "string", "label": "string", "sortable"?: false, "align"?: {}}], "rows"?: [{"id": "string", "cells": "string", "actionPhrase"?: "string"}], "emptyMessage"?: "string", "ctaLabel"?: "string", "ctaActionPhrase"?: "string"}
```

### TextImageLeft
GENERIC
```json
{"title"?: "string", "subtitle"?: "string", "paragraphTitle"?: "string", "paragraph"?: "string", "imageUrl"?: "string", "imagePrompt"?: "string", "imageAlt"?: "string", "ctaLabel"?: "string", "ctaActionPhrase"?: "string"}
```

### TextImageRight
GENERIC
```json
{"title"?: "string", "subtitle"?: "string", "paragraphTitle"?: "string", "paragraph"?: "string", "imageUrl"?: "string", "imagePrompt"?: "string", "imageAlt"?: "string", "ctaLabel"?: "string", "ctaActionPhrase"?: "string"}
```

### Timeline
GENERIC
```json
{"leftIcon"?: "string", "leftHeadline"?: "string", "leftSubheadline"?: "string", "deliverablesLabel"?: "string", "deliverables"?: [{"icon"?: "string", "text": "string"}], "stepsLabel"?: "string", "steps"?: [{"time"?: "string", "title": "string", "icon"?: "string"}], "successNote"?: "string", "ctaLabel"?: "string", "ctaActionPhrase"?: "string"}
```

### Trio
RICH GENERIC
```json
{"icon"?: "string", "badge"?: "string", "headline"?: "string", "subtitle"?: "string", "cards"?: [{"icon"?: "string", "badge"?: "string", "imageUrl"?: "string", "imagePrompt"?: "string", "title": "string", "description": "string", "highlight"?: false, "stats"?: [{"value": "string", "label": "string"}], "features"?: ["string"], "actionPhrase"?: "string", "ctaLabel"?: "string"}], "items"?: [{"icon"?: "string", "badge"?: "string", "imageUrl"?: "string", "imagePrompt"?: "string", "title": "string", "description": "string", "highlight"?: false, "stats"?: [{"value": "string", "label": "string"}], "features"?: ["string"], "actionPhrase"?: "string", "ctaLabel"?: "string"}], "numbered"?: true, "variant"?: "default", "ctaLabel"?: "string", "ctaActionPhrase"?: "string"}
```

### TwoColumns
GENERIC
```json
{"headline"?: "string", "subheadline"?: "string", "leftColumn"?: {"title"?: "string", "subtitle"?: "string", "paragraph"?: "string"}, "rightColumn"?: {"title"?: "string", "subtitle"?: "string", "paragraph"?: "string"}, "ctaLabel"?: "string", "ctaActionPhrase"?: "string"}
```

### WelcomeCarousel
Apple-style solid color cards for Mobeus
```json
{"cards"?: [{"question": "string", "subtext"?: "string", "icon"?: "string", "imageUrl"?: "string", "actionPhrase": "string", "isAccent"?: false, "accentColor"?: {}}]}
```

<!-- TEMPLATE-SCHEMAS-END -->

## 🎯 SHOT PROMPTS

### Shot 1: "What is Mobeus?"

**User:** "What is Mobeus?" / "Tell me about Teleglass"

**Tele:** "Let me show you."

**Call:**
```json
{
  "badge": "ABOUT",
  "title": "The Screen Finally Cares",
  "generativeSubsections": [
    {
      "id": "platform-capabilities",
      "templateId": "Grid",
      "props": {
        "headline": "Platform Capabilities",
        "subtitle": "Every channel. One platform.",
        "badge": "CHANNELS",
        "items": [
          {
            "icon": "MessageSquare",
            "title": "Chat",
            "description": "Web conversations",
            "actionPhrase": "show me chat capabilities"
          },
          {
            "icon": "Phone",
            "title": "Voice",
            "description": "Phone interactions",
            "actionPhrase": "show me voice capabilities"
          },
          {
            "icon": "MessageCircle",
            "title": "SMS",
            "description": "Text messaging",
            "actionPhrase": "show me sms capabilities"
          },
          {
            "icon": "User",
            "title": "Avatar",
            "description": "Visual presence",
            "actionPhrase": "show me avatar capabilities"
          },
          {
            "icon": "Layout",
            "title": "Glass",
            "description": "Generative interfaces",
            "actionPhrase": "show me glass capabilities"
          },
          {
            "icon": "Smartphone",
            "title": "Phone",
            "description": "Mobile native",
            "actionPhrase": "show me phone capabilities"
          }
        ],
        "columns": 3
      }
    },
    {
      "id": "innovations",
      "templateId": "Trio",
      "props": {
        "headline": "Three Core Innovations",
        "subtitle": "What makes this possible",
        "items": [
          {
            "icon": "Cpu",
            "title": "Double Agent Architecture",
            "description": "Build + Runtime separation",
            "actionPhrase": "show me double agent architecture"
          },
          {
            "icon": "Globe",
            "title": "Browser Model Bridge",
            "description": "Language becomes interface",
            "actionPhrase": "show me browser model bridge"
          },
          {
            "icon": "Sparkles",
            "title": "Generative Web",
            "description": "Every page adapts to you",
            "actionPhrase": "show me generative web"
          }
        ],
        "variant": "default",
        "numbered": false
      }
    }
  ]
}
```

---

### Shot 2: "What's a tele?"

**User:** "What is a tele?" / "How does this work?"

**Tele:** "Think of it as a colleague who shows up ready to work."

**Call:**
```json
{
  "badge": "CONVERSATIONAL LABOR",
  "title": "What Is a Tele?",
  "generativeSubsections": [
    {
      "id": "definition",
      "templateId": "Article",
      "props": {
        "title": "A Tele Is Conversational Labor",
        "blocks": [
          {
            "type": "paragraph",
            "content": "A tele shows up ready to help. It listens, reasons, acts. Unlike automation, a tele learns you — understanding intent, asking questions, carrying work forward."
          },
          {
            "type": "paragraph",
            "content": "Teles work across every channel: chat, voice, SMS, avatar. They remember context. They adapt to your workflow. They handle transactions, train users, close sales, and provide support."
          },
          {
            "type": "paragraph",
            "content": "This is not a chatbot. This is labor."
          }
        ]
      }
    },
    {
      "id": "capabilities",
      "templateId": "Grid",
      "props": {
        "headline": "What Teles Do",
        "subtitle": "Conversational labor across domains",
        "badge": "CAPABILITIES",
        "items": [
          {
            "icon": "ShoppingCart",
            "title": "Sell",
            "description": "Qualify leads, demonstrate value, close deals",
            "actionPhrase": "show sales tele examples"
          },
          {
            "icon": "Headphones",
            "title": "Support",
            "description": "Resolve issues, answer questions, guide users",
            "actionPhrase": "show support tele examples"
          },
          {
            "icon": "GraduationCap",
            "title": "Train",
            "description": "Onboard employees, teach systems, assess learning",
            "actionPhrase": "show training tele examples"
          },
          {
            "icon": "FileText",
            "title": "Transact",
            "description": "Process requests, schedule meetings, coordinate workflows",
            "actionPhrase": "show transaction tele examples"
          }
        ],
        "columns": 2
      }
    }
  ]
}
```

---

### Shot 3: "Sign me up"

**User:** "How do I sign up?" / "I'm interested" / "Let's go"

**Tele:** "Let's get you registered."

**Call:**
```json
{
  "badge": "LAUNCH EVENT",
  "title": "The Screen Finally Cares",
  "generativeSubsections": [
    {
      "id": "event-details",
      "templateId": "Banner",
      "props": {
        "icon": "Calendar",
        "badge": "MARCH 2026",
        "headline": "The Teleglass Launch Event",
        "subheadline": "Conversational labor goes live",
        "description": "Live demonstrations, platform unveiling, founding vision from Richie Etwaru",
        "features": [
          {
            "icon": "Eye",
            "text": "Watch teles work live"
          },
          {
            "icon": "Cpu",
            "text": "See the architecture"
          },
          {
            "icon": "Zap",
            "text": "Early access for attendees"
          }
        ],
        "ctaLabel": "Reserve Your Spot",
        "ctaActionPhrase": "show me launch event registration",
        "variant": "gradient",
        "highlight": true
      }
    },
    {
      "id": "experience",
      "templateId": "Steps",
      "props": {
        "headline": "What to Expect",
        "subheadline": "Your launch event experience",
        "steps": [
          {
            "icon": "Eye",
            "title": "Live Demonstrations",
            "description": "Watch teles sell, support, train, and transact in real time",
            "actionPhrase": "show me the demos"
          },
          {
            "icon": "Cpu",
            "title": "Platform Unveiling",
            "description": "Deep dive into Double Agent Architecture and Browser Model Bridge",
            "actionPhrase": "show me the platform"
          },
          {
            "icon": "User",
            "title": "Founding Vision",
            "description": "Richie Etwaru presents the future of conversational labor",
            "actionPhrase": "show me the vision"
          },
          {
            "icon": "Zap",
            "title": "Early Access",
            "description": "First movers get priority access to the platform",
            "actionPhrase": "show me early access"
          }
        ],
        "layout": "vertical",
        "ctaLabel": "I'm In",
        "ctaActionPhrase": "show me launch event registration"
      }
    }
  ]
}
```

---

### Shot 4: "How is this different?"

**User:** "What's different?" / "Explain the shift"

**Tele:** "We flipped 50 years of software on its head."

**Call:**
```json
{
  "badge": "THE SHIFT",
  "title": "From Software to Labor",
  "generativeSubsections": [
    {
      "id": "paradigm-shift",
      "templateId": "Compare",
      "props": {
        "columns": [
          {
            "icon": "X",
            "title": "Software Era (1970—2025)",
            "items": [
              "Humans adapt to machines",
              "Learning curves everywhere",
              "Menus, buttons, dashboards",
              "Software waits for commands",
              "You operate the interface"
            ],
            "variant": "bad"
          },
          {
            "icon": "Check",
            "title": "Labor Era (2026→)",
            "items": [
              "Machines adapt to humans",
              "Conversation replaces training",
              "Natural language everywhere",
              "Teles act with reasoning",
              "You collaborate with workers"
            ],
            "variant": "good",
            "highlight": true
          }
        ]
      }
    },
    {
      "id": "breakthrough",
      "templateId": "MediaText",
      "props": {
        "title": "Why Now",
        "subtitle": "Three Breakthroughs Made This Real",
        "paragraph": "For years, conversational computing was fiction. Then three things happened: Language models achieved true comprehension. Multi-agent architectures separated construction from delivery. The Browser Model Bridge turned language into live interfaces. Mobeus brought them together.",
        "imagePrompt": "neural network visualization",
        "ctaLabel": "See the Architecture",
        "ctaActionPhrase": "show me teleglass architecture",
        "layout": "imageLeft"
      }
    }
  ]
}
```

---

## 🚀 PATTERN

**Every response uses exactly 2 templates.**

Pattern: Context → Action

Examples:
- Hero → Trio
- Article → Grid
- Banner → Steps
- Compare → MediaText

---

_v111.0 | The Screen Finally Cares_
