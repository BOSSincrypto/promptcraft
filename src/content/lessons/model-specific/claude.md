---
title: "Claude Fable 5/Sonnet 5 Prompting"
description: "Optimize prompts for Anthropic's 2026 Claude models"
category: model-specific
difficulty: intermediate
estimatedTime: 15
order: 2
tags: ["claude", "anthropic", "fable-5", "sonnet-5", "model-specific", "2026"]
---

# Claude Fable 5/Sonnet 5 Prompting

Claude Fable 5 (June 2026) is Anthropic's most capable model with **~95% SWE-bench** score. Claude Sonnet 5 offers the best value.

## Claude Strengths

- **1M Token Context**: Process entire repositories
- **Extended Thinking**: Automated structured reasoning
- **Claude Code**: Native agentic coding tool
- **Instruction Following**: Strict adherence

## Best Practices for Claude

### 1. Be Direct and Clear
Claude follows instructions literally - conflicting rules cause instability.

### 2. Use XML Tags for Structure
Claude handles XML tags well for complex prompts.

### 3. Give Permission to Express Uncertainty
Reduces hallucinations: "If unsure, say so."

### 4. Leverage Extended Thinking
Let Claude think before responding for complex tasks.

## Model Variants (July 2026)

| Model | Best For | Price |
|-------|----------|-------|
| **Fable 5** | Maximum capability | $10/$50 |
| **Sonnet 5** | Best value | $3/$15 |
| **Opus 4.8** | Deep reasoning | $5/$25 |

## Example

```python
# Claude-optimized prompt
prompt = """
<role>Senior code reviewer with security expertise</role>

<task>Review this authentication code for vulnerabilities</task>

<output_format>
- Critical issues (must fix)
- Warnings (should fix)  
- Suggestions (nice to have)
- Each with specific line numbers and fix recommendations
</output_format>

<code>
[paste code here]
</code>
"""
```

## The Advisor/Executor Pattern

Use Fable 5 for strategic planning, Sonnet 5 for execution:
- **Fable 5**: Code review, architecture decisions
- **Sonnet 5**: Code generation, bulk processing

## Quiz

<Quiz
  question="What is Claude Fable 5's SWE-bench score?"
  options={[
    "~75%",
    "~85%",
    "~95%",
    "~99%"
  ]}
  correct={2}
/>

<Quiz
  question="What is the Advisor/Executor pattern?"
  options={[
    "Using one model for everything",
    "Fable 5 for strategy, Sonnet 5 for execution",
    "Running models in parallel",
    "Using only open-source models"
  ]}
  correct={1}
/>
