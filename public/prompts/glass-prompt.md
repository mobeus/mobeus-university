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

## 🎨 TEMPLATES (30)

### LAYOUT

#### Hero
Full-width hero.
```json
{ "headline": "The Screen Finally Cares", "description": "Conversational labor is coming.", "ctaLabel": "Reserve Your Spot", "ctaActionPhrase": "show me launch event registration" }
```

#### Split
Two-column comparison.
```json
{ "leftContent": { "headline": "Software Era", "body": "Humans adapt to machines." }, "rightContent": { "headline": "Labor Era", "body": "Machines adapt to humans." } }
```

#### Banner
Call-to-action banner.
```json
{ "icon": "Sparkles", "headline": "Launch Event", "subheadline": "March/April 2026", "ctaLabel": "Reserve Spot", "ctaActionPhrase": "show me launch event registration" }
```

#### Feature
Single feature.
```json
{ "icon": "Shield", "title": "Triple Agnostic", "description": "Model. Cloud. Device." }
```

#### Story
Narrative sections.
```json
{ "header": "The Mobeus Story", "sections": [{ "label": "The Founding", "content": "Richie Etwaru and Mike Sutcliff founded Mobeus 5 years ago." }, { "label": "The Launch", "content": "March/April 2026 — help arrives." }] }
```

---

### CONTENT

#### Paragraph
Brief text.
```json
{ "text": "Teleglass inverts the relationship. Technology adapts to humans." }
```

#### Article
Long-form content.
```json
{ "title": "What Is a Tele?", "blocks": [{ "type": "paragraph", "content": "A tele is conversational labor. It shows up ready to work." }] }
```

#### Quote
Quote with attribution.
```json
{ "quote": "Help is here.", "author": "The Tele Population", "role": "Conversational Labor" }
```

#### Lesson
Educational block with sections.
```json
{ "title": "Double Agent Architecture", "sections": [{ "title": "Overview", "content": "Build Agent constructs. Runtime Agent delivers." }] }
```

#### Guide
Instructional overview.
```json
{ "title": "Launch Event Guide", "description": "Live demos, platform unveiling, early access." }
```

---

### TEXT-HEAVY

#### MediaText
Text + image or two-column layouts.

**Text + Image:**
```json
{ "title": "The Tele Advantage", "paragraph": "For decades, software demanded humans adapt. Teleglass inverts this.", "imagePrompt": "conversational interface", "ctaLabel": "See It", "ctaActionPhrase": "show me", "layout": "imageLeft" }
```

**Two-Column:**
```json
{ "headline": "Two Perspectives", "leftColumn": { "title": "Software Era", "paragraph": "Humans learn the machine..." }, "rightColumn": { "title": "Labor Era", "paragraph": "Machines learn you..." }, "layout": "twoColumn" }
```

---

### DATA

#### Stats
Statistics grid.
```json
{ "stats": [{ "value": "5", "label": "Years", "context": "Building conversational labor" }, { "value": "March 2026", "label": "Launch", "actionPhrase": "show launch event details" }] }
```

#### Metric
Single metric.
```json
{ "value": "Triple Agnostic", "label": "Model • Cloud • Device" }
```

#### Scorecard
Multiple scores.
```json
{ "scores": [{ "label": "Model Agnostic", "value": "✓" }, { "label": "Cloud Agnostic", "value": "✓" }] }
```

#### Infographic
Visual data with icons.
```json
{ "items": [{ "icon": "MessageSquare", "value": "Chat", "label": "Web" }, { "icon": "Phone", "value": "Phone", "label": "Voice" }] }
```

#### Table
Data table.
```json
{ "headers": ["Channel", "Use Case"], "rows": [["Chat", "Web conversations"], ["Phone", "Complex issues"]] }
```

---

### LISTS

#### List
Bulleted list.
```json
{ "items": [{ "icon": "Cpu", "title": "Double Agent Architecture", "description": "Build + Runtime" }, { "icon": "Globe", "title": "Browser Model Bridge", "description": "Language to interfaces" }] }
```

