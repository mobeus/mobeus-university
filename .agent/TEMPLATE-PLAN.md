# Mobeus University Template Library — Master Plan

> **Template Expansion Reference**
> Created: January 15, 2026 | Updated: January 18, 2026
> Catherine v63.0 | Zero Friction Release

---

## 📊 IMPLEMENTATION STATUS

| Status | Count | Description |
|--------|-------|-------------|
| ✅ **Implemented** | **16** | Live in `src/components/templates/` |
| 📋 **Planned** | **34** | Documented below for future expansion |
| **Total** | **50** | Complete template library vision |

### Currently Implemented Templates (16)
| Category | Templates |
|----------|-----------|
| **Hackathon** | HackathonTimeline, PhaseOverview, ReadinessCheck, ReadinessAssessment, ReadinessExperience |
| **Concept Teaching** | ConceptCard, ConceptExplainer, TalkingPoints, ProcessSteps |
| **Navigation** | CardGrid, WelcomeCarousel, CTABanner |
| **Layout & Content** | SplitContent, AccordionList |
| **Tools & Code** | ToolCard, CodeBlock |

> **Note for Architects:** The templates below represent a comprehensive vision for enterprise enablement.
> Implement as needed using `/add-glass` workflow. Priority should be given to templates that support
> the current hackathon preparation curriculum.

---

## ⚠️ CORE THESIS: VOLUMETRIC CONVERSATIONAL PRODUCT

### The Fundamental Principle

This is not a static website. This is a **VOLUMETRIC CONVERSATIONAL PRODUCT**.

The user navigates through an **endless volume of experiences** by clicking on elements and continuing conversations with Catherine. There is no "end" — only infinite exploration, guided by conversation.

### The Immutable Law

> **EVERY CLICKABLE ELEMENT MUST CALL `notifyTele(actionPhrase)`**

This is NON-NEGOTIABLE. When a user clicks on:
- A card
- A button
- A list item
- A metric
- A diagram component
- A link
- An icon
- ANY interactive element

...it MUST trigger a `notifyTele()` call with an actionPhrase that continues the conversation.

### Why This Matters

```
┌──────────────────────────────────────────────────────────────────┐
│                    VOLUMETRIC NAVIGATION                         │
│                                                                  │
│   User asks → Catherine shows templates → User clicks element →  │
│   → Catherine responds with new templates → User clicks →        │
│   → Catherine responds → User clicks → ∞ INFINITE EXPLORATION    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

The user never "leaves" the conversation. They browse endlessly through a connected volume of content, with Catherine as their guide. Each click is a new question. Each response is a new visual experience.

### Implementation Pattern

```tsx
// CORRECT - Every interactive element has notifyTele
<div 
  className="glass-card-standard glass-card-clickable"
  onClick={() => notifyTele("Show me more about the Super Spec")}
>
  <h3>Super Spec</h3>
  <p>The single source of truth...</p>
</div>

// WRONG - Missing notifyTele means dead-end (NEVER DO THIS)
<div className="glass-card-standard">
  <h3>Super Spec</h3>
  <p>The single source of truth...</p>
</div>
```

### Action Phrase Guidelines

1. **Start with "Show"** — "Show me...", "Show the...", "Show more about..."
2. **Be specific** — "Show me the 3-3-3 delivery model" not "Show me more"
3. **Enable continuation** — Phrases that naturally lead to more exploration
4. **Match context** — Phrases relevant to what was clicked

### Every Template MUST Support This

Every prop that represents clickable content MUST include an `actionPhrase`:

```typescript
// Card with actionPhrase
cards[{
  title: "Healthcare Case Study",
  description: "Claims processing modernization",
  actionPhrase: "Show me how we modernized healthcare claims processing"
}]

// Feature list with actionPhrase
features[{
  icon: "Shield",
  text: "HIPAA Compliance",
  actionPhrase: "Show me how we handle HIPAA compliance"
}]

// Metric with actionPhrase  
metrics[{
  value: "40-60%",
  label: "Cost Reduction",
  actionPhrase: "Show me how we achieve 40-60% cost reduction"
}]
```

---

## ⚙️ STRICT SCHEMA FORMAT REQUIREMENTS

### Every Template MUST Have

1. **TypeScript Interface** — Precise prop types in the component file
2. **JSON Schema in glass-prompt.md** — For Tele to know the structure
3. **USE WHEN triggers** — When Tele should select this template
4. **actionPhrase on clickable content** — For volumetric navigation
5. **Image handling** — Either `imageUrl` (pre-gen) or `imagePrompt` (AI-gen)

### Template Registry Format
```typescript
// src/data/templateRegistry.ts
export const TEMPLATE_REGISTRY = {
  TemplateName: lazy(() => import("@/components/templates/TemplateName")
    .then(m => ({ default: m.TemplateName }))),
};
```

### glass-prompt.md Schema Format
```markdown
### TemplateName
**USE WHEN:** [trigger conditions - when Tele should pick this template]
```json
{
  "propName": "type (required|optional)",
  "items": [{
    "title": "string",
    "actionPhrase": "string (required for clickable)"
  }]
}
\```
**Example:**
```json
{ "propName": "actual example value" }
\```
```

