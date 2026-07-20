---
title: "What is Prompting?"
description: "Learn the fundamentals of prompt engineering and why it matters"
category: fundamentals
difficulty: beginner
estimatedTime: 10
order: 1
tags: ["basics", "introduction", "prompt-engineering"]
---

# What is Prompting?

Prompting is the art and science of communicating effectively with AI models. A prompt is the input you provide to an AI model to guide its output.

## Why Prompt Engineering Matters

Good prompts lead to better results. Whether you're writing code, generating creative content, or analyzing data, the quality of your prompt directly impacts the quality of the AI's response.

## Key Concepts

### 1. Input vs Output
- **Input**: Your prompt (the question or instruction)
- **Output**: The AI's response

### 2. Context Window
AI models have a limited "memory" called a context window. Your prompt needs to fit within this window along with the AI's response.

### 3. Tokenization
AI models process text in chunks called tokens. A token is roughly 4 characters in English.

## Example

```python
# Simple prompt
prompt = "Write a short poem about the ocean"

# Better prompt with more context
prompt = "Write a 4-line poem about the ocean that uses metaphors and has a calming tone"
```

## Try It Yourself

<Quiz
  question="What is a prompt in the context of AI?"
  options={[
    "A type of AI model",
    "Input provided to guide AI output",
    "The AI's response",
    "A programming language"
  ]}
  correct={1}
/>

## Next Steps

Now that you understand what prompting is, let's learn about the basic structure of effective prompts.
