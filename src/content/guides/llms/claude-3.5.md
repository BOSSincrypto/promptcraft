---
title: "Claude Fable 5 Prompt Engineering Guide"
description: "Master prompt engineering for Anthropic's most capable coding model"
modelType: "llms"
modelSlug: "claude-fable-5"
version: "Fable 5"
lastUpdated: 1750579200000
icon: "Bot"
color: "orange"
---

# Claude Fable 5 Prompt Engineering Guide

Claude Fable 5 (June 9, 2026) is Anthropic's most capable model with **~95% SWE-bench Verified** score - the highest raw coding capability of any model. Claude Sonnet 5 (June 30, 2026) offers the best value.

## Model Family (July 2026)

| Model | Best For | Price (Input/Output) |
|-------|----------|---------------------|
| **Claude Fable 5** | Maximum coding capability | $10/$50 per 1M tokens |
| **Claude Sonnet 5** | Best value coder | $3/$15 per 1M tokens |
| **Claude Opus 4.8** | Deepest reasoning | $5/$25 per 1M tokens |

## Key Features

- **1M Token Context Window**: Process entire repositories
- **Extended Thinking**: Automated structured reasoning
- **Claude Code**: Native agentic coding tool
- **Tool Use**: Function calling and API integration
- **200K Output**: Generate long, coherent responses

## Best Practices

### 1. Be Explicit and Clear

Claude responds best to direct, unambiguous instructions. Lead with action verbs.

**Example:**
```
Instead of: "Write a summary"
Use: "Summarize this technical document in 300 words for non-technical stakeholders. Focus on business implications and key recommendations."
```

### 2. Provide Context and Motivation

Explain why a task matters to improve quality.

**Example:**
```
We're migrating from a monolithic architecture to microservices. This is critical for scalability and team autonomy. Analyze this codebase and identify the best candidates for extraction into separate services.
```

### 3. Use Examples (Few-Shot)

Provide 2-5 examples for complex transformations:

**Example:**
```
Convert natural language to SQL:

Input: "Show me all users who signed up in the last 30 days"
Output: SELECT * FROM users WHERE created_at > NOW() - INTERVAL '30 days';

Input: "Count orders per customer with more than 5 orders"
Output: SELECT customer_id, COUNT(*) as order_count FROM orders GROUP BY customer_id HAVING COUNT(*) > 5;

Input: "Find products that are out of stock"
Output:
```

### 4. Give Permission to Express Uncertainty

Reduce hallucinations by allowing Claude to say "I don't know."

**Example:**
```
If you're unsure about any part of this analysis, please indicate that clearly rather than guessing. It's better to say "I'm not certain" than to provide potentially incorrect information.
```

### 5. Prefill the Response

Guide format by starting the response yourself:

**Example:**
```
Analyze this code for security vulnerabilities.

## Security Analysis

**Critical Issues:**
```

### 6. Use Extended Thinking for Complex Tasks

Claude's extended thinking handles multi-step reasoning automatically. Just describe the task clearly and let it think.

## Advanced Techniques

### Claude Code (Agentic Coding)

Claude Sonnet 5 includes native Claude Code - an agentic coding tool that can:
- Read and write files
- Run terminal commands
- Navigate codebases
- Fix bugs autonomously

### Prompt Chaining

Break complex tasks into sequential steps:
1. Analyze the problem
2. Create a plan
3. Execute step by step
4. Review and refine

### Context Engineering

Manage broader context beyond just the prompt:
- Conversation history
- File contents
- System instructions
- Tool outputs

## Model Comparison (July 2026)

| Feature | Claude Fable 5 | GPT-5.5 | Gemini 3.5 |
|---------|----------------|---------|------------|
| SWE-bench | ~95% | ~82% | ~75% |
| Context Window | 1M | 1M | 1M |
| Reasoning | Excellent | Excellent | Strong |
| Coding | Best | Strong | Strong |
| Price (Input) | $10 | $5 | $1.50 |

## When to Use Claude Fable 5

- Maximum coding capability needed
- Complex code generation and refactoring
- Long document analysis
- Tasks requiring careful, nuanced reasoning
- Agentic coding workflows with Claude Code

## When to Use Claude Sonnet 5

- Best balance of cost and capability
- High-volume coding tasks
- Daily development assistance
- Budget-conscious applications