### Image Props Pattern
Every template with images MUST support:
```typescript
interface ImageProps {
  imageUrl?: string;      // Pre-generated asset path
  imagePrompt?: string;   // AI generation prompt
}
// SmartImage auto-selects: registry → AI fallback
```

---

## Part 1: Internal Personas Analysis

Based on the comprehensive knowledge base, there are **8 distinct internal personas** who will interact with Catherine:

### 1. **Client Principals / Account Leaders**
- **Primary Goal**: Win enterprise deals, expand existing accounts
- **Selling To**: CIOs, CTOs, CFOs, Chief Product Officers, Procurement
- **Key Questions**: Competitive positioning, pricing, ROI, risk mitigation
- **Template Needs**: Comparison matrices, pricing breakdowns, ROI calculators, case studies

### 2. **Sales / Business Development**
- **Primary Goal**: Generate pipeline, qualify opportunities, handle objections
- **Selling To**: VP Engineering, IT Directors, Digital Transformation leads
- **Key Questions**: Value propositions, quick wins, proof points
- **Template Needs**: Elevator pitch cards, talking points, sales battle cards

### 3. **Software Engineers / Developers**
- **Primary Goal**: Learn to use the platform daily, understand Super Spec workflow
- **Selling To**: Their own adoption, peer developers
- **Key Questions**: How does it work? What languages? Will it replace me?
- **Template Needs**: Workflow diagrams, code examples, tech stack grids

### 4. **Data Engineers / ML Engineers**
- **Primary Goal**: Understand AI/ML integration, data products, AIOps
- **Selling To**: Analytics teams, data platform teams
- **Key Questions**: Data flows, model orchestration, observability
- **Template Needs**: Data architecture diagrams, pipeline flows, model comparisons

### 5. **Solution Architects / Enterprise Architects**
- **Primary Goal**: Validate architecture, understand 10 components, Context Library
- **Selling To**: Technical leadership, architecture review boards
- **Key Questions**: ADRs, component libraries, integration patterns
- **Template Needs**: Architecture diagrams, component catalogs, decision trees

### 6. **Delivery Leads / Project Managers**
- **Primary Goal**: Plan and execute engagements, understand 3-3-3 model
- **Selling To**: Client project teams, internal delivery
- **Key Questions**: Timelines, phases, milestones, risks
- **Template Needs**: Timeline visualizations, phase breakdowns, Gantt-style charts

### 7. **Executives / Partners**
- **Primary Goal**: Strategic positioning, investment justification, market differentiation
- **Selling To**: Board, investors, C-suite clients
- **Key Questions**: Market position, competitive moat, growth trajectory
- **Template Needs**: Executive summaries, metric dashboards, market position maps

### 8. **Operations / DevOps / SRE Teams**
- **Primary Goal**: Deployment, monitoring, AIOps, troubleshooting
- **Selling To**: Client operations teams
- **Key Questions**: Control Plane, observability, self-healing
- **Template Needs**: Operational dashboards, monitoring flows, incident workflows

---

## Part 2: External Stakeholders Matrix

| Internal Persona | Primary External Targets | Key Concerns They Address |
|-----------------|-------------------------|---------------------------|
| Client Principals | **CIOs** | Legacy modernization, risk, 3-3-3 delivery |
| Client Principals | **CTOs** | Code quality, architecture integrity, tech debt |
| Client Principals | **CFOs** | TCO, 40-60% cost reduction, ROI |
| Client Principals | **Chief Product Officers** | Product thinking, user validation |
| Sales | **VP Engineering** | Developer productivity, team multiplier |
| Sales | **IT Directors** | Implementation, integration, support |
| Architects | **Enterprise Architects** | 10 components, ADRs, standards |
| Architects | **Compliance Officers** | HIPAA, GDPR, SOX, PCI-DSS |
| Executives | **Board/Investors** | Market position, competitive advantage |
| Delivery | **Project Sponsors** | Timeline, budget, milestones |
| Operations | **DevOps/SRE** | Control Plane, AIOps, monitoring |

---

## Part 3: The 50 Templates

Organized into **10 categories** with **5 templates each**.

---

