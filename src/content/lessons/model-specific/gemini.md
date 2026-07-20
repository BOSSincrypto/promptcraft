---
title: "Gemini 3.5 Prompting"
description: "Optimize prompts for Google's 2026 Gemini models"
category: model-specific
difficulty: intermediate
estimatedTime: 15
order: 3
tags: ["gemini", "google", "gemini-3.5", "model-specific", "2026"]
---

# Gemini 3.5 Prompting

Gemini 3.5 Flash (May 2026) is Google's fast multimodal model with **1M token context** and **thinking levels** for controlled reasoning depth.

## Gemini Strengths

- **1M Token Context**: Process entire codebases
- **Native Multimodal**: Text, images, video, audio
- **Thinking Levels**: Control reasoning depth (low/medium/high)
- **Schema-Based Outputs**: Define strict JSON schemas inline
- **Grounded Generation**: Web search for factual accuracy

## Best Practices for Gemini

### 1. Use Thinking Levels
Control reasoning depth explicitly:
```
Think carefully about this problem: [complex analysis task]
Quickly classify this: [simple classification]
```

### 2. Schema-Based Outputs
Define strict output schemas:
```
Return a JSON object with this exact structure:
{
  "findings": [{"severity": "high|medium|low", "description": "..."}],
  "score": 0-100,
  "summary": "..."
}
```

### 3. Leverage Multimodal
Combine text, images, and code:
```
[Attach screenshot of error]
[Attach code file]
This code produces the error shown. Analyze both and fix.
```

### 4. Grounded Generation
Use web search for current information:
```
What are the latest developments in quantum computing?
Use web search for information from the past 3 months.
```

## Model Variants (July 2026)

| Model | Best For | Price |
|-------|----------|-------|
| **Flash** | Fast, affordable | $1.50/$9 |
| **Pro** | Deep reasoning | $2/$12 |
| **Deep Think** | Complex analysis | Premium |

## Example

```python
# Gemini-optimized prompt with schema
prompt = """Analyze this code and return a JSON report:

{
  "issues": [{"type": "bug|security|performance", "severity": "high|medium|low", "description": "...", "fix": "..."}],
  "complexity_score": 1-10,
  "recommendations": ["..."]
}

Code to analyze:
[paste code]"""
```

## Quiz

<Quiz
  question="What are Gemini's 'thinking levels'?"
  options={[
    "Temperature settings",
    "Controls for reasoning depth (low/medium/high)",
    "Output length limits",
    "Token count restrictions"
  ]}
  correct={1}
/>

<Quiz
  question="What is 'grounded generation' in Gemini?"
  options={[
    "Generating images from text",
    "Using web search for factual accuracy",
    "Offline content generation",
    "Code execution"
  ]}
  correct={1}
/>
