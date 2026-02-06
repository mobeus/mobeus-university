# navigateToSection Tool
> v3.0 | CashCo Mortgage Concierge | 21 Templates

## Function Signature

```typescript
navigateToSection(payload: NavigationPayload): void
```

## Payload Schema

```json
{
  "badge": "string (required)",
  "title": "string (required)",
  "subtitle": "string (optional)",
  "generativeSubsections": [
    {
      "id": "unique-id",
      "templateId": "TemplateName",
      "props": { "template-specific properties" }
    }
  ]
}
```

---

<!-- TEMPLATE-SCHEMAS-START -->

## 🎨 TEMPLATES (21)

### LAYOUT

#### Hero
Primary landing.
```json
{ "headline": "Smart Financing", "description": "Non-QM mortgages", "ctaLabel": "Get Started", "ctaActionPhrase": "show me mortgage estimate" }
```

#### Split
Two columns comparison.
```json
{
  "leftContent": { "headline": "Purchase to Rent", "body": "Long-term income." },
  "rightContent": { "headline": "Purchase to Flip", "body": "Short-term profits." }
}
```

#### Banner
Call to action bar.
```json
{ "headline": "Get Your Estimate", "subheadline": "30 days", "ctaLabel": "Start Now", "ctaActionPhrase": "show me mortgage estimate", "variant": "gradient" }
```

---

### TEXT

#### Paragraph
Short text block.
```json
{ "text": "CashCo provides non-QM mortgages for investment properties." }
```

#### Article
Long-form content.
```json
{ "title": "Non-QM Financing Guide", "description": "Flexible qualification for rental and flip properties." }
```

#### Quote
Highlighted quote.
```json
{ "quote": "Your property. Our expertise.", "author": "CashCo Team", "role": "Investor Financing Specialists" }
```

#### MediaText
Text + image or two-column layouts.

**Text + Image:**
```json
{
  "headline": "Two Investment Paths",
  "text": "Rental or flip financing.",
  "assetId": "mortgage-paths",
  "imagePosition": "right"
}
```

**Two Columns:**
```json
{
  "leftContent": { "headline": "Rental", "body": "Monthly income" },
  "rightContent": { "headline": "Flip", "body": "Sale profits" }
}
```

---

### DATA

#### Stats
Key metrics.
```json
{ "stats": [{ "value": "5.5%", "label": "Interest Rate" }, { "value": "30", "label": "Days Valid" }] }
```

#### Metric
Single large number.
```json
{ "value": "$450,000", "label": "Purchase Price", "icon": "DollarSign" }
```

#### Table
Data table.
```json
{ "headers": ["PropertyType", "Data Required"], "rows": [["Rental", "Price, Rent, Taxes"], ["Flip", "Price, Renovation, Sale"]] }
```

---

### LISTS

#### List
Bulleted list.
```json
{ "items": ["Purchase Price", "Monthly Rent", "Property Taxes", "Insurance"] }
```

#### Trio
Three-column cards.
```json
{
  "cards": [
    { "icon": "Shield", "title": "Non-Binding", "description": "30-day estimate" },
    { "icon": "Zap", "title": "Fast Approval", "description": "Non-QM flexibility" },
    { "icon": "TrendingUp", "title": "Both Paths", "description": "Rental or flip" }
  ],
  "numbered": false
}
```

#### WelcomeCarousel
Auto-scrolling welcome.
```json
{
  "cards": [
    { "question": "Purchase to Rent?", "subtext": "Rental income", "icon": "Home", "actionPhrase": "show me rental financing" },
    { "question": "Purchase to Flip?", "subtext": "Flip profits", "icon": "Hammer", "actionPhrase": "show me flip financing" }
  ]
}
```

---

### COMPARISON

#### Steps
Numbered process flow.
```json
{ "items": [{ "title": "Intent", "description": "Rent or flip?" }, { "title": "Data", "description": "Property details" }] }
```

#### Compare
Side-by-side comparison.
```json
{
  "leftOption": { "title": "Rental", "features": ["Monthly income", "Long-term"] },
  "rightOption": { "title": "Flip", "features": ["Sale profits", "Short-term"] }
}
```

---

### INTERACTIVE (Mortgage-Specific)

#### MortgageReview
**Interactive mortgage calculator with real-time updates.**

Shows calculated monthly payments with interactive controls for down payment, interest rate, and loan term. Users can adjust sliders/buttons, or the tele can update values conversationally.

```json
{
  "propertyAddress": "123 Main St, Austin, TX",
  "purchasePrice": 450000,
  "propertyType": "rental",
  "expectedMonthlyRent": 3200,
  "annualPropertyTaxes": 9000,
  "annualInsurance": 2250,
  "defaultDownPayment": 45000,
  "defaultInterestRate": 5.5,
  "defaultTerm": 30
}
```