### CATEGORY A: METRICS & DATA VISUALIZATION (5 Templates)

#### 1. **MetricsGrid**
Display 3-6 key metrics with large numbers, labels, and optional trends
- **Props**: `metrics[{value, label, change?, trend?}]`, `columns: 2|3|4|6`
- **Use Cases**: 
  - ROI dashboard (40-60% cost reduction, 70% maintenance freed)
  - 3-3-3 timeline (3 days, 3 weeks, 3 months)
  - Team multiplier (3-4 = work of 20)
- **Personas**: Executives, Sales, Client Principals

#### 2. **BarChart**
Horizontal or vertical bar chart for comparisons
- **Props**: `data[{label, value, color?}]`, `orientation`, `maxValue?`, `showValues?`
- **Use Cases**:
  - Cost savings comparison (before/after)
  - Claims processing time reduction (45-60 days → 7-10 days)
  - Developer productivity multiplication
- **Personas**: Executives, CFO conversations

#### 3. **PieChart**
Circular chart showing proportions/distributions
- **Props**: `segments[{label, value, color}]`, `showLabels?`, `showLegend?`
- **Use Cases**:
  - IT budget allocation (70% maintenance trap)
  - Error rate breakdown
  - Code generation vs manual effort
- **Personas**: Executives, Project Managers

#### 4. **LineChart**
Trend visualization over time
- **Props**: `dataPoints[{x, y}][]`, `lines[{label, color, data}]`, `xAxis`, `yAxis`
- **Use Cases**:
  - ROI over 90 days
  - Delivery velocity improvement
  - Defect rate reduction
- **Personas**: Executives, Delivery, CFO

#### 5. **StatHighlight**
Single prominent statistic with context and source
- **Props**: `value`, `label`, `context`, `source?`, `icon?`
- **Use Cases**:
  - "Team of 3-4 does work of 20"
  - "90 days to production"
  - "40-60% cost reduction"
- **Personas**: All personas

---

### CATEGORY B: COMPARISON & TABLES (5 Templates)

#### 6. **ComparisonTable**
Side-by-side feature/competitor comparison matrix
- **Props**: `headers[]`, `rows[{feature, values[], highlight?}]`, `highlightColumn?`
- **Use Cases**:
  - AI/Works vs Globant vs Ascendion vs Deloitte vs Sapient
  - Feature comparison across tiers
  - Traditional vs AI-assisted development
- **Personas**: Sales, Client Principals

#### 7. **DataTable**
Structured table with sorting and filtering
- **Props**: `headers[]`, `rows[][]`, `sortable?`, `filterable?`, `striped?`
- **Use Cases**:
  - Supported languages/frameworks table
  - Cloud provider capabilities
  - Industry support matrix
- **Personas**: Architects, Developers

#### 8. **PricingCards**
Pricing tiers displayed as cards
- **Props**: `tiers[{name, price, period?, features[], ctaLabel, highlighted?}]`
- **Use Cases**:
  - 3-3-3 engagement phases ($675K - $2.35M)
  - Platform licensing options
  - Service tier comparison
- **Personas**: Sales, Client Principals, CFO

#### 9. **BeforeAfter**
Split comparison showing transformation
- **Props**: `before: {title, items[], imagePrompt}`, `after: {...}`, `transition?`
- **Use Cases**:
  - Legacy COBOL → Cloud microservices
  - Manual claims → Automated processing
  - Monolith → Microservices architecture
- **Personas**: Sales (CIO conversations), Architects

#### 10. **ScoreCard**
Rating/scoring comparison with visual indicators
- **Props**: `criteria[{name, usScore, theirScore, weight?}]`, `competitor`
- **Use Cases**:
  - AI/Works vs competitor scoring
  - Maturity assessment
  - Capability gap analysis
- **Personas**: Sales, Client Principals

---

### CATEGORY C: ARCHITECTURE & DIAGRAMS (5 Templates)

#### 11. **ArchitectureDiagram**
System architecture with labeled components and connections
- **Props**: `imagePrompt`, `title`, `callouts[{label, position, description?}]`
- **Use Cases**:
  - 10 Platform Components overview
  - 3 Environments architecture
  - Control Plane architecture
- **Personas**: Architects, Developers, Data Engineers

#### 12. **FlowDiagram**
Process flow with numbered/connected steps
- **Props**: `steps[{id, title, description, icon?}]`, `connections[]`, `direction`
- **Use Cases**:
  - Super Spec → Code Generation workflow
  - 5 Phase delivery process
  - Trouble Management flow
- **Personas**: Developers, Architects, Delivery

#### 13. **ComponentDiagram**
Interactive component breakdown
- **Props**: `components[{id, name, description, icon, children?}]`, `expandable?`
- **Use Cases**:
  - 10 AI/Works components breakdown
  - Context Library contents
  - Control Plane capabilities
