---
title: "Tool-as-Code vs ReAct: What Happens When You Let the LLM Write the Whole Script"
date: "2026-03-18"
description: "I ran 200 benchmarks comparing two LLM tool-calling patterns -- standard ReAct loops vs generating complete Python scripts. The numbers surprised me."
tags: ["llm", "agents", "tool-calling", "engineering", "benchmarks"]
category: "engineering"
---

![Tool-as-Code vs ReAct comparison](/assets/img/blog/tool-as-code-vs-react/hero.svg)

Most LLM agent frameworks use the same pattern: the model calls one tool, reads the result, decides what to do next, calls another tool, reads that result, and so on. This is the ReAct loop. It works, but every tool result flows back into the LLM's context window, the context grows with each round, and you pay for all of it in tokens and latency.

I've been building an LLM agent that uses 20+ tools across multiple REST APIs -- country lookups, geocoding, weather, currency exchange, holiday schedules. The standard ReAct approach works fine for simple queries. But for complex ones that chain 3-8 tools together, I started wondering: what if the LLM just wrote the entire script upfront?

## The idea

Instead of the LLM calling tools one at a time in a loop, what if it generated a complete Python function that chains all the tool calls, executed it locally, and returned just the final result? The tool results would never re-enter the LLM's context. One LLM round instead of N+1.

