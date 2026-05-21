import{m as o}from"./index-DJKzkpg2.js";const r=`---
id: abu-robocon-2018
title: ABU Robocon 2018
shortDescription: Autonomous robots designed and built for the ABU Robocon 2018 international competition. Features advanced control systems and embedded programming.
category: robotics
importance: 1
featured: false
tags: [C++, Robotics, Embedded, Competition]
gradient: var(--gradient-quaternary)
thumbnail: /assets/img/projects/abu_robocon_2018.png
github: https://github.com/connectwithprakash/ABU-Robocon-2018
demo: https://www.youtube.com/embed/2p6DM4dJpXI
relatedVideos:
  - url: https://www.youtube.com/embed/2p6DM4dJpXI
    caption: Practice round of ABU Robocon 2018 at Home
  - url: https://www.youtube.com/embed/HTp0pIc4Hv8
    caption: Competition rounds of ABU Robocon 2018 in Vietnam
---

## Overview

The theme of ABU Robocon 2018 was "Ném còn" (Throwing shuttlecock), a traditional game in ethnic region of Vietnam. The goal of the game was to throw the shuttlecocks through the ring at height. In Vietnamese culture, the game is about celebration and making friendship. In the game, each team are given a few shuttlecocks and needs to design two robots, one manual and one automatic robot. The manual robot needs to hand the shuttlecocks to the automatic robot, which attempts to throw the shuttlecocks through the rings (unlike the traditional game, there are three rings at various heights in this game). The winner can be achieved by points, or by immediate KO if the robots successfully throw the shuttlecocks through three rings, and for the highest ring, the shuttlecock lands on a golden disk on the opposite side.

## Key Features

- Manual robot for shuttlecock handling
- Automatic robot with precision throwing mechanism
- Omnidirectional drive vehicle
- Real-time sensor feedback systems
- Advanced trajectory calculation
- Coordinated multi-robot system

## Technologies

**Hardware:** AVR, Servo Motors, DC Motors, IR Sensors, Accelerometer, Gyrometer, Compass, Omnidirectional Drive Vehicle

**Languages:** C

**Tools:** AVR Studio

## Challenges & Solutions

Achieving precise throwing accuracy for shuttlecocks at different heights while coordinating between manual and automatic robots in a competitive environment.
`,s=`---
id: agent-relay
title: Agent Relay
shortDescription: Turn-based agent-to-agent communication platform with join codes, presence tracking, MCP integration, and a Python SDK.
category: agentic-ai
status: in-progress
startDate: 2025-12
importance: 1
featured: true
tags: [Agentic AI, Multi-Agent Systems, FastAPI, React 19, WebSocket, MCP, Python SDK, Real-Time Communication, TailwindCSS, CI/CD]
gradient: var(--gradient-quaternary)
thumbnail: /assets/img/projects/agent-relay/thumbnail.svg
heroImage: /assets/img/projects/agent-relay/thumbnail.svg
github: https://github.com/connectwithprakash/agent-relay
images:
  - path: /assets/img/projects/agent-relay/homepage.png
    caption: Agent Relay homepage with hero, how-it-works flow, and public relays list
  - path: /assets/img/projects/agent-relay/dashboard.png
    caption: Relay dashboard with live agent conversation, presence indicators, and turn management
  - path: /assets/img/projects/agent-relay/create-relay.png
    caption: Create relay page with Named Agents configuration and discoverable toggle
demo: null
---

## Overview

Agent Relay lets AI agents talk to each other. It enforces turn-based messaging so only one agent speaks at a time, tracks who's online via heartbeats, and persists every message for full audit trails. Agents join with a 6-character code, authenticate with tokens, and collaborate through a REST API, WebSocket stream, or MCP tools — no shared memory or parent process required.

## Why Agent Relay?

Most AI frameworks treat agent communication as a parent-child relationship: spawn a subagent, wait for it to finish, read its output. Agent Relay enables something different — **peer-to-peer collaboration between independent agents** that may run on separate machines, use different tools, and persist across sessions.

| Aspect | Subagents | Agent Relay |
|--------|-----------|-------------|
| Relationship | Hierarchical (parent/child) | Peer-to-peer (equals) |
| Context | Shared — parent passes context | Isolated — explicit messages only |
| Lifecycle | Ephemeral — complete and terminate | Persistent — survives restarts |
| Environment | Same process/session | Cross-machine capable |
| Parallelism | Parent waits for child | True simultaneous work |

\`\`\`mermaid
flowchart LR
    A[Agent A] -->|Send| R[Agent Relay]
    R -->|Broadcast| A
    R -->|Broadcast| B[Agent B]
    B -->|Send| R
    R --- DB[(History)]
\`\`\`

**Use Agent Relay when:**
- Multiple agents need to collaborate as equals, not in a hierarchy
- Agents run on different machines or have different tool sets
- You need a persistent audit trail of all agent communication
- Agents should join dynamically via share codes — no config files needed
- You want real-time presence tracking (active / composing / idle / disconnected)

## Architecture

### Components

- **FastAPI Backend** — SOLID-compliant layered architecture with services, repositories, SQLAlchemy ORM, and SQLite
- **React 19 Frontend** — Real-time dashboard with WebSocket auto-reconnection, dark mode, and spectator view
- **Python SDK** — Sync client with CLI for scripted and programmatic access
- **MCP Server** — 12+ tools that let LLM agents (Claude Code, Cursor) join relays, send messages, and manage turns directly

### Communication Channels

- **HTTP REST API** — CRUD for relays, messages, and agent management
- **WebSocket** — Sub-second real-time broadcasting to all connected clients
- **Server-Sent Events** — Read-only spectator mode for monitoring without participating
- **Webhooks** — POST notifications to external endpoints with 3-attempt exponential backoff

![Architecture diagram](/assets/img/projects/agent-relay/architecture.svg)

## Key Features

| Feature | Description |
|---------|-------------|
| **Join Codes** | 6-character codes for instant access — share a code, not a config file |
| **Token Auth** | Per-agent tokens issued on join, persisted to \`.agent-relay.json\` |
| **Turn-Based Protocol** | Database-level atomic validation prevents message collisions |
| **Heartbeat / Presence** | Agents report active/composing/idle with optional status messages (e.g., "reviewing architecture.svg"); marked disconnected after 120s |
| **Starvation Prevention** | Tracks turns waited per agent, auto-prioritizes those skipped too often |
| **Message Types** | text, question, action-item, decision, code, bug-report |
| **Threading** | \`reply_to\` field for threaded conversations |
| **Force Skip** | Skip unresponsive agents via \`relay_skip_turn\` |
| **Spectator Mode** | SSE streaming for watching relays without participating |
| **Webhook Delivery** | POST notifications with exponential backoff retry |
| **WebSocket Broadcasting** | Real-time message delivery to all connected clients |

## How It Works

### Join a Relay in 3 Steps
1. **Create** — \`relay_create\` returns a 6-character join code (e.g., \`M4UVS8\`)
2. **Join** — \`relay_join_code("M4UVS8", "my-agent")\` returns a token and full relay context
3. **Collaborate** — \`relay_listen\` to poll for messages, \`relay_send\` when it's your turn, \`relay_heartbeat\` to stay visible

### MCP Integration
The MCP server exposes 12+ tools so LLM agents can join relays, send messages, check status, and skip turns — all from within their tool-calling environment. Session state persists to \`.agent-relay.json\` for seamless reconnection.

### Claude Code Skill
A SKILL.md file defines autonomous behavior rules for agents on the relay:
- **Conversation loop** — heartbeat/poll/listen cycle with status messages showing what each agent is working on
- **Deadlock recovery** — detect disconnected agents and force-skip
- **Full autonomy** — agents coordinate without asking the human for help
- **Productive waiting** — do useful work (read code, prepare proposals) while waiting for your turn

### Python SDK
\`\`\`python
from agent_relay import AgentRelayClient

with AgentRelayClient("http://localhost:8000") as client:
    relay = client.create_relay(["alice", "bob"])
    client.send_message(relay.relay_id, "Hello from Alice!")
    messages = client.listen(relay.relay_id, since_id=0)
\`\`\`

## Key Achievements

- **216 tests** across 17 test files — API, E2E, edge cases, security, WebSocket, presence, spectator
- **4 integration surfaces** — REST API, WebSocket, MCP tools, Python SDK
- **Zero message collisions** — turn-based protocol validated across 100+ messages in live multi-agent sessions
- **Sub-second delivery** — WebSocket broadcasting to all connected clients
- **CI/CD pipeline** — GitHub Actions for automated testing and deployment

## Technologies

**Backend:** FastAPI, SQLAlchemy, SQLite, WebSocket, Loguru, httpx, Alembic

**Frontend:** React 19, Vite 7.2, TailwindCSS v4

**SDK & Integration:** Python SDK, MCP Server, Claude Code Skill

**Infrastructure:** GitHub Actions, Docker, Cloudflare Tunnel

**Development:** Python 3.13, JavaScript, uv, npm, pytest (216 tests)

## Impact

Agent Relay started as an experiment: can AI agents collaborate effectively if you give them structured communication? The answer, after 100+ messages across multiple live sessions with zero collisions, is yes — provided three things are in place:

1. **Turn-based messaging** prevents the chaos of concurrent writes
2. **Non-blocking polling** lets agents do useful work while waiting
3. **Presence tracking** enables autonomous recovery when agents disconnect

The system is production-ready and supports complex multi-agent workflows with reliable, ordered communication and full audit trails.
`,c=`---
id: ai-shopping-assistant
title: AI Shopping Assistant
shortDescription: Multimodal AI assistant powering a 200K-user experiment, enabling natural language product discovery, offers, and rewards optimization on iOS.
category: agentic-ai
status: in-progress
startDate: 2025-10
importance: 1
featured: true
tags: [Agentic AI, LLM, Multimodal AI, ReAct Pattern, MCP, Production ML, E-commerce, Shopping Assistant]
gradient: var(--gradient-primary)
thumbnail: /assets/img/projects/ai_shopping_assistant/thumbnail.svg
heroImage: /assets/img/projects/ai_shopping_assistant/architecture.svg
images:
  - path: /assets/img/projects/ai_shopping_assistant/01_welcome.png
    caption: Welcome screen with intelligent prompt suggestions for shopping queries
  - path: /assets/img/projects/ai_shopping_assistant/02_list_generation.png
    caption: AI-generated $50 pantry stock-up list with 14 personalized items
  - path: /assets/img/projects/ai_shopping_assistant/03_offers.png
    caption: Product offer cards with Fetch points, pricing, and visual recommendations
github: null
demo: null
---

## Overview

Designed and deployed a multimodal AI shopping assistant that helps users discover products, find offers, maximize points, and personalize their shopping experiences across 300+ retail partners. The system powers a 200K-user holdout experiment on iOS, with intelligent, conversational interactions and sub-second response times.

## Problem Statement

Fetch needed to provide users with an intelligent shopping assistant that could:
- **Handle complex shopping queries** - Natural language product discovery and offer optimization
- **Integrate with internal systems** - Seamless access to product/offer APIs and user purchase history
- **Scale to production** - Sub-second latency for thousands of concurrent users on mobile platforms
- **Support multimodal inputs** - Process both text queries and images (product recognition, fridge scanning)
- **Personalize experiences** - Leverage user preferences and shopping history for tailored recommendations

## Technical Approach

Built a dual-service architecture with production-grade infrastructure:

### System Architecture

\`\`\`mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': 'transparent', 'primaryTextColor': '#a78bfa', 'primaryBorderColor': '#8b5cf6', 'lineColor': '#8b5cf6', 'secondaryColor': 'transparent', 'tertiaryColor': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#8b5cf6', 'clusterBkg': 'transparent', 'clusterBorder': '#6366f1', 'titleColor': '#a78bfa'}}}%%
flowchart LR
    subgraph Clients
        iOS & Android
    end

    subgraph Gateway["API Gateway"]
        API[Go Service]
    end

    subgraph AgentService["Agent Service"]
        Conv[Conversational Agent]
        Suggest[Prompt Suggestions Agent]
    end

    subgraph LLM["OpenAI"]
        Model[GPT Models]
    end

    Tools[MCP Tools]

    subgraph AWS
        ECS[ECS Fargate]
        DB[(DynamoDB)]
    end

    Clients --> API
    API --> Conv
    Conv <--> Model
    Conv --> Tools
    Conv --> Suggest
    Suggest <--> Model
    Conv <--> DB
    ECS -.- Gateway
    ECS -.- AgentService
\`\`\`

**Architecture Components:**
- **Client Layer** - iOS and Android mobile applications
- **API Gateway Service (Go)** - High-performance public-facing API handling client requests
- **AI Agent Service (Python)** - LangGraph-based agentic backend with ReAct pattern for reasoning and tool execution
- **Tool Layer (MCP)** - Model Context Protocol integration for standardized access to shopping tools
- **Infrastructure (AWS)** - ECS Fargate for container orchestration, DynamoDB for conversation persistence, Secrets Manager for credentials, CloudWatch + Grafana for observability
- **LLM Integration** - OpenAI GPT-5-mini with Responses API for advanced reasoning and multimodal capabilities

**Agent Capabilities (5+ MCP Tools):**
- Product search and discovery
- Offer discovery and optimization
- Location-based offer recommendations
- User purchase history analysis
- Web search for product information

**Infrastructure:**
- AWS ECS Fargate for scalable deployment
- DynamoDB for conversation history persistence
- AWS Secrets Manager for credential management
- Cloud Map for internal service discovery
- OpenTelemetry + CloudWatch + Grafana for observability

**AI Stack:**
- LangChain/LangGraph orchestration
- OpenAI GPT-5-mini with Responses API for advanced reasoning
- Multimodal capabilities for image analysis
- Streaming event support for real-time responses

## Challenges & Solutions

Building a production-grade consumer AI assistant required solving several critical challenges:

**1. Latency Optimization (p95 < 800ms)**
- **Challenge:** Mobile users expect instant responses, but LLM calls can take 2-5 seconds
- **Solution:** Implemented streaming responses with AWS ECS Fargate autoscaling, optimized prompt engineering, and leveraged GPT-5-mini's native speed improvements

**2. Tool Execution Reliability**
- **Challenge:** 5+ MCP tools with varying latency and failure modes (API timeouts, rate limits)
- **Solution:** Built retry logic with exponential backoff, implemented circuit breakers for failing services, and added graceful degradation when tools are unavailable

**3. Conversation Context Management**
- **Challenge:** Managing conversation history across sessions while staying within token limits
- **Solution:** Designed DynamoDB-based persistence with intelligent context pruning, keeping only last N turns plus user profile, reducing context size by 60% while maintaining conversation quality

**4. Multimodal Input Processing**
- **Challenge:** Handling varied image inputs (product photos, receipts, fridge scans) with inconsistent quality
- **Solution:** Implemented preprocessing pipeline with image compression and quality validation, added fallback to text-based search when image recognition confidence is low

**5. Production Observability**
- **Challenge:** Debugging non-deterministic LLM behavior in production with 200K users
- **Solution:** Built comprehensive tracing with Opik and OpenTelemetry, capturing full conversation flows, tool calls, and latency breakdowns, enabling rapid issue identification and resolution

**6. Cost Management at Scale**
- **Challenge:** OpenAI API costs could spiral with high user engagement
- **Solution:** Implemented smart caching for repeated queries, optimized system prompts, and used streaming to show partial results while reducing perceived latency

## My Role

Led ML engineering efforts for the agentic system with end-to-end ownership:
- Architected the dual-service system (Go API gateway + Python agent backend)
- Built LangGraph-based agent framework with streaming support
- Integrated OpenAI Responses API for advanced reasoning capabilities
- Implemented MCP tool wrappers for internal API access
- Deployed production infrastructure on AWS (ECS, DynamoDB, Secrets Manager)
- Designed conversational system prompts (4 major iterations v1-v4)
- Established comprehensive testing suite (pytest, moto for AWS mocking)
- Set up observability pipeline (Opik tracing, CloudWatch, Grafana metrics)
- Built product card system spanning agent logic, tool orchestration, multi-source enrichment (SERP API, catalog search, CDN images, Fetch points), and shoppable product cards enabling users to shop and earn rewards directly from the conversation, with infrastructure that also serves as the foundation for the Direct Messages feature
- Built image normalization pipeline processing 4.2M product images at 18x cost efficiency ($1,633 vs $30K projected), combining computer vision with LLM-based quality review
- Built end-to-end LLM evaluation system -- a continuous improvement loop connecting offline evaluation (golden dataset for experimentation), online evaluation (production trace monitoring), and human annotation (judge calibration loop where human feedback improves judges, which improves the dataset, which improves the agent), with CI/CD deploy gating that blocks releases on quality regression

## Key Achievements

- **200K users** - Successfully shipped to external users on iOS via V2.1 holdout experiment
- **Continuous improvement loop** - Evaluation system connecting offline eval, online monitoring, and human annotation in a self-improving feedback cycle
- **CI/CD quality gating** - Mandatory deploy gate validating every release against health scores; no automated quality gate existed before
- **4.2M images processed** - Image normalization pipeline at 18x cost efficiency powering product cards
- **5+ MCP tools** - Seamless shopping experience with offers, products, history, location, web search
- **Extensible by design** - Team can modify agent behaviors, evaluation criteria, and tools without changing core code
- **Production observability** - End-to-end visibility from LLM traces through production metrics via Opik, OpenTelemetry, and Grafana

## Technologies

**AI/ML:** LangChain, LangGraph, OpenAI GPT-5-mini, OpenAI Responses API

**Backend:** Python, Go, FastAPI

**AWS:** ECS/Fargate, Lambda, DynamoDB, Secrets Manager, Cloud Map

**Infrastructure:** Docker, OpenTelemetry, CloudWatch, Grafana

**Tools:** MCP (Model Context Protocol), ReAct Pattern

**Testing:** Pytest, Moto, OpenAI Evals

**Observability:** Opik, CloudWatch, Grafana

## Impact

**Business Impact:**
- **First Consumer-Facing AI Agent** - Pioneered Fetch's entry into conversational AI, powering a 200K-user holdout experiment
- **Enhanced User Engagement** - Positive user reception and growing adoption
- **Increased Shopping Efficiency** - Users discover personalized offers and products 3x faster than manual browsing
- **Revenue Enablement** - Drives higher engagement with 300+ retail partners through intelligent offer discovery
- **Platform Differentiation** - Establishes Fetch as an AI-first shopping rewards platform

**Technical Innovation:**
- **Production-Scale AI** - Sub-second latency (p95 < 800ms) serving 200K users
- **Self-Improving Evaluation** - Continuous feedback loop where human annotations calibrate judges, which improve the dataset, which improves the agent
- **Extensible Architecture** - Config-driven system where agent behaviors, evaluation criteria, and tools are modified without changing core code
- **Modern AI Stack** - Early adopter of OpenAI Responses API, LangGraph state machines, and MCP tool protocol
- **Dual-Service Design** - Go API gateway + Python agent backend enabling independent scaling and deployment
- **End-to-End Observability** - Opik (LLM tracing), OpenTelemetry (HTTP metrics, token usage), Grafana dashboards

**Strategic Value:**
Unlike internal tooling projects (product matching, annotation, NER), this assistant directly touches end-users and represents a strategic shift toward AI-powered user experiences. The project demonstrates full ownership from architecture through deployment, setting the foundation for future consumer AI initiatives at Fetch.
`,l=`---
id: async-matching-framework
title: Async Matching Framework
shortDescription: Multi-agent system for predicting brands and categories from ambiguous product descriptions. Mapped 15K+ products with 88% accuracy and became the foundational framework adopted for other catalog automation projects.
category: agentic-ai
status: completed
startDate: 2025-03
endDate: 2025-11
importance: 1
featured: true
tags: [Agentic AI, LLM, RAG, Entity Resolution, NLP, Multi-Agent Systems, LangGraph, Python, Fetch]
gradient: var(--gradient-tertiary)
thumbnail: /assets/img/projects/async-matching-framework/thumbnail.svg
github: null
demo: null
---

## Overview

Built a multi-agent system that automatically predicts brands and hierarchical categories for unmapped product descriptions. The system resolves ambiguity, handles abbreviations, and avoids hallucinations while enabling downstream catalog enrichment and offer targeting.

## Problem Statement

Thousands of product descriptions (SPDs) existed in Fetch's database without assigned brands or categories, preventing them from being matched to catalog items. Challenges included:
- **Ambiguous descriptions** - "org milk" could be multiple brands
- **OCR errors** - Misspellings and artifacts from receipt scanning
- **Abbreviations** - Non-standard shorthand ("flz" for fluid ounces)
- **Hierarchical categories** - Navigating multi-level taxonomy
- **Hallucination risk** - LLMs inventing plausible but incorrect brands

## Technical Approach

Developed an agentic system with LangGraph orchestration featuring four specialized agents:

### System Architecture

\`\`\`mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': 'transparent', 'primaryTextColor': '#a78bfa', 'primaryBorderColor': '#8b5cf6', 'lineColor': '#8b5cf6', 'secondaryColor': 'transparent', 'tertiaryColor': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#8b5cf6', 'clusterBkg': 'transparent', 'clusterBorder': '#6366f1', 'titleColor': '#a78bfa'}}}%%
flowchart LR
    subgraph Input
        SPD[Product Description]
    end

    subgraph Agents["Agent Pipeline"]
        CB[Canonical Brand]
        FB[Fetch Brand]
        Cat[Category]
        Guard[Guardrail]
    end

    subgraph RAG["Retrieval Layer"]
        Ret[Retrievers<br/>88K+ mappings]
        Web[Web Search]
    end

    subgraph Output
        Map[Brand + Category]
    end

    SPD --> CB --> FB --> Cat --> Guard --> Map
    Agents <--> Ret
    Agents <--> Web
\`\`\`

**Agent Architecture:**
- **CanonicalBrandAgent** - Extracts standardized brand names
- **FetchBrandAgent** - Maps to company-specific brand catalog
- **CategoryAgent** - Assigns hierarchical category with hallucination detection
- **WorkflowGuardrailAgent** - Validates outputs and catches errors

**Retrieval System:**
- Abbreviation mappings
- Brand knowledge base
- Category taxonomy navigation
- Error history for learning from past mistakes
- Web search for ambiguous products

**Web Search Integration:**
- Gemini 2.5 Flash with Google Search for ambiguous products
- OpenAI Responses API for real-time lookups
- Fallback mechanisms for edge cases

## My Role

**Tech Lead** for a cross-functional team of 4 engineers (analytics engineer, MLE apprentice, backend engineer, and team lead). Owned architecture decisions and drove technical direction:

- Led end-to-end system design from requirements to production deployment
- Architected the multi-agent workflow and agent interaction patterns
- Mentored MLE apprentice on LLM agent development and best practices
- Coordinated with analytics engineer on evaluation metrics and data pipelines
- Created retriever architecture with semantic + lexical hybrid search
- Built guardrail system to prevent hallucinations
- Integrated multiple LLM providers (OpenAI, Anthropic, Google)
- Established category tree navigation tools with beam search
- Deployed on production infrastructure for real-time inference

## Technical Innovations

### 1. Beam Search Category Navigation

Implemented beam search for navigating hierarchical category trees with 6+ depth levels. Agents explore multiple category paths simultaneously with confidence-based stopping, allowing predictions at any depth rather than forcing terminal categories when uncertain.

\`\`\`mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': 'transparent', 'primaryTextColor': '#a78bfa', 'primaryBorderColor': '#8b5cf6', 'lineColor': '#8b5cf6', 'secondaryColor': 'transparent', 'tertiaryColor': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#8b5cf6', 'clusterBkg': 'transparent', 'clusterBorder': '#6366f1', 'titleColor': '#a78bfa'}}}%%
flowchart TD
    Root[Root] --> Food[Food]
    Root --> Bev[Beverages]
    Root --> HB[Health & Beauty]

    Food --> Dairy[Dairy]
    Food --> Snacks[Snacks]
    Bev --> Soft[Soft Drinks]
    Bev --> Coffee[Coffee]

    Dairy --> Milk[Milk]
    Dairy --> Yogurt[Yogurt]
    Soft --> Cola[Cola]
    Soft --> Juice[Juice]

    style Food stroke:#10b981,stroke-width:3px
    style Dairy stroke:#10b981,stroke-width:3px
    style Milk stroke:#10b981,stroke-width:3px
    style Bev stroke:#6b7280,stroke-width:1px,stroke-dasharray: 5 5
    style Snacks stroke:#6b7280,stroke-width:1px,stroke-dasharray: 5 5
\`\`\`

*Beam=2: Explores top 2 paths at each level (solid), prunes others (dashed)*

### 2. RRF Hybrid Retrieval

Combined lexical search (fuzzy matching) with semantic search (embeddings) using Reciprocal Rank Fusion. The hybrid approach handles both exact abbreviation matches ("org" to "organic") and semantic similarity for brand disambiguation.

\`\`\`mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': 'transparent', 'primaryTextColor': '#a78bfa', 'primaryBorderColor': '#8b5cf6', 'lineColor': '#8b5cf6', 'secondaryColor': 'transparent', 'tertiaryColor': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#8b5cf6', 'clusterBkg': 'transparent', 'clusterBorder': '#6366f1', 'titleColor': '#a78bfa'}}}%%
flowchart LR
    Q[Query: org mlk] --> L[Lexical Search]
    Q --> S[Semantic Search]

    L --> LR[organic milk: #1<br/>original milk: #2<br/>org yogurt: #3]
    S --> SR[organic milk: #1<br/>oat milk: #2<br/>almond milk: #3]

    LR --> RRF[RRF Fusion]
    SR --> RRF

    RRF --> R[organic milk: 0.97<br/>oat milk: 0.42<br/>original milk: 0.38]
\`\`\`

*Reciprocal Rank Fusion combines rankings from both retrievers*

### 3. Active Learning Feedback Loop

SPDs that fall below the ML model's confidence threshold are routed to the agent pipeline for prediction. Human reviewers validate these predictions, and feedback flows back into the system - correct predictions become reference examples for similar future cases, while errors become patterns for the guardrail to catch.

\`\`\`mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': 'transparent', 'primaryTextColor': '#a78bfa', 'primaryBorderColor': '#8b5cf6', 'lineColor': '#8b5cf6', 'secondaryColor': 'transparent', 'tertiaryColor': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#8b5cf6', 'clusterBkg': 'transparent', 'clusterBorder': '#6366f1', 'titleColor': '#a78bfa'}}}%%
flowchart LR
    SPD[Low Confidence SPDs] --> PA

    subgraph Agents
        PA[Prediction Agents] --> GA[Guardrail Agent]
    end

    GA --> Review{Human Review}
    Review --> Approved
    Review --> Rejected
    Approved --> CH[(Correct Examples)]
    Rejected --> EH[(Error Patterns)]
    CH -.-> PA
    EH -.-> GA
\`\`\`

*SPDs below ML confidence threshold go to agents; human feedback improves future predictions*

### 4. Cross-Agent Validation

Implemented a guardrail agent that validates coherence across all pipeline predictions, checking for logical consistency (e.g., "Coca-Cola" brand should map to "Beverages" category, not "Pet Food").

### 5. Hierarchical Path Validation

Hallucination prevention through grounded validation. When agents predict a category, the path is validated against the actual taxonomy tree. If the category doesn't exist or the path is incorrect, validation fails and the agent retries with a valid category - ensuring all predictions are grounded in real taxonomy entries rather than plausible-sounding hallucinations.

## Key Achievements

- **$165M GMV unlocked** - Enabled offer targeting for previously unmapped products
- **15K+ mappings** - Successfully predicted brands and categories for previously unmapped SPDs
- **15% full automation** - Conservative guardrail filters high-confidence predictions (97%+ accuracy) for full automation without human review
- **88% brand accuracy** - High precision on brand prediction task
- **85% category accuracy** - Reliable hierarchical classification
- **50+ hours → 2 minutes** - Automated manual mapping operations
- **Framework reuse** - Core agents adopted for CatOps catalog cleanup system

## Technologies

**AI/ML:** LangChain, LangGraph, OpenAI models, Gemini models

**ML Infrastructure:** Sentence Transformers, FuzzyWuzzy, FAISS

**Backend:** Python, Pydantic, Snowflake

**Search:** Semantic + lexical hybrid search, web search integration

## Impact

This system unlocked value from thousands of previously unmapped products, enabling more accurate offer targeting and improved user experience. The error-learning mechanism created a virtuous cycle where the system continuously improved from production feedback.

**Framework Adoption:** The multi-agent architecture became a foundational pattern for the organization. Another engineer on the team leveraged the core agents (Canonical Brand, Fetch Brand, Category) and retriever infrastructure to build CatOps Automation - a larger system for Receipt Quality catalog data cleanup. By reusing the proven agent patterns, retrievers, and category navigation tools, the CatOps project accelerated development significantly rather than building from scratch.
`,d=`---
id: automated-data-annotation
title: 3-Agent Annotation Workflow
shortDescription: LangGraph-based 3-agent workflow replacing double-annotation with LLM annotation at 80%+ accuracy, reducing total annotation workload by 40% for ML training data.
category: agentic-ai
status: completed
startDate: 2024-10
endDate: 2025-02
importance: 1
featured: true
tags: [Agentic AI, LLM, LangGraph, Data Annotation, Human-in-the-Loop, Production ML, Python, Fetch]
gradient: var(--gradient-secondary)
thumbnail: /assets/img/projects/automated-data-annotation/thumbnail.svg
github: null
demo: null
---

## Overview

Built a 3-agent annotation workflow using LangGraph to generate training data for the PAM-ML product matching model. The workflow replaces the second human annotator in the traditional double-annotation process.

**How it works:** The ML model matches receipt products to catalog items. The quality team samples these matches for labeling to create training data. Previously, two humans annotated each sample and a third resolved disagreements. Now the LLM acts as the second annotator - when it agrees with the first human (80%+ of cases), the label is accepted. The second human only reviews the 20% disagreement cases.

## Problem Statement

Training ML models for product matching required thousands of labeled examples with high agreement between annotators. The traditional double-annotation process was expensive and slow:
- **Double cost** - Every example needed two human annotators
- **Scale bottleneck** - Limited throughput due to human capacity
- **Disagreement handling** - Third annotator needed to break ties
- **Quality standards** - Required high inter-annotator agreement
- **Consistency** - Human annotators had subjective interpretation differences

## Technical Approach

Built a 3-agent workflow with LangGraph orchestration:

### System Architecture

\`\`\`mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': 'transparent', 'primaryTextColor': '#a78bfa', 'primaryBorderColor': '#8b5cf6', 'lineColor': '#8b5cf6', 'secondaryColor': 'transparent', 'tertiaryColor': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#8b5cf6', 'clusterBkg': 'transparent', 'clusterBorder': '#6366f1', 'titleColor': '#a78bfa'}}}%%
flowchart LR
    subgraph Input
        Match[Sampled Match]
    end

    subgraph Annotation["Parallel Annotation"]
        Human1[Human<br/>Annotator 1]
        subgraph LLM["3-Agent LLM"]
            A1[Normalize]
            A2[Brand]
            A3[Classify]
        end
    end

    subgraph Resolution
        Compare{Agree?}
        Accept[Accept Label]
        Human2[Human 2<br/>Reviews]
    end

    Match --> Human1
    Match --> A1
    A1 --> A2
    A2 --> A3
    Human1 --> Compare
    A3 --> Compare
    Compare -->|"Yes (80%)"| Accept
    Compare -->|"No (20%)"| Human2
\`\`\`

**3-Agent Pipeline:**
1. **Product Normalization Agent** - Expands abbreviated receipt/catalog descriptions into full product names
2. **Brand Name Agent** - Extracts and validates brand names from normalized descriptions
3. **Annotation Agent** - Classifies match quality on 0-4 scale using decision tree reasoning

**Why 3 agents?** Breaking the complex annotation task into focused steps improves accuracy. Each agent specializes in one aspect: normalization handles messy text, brand extraction isolates a key comparison factor, and classification applies consistent decision logic. This also provides interpretable intermediate outputs for debugging.

**Classification Scale:**
- 0: Completely Incorrect (brand mismatch)
- 1: Partially Incorrect (brand correct, product details wrong)
- 2: Overly Specific (extra unverifiable details)
- 3: Somewhat Correct (missing some details)
- 4: Exactly Correct (perfect match)

**Human-LLM Agreement System:**
- First human annotator labels the sample
- LLM (3-agent workflow) independently labels the same sample
- Agreement (80%+ of cases): label accepted automatically
- Disagreement (20% of cases): second human annotator reviews and resolves

**Explainability Metadata:**
Each prediction includes structured reasoning:
- Common information between receipt and catalog product
- Missing information gaps
- Extra unverifiable details
- Incorrect/contradicting information
- Decision tree trace showing the classification path
- Textual justification for the final label

## Key Achievements

- **80%+ LLM accuracy** - LLM matches human annotator judgment across all labels
- **40% total workload reduction** - From 2 annotators to 1 + LLM (human reviews only 20% disagreements)
- **Quality maintained** - Human oversight on edge cases preserves dataset quality
- **Explainable outputs** - Decision tree traces and justifications for every prediction
- **Reusable framework** - Internal LLM library (agents, workflows) adopted by False Positive Auditor and other projects

## Technologies

**AI/ML:** LangGraph, OpenAI models

**Framework:** Python, Pydantic

**Infrastructure:** JFrog (internal package registry)

**Data:** Structured outputs, decision tree reasoning

## Impact

This workflow transformed the annotation process from requiring two humans per example to a human-LLM collaboration, cutting total annotation workload by 40%. The high-quality training data directly improves the PAM-ML product matching model, which drives offer attribution accuracy.

**Framework Adoption:** Beyond the annotation workflow, this project produced an internal LLM framework library containing reusable agent abstractions and workflow orchestration. Published to JFrog, the library is imported by the False Positive Auditor and other production systems, demonstrating the value of building modular AI infrastructure.
`,p=`---
id: diskard
title: diskard
shortDescription: An open-source Rust CLI/TUI tool for developer-aware disk cleanup that scans for reclaimable space from build caches, AI models, package managers, and IDE artifacts.
category: developer-tools
status: released
startDate: 2026-02
importance: 1
featured: false
tags: [Rust, CLI, TUI, ratatui, Open Source, Developer Tools, Homebrew, crates.io]
gradient: var(--gradient-tertiary)
thumbnail: /assets/img/projects/diskard/thumbnail.svg
heroImage: /assets/img/projects/diskard/hero.svg
github: https://github.com/connectwithprakash/diskard
imageLayout: stacked
images:
  - path: /assets/img/projects/diskard/01-scan-results.png
    caption: Interactive TUI showing scan results with 26 reclaimable items sorted by size
  - path: /assets/img/projects/diskard/02-selected-items.png
    caption: Item selection with checkboxes for targeted cleanup
  - path: /assets/img/projects/diskard/03-drill-down.png
    caption: Drill-down view inspecting Xcode DerivedData directory contents
relatedLinks:
  - title: crates.io
    url: https://crates.io/crates/diskard
  - title: Homebrew Tap
    url: https://github.com/connectwithprakash/homebrew-tap
demo: https://crates.io/crates/diskard
installation: |
  # Install via Homebrew
  brew install connectwithprakash/tap/diskard

  # Or install via cargo
  cargo install diskard

  # Run interactive TUI
  diskard -i

  # Run CLI scan
  diskard scan ~/Developer
---

## Overview

diskard is a developer-aware disk cleanup tool built in Rust. It understands the structure of developer workspaces — build caches, AI model caches, package manager artifacts, IDE files — and helps reclaim disk space safely. Unlike generic disk analyzers, diskard knows what's safe to delete and what isn't, using risk-level categorization and trash-based deletion by default.

The tool provides both a CLI for scripting and an interactive TUI built with ratatui for hands-on exploration and cleanup.

## Problem Statement

Developers accumulate massive amounts of reclaimable disk space over time:

- **Build caches** — Xcode DerivedData, Rust target/, node_modules, Gradle caches
- **AI model caches** — Ollama models, HuggingFace hub, Claude cache
- **Package manager caches** — Homebrew, pip, CocoaPods
- **IDE artifacts** — VS Code caches, JetBrains indexes

Existing tools like \`du\` or \`ncdu\` show raw disk usage but don't understand what's safe to remove. Tools like \`kondo\` focus only on build artifacts. diskard combines smart recognition across 18 categories with an interactive TUI for safe, informed cleanup.

## Technical Approach

### Architecture

The project uses a Rust workspace with three crates:

- **\`diskard\`** (binary) — CLI entry point with clap-based argument parsing and command routing
- **\`diskard-core\`** (library) — Recognizers, parallel scanner, cleaner, config system, and data types
- **\`diskard-tui\`** (optional feature) — Interactive terminal UI built with ratatui and crossterm

### Recognizer System

Each recognizer implements a \`Recognizer\` trait (\`Send + Sync\`) with methods for \`name()\`, \`id()\`, \`category()\`, and \`scan()\`. The 18 recognizers cover:

- **Build Systems:** Xcode DerivedData, Xcode Archives, Rust target/, Node modules, Gradle/Maven, CocoaPods
- **Package Managers:** Homebrew cache, pip cache
- **AI/ML:** Ollama models, HuggingFace hub, Claude cache
- **IDE:** VS Code caches
- **System:** Generic caches, Docker, logs, trash

### Parallel Scanning

The scanner uses \`rayon\` for parallel execution across all recognizers and \`jwalk\` for fast filesystem traversal. Each finding includes path, category, risk level (Safe/Moderate/Risky), size, description, and last modified date.

### Interactive TUI

The TUI features:
- **Disk usage header** with a LineGauge visualization, color-coded by usage thresholds (green <70%, yellow 70-85%, red >85%)
- **Scan results list** with inline size bars using block characters, checkboxes for selection, and category labels
- **Drill-down inspector** for exploring directory contents with breadcrumb navigation
- **Select-all and confirmation dialog** before any deletion
- **Help overlay** with keyboard shortcut reference

Deletion defaults to moving files to Trash via the \`trash\` crate, with optional permanent deletion.

## Key Features

- **18 Recognizers** covering build caches, AI models, package managers, IDEs, and system artifacts
- **Interactive TUI** with drill-down directory inspection and disk visualization
- **Parallel Scanning** using rayon for fast multi-core traversal
- **Safe Deletion** via Trash by default (not permanent delete)
- **CLI Filters** — filter by \`--category\`, \`--sort\`, \`--older-than\`
- **Shell Completions** for Bash, Zsh, Fish, and PowerShell
- **Config System** via TOML at \`~/.config/diskard/config.toml\`
- **Cross-Platform** — CI tested on macOS and Ubuntu

## Challenges & Solutions

**1. Recognizing Developer-Specific Artifacts**
- **Challenge:** Generic disk tools don't distinguish between important project files and reclaimable caches
- **Solution:** Built 18 specialized recognizers that understand the structure of each tool's cache directory, with risk-level classification

**2. Safe Deletion by Default**
- **Challenge:** Users are hesitant to delete files they're unsure about
- **Solution:** Uses the \`trash\` crate to move files to system Trash instead of permanent deletion; TUI shows risk levels and allows drill-down inspection before confirming

**3. Performance at Scale**
- **Challenge:** Scanning entire home directories with many nested projects is slow
- **Solution:** Parallel scanning with rayon across recognizers and jwalk for filesystem traversal

## Technologies

**Language:** Rust

**Key Dependencies:** clap (CLI), ratatui + crossterm (TUI), rayon + jwalk (parallelism), trash (safe deletion), serde + toml (config), bytesize (formatting), fs2 (disk stats), chrono (timestamps)

**CI/CD:** GitHub Actions (fmt, clippy, test on macOS + Ubuntu), Release Please for automated versioning

**Distribution:** crates.io (\`cargo install diskard\`), Homebrew (\`brew install connectwithprakash/tap/diskard\`)

## Impact

- Published on **crates.io** as three crates (diskard, diskard-core, diskard-tui)
- Installable via **Homebrew** tap with auto-update GitHub Action
- Open source under **MIT + Apache 2.0** dual license
- Automated release pipeline with **Release Please** and cross-platform CI

## Links

- **crates.io:** https://crates.io/crates/diskard
- **GitHub:** https://github.com/connectwithprakash/diskard
- **Homebrew:** \`brew install connectwithprakash/tap/diskard\`
`,m=`---
id: false-positive-auditor
title: False Positive Auditor
shortDescription: LLM-powered system to automatically flag incorrect product matches at 95% recall, protecting $800K in GMV annually and reducing daily audit effort from 8 hours to 15 minutes.
category: agentic-ai
status: completed
startDate: 2025-03
endDate: 2025-06
importance: 2
featured: false
tags: [Agentic AI, LLM, Quality Assurance, Streamlit, Production ML, Python, Fetch]
gradient: var(--gradient-secondary)
thumbnail: /assets/img/projects/false-positive-auditor/thumbnail.svg
github: null
demo: null
---

## Overview

Repurposed the 3-agent annotation workflow into a production auditing system that automatically flags incorrect product matches from the PAM-ML pipeline.

**How it works:** The PAM-ML pipeline matches receipt products to catalog items, but some matches are incorrect. This auditor runs the same 3-agent workflow used for training data annotation, but simplifies the output: labels 0-1 (brand mismatches) are flagged as false positives and added to a blacklist, preventing the pipeline from repeating the same errors.

**Why repurpose the annotation workflow?** The annotation workflow was already trained to evaluate match quality on a 0-4 scale. For auditing, we only need to identify bad matches (0-1), making it a natural fit. The agents and workflow were part of an internal LLM framework library (published to JFrog), so this auditor simply imports and uses them - avoiding building from scratch.

## Problem Statement

The PAM-ML pipeline matches receipt products to catalog items, but some matches are incorrect (false positives). These errors directly impact GMV by causing incorrect offer attribution. Challenges included:
- **Manual review bottleneck** - Team spending 8 hours daily reviewing matches
- **Scale** - Thousands of matches to audit weekly
- **Consistency** - Human reviewers had varying accuracy
- **GMV protection** - Incorrect matches directly impacted business revenue
- **Prioritization** - No way to focus on highest-risk matches first

## Technical Approach

Developed a Streamlit application with LLM-based classification:

### System Architecture

\`\`\`mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': 'transparent', 'primaryTextColor': '#a78bfa', 'primaryBorderColor': '#8b5cf6', 'lineColor': '#8b5cf6', 'secondaryColor': 'transparent', 'tertiaryColor': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#8b5cf6', 'clusterBkg': 'transparent', 'clusterBorder': '#6366f1', 'titleColor': '#a78bfa'}}}%%
flowchart LR
    subgraph Input
        Match[Receipt + Catalog<br/>Product Pair]
    end

    subgraph Agents["3-Agent Workflow"]
        A1[Product<br/>Normalization]
        A2[Brand Name<br/>Extraction]
        A3[Match<br/>Classification]
    end

    subgraph Output
        Pred{Brand Match?}
        Yes[Valid Match]
        No[Blacklist]
    end

    Match --> A1
    A1 --> A2
    A2 --> A3
    A3 --> Pred
    Pred -->|"2-4"| Yes
    Pred -->|"0-1"| No
\`\`\`

**3-Agent Agentic Workflow:**
1. **Product Normalization Agent** - Cleans and normalizes messy receipt/catalog descriptions
2. **Brand Name Agent** - Extracts and validates brand names from both sides
3. **Annotation Agent** - Classifies match quality on 0-4 scale

**Classification Scale (simplified for auditing):**
- **0-1: Blacklist** - Brand mismatch or incorrect product details
- **2-4: Valid** - Match is acceptable (overly specific, somewhat correct, or exact)

**Explainability Metadata:**
Each prediction includes reasoning from the annotation workflow:
- Normalized product descriptions
- Extracted brand names from both sides
- Decision tree trace showing classification path
- Justification for the assigned label

**Infrastructure:**
- Internal LLM framework (agents, workflows) imported from JFrog
- Streamlit web application for team access
- Google Sheets integration for workflow
- AWS CloudWatch for monitoring

## Key Achievements

- **95% recall** - Catches nearly all false positive matches
- **$800K GMV protected annually** - Prevents incorrect offer attribution
- **8 hours to 15 minutes** - Reduced daily audit effort by 97%
- **40 hours saved weekly** - Team reallocated to higher-value work
- **Production deployment** - Live on Fetch's Streamlit hub
- **Ensemble confidence** - Multi-inference scoring for reliability

## Technologies

**AI/ML:** Internal LLM framework (agents, workflows) from JFrog

**Frontend:** Streamlit

**Backend:** Python, Google Sheets API

**Infrastructure:** AWS CloudWatch, JFrog, Docker

## Impact

This system transformed the Receipt Quality team's workflow from reactive error-finding to proactive quality assurance. Flagged matches are added to a blacklist that prevents the PAM-ML pipeline from repeating the same incorrect matches, creating a continuous improvement loop. The $800K GMV protection demonstrates direct business value from ML-powered quality systems.
`,u=`---
id: foxhound-security-solution
title: Foxhound Security Solution
shortDescription: A security solution for anomalous activity detection in a network.
category: security
importance: 2
featured: false
tags: [Security, Network, Anomaly Detection]
gradient: var(--gradient-tertiary)
thumbnail: /assets/img/projects/foxhound_security_solution.png
github: https://github.com/kaushu42/foxhound-security-solution
demo: null
---

## Overview

A network security solution focused on detecting anomalous activities and potential threats in network traffic patterns.

## Key Features

- Anomaly detection in network traffic
- Real-time monitoring
- Security threat identification

## Technologies

**Languages:** Python

**Frameworks:** Machine Learning
`,h=`---
id: lazyflow
title: Lazyflow
shortDescription: A free, open-source iOS app for AI-powered task management with Focus Mode, Quick Capture, two-way Apple Calendar sync, and smart "Next Up" recommendations.
category: mobile-apps
status: released
startDate: 2025-12
importance: 1
featured: true
tags: [iOS, Swift, SwiftUI, Core Data, CloudKit, EventKit, AI, Apple Intelligence, Apple Watch, Widgets, Live Activities, Open Source]
gradient: var(--gradient-primary)
thumbnail: /assets/img/projects/lazyflow/thumbnail.svg
heroImage: /assets/img/projects/lazyflow/hero.svg
images:
  - path: /assets/img/projects/lazyflow/01-today-view.png
    caption: Today view with Next Up AI suggestion, Start/Focus/Later actions, and draggable Quick Capture button
  - path: /assets/img/projects/lazyflow/02-next-up-progress.png
    caption: Active task with time tracking, pause control, and one-tap Focus Mode entry
  - path: /assets/img/projects/lazyflow/03-focus-mode.png
    caption: Focus Mode with Pomodoro timer, session tracking, and distraction-free interface
  - path: /assets/img/projects/lazyflow/04-morning-briefing.png
    caption: AI-generated Morning Briefing with yesterday's recap, today's plan, and weekly stats
  - path: /assets/img/projects/lazyflow/05-insights.png
    caption: Insights hub with Morning Briefing, Daily Summary, AI Quality metrics, History, and Analytics
  - path: /assets/img/projects/lazyflow/06-task-edit.png
    caption: Task editor with date, priority, category, list, reminders, duration, recurrence, and subtasks
  - path: /assets/img/projects/lazyflow/07-add-task.png
    caption: Quick task creation with smart defaults and AI-powered note extraction
  - path: /assets/img/projects/lazyflow/08-apple-watch.png
    caption: Apple Watch app for quick task management on the go
github: https://github.com/connectwithprakash/lazyflow
demo: https://apps.apple.com/us/app/lazyflow/id6757427688
---

## Overview

Lazyflow is a calendar-first todo app that seamlessly integrates with Apple Calendar. Unlike traditional task managers that treat tasks and calendar events separately, Lazyflow helps users plan their day by viewing everything in one place and getting AI-powered recommendations for what to work on next.

The app is completely free, open-source, and privacy-focused -- all data stays on the user's device with optional iCloud sync.

## Problem Statement

Most todo apps fail at helping users actually plan their day:
- **Fragmented Experience** - Tasks live separately from calendar, forcing users to context-switch
- **No Prioritization Help** - Users must manually decide what to work on next
- **No Focus Support** - No built-in tools for deep work or distraction management
- **No Time Awareness** - Tasks don't account for available time between meetings
- **Privacy Concerns** - Most productivity apps track user data and require subscriptions

## Technical Approach

Built a native iOS app with a focus on seamless Apple ecosystem integration:

### Architecture

![Clean architecture with MVVM pattern and multi-provider AI support](/assets/img/projects/lazyflow/architecture.svg)

**Core Technologies:**
- **SwiftUI** - Modern declarative UI with MVVM + @Observable architecture
- **Core Data + CloudKit** - Offline-first with seamless iCloud sync
- **EventKit** - Two-way Apple Calendar sync with recurring event support
- **App Intents** - Siri Shortcuts and system integration
- **WidgetKit** - Home Screen widgets (small, medium, large)
- **ActivityKit** - Live Activities and Dynamic Island support
- **WatchConnectivity** - Real-time sync with Apple Watch
- **String Catalogs** - Localization-ready with .xcstrings

**AI Integration:**
- Apple Intelligence (on-device, private)
- Claude API (Anthropic)
- OpenAI API
- User brings their own API keys -- no data leaves device without consent

## Key Features

- **Quick Capture** - Tap the floating pencil button, jot a note, and let AI extract structured tasks automatically. Drag the button to reposition it along the screen edge.
- **Focus Mode** - Pomodoro timer with configurable work/break intervals, subtasks panel, and session persistence across app restarts. Enter from the Next Up card or any task.
- **Calendar Sync** - Two-way sync between tasks and Apple Calendar events, with scheduled start/end times and recurring event support
- **Next Up AI** - Smart "What should I do next?" recommendations with Start, Focus, and Later actions
- **Morning Briefing** - AI-generated daily overview with yesterday's recap, today's plan, and weekly productivity stats
- **Insights Dashboard** - Centralized hub for AI insights, task history, analytics, and AI quality metrics
- **Subtasks** - Break down complex tasks into subtasks with automatic parent completion
- **Time Tracking** - Monitor task duration with automatic start/stop timestamps
- **Daily Summary** - Completion streaks and AI-generated productivity insights
- **Multi-Platform** - iPhone, iPad, Apple Watch with real-time sync
- **Widgets** - Home Screen widgets in 3 sizes for quick task access
- **Live Activities** - Track current task in Dynamic Island
- **Siri Shortcuts** - Voice commands for hands-free task management
- **Accessibility** - VoiceOver labels and hints on all screens, full Dynamic Type support
- **Privacy First** - All data on-device, no tracking, no analytics

## Challenges & Solutions

**1. Calendar + Tasks Unified View**
- **Challenge:** EventKit and Core Data have different data models and update patterns
- **Solution:** Built unified data layer that merges both sources with real-time Combine publishers

**2. Two-Way Calendar Sync**
- **Challenge:** Keeping tasks and calendar events in sync bidirectionally without creating duplicates or losing data on conflicts
- **Solution:** Implemented change tracking with persistent history tokens, conflict resolution strategy, and support for recurring event patterns

**3. AI Without Privacy Compromise**
- **Challenge:** Users want AI features but are concerned about data privacy
- **Solution:** Support multiple providers including on-device Apple Intelligence; user provides their own API keys

**4. Focus Mode Session Persistence**
- **Challenge:** Pomodoro sessions need to survive app backgrounding, termination, and device restarts
- **Solution:** Persist timer state to disk on every transition, restore elapsed time on launch using wall-clock timestamps

**5. Cross-Device Sync**
- **Challenge:** Tasks need to sync seamlessly across iPhone, iPad, and Apple Watch
- **Solution:** CloudKit with NSPersistentCloudKitContainer for automatic sync, WatchConnectivity for immediate Watch updates

## Technologies

**Languages:** Swift 6.0

**Frameworks:** SwiftUI, Core Data, CloudKit, EventKit, WidgetKit, ActivityKit, WatchConnectivity, App Intents, MetricKit

**Architecture:** MVVM with @Observable for reactive data flow, SPM packages (LazyflowCore, LazyflowUI)

**AI:** Apple Intelligence, Claude API, OpenAI API

**Platforms:** iOS 17+, iPadOS 17+, watchOS 10+

## Impact

**User-Focused:**
- 100% free with no ads or subscriptions
- Privacy-first design with on-device data storage
- Full accessibility support with VoiceOver and Dynamic Type
- Open source under MIT license for transparency and community contributions

**Technical Achievement:**
- Full Apple ecosystem integration (iPhone, iPad, Watch, Widgets, Siri, Live Activities)
- Multi-provider AI support with privacy-preserving architecture
- Modular codebase with SPM packages for shared models and design system
- Production app on App Store with automated CI/CD via Fastlane and Release Please

**Open Source:**
- Complete codebase available on GitHub
- Demonstrates modern SwiftUI patterns and best practices
- Snapshot tests, feature flags, and comprehensive test coverage

## Links

- **App Store:** https://apps.apple.com/us/app/lazyflow/id6757427688
- **Website:** https://lazyflow.netlify.app
- **GitHub:** https://github.com/connectwithprakash/lazyflow
`,g=`---
id: multimodal-contrastive-learning
title: New Product Forecasting from Design Images
shortDescription: CLIP-inspired pipeline combining image and time-series encoders to predict sales patterns for new products before launch, using visual similarity to existing products with known sales history.
category: computer-vision
status: completed
startDate: 2021-06
endDate: 2022-02
importance: 2
featured: false
tags: [Computer Vision, Multimodal Learning, Contrastive Learning, Deep Learning, PyTorch, Sales Forecasting, Fusemachines]
gradient: var(--gradient-primary)
thumbnail: /assets/img/projects/multimodal-contrastive-learning/thumbnail.svg
showThumbnailInDetail: false
github: null
demo: null
---

## Overview

Developed a CLIP-inspired multimodal contrastive learning pipeline to predict sales patterns for new fashion products before market launch. The system learns joint embeddings from product design images and historical sales time series, enabling demand forecasting for products with no sales history.

**How it works:** For existing products, we have both product images and historical sales time series. The system learns to map both modalities into a shared embedding space using contrastive learning. At inference, a new product's design image is encoded and we find the nearest time series embeddings in this shared space - those sales patterns become the forecast for the new product.

**Why contrastive learning?** Traditional forecasting requires historical sales data, which new products lack. By aligning image and time series representations in a shared space during training, we can bypass the image encoder at inference and directly retrieve similar sales patterns based on visual similarity.

## Problem Statement

Fashion brands needed to forecast demand for new products before launch to plan inventory and production. Challenges included:
- **Cold start problem** - New products have zero sales history
- **Design-to-demand gap** - No direct way to predict sales from product designs
- **Visual similarity** - Similar-looking products often have similar sales patterns
- **Production planning** - Forecasts needed months before launch
- **Inventory risk** - Over/under production costs for fashion items are high

## Technical Approach

Built a CLIP-style contrastive learning pipeline with two encoders:

### System Architecture

**Training Phase: Contrastive Learning**

\`\`\`mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'fontSize': '16px', 'primaryColor': 'transparent', 'primaryTextColor': '#a78bfa', 'primaryBorderColor': '#8b5cf6', 'lineColor': '#8b5cf6', 'secondaryColor': 'transparent', 'tertiaryColor': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#8b5cf6', 'clusterBkg': 'transparent', 'clusterBorder': '#6366f1', 'titleColor': '#a78bfa'}}}%%
flowchart LR
    subgraph Inputs["Batch Inputs (N pairs)"]
        direction TB
        Imgs[Product Images<br/>I₁, I₂, ... Iₙ]
        TS[Sales Time Series<br/>T₁, T₂, ... Tₙ]
    end

    subgraph Encoders["Dual Encoders"]
        direction TB
        ImgEnc[Image Encoder<br/>ResNet → 512-d]
        TSEnc[Time Series Encoder<br/>LSTM → 512-d]
    end

    subgraph Embeddings["Shared Embedding Space"]
        direction TB
        ImgEmb[Image Embeddings<br/>I₁, I₂, ... Iₙ]
        TSEmb[Time Series Embeddings<br/>T₁, T₂, ... Tₙ]
    end

    subgraph Loss["Contrastive Learning"]
        direction TB
        Sim[NxN Cosine<br/>Similarity Matrix]
        InfoNCE[InfoNCE Loss<br/>Maximize diagonal<br/>Minimize off-diagonal]
    end

    Imgs --> ImgEnc
    TS --> TSEnc
    ImgEnc --> ImgEmb
    TSEnc --> TSEmb
    ImgEmb --> Sim
    TSEmb --> Sim
    Sim --> InfoNCE
\`\`\`

The training phase uses dual encoders to map product images and sales time series into a shared 512-dimensional embedding space. The contrastive loss (InfoNCE) pulls matching pairs (I₁, T₁) together while pushing non-matching pairs apart, learning the relationship between visual design and sales patterns.

**Inference Phase: New Product Forecasting**

\`\`\`mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'fontSize': '16px', 'primaryColor': 'transparent', 'primaryTextColor': '#a78bfa', 'primaryBorderColor': '#8b5cf6', 'lineColor': '#8b5cf6', 'secondaryColor': 'transparent', 'tertiaryColor': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#8b5cf6', 'clusterBkg': 'transparent', 'clusterBorder': '#6366f1', 'titleColor': '#a78bfa'}}}%%
flowchart LR
    subgraph Input["New Product"]
        direction TB
        New[Design Image]
    end

    subgraph Encoder["Image Encoder"]
        direction TB
        Enc[Pre-trained ResNet<br/>→ 512-d]
    end

    subgraph NewEmb["New Product Embedding"]
        direction TB
        Emb[I_new<br/>512-d embedding]
    end

    subgraph Search["Similarity Search"]
        direction TB
        Bank[Pre-computed<br/>TS Embeddings<br/>T₁, T₂, ..., Tₙ<br/>512-d vectors]
        Sim[Cosine Similarity<br/>cos I_new, T₁ = 0.67<br/>cos I_new, T₂ = 0.92<br/>cos I_new, T₃ = 0.45<br/>cos I_new, T₄ = 0.88<br/>...]
    end

    subgraph Results["Forecast Output"]
        direction TB
        TopK[Top-K Nearest<br/>Time Series]
        Forecast[Sales Forecast<br/>Aggregated Pattern]
    end

    New --> Enc
    Enc --> Emb
    Bank --> Sim
    Emb --> Sim
    Sim --> TopK
    TopK --> Forecast
\`\`\`

At inference, a new product's image is encoded into the same embedding space. Cosine similarity search finds the nearest time series embeddings from the pre-computed bank. The Top-K most similar sales patterns are retrieved and aggregated to generate the final demand forecast.

**Dual Encoder Architecture:**
- **Image Encoder** - CNN/ResNet/ViT for visual feature extraction from product images
- **Time Series Encoder** - LSTM for temporal pattern encoding of historical sales
- **Projection Heads** - Map both modalities to shared 512-d embedding space
- **Contrastive Loss (InfoNCE)** - Maximizes similarity for matching pairs (Iᵢ, Tᵢ), minimizes for non-matching (Iᵢ, Tⱼ)

**Key Implementation Details:**
- Training: Batch contrastive learning with N image-timeseries pairs
- Hard negative mining: Visually similar products with different sales patterns
- Inference: Pre-compute all time series embeddings for fast retrieval
- Aggregation: Weighted average of Top-K retrieved patterns based on similarity scores

## Key Achievements

- **Cold start solution** - Enabled forecasting for products with zero sales history
- **Visual-to-sales transfer** - Successfully mapped design similarity to demand patterns
- **Pre-launch planning** - Forecasts available months before product launch
- **Production adoption** - Used for inventory planning of new product lines

## Technologies

**Deep Learning:** PyTorch, Vision Transformers, CNN architectures

**Contrastive Learning:** CLIP-style architecture, InfoNCE loss

**Time Series:** Custom temporal encoders

**Data:** Product design images, sales time series

## Impact

This approach solved the fundamental cold-start problem in new product forecasting. Traditional methods require months of sales history before generating reliable forecasts. By learning the relationship between visual design and sales patterns, the system enabled demand planning from the moment a product design was finalized, significantly reducing inventory risk for new product launches.
`,f=`---
id: semantic-context-filter
title: Semantic Context Filter
shortDescription: Production-ready AI context management using semantic similarity - 42% cost reduction with <12ms filtering. Features LangGraph workflows, FastAPI, PostgreSQL with pgvector.
category: agentic-ai
status: completed
startDate: 2025-10
endDate: 2025-10
importance: 1
featured: true
tags: [Python, LangGraph, FastAPI, PostgreSQL, AI, Open Source]
gradient: var(--gradient-primary)
thumbnail: /assets/img/projects/semantic-context-filter/thumbnail.svg
showThumbnailInDetail: false
github: https://github.com/connectwithprakash/memory-optimized-agent
demo: https://github.com/connectwithprakash/memory-optimized-agent#readme
---

## Overview

A production-ready system that intelligently filters conversation history using semantic similarity before sending context to LLMs. Instead of including full conversation history (which grows quadratically in tokens), the system retrieves only semantically relevant context, reducing costs by 42% while maintaining response quality.

**How it works:** Each conversation turn is embedded and stored in a vector database. When generating a response, the system queries for messages semantically similar to the current query, filters by an adaptive threshold, and sends only relevant context to the LLM.

## Problem Statement

LLM applications face a fundamental challenge with conversation context:

- **Quadratic token growth** - Full conversation history grows expensive quickly
- **Context window limits** - Long conversations exceed model limits
- **Irrelevant context** - Old messages often confuse the model
- **Cost accumulation** - Every token costs money at scale
- **Latency impact** - More tokens mean slower responses

Traditional solutions like sliding windows or fixed-length truncation lose important context arbitrarily. We needed intelligent filtering that preserves relevance.

## Technical Approach

Built a semantic filtering pipeline using LangGraph for orchestration:

**System Architecture:**

\`\`\`mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'fontSize': '14px', 'primaryColor': 'transparent', 'primaryTextColor': '#a78bfa', 'primaryBorderColor': '#8b5cf6', 'lineColor': '#8b5cf6', 'secondaryColor': 'transparent', 'tertiaryColor': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#8b5cf6', 'clusterBkg': 'transparent', 'clusterBorder': '#6366f1', 'titleColor': '#a78bfa'}}}%%
flowchart LR
    subgraph Input["User Query"]
        Query[New Message]
    end

    subgraph Filter["Semantic Filter"]
        direction TB
        Embed[Embed Query]
        Search[Vector Search<br/>pgvector + HNSW]
        Threshold[Adaptive<br/>Threshold]
    end

    subgraph Context["Relevant Context"]
        direction TB
        Relevant[Messages > 0.7<br/>similarity]
    end

    subgraph Generate["LLM Generation"]
        direction TB
        LLM[LLM Call<br/>58% fewer tokens]
        Save[Save to<br/>Memory Store]
    end

    Query --> Embed
    Embed --> Search
    Search --> Threshold
    Threshold --> Relevant
    Relevant --> LLM
    LLM --> Save
\`\`\`

**Core Components:**

- **MemoryOptimizedAgent** - LangGraph workflow orchestrating the pipeline
- **BaseMemoryStore** - Pluggable interface for memory backends
- **PostgresMemoryStore** - Production store using pgvector with HNSW indexing
- **InMemoryStore** - Fast store for development/testing
- **AdaptiveThreshold** - Dynamic threshold adjustment based on retrieval patterns
- **LLMFactory** - Multi-provider support (OpenAI, Anthropic, Ollama)

**Key Implementation Details:**

- Sentence embeddings using \`all-MiniLM-L6-v2\` (384 dimensions)
- HNSW index for approximate nearest neighbor search
- Cosine similarity with configurable threshold (default 0.7)
- Q&A pairs stored as combined embeddings for better retrieval
- Async FastAPI endpoints for production deployment

## Key Achievements

- **42% cost reduction** - Fewer tokens sent to LLM per request
- **Sub-10ms filtering** - 7.8ms for 10 memories, 9.9ms for 500 memories
- **Linear scaling** - Performance degrades gracefully with memory size
- **1.5KB per conversation** - Efficient storage footprint
- **Production-ready** - Docker, Prometheus metrics, structured logging

## Technologies

**Core Stack:**
- Python, LangGraph, FastAPI
- PostgreSQL with pgvector extension
- Sentence-transformers for embeddings

**Infrastructure:**
- Docker Compose deployment
- Prometheus monitoring
- Structured JSON logging

**LLM Providers:**
- OpenAI, Anthropic, Ollama (configurable)

## Impact

This project demonstrates a practical solution to a common LLM application challenge. The 42% cost reduction compounds significantly at scale - for an application making 1M LLM calls/month, this approach can save thousands in API costs while actually improving response quality by filtering out irrelevant context.

The open-source implementation serves as a reference architecture for production AI systems requiring intelligent context management.
`,y=`---
id: sound-source-localization
title: Sound Source Localization
shortDescription: A 3D sound source localization system using an 8-microphone cubical mesh for locating disaster victims. Achieved 95% accuracy within 1.5m range using GCC-PHAT algorithm and CNN-based denoising.
category: robotics
importance: 1
featured: false
tags: [Python, C, Keras, Robotics, Signal Processing]
gradient: var(--gradient-tertiary)
thumbnail: /assets/img/projects/sound_source_localization/SSL.jpg
github: https://github.com/subash-timilsina/Sound-Source-Localization
demo: https://www.youtube.com/embed/Y1u37uJwSeI
relatedLinks:
  - title: Denoise Algorithm
    url: https://github.com/connectwithprakash/Speech-Denoising-using-CED
images:
  - path: /assets/img/projects/sound_source_localization/system.png
    caption: System diagram of the sound source localization system
  - path: /assets/img/projects/sound_source_localization/algorithm.png
    caption: Process flow diagram of the algorithm
  - path: /assets/img/projects/sound_source_localization/microphone_cube.png
    caption: Cubical microphone array
  - path: /assets/img/projects/sound_source_localization/grid_search.png
    caption: Grid search method for sound source localization
---

## Overview

We developed a 3D sound source localization system using an 8-microphone cubical mesh. The primary goal of this system was to accurately determine the azimuth (horizontal angle) and elevation (vertical angle) of an incoming sound source. The system uses a cubical microphone array to detect sound waves and a grid search method to determine the location of the sound source in 3D space. The system is mounted on an omnidirectional drive vehicle, which allows it to navigate to the location of the sound source.

The system was evaluated in a simulated disaster environment and was able to successfully locate the sound source. The system is a promising new technology that could be used to help rescue victims of disasters.

The system is also capable of using the deep learning based denoise algorithm to remove background noise and improve the accuracy of the sound source localization.

## Methodology

**1. Hardware Setup**: We created a cubical mesh configuration with eight microphones, ensuring that the microphones were evenly distributed for optimal coverage.

**2. Sound Localization Algorithm**: We implemented the GCC-PHAT (Generalized Cross-Correlation with Phase Transform) algorithm. This algorithm is widely used for sound source localization and is known for its accuracy in determining the time delay of arrival (TDOA) between microphone pairs.

**3. Data Acquisition**: The system recorded sound data from the eight microphones. By analyzing the TDOAs between microphone pairs, we calculated the azimuth and elevation angles of the sound source.

**4. Signal Denoising**: To improve the accuracy of the localization system, we integrated a Convolutional Neural Network (CNN) for speech denoising. This CNN was trained to remove noise from the recorded audio signals.

**5. Result**: After extensive testing and training, the system reached an impressive 95% accuracy in 3D localization within a range of 1.5 meters. This level of accuracy was achieved through the combination of the precise GCC-PHAT algorithm and the denoising capabilities of the CNN.

**6. Conclusion**: This project is a significant achievement as it demonstrates the successful integration of signal processing techniques, machine learning, and hardware design to create a 3D sound source localization system with high accuracy. It has various potential applications in fields such as robotics, audio surveillance, and augmented reality.

## Key Features

- Sound source localization in 3D space
- Deep learning based denoise algorithm
- Omnidirectional drive vehicle integration
- 95% accuracy within 1.5m range
- GCC-PHAT algorithm implementation
- Real-time audio processing

## Technologies

**Hardware:** Raspberry Pi, AVR, Microphone Array, Omnidirectional Drive Vehicle

**Languages:** Python, C

**Frameworks:** Keras

**Algorithms:** GCC-PHAT, CNN for Denoising

## Challenges & Solutions

The denoising algorithm was computationally expensive for the Raspberry Pi. So, we needed to optimize the algorithm to run on the Raspberry Pi in real-time. Optimization process would involve using a smaller neural network, and using lower precision floating point numbers.
`,b=`---
id: spectral-unmixing
title: Spectral Unmixing
shortDescription: Deciphering Earth's and Lunar materials with advanced machine learning. Uses deep learning and feature engineering for analyzing spectral signatures.
category: computer-vision
importance: 1
featured: false
tags: [Python, PyTorch, Machine Learning, NASA]
gradient: var(--gradient-cosmic)
thumbnail: /assets/img/projects/spectral_unmixing/logo.png
github: https://github.com/NASA-IMPACT/ml_spectroscopy
demo: null
---

## Overview

This project delves into the fascinating world of spectral unmixing using machine learning. The goal is to decipher the composition of various Earth-based and Lunar materials by leveraging advanced deep learning models and feature engineering techniques. By analyzing the spectral signatures of these materials, the project seeks to provide valuable insights into Earth's geological diversity, resource exploration, scientific discovery, and enhance our understanding of Lunar materials as well.

The project uses synthetic and real data from various Earth-based materials as proxies to lunar materials. These materials range from everyday products to synthetic spectral data, demonstrating the model's adaptability and robustness.

### Unveiling Earth's and Lunar Geological Secrets

The researchers have harnessed the capabilities of machine learning to transform raw spectral data into informative features. These features capture the nuances of the materials, including periodic patterns, variations, and distinctive spectral characteristics. By doing so, they enhance the model's ability to discern subtle differences in spectral signatures and make accurate predictions regarding the composition of mixed Earth-based and Lunar materials.

### The Role of Feature Engineering

Feature engineering plays a pivotal role in the project's methodology. Techniques such as Fourier coefficients, principal component analysis (PCA) components, and derivatives are employed to create valuable representations of the spectral data. This transformation of raw data into meaningful features is essential for the accurate analysis of Earth's and Lunar geological materials.

## Key Features

- Spectral unmixing for Earth-based and Lunar materials
- Advanced feature engineering techniques
- Deep learning model for composition prediction
- Adaptability to diverse datasets
- Fourier coefficients and PCA components
- Derivative-based feature extraction

## Technologies

**Languages:** Python

**Frameworks:** PyTorch, Sklearn, Scipy

**Tools:** Jupyter Notebook, NumPy, Pandas

## Challenges & Solutions

The project addresses various challenges associated with the analysis of Earth-based and Lunar materials, including the need for extensive and diverse datasets to mimic complex material mixtures. The model's performance has been promising, but further improvements can be achieved with increased data samples, particularly in scenarios where base materials are similar.

## Future Directions

In the future, the focus should be on acquiring more spectral data for Earth-based and Lunar materials, and developing more advanced machine learning models and feature engineering techniques to enhance the accuracy of composition predictions in challenging scenarios. This project represents a significant step toward unlocking Earth's and Lunar geological secrets and advancing our understanding of the materials that make up our planet and the Moon.
`,v=`---
id: unified-llm-finetuning
title: Unified LLM Fine-Tuning CLI
shortDescription: MLOps framework unifying multiple fine-tuning ecosystems with automatic backend selection, AWS SageMaker integration, and significant cost reduction through spot instances.
category: mlops
status: in-progress
startDate: 2025-12
importance: 1
featured: false
tags: [LLM Fine-Tuning, MLOps, Distributed Training, AWS SageMaker, LoRA, DeepSpeed, Multi-GPU, CLI Tools, Internal]
gradient: var(--gradient-tertiary)
thumbnail: /assets/img/projects/unified-llm-finetuning/thumbnail.svg
github: null
demo: null
---

## Overview

An MLOps framework that provides a unified CLI for fine-tuning open-source LLMs. It abstracts away the complexity of multiple fine-tuning ecosystems (Unsloth, TRL/PEFT) with automatic backend selection, comprehensive AWS SageMaker integration, and best practices built-in for both local and cloud training workflows.

## Problem Statement

Fine-tuning open-source LLMs presents significant operational challenges:
- **Ecosystem fragmentation** - Engineers must learn multiple tools (Unsloth, TRL/PEFT) with different APIs
- **Configuration complexity** - Manual setup of distributed training (DDP, DeepSpeed), version compatibility nightmares
- **Cloud training barriers** - AWS SageMaker requires complex setup for multi-node training and spot instance handling
- **No unified interface** - Developers waste time stitching together tools and debugging integration issues

The ML engineering community needed a unified framework that provides production-grade capabilities out-of-the-box with minimal configuration.

## Technical Approach

Designed a layered architecture with automatic backend selection and comprehensive configuration management:

### System Architecture

\`\`\`mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': 'transparent', 'primaryTextColor': '#a78bfa', 'primaryBorderColor': '#8b5cf6', 'lineColor': '#8b5cf6', 'secondaryColor': 'transparent', 'tertiaryColor': 'transparent', 'mainBkg': 'transparent', 'nodeBorder': '#8b5cf6', 'clusterBkg': 'transparent', 'clusterBorder': '#6366f1', 'titleColor': '#a78bfa'}}}%%
flowchart LR
    subgraph CLI["CLI Commands"]
        Train[train]
        Eval[evaluate]
        Launch[launch]
        Export[export]
        SM[sagemaker]
    end

    subgraph Config["Config Layer"]
        YAML[YAML Configs]
        Hydra[Hydra Compose]
        Schema[Pydantic Schema]
    end

    subgraph Backends["Backend Selection"]
        Auto{Auto-Select}
        Unsloth[Unsloth<br/>Optimized]
        TRL[TRL/PEFT<br/>Fallback]
    end

    subgraph Infra["Infrastructure"]
        Local[Local Training]
        Cloud[AWS SageMaker]
        DDP[PyTorch DDP]
        DS[DeepSpeed ZeRO]
        Models[Model Artifacts]
    end

    CLI --> YAML
    YAML --> Hydra
    Hydra --> Schema
    Schema --> Auto
    Auto -->|CUDA available| Unsloth
    Auto -->|No CUDA| TRL
    Unsloth --> Local
    Unsloth --> Cloud
    TRL --> Local
    TRL --> Cloud
    Launch --> DDP
    TRL --> DS
    SM --> Cloud
    Local --> Models
    Cloud --> Models
    Eval --> Models
    Export --> Models
\`\`\`

**Core Architecture:**
- **Unified CLI Interface** - Single command-line tool with consistent API across all backends
- **Hydra + Pydantic Stack** - Type-safe configuration management with validation
- **Automatic Backend Selection** - CUDA available → Unsloth (optimized), CPU fallback → TRL
- **Protocol-Based Evaluation** - Pluggable evaluation framework supporting multiple backends (vLLM, HuggingFace)

**AWS SageMaker Integration:**
- Multi-node distributed training support with NCCL communication
- Spot instance orchestration with automatic retry logic (70-90% cost savings)
- Proper framework version management for gated models
- S3 checkpoint management and model artifact handling

**Optimization Stack:**
- DeepSpeed ZeRO stages (2, 3) for memory-efficient training
- LoRA/QLoRA with 4-bit quantization
- Gradient checkpointing for reduced memory footprint
- Sample packing for improved throughput
- Automatic chat template detection and formatting

## Key Achievements

- **44 samples/sec** - Achieved high throughput on 4x A10G GPUs with 4-bit quantization
- **70-90% cost reduction** - AWS SageMaker spot instances vs on-demand pricing
- **10.5% loss improvement** - Validated multi-GPU DDP training (1.43 → 1.28) over 3 epochs
- **2 ecosystem unification** - Single interface for Unsloth and TRL/PEFT backends
- **129+ test suite** - Comprehensive testing for production reliability
- **Zero-config operation** - Automatic backend selection based on available hardware
- **1B-70B+ model support** - Memory optimization enables training large models on consumer hardware

## Technologies

**ML Stack:** PyTorch, Transformers, Unsloth, TRL/PEFT

**Optimization:** LoRA/QLoRA, DeepSpeed ZeRO, 4-bit quantization, Gradient checkpointing

**Infrastructure:** AWS SageMaker, NCCL, vLLM

**Engineering:** Python, Hydra, Pydantic, uv package manager

## Technical Innovations

### 1. Automatic Backend Selection
Intelligent hardware detection that automatically chooses the optimal fine-tuning backend:
- Single GPU → Unsloth (2x faster than standard approaches)
- Multi-GPU → TRL with DDP for distributed training
- No manual configuration required

### 2. DDP Data Sharding Fix
Solved critical issues preventing proper data sharding across multiple GPUs in distributed training:
- Proper \`torch.distributed\` initialization with NCCL backend
- Automatic disabling of 4-bit quantization in DDP mode (incompatible with model wrapping)
- Correct device setup order required by NCCL
- Dynamic SFTConfig parameters for DistributedSampler integration

This fix enables true 4x speedup with 4 GPUs instead of redundant computation.

### 3. Protocol-Based Evaluation
Designed pluggable evaluation architecture supporting multiple backends (vLLM for fast batch inference, HuggingFace for flexibility) with custom metric implementations.

### 4. SageMaker Spot Instance Orchestration
Implemented robust spot instance handling with automatic retry logic, achieving 70-90% cost savings while maintaining training reliability through proper checkpoint management.

## Impact

This framework democratizes LLM fine-tuning by providing enterprise capabilities in an internal tool. The framework enables researchers and engineers to:
- **Rapid experimentation** - Zero-config operation reduces setup time from hours to minutes
- **Cost-efficient training** - Spot instances make cloud training accessible
- **Production reliability** - Comprehensive testing and error handling prevent common pitfalls
- **Ecosystem flexibility** - Switch backends without rewriting configurations

The project demonstrates deep MLOps expertise spanning distributed systems, cloud infrastructure, and ML framework internals.
`,w=Object.assign({"../content/projects/abu-robocon-2018.md":r,"../content/projects/agent-relay.md":s,"../content/projects/ai-shopping-assistant.md":c,"../content/projects/async-matching-framework.md":l,"../content/projects/automated-data-annotation.md":d,"../content/projects/diskard.md":p,"../content/projects/false-positive-auditor.md":m,"../content/projects/foxhound-security-solution.md":u,"../content/projects/lazyflow.md":h,"../content/projects/multimodal-contrastive-learning.md":g,"../content/projects/semantic-context-filter.md":f,"../content/projects/sound-source-localization.md":y,"../content/projects/spectral-unmixing.md":b,"../content/projects/unified-llm-finetuning.md":v}),k=Object.entries(w).map(([,n])=>{const{data:e,content:t}=o(n);return{id:e.id,title:e.title,shortDescription:e.shortDescription,category:e.category,status:e.status,startDate:e.startDate,endDate:e.endDate,importance:e.importance,featured:e.featured,tags:e.tags||[],gradient:e.gradient,thumbnail:e.thumbnail,heroImage:e.heroImage,showThumbnailInDetail:e.showThumbnailInDetail,github:e.github,demo:e.demo,relatedLinks:e.relatedLinks||[],relatedVideos:e.relatedVideos||[],images:e.images||[],imageLayout:e.imageLayout,installation:e.installation,content:t}}),i=k.sort((n,e)=>{const t=n.endDate||(n.status==="in-progress"?"9999-12":n.startDate)||"1900-01",a=e.endDate||(e.status==="in-progress"?"9999-12":e.startDate)||"1900-01";return t!==a?a.localeCompare(t):(n.importance||99)-(e.importance||99)}),C=n=>i.find(e=>e.id===n),S=(n,e,t=3)=>i.filter(a=>a.id!==n&&a.category===e).slice(0,t);export{S as a,C as g,i as p};