- **Personas**: Architects, Developers

#### 14. **LayerDiagram**
Stacked layers showing system hierarchy
- **Props**: `layers[{name, items[], color?}]`, `orientation: vertical|horizontal`
- **Use Cases**:
  - Platform stack: LLMs → Control Plane → Applications
  - Data platform layers
  - Security layers
- **Personas**: Architects, Technical sales

#### 15. **DataFlowDiagram**
Data movement and transformation visualization
- **Props**: `nodes[{id, label, type}]`, `edges[{from, to, label?}]`
- **Use Cases**:
  - Legacy → Super Spec → Code flow
  - Data product creation
  - AIOps monitoring flow
- **Personas**: Data Engineers, Architects

---

### CATEGORY D: TIMELINE & PROCESS (5 Templates)

#### 16. **TimelineHorizontal**
Horizontal timeline with milestone markers
- **Props**: `milestones[{label, duration, description?, status?}]`
- **Use Cases**:
  - 3-3-3 delivery model
  - Healthcare case study timeline
  - Implementation phases
- **Personas**: Sales, Delivery, Executives

#### 17. **TimelineVertical**
Vertical timeline with detailed descriptions
- **Props**: `events[{title, date?, description, icon?, status?}]`
- **Use Cases**:
  - Project phases with details
  - Evolution and improvement cycle
  - Feedback loop phases
- **Personas**: Delivery, Project Managers

#### 18. **ProcessSteps**
Numbered process with detailed step cards
- **Props**: `steps[{number, title, content, icon?, duration?}]`, `currentStep?`
- **Use Cases**:
  - 5-phase workflow (Discovery → Spec → Code → Deploy → Evolve)
  - Onboarding process
  - Legacy modernization phases
- **Personas**: Developers, Delivery, Sales

#### 19. **GanttChart**
Gantt-style project timeline
- **Props**: `tasks[{name, start, end, progress?, dependencies?}]`, `dateRange`
- **Use Cases**:
  - 90-day implementation plan
  - Phased rollout schedule
  - Resource allocation timeline
- **Personas**: Delivery, Project Managers

#### 20. **RoadmapView**
Strategic roadmap with now/next/later lanes
- **Props**: `lanes[{label, items[{title, description}]}]`
- **Use Cases**:
  - Platform evolution roadmap
  - Feature delivery timeline
  - Capability buildout plan
- **Personas**: Executives, Architects

---

### CATEGORY E: CONTENT CARDS & LISTS (5 Templates)

#### 21. **FeatureList**
Bulleted features with icons and optional details
- **Props**: `title`, `features[{icon, text, detail?}]`, `columns?: 1|2`
- **Use Cases**:
  - Security features (OWASP, HIPAA, GDPR, SOX)
  - Context Library contents
  - Control Plane capabilities
- **Personas**: All personas

#### 22. **IconGrid**
Grid of icons with labels
- **Props**: `items[{icon, label, description?}]`, `columns: 3|4|6`
- **Use Cases**:
  - Supported languages: JS/TS, Python, Java, C#, Go
  - Cloud providers: AWS, Azure, GCP
  - LLM heterogeneous models
- **Personas**: Developers, Architects, Technical sales

#### 23. **CardGrid**
Grid of clickable content cards
- **Props**: `cards[{title, description, imagePrompt?, badge?, actionPhrase}]`, `columns`
- **Use Cases**:
  - Case studies (Healthcare, Retail, Financial)
  - Use cases (Legacy, Net New, Microservices, Data, Agentic)
  - Industries supported
- **Personas**: Sales, All personas

#### 24. **NumberedList**
Ordered list with prominent numbers
- **Props**: `title`, `items[{title, description?}]`, `startFrom?`
- **Use Cases**:
  - Top 5 benefits
  - 3 key differentiators
  - 4 risk mitigation approaches
- **Personas**: Sales, Executives

#### 25. **ChecklistCard**
Checklist with checked/unchecked items
- **Props**: `title`, `items[{text, checked, detail?}]`
- **Use Cases**:
  - Implementation readiness
  - Compliance checklist
  - Quality gates passed
- **Personas**: Delivery, Architects, Compliance

---

### CATEGORY F: DETAIL & EXPLANATION (5 Templates)

#### 26. **ConceptCard**
Single concept explanation with image
- **Props**: `title`, `subtitle?`, `content`, `imagePrompt?`, `bulletPoints?[]`
- **Use Cases**:
  - "What is Super Spec?"
  - "What is CodeConcise?"
  - "What is the Control Plane?"
- **Personas**: All personas (learning)