This is the "tool-as-code" pattern. Anthropic describes a version of it in their [programmatic tool calling docs](https://docs.anthropic.com/en/docs/build-with-claude/tool-use/computer-use) -- the LLM generates code that orchestrates tools, and execution happens outside the model's context.

The key difference: ReAct sends every tool result back to the LLM (growing context, N+1 rounds). Tool-as-Code generates all the code in one shot, executes locally, and tool results never re-enter the LLM context.

## How I built the POC

I set up a simple engine: take a natural language query, send it to GPT-4.1 along with all 20 tool function signatures, and ask it to write an `async def solve()` function. Then execute that function locally with the real tool functions injected into the namespace.

The tools are thin async wrappers around free public REST APIs. They look like this to the LLM:

```python
async def geocode_city(name: str) -> dict:
    """Geocode a city name to latitude/longitude.
    Returns: {"results": [{"name": str, "latitude": float,
              "longitude": float, "country": str}]}
    """

async def get_current_weather(lat: float, lon: float) -> dict:
    """Get current weather at a location.
    Returns: {"current_weather": {"temperature": float,
              "windspeed": float, "weathercode": int}}
    """
```

For the ReAct baseline, I used LangChain's `create_agent` with the same GPT-4.1 model and the same 20 tools wrapped as LangChain tools.

## The queries I tested

I wrote 10 queries that exercise different patterns, scaling from 1-tool lookups to 8+ tool chains:

| Query | What it tests | Tools involved |
|-------|--------------|----------------|
| Q1 | Simple lookup | search countries |
| Q2 | List endpoint | list currencies |
| Q3 | Sequential chain | geocode city + get weather |
| Q4 | Parallel independent | holidays + exchange rate |
| Q5 | 3-way fan-out | country info + sunrise/sunset + universities |
| Q6 | Cross-domain chain | book search + author + country lookup |
| Q7 | 5-tool composition | country + weather + sunrise + holidays + currency |
| Q8 | Multi-country compare | weather + holidays for 2 countries |
| Q9 | 4-country fan-out | weather in 4 Scandinavian capitals |
| Q10 | Multi-country enrichment | 3 countries + holidays + currency for each |

Q9 and Q10 are where it gets interesting -- they require 8+ tool calls across multiple countries, with the LLM needing to understand the dependency graph: find the countries first, extract their capitals, geocode each one, then fan out weather calls in parallel.

## The benchmark

I ran each query 10 times through both approaches (200 total runs) and computed mean, standard deviation, and 95% confidence intervals. This matters because single runs are noisy -- network latency, API response times, and OpenAI's own variability all add up. Ten trials per query gives the Central Limit Theorem enough room to work.

Here's the aggregate:

| Metric | Tool-as-Code | ReAct | Delta |
|--------|-------------|-------|-------|
| Avg LLM rounds | 1.2 | 2.6 | -55% |
| Avg tokens/query | 2,980 | 13,613 | **-78%** |
| Avg input tokens | 2,641 | 13,289 | -80% |
| Success rate | 100/100 | 100/100 | |

The token savings are dramatic. But the more interesting number is the input token pattern: Tool-as-Code uses roughly the same ~2,600 input tokens regardless of query complexity, because the LLM only sees the system prompt + query once. ReAct's input tokens grow with every round as tool results accumulate in the context.

## The per-query breakdown tells the real story

Not all queries benefit equally. Here are all 10 queries with mean +/- standard deviation across 10 trials:

| Query | Tools | TaC tokens (mean +/- sd) | ReAct tokens (mean +/- sd) | Savings |
|-------|-------|--------------------------|----------------------------|---------|
| Q1 | 1 | 2,252 +/- 5 | 4,413 +/- 1,316 | 49% |
| Q2 | 1 | 2,209 +/- 0 | 4,373 +/- 0 | 49% |
| Q3 | 2 | 2,307 +/- 1 | 6,819 +/- 1 | 66% |
| Q4 | 2 | 4,882 +/- 38 | 5,515 +/- 26 | 11% |
| Q5 | 3 | 2,602 +/- 69 | 45,954 +/- 23 | 94% |
| Q6 | 3 | 2,548 +/- 78 | 16,106 +/- 734 | 84% |
| Q7 | 5 | 2,635 +/- 66 | 12,257 +/- 919 | 79% |
| Q8 | 5 | 3,199 +/- 1,275 | 13,066 +/- 25 | 76% |
| Q9 | 8+ | 3,823 +/- 1,789 | 16,472 +/- 1 | 77% |
| Q10 | 8+ | 3,346 +/- 1,741 | 11,154 +/- 9 | 70% |

A few things to note about stability. Most queries have very low variance (coefficient of variation under 3%) for both approaches -- token counts are deterministic when the model takes the same path. The exceptions are Q8-Q10 for TaC (CV 40-52%), where occasional retries on complex multi-country queries inflate tokens. ReAct is remarkably stable across all queries.

Q5 is where the pattern really shines. ReAct used ~46,000 tokens per run because the REST Countries API returns ~4KB of JSON per country, and that full payload flows back into the LLM context on each round. Tool-as-Code used ~2,600 tokens -- the LLM generated all the code in one shot, extracting just the fields it needed.

## Three things I didn't expect

**1. The LLM spontaneously parallelizes**

I never told GPT-4.1 to use `asyncio.gather`. But when the query involves independent tool calls (like fetching weather and sunrise times for the same location), it just does it:

```python
async def solve():
    geo = await geocode_city("Tokyo")
    lat = geo["results"][0]["latitude"]
    lon = geo["results"][0]["longitude"]
    weather, sunrise = await asyncio.gather(
        get_current_weather(lat, lon),
        get_sunrise_sunset(lat, lon))
    return {"temperature": weather["current_weather"]["temperature"],
            "sunrise": sunrise["results"]["sunrise"]}
```

This happened in about 40% of queries. The LLM understood the dependency graph and parallelized where it could. With ReAct, tool calls are always sequential because the agent needs the LLM to decide each next step.

**2. Response structure blindness is the real failure mode**

Early in the POC, the generated code kept failing on things like:

```python
# LLM guessed this:
result["results"]

# Actual API response:
result["data"]
```

The LLM had no way to know the exact JSON response shape from just a docstring like "Returns weather information." It guessed -- and guessed wrong about 30% of the time.

The fix was simple but tedious: I captured the actual JSON response from every tool and added exact schemas to the docstrings:

```python
async def get_current_weather(lat: float, lon: float) -> dict:
    """Get current weather at a location.
    Returns: {"latitude": float, "longitude": float,
              "current_weather": {"temperature": float,
              "windspeed": float, "weathercode": int, "time": str}}
    """
```

After adding exact response schemas to all 20 tools, retries dropped to near zero and success rate hit 100% across the benchmark. This isn't mentioned as a risk in most tool-calling guides, but it's the single most important thing to get right with this pattern.

**3. Cached tokens change the cost equation**

OpenAI caches repeated system prompts. Since ReAct re-sends the system prompt (with all 20 tool schemas) every round, it benefits heavily from caching.

This means the raw token count overstates the cost difference. The real advantage of Tool-as-Code isn't cost -- it's context window efficiency and latency.

## Selective extraction: 92% payload reduction

One benefit I particularly like: the generated code naturally extracts only the fields you asked for. When I ask "What's the temperature and wind speed in Tokyo?", the code returns:

```json
{"city": "Tokyo", "temperature_c": 9.3, "windspeed_kmh": 5.1}
```

The raw API payload was 600+ characters. The extracted result was 56 characters. That's a 92% reduction. With ReAct, the full payload enters the context window whether you need it or not.

## When to use which

This isn't a "Tool-as-Code is always better" conclusion. Here's my honest take:

**Tool-as-Code wins when:**
- Queries chain 3+ tools (the savings scale with complexity)
- You need selective field extraction (not full payloads in context)
- You want composability without deploying new code (new workflows are just natural language queries)
- Context window pressure is a concern (constant ~2,600 tokens vs growing)

**ReAct is simpler and fine when:**
- Queries need 1-2 tool calls (the code-gen overhead isn't worth it)
- You need the LLM to reason about intermediate results before deciding the next step
- Tool response schemas aren't well-documented (ReAct adapts; code-gen crashes)
- You want battle-tested, production-ready frameworks (LangChain, etc.)

## What I'd do differently

If I were building this for production, three things:

1. **Cache generated code by query pattern.** Many queries are structurally similar ("find X, get details, compare Y"). Caching the generated code template and just swapping parameters would eliminate the code-gen latency entirely for repeat patterns.

2. **Hybrid approach.** Use ReAct for simple queries and Tool-as-Code for complex multi-tool chains. A lightweight classifier could route between them based on estimated tool count.

3. **Response schema generation from OpenAPI specs.** Manually adding JSON schemas to 20 docstrings was tedious. Auto-generating them from the actual API specs would make this maintainable.

## The numbers

200 benchmark runs. 10 queries. 10 trials each. Both approaches using GPT-4.1. Same 20 tools across 7 free public APIs. Real API calls to live services.

- 78% token savings (aggregate)
- 55% fewer LLM round-trips
- 80% input token savings
- 92% payload reduction via selective extraction
- 100% success rate for both approaches

The scaling trend is clear:

| Tools in query | Tool-as-Code tokens | ReAct tokens | Token savings |
|---------------|-------------------|-------------|---------------|
| 1 tool | ~2,200 | ~4,400 | 49% |
| 2 tools | ~3,600 | ~6,200 | 11-66% |
| 3 tools | ~2,600 | ~31,000 | 84-94% |
| 5 tools | ~2,900 | ~12,700 | 76-79% |
| 8+ tools | ~3,600 | ~13,800 | 70-77% |

Tool-as-Code tokens are nearly constant (~2,200-4,900) regardless of query complexity. ReAct tokens grow with every tool call because each result flows back into context.

## Try it yourself

The benchmark is a self-contained Python script -- 4 files, no signups, no auth tokens beyond OpenAI:

```bash
pip install openai httpx langchain langchain-openai
OPENAI_API_KEY=sk-... python benchmark.py
```

The full code is available as a [GitHub Gist](https://gist.github.com/connectwithprakash/064b3e676a249ec4818638e40f31d162) with tools.py (20 tool functions wrapping free APIs), engine.py (TaC + ReAct runners), benchmark.py (CLI runner), and a README.

---

This started as a "let me just try this and see what happens" spike. I expected marginal improvements. I didn't expect 78% token savings or the LLM spontaneously using `asyncio.gather`. The response structure blindness issue was humbling -- it's the kind of thing that only surfaces when you actually run the code against real APIs, not when you read about the pattern in a blog post.

Which I suppose is the whole point of spikes.
