---
description: Sync local prompt files to Teleglass — make your tele go live
---

# Publish to Teleglass

Push your tele's brain to the cloud. After editing knowledge or prompts locally, `/publish` syncs everything to the Teleglass backend — and your Runtime Agent instantly gets smarter.

## When to Use

- After editing `public/prompts/tele-knowledge.md` (what your tele knows)
- After editing `public/prompts/glass-prompt.md` (how your tele responds)
- After adding new shot prompts
- After any knowledge or behavior changes

## Steps

### Pre-Publish Checks (Recommended)

// turbo
1. Run the quick audit to verify alignment:
   ```bash
   echo "=== PRE-PUBLISH CHECK ===" && \
   echo "tele-knowledge.md: $(wc -l < public/prompts/tele-knowledge.md) lines (max 500)" && \
   echo "glass-prompt.md: $(wc -l < public/prompts/glass-prompt.md) lines (max 1500)" && \
   echo "Shot prompts: $(grep -c '^### ' public/prompts/glass-prompt.md) (max 12)" && \
   npx tsc --noEmit 2>&1 | tail -3
   ```

For a full audit, run `/audit-tele` before publishing.

### Publish

// turbo
1. Run the publish script:
   ```bash
   node scripts/publish.cjs
   ```

2. Watch for the success message:
   ```
   [+] Successfully published X component(s) and regenerated system prompt
   ```

3. That's it. Your tele is now upgraded. No restart needed.

## How It Works

```
┌─────────────────────────────────────────────────────────────┐
│  YOUR LOCAL FILES                                           │
│  ├── public/prompts/tele-knowledge.md  (what tele knows)      │
│  └── public/prompts/glass-prompt.md (how tele responds)    │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  PUBLISH SCRIPT                                             │
│     node scripts/publish.cjs                                │
│     → Reads files from public/prompts/, POSTs to Teleglass │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  TELEGLASS CLOUD                                            │
│     https://prompt.mobeus.ai                                │
│     → Compares hashes → Updates only changed files         │
│     → Regenerates system prompt                            │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  RUNTIME AGENT (Catherine) — INSTANTLY UPGRADED             │
│     → New knowledge available immediately                   │
│     → New shot prompts active                               │
│     → Zero downtime, zero restart                          │
└─────────────────────────────────────────────────────────────┘
```

## Example Output

```
[>] Using tenant: mobeus-university

[>] Reading files from public/prompts/...
   ✓ tele-knowledge.md
   ✓ glass-prompt.md

[>] API: https://prompt.mobeus.ai

[>] Publishing to Teleglass...

[+] Successfully published 2 component(s) and regenerated system prompt

[>] Summary:
   New: 0
   Modified: 2
   Unchanged: 0

[>] Published:
   ✓ tele-knowledge.md
   ✓ glass-prompt.md
```

## Key Facts

| Fact | Detail |
|------|--------|
| **Instant** | Changes are live the moment publish succeeds |
| **Smart Sync** | Hash-based — unchanged files skip automatically |
| **Templates Local** | `.tsx` files don't need publishing — they're served from your dev server |
| **No Restart** | Runtime Agent picks up changes immediately |

## [!] Don't Forget

- [+] Changes are **immediately live** after successful publish
- [+] No need to restart or reconnect
- [+] Template code (`.tsx`) stays local — only prompts go to the cloud
- [-] Don't publish if you haven't tested locally first

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "No files found" | Make sure `public/prompts/tele-knowledge.md` exists |
| "Publish failed" | Check your internet connection |
| "Unchanged: all" | Your files haven't changed since last publish (that's fine!) |