#### 27. **SplitContent** *(Already exists)*
Two-column image + text layout
- **Props**: `title`, `subtitle?`, `content`, `bulletPoints?[]`, `imagePrompt`, `imagePosition`
- **Use Cases**:
  - Hero content sections
  - Feature explanations
  - Environment overviews
- **Personas**: All personas

#### 28. **ThreeColumnLayout**
Three equal columns for related content
- **Props**: `columns[{title, icon?, content, bulletPoints?[]}]`
- **Use Cases**:
  - 3 Environments (Portal, IDE, Operations)
  - 3-3-3 phases side by side
  - Three value propositions
- **Personas**: Sales, Architects, Training

#### 29. **TwoColumnContent**
Two columns for comparison or split info
- **Props**: `left: {title, content}`, `right: {...}`, `divider?`
- **Use Cases**:
  - Technical vs Business benefits
  - Challenge vs Solution
  - Before vs After narrative
- **Personas**: Sales, Executives

#### 30. **ParagraphBlock**
Rich text block with headers, bold, bullets
- **Props**: `title?`, `content (markdown)`, `highlighted?`
- **Use Cases**:
  - Detailed explanations
  - Long-form content
  - Policy descriptions
- **Personas**: Training, Compliance

---

### CATEGORY G: INTERACTIVE ELEMENTS (5 Templates)

#### 31. **AccordionList**
Expandable sections for detailed content
- **Props**: `items[{title, content, icon?, defaultOpen?}]`, `allowMultiple?`
- **Use Cases**:
  - FAQ sections
  - 10 Components deep dive
  - Control Plane capabilities
- **Personas**: All personas

#### 32. **TabContent**
Tabbed navigation between content sections
- **Props**: `tabs[{label, icon?, content: ComponentProps}]`, `defaultTab?`
- **Use Cases**:
  - Audience-specific content (CIO/CTO/CFO/CPO tabs)
  - Environment details (Portal/IDE/Ops tabs)
  - Use case categories
- **Personas**: Sales, Training

#### 33. **ExpandableSection**
Initially collapsed content that expands
- **Props**: `title`, `preview`, `fullContent`, `defaultExpanded?`
- **Use Cases**:
  - Technical deep-dives
  - Optional detailed explanations
  - "Learn more" sections
- **Personas**: Architects, Developers

#### 34. **ImageCarousel**
Swipeable image gallery with captions
- **Props**: `images[{imagePrompt, caption?, description?}]`, `autoPlay?`, `interval?`
- **Use Cases**:
  - Platform screenshots
  - Architecture diagrams walkthrough
  - Case study images
- **Personas**: Sales, Training

#### 35. **StepWizard**
Multi-step interactive guide
- **Props**: `steps[{title, content, validation?}]`, `currentStep`, `onComplete`
- **Use Cases**:
  - Onboarding walkthrough
  - Assessment wizard
  - Configuration guide
- **Personas**: Developers, Training

---

### CATEGORY H: SALES & POSITIONING (5 Templates)

#### 36. **TalkingPoints**
Sales-ready bullet points with CTA
- **Props**: `title`, `points[]`, `ctaLabel?`, `ctaActionPhrase?`
- **Use Cases**:
  - Objection handling bullets
  - Elevator pitch points
  - Key differentiators
- **Personas**: Sales, Client Principals

#### 37. **ScenarioCard**
Problem/solution scenario format
- **Props**: `scenario`, `problem`, `solution`, `tips[]`, `actionPhrase?`
- **Use Cases**:
  - "Skeptical CIO" handling
  - "Will AI replace me?" response
  - "Custom compliance rules" question
- **Personas**: Sales training, Client Principals

#### 38. **QuoteCard**
Highlighted quote or testimonial
- **Props**: `quote`, `attribution`, `role?`, `company?`, `imagePrompt?`
- **Use Cases**:
  - Case study client quotes
  - Industry analyst quotes
  - Internal champion quotes
- **Personas**: Sales, Executives

#### 39. **ValuePropCard**
Value proposition with audience targeting
- **Props**: `audience`, `headline`, `message`, `benefits[]`, `ctaLabel?`
- **Use Cases**:
  - CIO value proposition
  - CTO value proposition
  - CFO value proposition
- **Personas**: Sales, Client Principals

#### 40. **BattleCard**
Competitive positioning card
- **Props**: `competitor`, `theirPosition`, `ourDifferentiation`, `talkingPoints[]`
- **Use Cases**:
  - vs Globant
  - vs Ascendion (4,000 agents)
  - vs Deloitte
  - vs Sapient
  - vs Grid Dynamics
- **Personas**: Sales, Client Principals

---

