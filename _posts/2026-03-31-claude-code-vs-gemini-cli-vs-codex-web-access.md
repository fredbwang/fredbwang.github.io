---
layout: post
title: "How AI Agents See the Web: Claude Code vs Gemini CLI vs Codex"
date: 2026-03-31
---

With the Claude Code source code leak trending, people are posting crazily about what is arguably the best terminal agent. I want to poke at it from a smaller angle -- how it accesses the web.

When people say an AI coding agent can "use the web," that phrase papers over the most interesting systems question in all of agentic AI right now: *where exactly does the web boundary sit?* Is the agent making raw HTTP requests from your laptop? Delegating to a hosted search API? Mixing both? And what happens at the kernel level when it tries?

I spent a few hours reading source code for all three (with the help of AI >_>) — Claude Code (TypeScript), Gemini CLI (TypeScript), and Codex (Rust + TypeScript), TS is the future huh? — and came away thinking these represent three genuinely different philosophies. Not just of web access, but of what an agent *is*.

## Codex: the web does not exist (unless the platform says so)

Codex is the most restrictive of the three, and it is not close. The Rust codebase in `codex-rs/` defines exactly one web-facing tool: `web_search`. There is no `web_fetch`. No URL retrieval tool. No browser agent. The agent simply cannot fetch an arbitrary URL.

That is a deliberate architectural choice, and it goes deep. On macOS, Codex wraps every spawned command in Apple's Seatbelt sandbox (`/usr/bin/sandbox-exec`), which blocks outbound network at the kernel level. On Linux, `init_firewall.sh` flushes iptables, allowlists DNS and localhost, resolves a configurable domain set (default: just `api.openai.com`) into an ipset, then sets default policies to DROP. Unmatched traffic gets REJECT (RST for TCP, ICMP port-unreachable for UDP) — not silent DROP — so the agent sees immediate failures rather than hanging. On Windows, COM-based firewall rules create a fail-closed system: block all non-loopback outbound, then block loopback too, carving out a narrow exception only for the sandbox proxy port. When the sandbox is active, `CODEX_SANDBOX_NETWORK_DISABLED=1` is set as an environment variable.

The `web_search` tool itself delegates entirely to the OpenAI Responses API — with an `external_web_access` toggle controlling live-vs-cached results. The agent never touches a socket. The web is not the agent's problem; it is the platform's problem. The tradeoff is clean — auditable, governable — but it means Codex cannot read a specific documentation page or fetch a JSON API. It trades capability for confinement.

## Gemini CLI: the web as a decomposed toolbox

Gemini CLI takes the opposite approach. It gives the agent a full stack of web primitives and trusts layered policy to keep things safe.

The `web_fetch` tool lives in `packages/core/src/tools/web-fetch.ts` and operates with a highly structured pipeline:
- **Fetching:** Accepts a prompt containing URLs, then fetches them via Node's native `fetch()` (with `undici` configuring the global dispatcher) at a 10-second timeout.
- **Processing:** Converts HTML to plain text via `html-to-text`. Content is capped at 250,000 characters per URL — and in the fallback path, a water-filling algorithm distributes this budget across multiple URLs.
- **Model Delegation:** The fetched content is not returned raw — it is sent through the Gemini API as a secondary model call (model: `web-fetch`) for processing.
- **Fallbacks:** If that fails, a fallback re-embeds raw content in XML `<source>` tags and retries (`web-fetch-fallback`). An experimental mode (`executeExperimental`) bypasses the API entirely.

Alongside fetch, `google_web_search` delegates to the Gemini API's grounding infrastructure. The response includes `groundingChunks` (source URIs and titles) and `groundingSupports` (byte-level segment offsets). The tool uses `TextEncoder`/`TextDecoder` to insert `[1]`, `[2]` citation markers at correct UTF-8 byte positions. This is real citation plumbing, not cosmetic footnotes.

The security model is serious. `isPrivateIpAsync()` resolves hostnames and checks whether resolved IPs fall into private ranges — localhost, RFC 1918, link-local, multicast, IANA benchmark subnets — a defense against DNS rebinding, not just static IP checks. Per-host rate limiting caps requests at 10 per 60-second window. Only HTTP/HTTPS is allowed. GitHub blob URLs are rewritten to `raw.githubusercontent.com`. A policy engine layers allow/deny/ask-user decisions over every invocation.