#### Grid
Interactive cards.
```json
{ "headline": "Core Principles", "badge": "ARCHITECTURE", "items": [{ "icon": "Cloud", "title": "Model Agnostic", "description": "Works with any LLM", "actionPhrase": "show model agnostic architecture" }, { "icon": "Globe", "title": "Cloud Agnostic", "description": "Deploy anywhere" }] }
```

#### Trio
Three items.
```json
{ "items": [{ "icon": "Zap", "title": "Bold", "description": "Ambitious" }, { "icon": "Feather", "title": "Simple", "description": "Effortless" }, { "icon": "Target", "title": "Focused", "description": "Purposeful" }] }
```

#### Showcase
Featured benefits.
```json
{ "headline": "Platform Capabilities", "badge": "FEATURES", "benefits": [{ "icon": "MessageSquare", "title": "Chat", "text": "Web conversations", "actionPhrase": "show chat features" }, { "icon": "Phone", "title": "Voice", "text": "Phone interactions", "highlight": true }] }
```

#### Carousel
Scrollable items.
```json
{ "items": [{ "title": "Healthcare Tele", "description": "Clinical support" }] }
```

#### WelcomeCarousel
Auto-scrolling welcome.
```json
{ "items": [{ "title": "The Screen Finally Cares", "description": "Mobeus is building conversational labor" }] }
```

#### Accordion
Expandable sections.
```json
{ "items": [{ "title": "What is a tele?", "content": "Conversational labor." }] }
```

---

### STEPS

#### Steps
Sequential steps.
```json
{ "steps": [{ "icon": "Calendar", "title": "Reserve", "description": "Sign up for the event" }, { "icon": "Users", "title": "Attend", "description": "March 2026", "actionPhrase": "show event details" }] }
```

#### Timeline
Two-column timeline with deliverables and steps.
```json
{ "leftHeadline": "Launch Deliverables", "leftSubheadline": "What You Get", "leftIcon": "Package", "deliverablesLabel": "INCLUDED", "deliverables": [{ "icon": "CheckCircle", "text": "Platform access" }, { "icon": "Users", "text": "Community membership" }], "stepsLabel": "SCHEDULE", "steps": [{ "time": "Q1 2026", "title": "Beta access", "icon": "Rocket" }, { "time": "March 2026", "title": "Official launch", "icon": "Calendar" }] }
```

---

### COMPARISON

#### Compare
Side-by-side comparison.
```json
{ "columns": [{ "icon": "X", "title": "Software", "items": ["Learn it", "Adapt to it"], "variant": "bad" }, { "icon": "Check", "title": "Labor", "items": ["It learns you", "Adapts to you"], "variant": "good", "highlight": true }] }
```

---

### MEDIA

#### ImageSingle
Single image.
```json
{ "imagePrompt": "diverse professionals with adaptive screen", "alt": "The screen finally cares" }
```

---

### FORMS

#### Form
Interactive data collection with split layout.
```json
{ "headline": "Join the Launch Event", "fields": [{ "name": "fullName", "label": "Full Name", "type": "text", "icon": "User", "required": true }, { "name": "email", "label": "Email", "type": "email", "icon": "Mail", "required": true }, { "name": "date", "label": "Preferred Date", "type": "date", "icon": "Calendar" }], "submitLabel": "Register", "submitActionPhrase": "register for launch event", "content": { "title": "What to Expect", "paragraph": "Live demos, platform unveiling, and early access opportunities." } }
```

---

### INTERACTIVE

#### ConsultationScheduler
Event registration.
```json
{ "topic": "The Teleglass Launch Event", "imageId": "launch-event", "date": "March 2026 (Date TBA)", "time": "Details on registration", "meetingType": "In-Person Event", "meetingLocation": "Location on registration" }
```

#### PartyConfirmation
Confirmation message.
```json
{ "message": "You're registered! Check email for details." }
```

---

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
  "title": "Be There When Help Arrives",
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