### CATEGORY I: CASE STUDIES & PROOF (5 Templates)

#### 41. **CaseStudyCard**
Summary case study with key metrics
- **Props**: `title`, `industry`, `challenge`, `solution`, `results[{metric, value}]`, `quote?`
- **Use Cases**:
  - Healthcare Claims Modernization
  - Retail Omnichannel Platform
  - Financial Regulatory Compliance
- **Personas**: Sales, All personas

#### 42. **ResultsGrid**
Grid of outcome metrics from a case
- **Props**: `title`, `results[{label, before?, after, improvement?}]`
- **Use Cases**:
  - Healthcare: 45-60 days → 7-10 days (7x improvement)
  - Retail: $150M digital revenue in year 1
  - Financial: $10M+ fines avoided
- **Personas**: Sales, Executives

#### 43. **IndustryCard**
Industry-specific capability card
- **Props**: `industry`, `icon`, `capabilities[]`, `regulations[]`, `cases[]`
- **Use Cases**:
  - Healthcare (HIPAA, FHIR, HL7)
  - Financial Services (SOX, PCI-DSS)
  - Retail (EDI, GS1)
- **Personas**: Sales, Architects

#### 44. **ProofPointCard**
Specific proof point with evidence
- **Props**: `claim`, `evidence`, `source`, `metric?`
- **Use Cases**:
  - "13 weeks vs 18-24 months"
  - "$12M annual maintenance reduction"
  - "99.8% accuracy achieved"
- **Personas**: Sales, Client Principals

#### 45. **ClientLogoGrid**
Grid of client/partner logos (anonymized or named)
- **Props**: `title`, `logos[{name, industry, logoPrompt}]`, `columns`
- **Use Cases**:
  - Client references (industry types)
  - Partnership ecosystem
  - Technology integrations
- **Personas**: Sales, Executives

---

### CATEGORY J: CALLS TO ACTION & NAVIGATION (5 Templates)

#### 46. **CTABanner**
Full-width call-to-action banner
- **Props**: `title`, `subtitle?`, `ctaLabel`, `ctaActionPhrase`, `variant: primary|secondary`
- **Use Cases**:
  - "Ready to get started?"
  - "Schedule a demo"
  - "Explore next steps"
- **Personas**: All personas

#### 47. **NextStepsCard**
Guided next actions
- **Props**: `title`, `steps[{action, description, ctaLabel, actionPhrase}]`
- **Use Cases**:
  - After demo: Schedule validation
  - After training: Try hands-on
  - After overview: Deep dive options
- **Personas**: All personas

#### 48. **ContactCard**
Contact information for follow-up
- **Props**: `title`, `contacts[{name, role, email?, phone?, actionPhrase?}]`
- **Use Cases**:
  - Account team contacts
  - Support escalation
  - Expert consultation
- **Personas**: Sales, Support

#### 49. **ResourceLinks**
List of linked resources
- **Props**: `title`, `resources[{title, description, type, url?, actionPhrase?}]`
- **Use Cases**:
  - Documentation links
  - Training materials
  - Reference architectures
- **Personas**: Developers, Architects

#### 50. **NavigationGrid**
Grid of navigation options/topics
- **Props**: `title`, `items[{icon, label, description, actionPhrase}]`, `columns`
- **Use Cases**:
  - Main menu options
  - Topic exploration grid
  - Learning path options
- **Personas**: All personas

---

## Part 4: Template Usage Matrix by Persona

### Client Principals / Sales
| Question | Primary Templates | Secondary Templates |
|----------|------------------|---------------------|
| "How do I pitch to a CIO?" | ValuePropCard, TalkingPoints | ScenarioCard, BattleCard |
| "Show me competitive positioning" | ComparisonTable, BattleCard | ScoreCard |
| "What's the pricing?" | PricingCards, TimelineHorizontal | MetricsGrid |
| "Give me proof points" | CaseStudyCard, ResultsGrid, QuoteCard | ProofPointCard |

### Developers / Engineers
| Question | Primary Templates | Secondary Templates |
|----------|------------------|---------------------|
| "How does it work?" | FlowDiagram, ProcessSteps | ArchitectureDiagram |
| "What tech is supported?" | IconGrid, DataTable | FeatureList |
| "Will it replace me?" | StatHighlight, TalkingPoints | ScenarioCard |
| "How do I use Super Spec?" | ConceptCard, FlowDiagram | AccordionList |

### Architects
| Question | Primary Templates | Secondary Templates |
|----------|------------------|---------------------|
| "Show me the architecture" | ArchitectureDiagram, LayerDiagram | ComponentDiagram |
| "What are the 10 components?" | ComponentDiagram, AccordionList | FeatureList |
| "How does Context Library work?" | ConceptCard, FeatureList | DataFlowDiagram |
| "Integration patterns?" | DataFlowDiagram, DataTable | IconGrid |

