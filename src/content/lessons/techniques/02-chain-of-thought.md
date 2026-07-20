---
title: "Chain of Thought & Reasoning in 2026"
description: "Master reasoning patterns including CoT, ReAct, and Reflexion"
category: techniques
difficulty: intermediate
estimatedTime: 20
order: 2
tags: ["reasoning", "logic", "chain-of-thought", "react", "reflexion", "2026"]
---

# Chain of Thought & Reasoning in 2026

Chain of Thought (CoT) is the foundation. In 2026, it's evolved into **three reasoning architectures** for different use cases.

## The Three Reasoning Patterns

### 1. Chain of Thought (CoT)
**Foundation:** Generate reasoning steps before committing to output.

```python
prompt = """Solve this step by step:

Problem: A store offers 20% off on all items. If a jacket originally 
costs $85, and there's an additional 10% tax, what's the final price?

Let's think through this:
1. Calculate the discount amount
2. Apply the discount to find the sale price
3. Calculate the tax on the sale price
4. Add tax to find the final price"""
```

### 2. ReAct (Reason + Act)
**For tool-using agents:** Loop of Thought → Action → Observation.

```
Thought: I need to find the current stock price of AAPL
Action: search_stock_price("AAPL")
Observation: AAPL is trading at $198.50
Thought: Now I need to calculate the portfolio value
Action: calculate_portfolio_value(...)
Observation: Portfolio value is $19,850
Thought: The calculation is complete
Final Answer: Your AAPL portfolio is worth $19,850
```

**Key rule:** "Never skip the Thought step. Never take an Action without a Thought that justifies it."

### 3. Reflexion (Self-Correction)
**For quality-critical tasks:** Evaluate and revise your own output.

```
Step 1: Generate initial analysis
Step 2: Evaluate against the original goal
Step 3: Identify failures or gaps
Step 4: Generate revised plan
Step 5: Re-execute with improvements
```

## Extended Thinking (2026 Models)

Modern models have **built-in extended thinking**:

- **GPT-5.5/5.6**: Automatic chain-of-thought
- **Claude Fable 5**: Configurable thinking depth
- **Gemini 3.5**: Thinking levels (low/medium/high)

**When to use explicit CoT:**
- When you need to see the reasoning
- When the model's default thinking isn't sufficient
- When debugging model outputs

## ReAct Pattern in Practice

```python
# Agent prompt with ReAct
prompt = """You are a research agent. Use this pattern for every task:

Thought: [What do I need to figure out?]
Action: [What tool should I use?]
Observation: [What did I learn?]
... repeat until you have enough information ...
Final Answer: [Synthesized response]

Never skip the Thought step."""
```

## Reflexion for Quality Control

```python
prompt = """Write a technical analysis, then evaluate it:

1. Generate your analysis
2. Critically evaluate: Is it accurate? Complete? Clear?
3. Identify any gaps or errors
4. Revise based on your evaluation
5. Provide final version

Show your evaluation process."""
```

## When to Use Each Pattern

| Pattern | Best For | Latency |
|---------|----------|---------|
| CoT | Math, logic, reasoning | Low |
| ReAct | Tool-using agents, research | Medium |
| Reflexion | Quality-critical outputs | High |

## Quiz

<Quiz
  question="What is the ReAct pattern?"
  options={[
    "React.js integration",
    "Reason + Act loop for tool-using agents",
    "Real-time action processing",
    "Recursive text generation"
  ]}
  correct={1}
/>

<Quiz
  question="When should you use Reflexion?"
  options={[
    "For simple classification tasks",
    "For quality-critical outputs that need self-correction",
    "For real-time chat responses",
    "For image generation"
  ]}
  correct={1}
/>

## Practice

Design a ReAct prompt for an agent that needs to research a topic and write a report.
