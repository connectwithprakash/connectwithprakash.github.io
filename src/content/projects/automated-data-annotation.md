---
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

```mermaid
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
```

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
