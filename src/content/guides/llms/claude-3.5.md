---
title: "Claude 3.5 Prompt Engineering Guide"
description: "Master prompt engineering for Anthropic's advanced language model"
modelType: "llms"
modelSlug: "claude-3.5"
version: "3.5"
lastUpdated: 1690000000000
icon: "Bot"
color: "blue"
---

# Claude 3.5 Prompt Engineering Guide

Claude 3.5 is Anthropic's advanced language model, excelling at nuanced understanding, careful reasoning, and following complex instructions. This guide will help you craft effective prompts for Claude.

## Key Features

- **Nuanced Understanding**: Claude excels at understanding context and subtlety
- **Careful Reasoning**: Thoughtful step-by-step analysis of complex problems
- **Instruction Following**: Precise adherence to detailed formatting and content requirements
- **Long Context**: Can handle very long conversations and documents

## Best Practices

### 1. Provide Clear Context

Claude responds best when given clear, comprehensive context for your task.

**Example:**
```
Instead of: "Write a summary"
Use: "You are a technology analyst. Write a 300-word executive summary of this technical document for non-technical stakeholders. Focus on business implications and key recommendations."
```

### 2. Use XML Tags for Structure

Claude handles XML tags well for structuring complex prompts.

**Example:**
```
<article>
  [Your article text here]
</article>

<instructions>
Summarize the above article in 3 bullet points, focusing on key findings.
</instructions>
```

### 3. Leverage Claude's Honesty

Claude is designed to be honest about uncertainty. Use this to your advantage.

**Example:**
```
If you're unsure about any aspect of my request, please indicate that clearly rather than guessing.
```

### 4. Use Step-by-Step Instructions

Break complex tasks into numbered steps for better results.

**Example:**
```
Please analyze this data in the following steps:
1. Identify the key trends
2. Note any anomalies
3. Provide a summary with recommendations
```

### 5. Specify Output Format

Claude excels at following detailed formatting instructions.

**Example:**
```
Provide your response in the following format:
- **Summary**: One paragraph overview
- **Key Points**: 3-5 bullet points
- **Recommendations**: Numbered list with brief explanations
```

## Common Pitfalls

1. **Ambiguous Instructions**: Vague requests lead to generic responses
2. **Conflicting Requirements**: Don't give contradictory instructions
3. **Missing Context**: Without background, responses may miss the mark
4. **Ignoring Safety**: Claude may decline requests that seem harmful

## Advanced Techniques

### Chain of Thought with Claude

Ask Claude to think through problems step by step for complex reasoning.

### Role Playing

Claude can effectively adopt different roles and expertise levels.

### Iterative Refinement

Start with a broad request, then refine based on initial output.

## Tips for Specific Use Cases

### Analysis and Research
- Provide source material explicitly
- Ask for citations and evidence
- Request structured analysis formats

### Creative Writing
- Specify tone, style, and audience
- Provide examples of desired output
- Use Claude's strength in nuanced language

### Code Generation
- Specify language and framework
- Include error handling requirements
- Request detailed comments

## Model Comparison

| Feature | Claude 3.5 | GPT-4 |
|---------|------------|-------|
| Nuanced Understanding | Excellent | Excellent |
| Reasoning | Strong | Strong |
| Context Length | 200K tokens | 128K tokens |
| Safety | Very Conservative | Balanced |
| Speed | Fast | Moderate |

## When to Use Claude 3.5

- Tasks requiring careful, nuanced analysis
- Long document processing
- Applications needing strong safety guardrails
- Tasks where honesty about uncertainty is important

## When to Use Alternatives

- Creative tasks requiring more flexibility (consider GPT-4)
- Tasks needing real-time data (use models with web access)
- Highly specialized domain tasks (use domain-specific models)