### Executives
| Question | Primary Templates | Secondary Templates |
|----------|------------------|---------------------|
| "What's the business case?" | MetricsGrid, BarChart, StatHighlight | PieChart |
| "Show me market position" | ComparisonTable, ScoreCard | BattleCard |
| "ROI timeline?" | LineChart, TimelineHorizontal | GanttChart |
| "Risk mitigation?" | ChecklistCard, FeatureList | ScenarioCard |

### Delivery / Project Managers
| Question | Primary Templates | Secondary Templates |
|----------|------------------|---------------------|
| "What's the delivery timeline?" | TimelineHorizontal, GanttChart | ProcessSteps |
| "What are the phases?" | ProcessSteps, TimelineVertical | ThreeColumnLayout |
| "Implementation checklist?" | ChecklistCard | NumberedList |
| "Resource planning?" | GanttChart | DataTable |

---

## Part 5: Example Question → Template Combinations

### Example 1: Sales pitching to CIO about Legacy Modernization

**User asks**: "How do I pitch legacy modernization to a skeptical CIO?"

**Catherine responds with template stack**:
1. **ValuePropCard** (CIO-specific) — "Finally, a path to modernize without billion-dollar transformation"
2. **BeforeAfter** — COBOL mainframe → Cloud microservices
3. **ThreeColumnLayout** — 3-3-3 phases explained
4. **ResultsGrid** — Healthcare case: 45-60 days → 7-10 days
5. **QuoteCard** — "We thought we'd be stuck with our mainframe forever..."
6. **ScenarioCard** — "Skeptical CIO" handling strategy
7. **CTABanner** — "Schedule a validation workshop"

### Example 2: Developer learning about Super Spec

**User asks**: "How does the Super Spec workflow work?"

**Catherine responds with template stack**:
1. **ConceptCard** — What is the Super Spec?
2. **FlowDiagram** — Requirements → Spec → Code → Deploy → Evolve
3. **ThreeColumnLayout** — ADRs, Functional Reqs, UX Designs
4. **FeatureList** — What the Super Spec contains
5. **ProcessSteps** — How to modify spec and regenerate
6. **TalkingPoints** — "Modify the spec, don't hack the code"
7. **NextStepsCard** — Try it hands-on

### Example 3: Architect exploring the 10 components

**User asks**: "Walk me through the AI/Works platform components"

**Catherine responds with template stack**:
1. **ArchitectureDiagram** — Full platform overview
2. **ComponentDiagram** — Interactive 10-component breakdown
3. **AccordionList** — Each component details (expandable)
4. **LayerDiagram** — LLMs → Control Plane → Environments
5. **TabContent** — Tabs for each major component group
6. **FeatureList** — Context Library contents
7. **ResourceLinks** — Technical documentation

### Example 4: CFO evaluating costs

**User asks**: "What's the financial case for AI/Works?"

**Catherine responds with template stack**:
1. **MetricsGrid** — 40-60% cost reduction, 70% maintenance freed
2. **BarChart** — Before/after cost comparison
3. **PieChart** — IT budget allocation (maintenance trap)
4. **LineChart** — ROI trajectory over 90 days
5. **PricingCards** — $675K - $2.35M fixed price phases
6. **ResultsGrid** — Case study: $12M maintenance reduction
7. **ProofPointCard** — Specific financial outcomes

---

## Part 6: Implementation Priority

### Wave 1: Core Foundation (15 Templates)
*Most frequently used across all personas and questions*

1. MetricsGrid
2. ComparisonTable
3. FeatureList
4. FlowDiagram
5. TimelineHorizontal
6. ConceptCard
7. CardGrid
8. TalkingPoints
9. CTABanner
10. ProcessSteps
11. ThreeColumnLayout
12. IconGrid
13. AccordionList
14. StatHighlight
15. CaseStudyCard

### Wave 2: Depth & Visualization (15 Templates)
*Add depth for specialized conversations*

16. ArchitectureDiagram
17. BarChart
18. PricingCards
19. BeforeAfter
20. ValuePropCard
21. BattleCard
22. ScenarioCard
23. QuoteCard
24. ChecklistCard
25. NumberedList
26. TabContent
27. ComponentDiagram
28. ResultsGrid
29. DataTable
30. NextStepsCard

### Wave 3: Complete Experience (20 Templates)
*Full coverage for all use cases*