**For Flip Properties:**
- Omit `expectedMonthlyRent`
- Use `propertyType: "flip"`
- Estimate taxes: `purchasePrice * 0.02`
- Estimate insurance: `purchasePrice * 0.005`

**Tele Can Update Dynamically:**
```javascript
window.updateMortgageReview({ defaultDownPayment: 90000 })
window.updateMortgageReview({ defaultInterestRate: 6.0 })
window.updateMortgageReview({ defaultTerm: 15 })
```

**Example User Interactions:**
- User: "Show me with 20% down" → `window.updateMortgageReview({ defaultDownPayment: 90000 })`
- User: "What if the rate is 6%?" → `window.updateMortgageReview({ defaultInterestRate: 6.0 })`
- User: "Compare with a 15-year loan" → `window.updateMortgageReview({ defaultTerm: 15 })`

#### ComplianceConsent
**Interactive compliance disclaimer with explicit confirmation.**

Displays mandatory compliance statement requiring user acknowledgment via button click or voice command.

```json
{ "statement": "This mortgage estimate is not legally binding and is valid for 30 days.", "confirmActionPhrase": "yes" }
```

**Props:**
- `icon` (optional): Shield, AlertTriangle, Info
- `badge` (optional): COMPLIANCE, DISCLOSURE, IMPORTANT
- `headline` (optional): Important Disclosure
- `statement` (required): The compliance text
- `confirmLabel` (optional): I Understand
- `confirmActionPhrase` (required): yes
- `variant` (optional): default, warning, info

**User Interaction:**
- Click "I Understand" button → Sends confirmActionPhrase automatically
- Say "yes" (or the confirmActionPhrase) → Tele receives confirmation

**Example:**
```json
{
  "statement": "This mortgage estimate is not legally binding and is valid for 30 days.",
  "confirmActionPhrase": "yes"
}
```

When user clicks button or says "yes", tele receives "yes" and can proceed to next step.

#### RentalPropertyReview
**Review rental property data with AI-generated property image.**

Displays all 5 rental data points plus net cash flow calculation with property image and confirmation buttons.

```json
{
  "propertyAddress": "123 Main St, Austin, TX",
  "purchasePrice": 450000,
  "expectedMonthlyRent": 3200,
  "annualPropertyTaxes": 9000,
  "annualInsurance": 2250,
  "assetId": "rental-property",
  "editActionPhrase": "edit details",
  "confirmActionPhrase": "yes"
}
```

**User Interaction:**
- Click "Edit Details" → Sends editActionPhrase
- Click "Looks Good" → Sends confirmActionPhrase and proceeds

#### FlipPropertyReview
**Review flip property data with AI-generated renovation image.**

Displays all 4 flip-specific data points plus calculated profit with renovation image and confirmation buttons.

```json
{
  "propertyAddress": "789 Oak Ave, Dallas, TX",
  "purchasePrice": 300000,
  "renovationCosts": 75000,
  "expectedSalePrice": 450000,
  "assetId": "flip-property",
  "editActionPhrase": "edit details",
  "confirmActionPhrase": "yes"
}
```

**User Interaction:**
- Click "Edit Details" → Sends editActionPhrase
- Click "Looks Good" → Sends confirmActionPhrase and proceeds

#### RentalDataCapture
**Conversational form to capture all rental property data at once.**

Displays input fields for all 5 required data points with real-time validation and AI-generated property image.

```json
{
  "headline": "Rental Property Details",
  "subheadline": "Provide your property information",
  "assetId": "rental-property",
  "submitLabel": "Calculate Estimate",
  "submitActionPhrase": "submit rental data"
}
```

**Optional Pre-fill Props:**
- `defaultPropertyAddress` (string)
- `defaultPurchasePrice` (number)
- `defaultExpectedMonthlyRent` (number)
- `defaultAnnualPropertyTaxes` (number)
- `defaultAnnualInsurance` (number)

**User Interaction:**
- User fills all 5 fields
- Submit button enables when all fields valid
- Click submit → Sends `submitActionPhrase` + JSON data

**Data Sent to Tele:**
```json
{
  "propertyAddress": "123 Main St, Austin, TX",
  "purchasePrice": 450000,
  "expectedMonthlyRent": 3200,
  "annualPropertyTaxes": 9000,
  "annualInsurance": 2250
}
```

#### FlipDataCapture
**Conversational form to capture all flip property data at once.**

Displays input fields for all 4 required data points plus calculated profit preview with AI-generated renovation image.

```json
{
  "headline": "Flip Property Details",
  "subheadline": "Provide your flip project information",
  "assetId": "flip-property",
  "submitLabel": "Calculate Estimate",
  "submitActionPhrase": "submit flip data"
}
```

**Optional Pre-fill Props:**
- `defaultPropertyAddress` (string)
- `defaultPurchasePrice` (number)
- `defaultRenovationCosts` (number)
- `defaultExpectedSalePrice` (number)

