---
title: "Claude Prompting"
description: "Optimize prompts specifically for Claude models"
category: model-specific
difficulty: intermediate
estimatedTime: 15
order: 2
tags: ["claude", "anthropic", "model-specific"]
---

# Claude Prompting

Claude models have specific characteristics that influence how to write effective prompts.

## Claude Strengths

- Strong ethical guidelines
- Excellent at analysis and reasoning
- Good with long documents
- Helpful and harmless by design

## Best Practices for Claude

### 1. Be Direct
Claude responds well to clear, direct instructions.

### 2. Provide Context
Give relevant background information.

### 3. Use XML Tags
Claude understands XML tags for structuring input.

## Example

```python
prompt = """
<article>
<h1>Customer Review</h1>
<p>This product is amazing! Best purchase I've ever made.</p>
</article>

<instructions>
Analyze this review and provide:
1. Sentiment (positive/negative/neutral)
2. Key points mentioned
3. Recommendation for the business
</instructions>
"""
```

## Quiz

<Quiz
  question="What format does Claude understand well for structuring input?"
  options={[
    "JSON only",
    "Markdown only",
    "XML tags",
    "Plain text only"
  ]}
  correct={2}
/>
