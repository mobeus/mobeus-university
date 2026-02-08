---
description: Teach your tele new facts, stories, or domain knowledge
---

# /teach — Teach Your Tele Something

Add facts, stories, data, and expertise to what your tele knows.

---

## What Is Knowledge?

Knowledge = the facts your tele uses to answer questions.

**Good knowledge:**
- Company history, mission, founders
- Product features and how they work
- Customer stories and results
- Statistics and real numbers
- Common questions and answers

**Not knowledge:**
- How to format responses (that's in glass-prompt.md)
- Visual templates (those are built in)
- Marketing fluff with no facts

## How to Add

Just tell the Build Agent what to teach:
- "Teach the tele that we were founded in 2021 by two people"
- "Add this customer story: Acme Corp saved $40K/month using our platform"
- "Add a FAQ: What's the pricing? Starter is $99/mo, Pro is $299/mo"

The Build Agent will add it to `public/prompts/tele-knowledge.md` in the right place.

## Guidelines

- **Be specific** — "1,247 customers" not "many customers"
- **Use real numbers** — "47% faster" not "significantly faster"
- **Tell stories** — "Acme Corp saved $40K" not "It works well"
- **Keep it factual** — No opinions, no hype, no unverified claims

## Limits

- `tele-knowledge.md` can be **max 750 lines**
- If it's getting long, the Build Agent will help consolidate

## After Teaching

1. `/check` — Verify the knowledge is structured correctly
2. `/publish` — Push live

---

_The Screen Finally Cares_