**User Interaction:**
- User fills all 4 fields
- Live profit calculation shows as fields are filled
- Submit button enables when all fields valid
- Click submit → Sends `submitActionPhrase` + JSON data

**Data Sent to Tele:**
```json
{
  "propertyAddress": "789 Oak Ave, Dallas, TX",
  "purchasePrice": 300000,
  "renovationCosts": 75000,
  "expectedSalePrice": 450000
}
```

---

<!-- TEMPLATE-SCHEMAS-END -->

## 🎯 SHOT PROMPTS

### Shot 1: "What is CashCo?"

**User:** "What is CashCo?" / "Tell me about your services"

**Tele:** "Let me show you."

**Call:**
```json
{
  "badge": "ABOUT",
  "title": "Smart Financing for Smart Investors",
  "generativeSubsections": [
    {
      "id": "two-paths",
      "templateId": "Split",
      "props": {
        "leftContent": {
          "headline": "Purchase to Rent",
          "body": "Long-term rental income strategy. Build wealth through appreciation and monthly cash flow."
        },
        "rightContent": {
          "headline": "Purchase to Flip",
          "body": "Short-term renovation profits. Quick turnaround financing for fix-and-flip investors."
        }
      }
    },
    {
      "id": "benefits",
      "templateId": "Trio",
      "props": {
        "cards": [
          { "icon": "Shield", "title": "Non-Binding", "description": "30-day estimates" },
          { "icon": "Zap", "title": "Fast Approval", "description": "Non-QM flexibility" },
          { "icon": "TrendingUp", "title": "Both Paths", "description": "Rental or flip" }
        ]
      }
    }
  ]
}
```

---

### Shot 2: "Show me rental financing"

**User:** "Show me rental financing" / "Purchase to rent"

**Tele:** "Let's calculate your rental property financing."

**Call:**
```json
{
  "badge": "RENTAL FINANCING",
  "title": "Purchase to Rent",
  "generativeSubsections": [
    {
      "id": "rental-info",
      "templateId": "MediaText",
      "props": {
        "headline": "Generate Rental Income",
        "text": "Long-term wealth through monthly cash flow and property appreciation.",
        "assetId": "rental-property"
      }
    },
    {
      "id": "data-needed",
      "templateId": "List",
      "props": {
        "headline": "Data We Need",
        "items": [
          "Property Address",
          "Purchase Price",
          "Expected Monthly Rent",
          "Annual Property Taxes",
          "Annual Insurance"
        ]
      }
    }
  ]
}
```

**Then immediately:** Start collecting data in sequence.

---

### Shot 3: "Show me flip financing"

**User:** "Show me flip financing" / "Fix and flip"

**Tele:** "Let's structure financing for your flip."

**Call:**
```json
{
  "badge": "FLIP FINANCING",
  "title": "Purchase to Flip",
  "generativeSubsections": [
    {
      "id": "flip-info",
      "templateId": "MediaText",
      "props": {
        "headline": "Maximize Flip Profits",
        "text": "Short-term renovation financing with competitive rates for quick turnarounds.",
        "assetId": "flip-property"
      }
    },
    {
      "id": "data-needed",
      "templateId": "List",
      "props": {
        "headline": "Data We Need",
        "items": [
          "Property Address",
          "Purchase Price",
          "Renovation Costs",
          "Expected Sale Price"
        ]
      }
    }
  ]
}
```

**Then immediately:** Start collecting data (any order).

---

### Shot 4: "Compare rental vs flip"

**User:** "What's the difference?" / "Which should I choose?"

**Tele:** "Here's the comparison."

**Call:**
```json
{
  "badge": "COMPARISON",
  "title": "Rental vs Flip",
  "generativeSubsections": [
    {
      "id": "path-comparison",
      "templateId": "Compare",
      "props": {
        "leftOption": {
          "title": "Purchase to Rent",
          "features": [
            "Monthly rental income",
            "Long-term appreciation",
            "5.5% interest rate",
            "10% down payment",
            "Stable cash flow"
          ]
        },
        "rightOption": {
          "title": "Purchase to Flip",
          "features": [
            "Sale profit on exit",
            "Short-term investment",
            "6.5% interest rate",
            "20% down payment",
            "Quick turnaround"
          ]
        }
      }
    }
  ]
}
```

---

## 📐 JSON RULES

1. **Props Structure:** All template data goes in `props`, never at root
2. **Exact Names:** Use exact prop names from template definitions
3. **Required Fields:** `badge` and `title` always required in payload
4. **IDs:** Each subsection needs unique `id`

---

## ✅ BEST PRACTICES

- **Always combine 2-4 templates** for complete experiences
- **Use assetId** for AI-generated images when showing properties
- **Include actionPhrase** on clickable elements
- **Keep text concise** - let templates do the visual work
- **Match template to data** - don't force complex data into simple templates

---

_v3.0 | 21 Core Templates | Your Property. Our Expertise._