31. PieChart
32. LineChart
33. LayerDiagram
34. DataFlowDiagram
35. TimelineVertical
36. GanttChart
37. RoadmapView
38. TwoColumnContent
39. ParagraphBlock
40. ExpandableSection
41. ImageCarousel
42. StepWizard
43. ScoreCard
44. IndustryCard
45. ProofPointCard
46. ClientLogoGrid
47. ContactCard
48. ResourceLinks
49. NavigationGrid
50. SplitContent (already exists)

---

## Part 7: Design Principles

All 50 templates MUST follow:

### 🚨 #1 PRIORITY: Volumetric Navigation

**THIS IS THE MOST IMPORTANT RULE**

Every clickable element in every template MUST:
1. Have `cursor-pointer` (via `.glass-card-clickable` or explicit)
2. Call `notifyTele(actionPhrase)` on click
3. Include an `actionPhrase` prop for dynamic content
4. Play click sound via `useSound` hook

**NO DEAD ENDS. EVER.**

```tsx
// Every card, button, list item, metric, icon...
onClick={() => {
  playClick();
  notifyTele(actionPhrase);
}}
```

### Visual Standards
- **Centralized CSS** — Use classes from `src/index.css` only
- **8-Color Palette** — mist, onyx, flamingo, wave, turmeric, jade, sapphire, amethyst
- **Glass Morphism** — Light blur (`backdrop-blur-sm`), transparent backgrounds
- **10% Image Transparency** — Zoom + opaque on hover

### Interaction Standards
- **Volumetric Navigation** — EVERY click continues the conversation
- **Thinking Sound** — Plays when loading content
- **Avatar Animation** — Shows loading state with rings/glow
- **Click Sound** — Plays on every interactive element click

### Technical Standards
- **Responsive** — Work on mobile, tablet, desktop
- **Accessible** — ARIA labels, keyboard navigation
- **Lazy Loading** — Templates lazy-loaded via registry
- **TypeScript** — Full type definitions for all props
- **actionPhrase Required** — Every clickable content item needs actionPhrase prop

---

## Part 8: Risk Mitigation

### 🔴 Critical Risks (Must Prevent)

| Risk | Prevention |
|------|------------|
| **Dead-end clicks** | EVERY clickable → `handleAction(actionPhrase)` |
| **Forgot to register** | Checklist Step 3 in add-glass.md |
| **Template not documented** | Checklist Step 4 in add-glass.md |
| **Tele sends wrong props** | JSON schema + common mistakes in glass-prompt.md |

### 🟠 High Risks (Must Check)

| Risk | Prevention |
|------|------------|
| **TypeScript errors** | Run `npx tsc --noEmit` after each template |
| **CSS breaks aesthetic** | Only use centralized classes from index.css |
| **Responsive issues** | Test mobile + desktop visually |
| **Props mismatch** | Schema in glass-prompt.md must match interface |

### 🟡 Medium Risks (Monitor)

| Risk | Prevention |
|------|------------|
| **Image generation fails** | SmartImage has fallback to placeholder |
| **Bundle size grows** | Lazy loading already implemented |
| **Empty arrays crash** | Add null checks: `items?.map` |

---

## Part 9: Template Generation Checklist

### Before Starting Any Template
```
□ Review the template plan (props, use cases)
□ Check if similar template already exists
□ Identify CSS classes needed
□ Identify if images are needed (pre-gen vs AI)
```

### After Creating Each Template
```
□ TypeScript compiles: npx tsc --noEmit
□ Registered in templateRegistry.ts
□ Documented in glass-prompt.md with:
   □ USE WHEN triggers
   □ JSON schema with types
   □ Example valid JSON
□ All clickable elements have handleAction(actionPhrase)
□ Tested visually in browser
□ Tested via Tele conversation
```

### After Completing Each Wave
```
□ All templates in wave compile
□ All templates render correctly
□ Tele can use all templates
□ Volumetric navigation works (clicks continue conversation)
□ Commit and push with clear message
```

---

## Part 10: Next Steps

### Implementation Order
1. **Wave 1 (15 templates)**: Core Foundation
2. **Wave 2 (15 templates)**: Depth & Visualization
3. **Wave 3 (20 templates)**: Complete Experience

### Per-Template Process
1. Create component in `src/components/templates/`
2. Register in `templateRegistry.ts`
3. Document in `glass-prompt.md`
4. Run verification checklist
5. Test in browser
6. Test via Tele

### Batch Approach
- Generate 3-5 templates at a time
- Verify TypeScript after each batch
- Test visually after each batch
- Commit after each verified batch

---

*This comprehensive plan ensures the AI/Works internal enablement platform can handle any question from any persona, selling to any stakeholder, with reusable visual components that maintain brand consistency and design excellence.*

*All risks have been documented with prevention strategies. The verification checklist ensures no template is shipped with issues.*
