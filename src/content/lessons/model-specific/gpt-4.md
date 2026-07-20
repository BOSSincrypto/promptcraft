---
title: "GPT-4 Prompting"
description: "Optimize prompts specifically for GPT-4 models"
category: model-specific
difficulty: intermediate
estimatedTime: 15
order: 1
tags: ["gpt-4", "openai", "model-specific"]
---

# GPT-4 Prompting

GPT-4 has unique characteristics that can be leveraged for better results.

## GPT-4 Strengths

- Excellent instruction following
- Strong reasoning capabilities
- Good at complex tasks
- Supports long context windows

## Best Practices for GPT-4

### 1. System Messages
Use system messages to set context and behavior.

### 2. Structured Output
Request specific formats (JSON, markdown, etc.).

### 3. Step-by-Step Instructions
Break complex tasks into clear steps.

## Example

```python
system_message = "You are a helpful coding assistant. Provide clear, well-commented code."

user_prompt = """
Write a Python function that:
1. Takes a list of numbers
2. Returns the average of even numbers
3. Includes error handling
4. Has docstring and type hints
"""
```

## Quiz

<Quiz
  question="What is GPT-4's key strength for prompting?"
  options={[
    "Speed",
    "Cost efficiency",
    "Instruction following",
    "Image generation"
  ]}
  correct={2}
/>