While both Gemini and Claude (as we will see next) decompose the web into separate "search" and "fetch" actions, their philosophies diverge on where the complexity belongs. Gemini's tools are certainly not "thin" in terms of code—they are thick with networking infrastructure, fallback mechanisms, and DNS rebinding checks—but they treat the *content* neutrally. The tool acts as a secure, modular pipe that marshals data before delegating the heavy semantic processing to the core models.

## Claude Code: content over method

Claude Code sits in an interesting middle ground. And it seems that it treats web as information itself rather than a method to retrieve information. It has both a `WebFetchTool` for direct URL retrieval and a `WebSearchTool` that delegates to Anthropic's server-side `web_search_20250305` beta API. The two tools serve different purposes and have different trust models.

The fetch path uses `axios` with a 60-second timeout, 10MB max content size, and 10 max redirects. HTML is converted to Markdown using `turndown` (lazy-loaded to defer ~1.4MB of heap), then truncated to 100K characters. But here is what makes it distinctive: the fetched Markdown is then passed to Claude Haiku as a secondary model call for content extraction. 

The prompt for this extraction step is heavily scoped. For non-preapproved domains, it enforces strict compliance rules:
> - Enforces a 125-character quote limit
> - Prohibits word-for-word copying
> - Blocks song lyrics explicitly
> - Disclaims legal authority ("You are not a lawyer")

That is copyright-aware content extraction baked right into the fetch pipeline. And there is an interesting extensibility story: the tool prompt explicitly says that if an MCP-provided web fetch tool is available, prefer it over the built-in one. Claude Code essentially treats its own fetch as a fallback, not a primary.

The permission model is the most granular of the three. A preapproved list of ~100 domains (Python docs, MDN, React, Rust, AWS, GCP, Azure, etc.) lets the agent fetch documentation without confirmation. Everything else requires a preflight check against `api.anthropic.com/api/web/domain_info` (5-minute cache). URLs with embedded credentials are rejected. Single-label hostnames are rejected. Redirects only follow same-host (with `www.` stripping), same-protocol, same-port targets — cross-origin redirects are blocked and reported. HTTP is upgraded to HTTPS. Responses are cached in a 50MB LRU with 15-minute TTL. But this also means that Claude does a lot more logic and stitching locally than Gemini, which makes it a thicker tool.

The search path is entirely server-side — it calls Anthropic's web search API with streaming support. The agent typically uses search to discover URLs, then fetch to read them.

## Where they put the boundary

The real insight from reading all three codebases is that each one answers a different version of the question "what is the agent allowed to touch?"

**Codex** says: almost nothing. The network is locked down at the kernel level; search is a platform service with configurable live-vs-cached modes. This is the easiest model to secure but the least capable for ad hoc retrieval.

**Gemini CLI** says: everything, but through controlled primitives. The agent gets search and fetch as distinct core tools, each with its own security surface — DNS-rebinding-aware private IP checks, rate limiting, protocol restrictions, size caps. This is the most capable but the hardest to audit.

**Claude Code** says: direct fetch with domain-level permissions, plus hosted search as a separate path. The copyright-aware extraction pipeline and preapproved host list make it the most opinionated about what content processing *means*, not just what network access means.

These are not just engineering tradeoffs. They reflect different beliefs about what kind of thing a coding agent is. Is it a sandboxed process that should never see the network? Is it a power user with its own HTTP client? Or is it something in between — a system that can fetch a URL but must process the result through a content-aware compliance layer?

It's surprising that Claude is not the "safest" or the most conservative of all, but it is the most unique about what content processing *means*. And it's probably for the reason that they believe their model is safe enough that it can defend against prompt injection attack better than the others.

**I'd rather the industry do not converge**, because diversity (although the word has been polluted in recent years) is critical for the ecosystem. With AI it's even more important that not just models have personas, but also the toolsets, systems, companies and even communities. We wouldn't want a world where all AIs are dull and behave the same, right?