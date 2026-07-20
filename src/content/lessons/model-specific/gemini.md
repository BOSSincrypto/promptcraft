---
title: "Gemini Prompting"
description: "Optimize prompts specifically for Google Gemini models"
category: model-specific
difficulty: intermediate
estimatedTime: 15
order: 3
tags: ["gemini", "google", "model-specific"]
---

# Gemini Prompting

Google Gemini models have unique features for effective prompting.

## Gemini Strengths

- Multimodal capabilities (text, image, audio)
- Strong integration with Google ecosystem
- Good at research and analysis
- Supports large context windows

## Best Practices for Gemini

### 1. Leverage Multimodal Input
Combine text and images when relevant.

### 2. Be Specific About Format
Clearly define output structure.

### 3. Use Clear Examples
Provide concrete examples for better results.

## Example

```python
prompt = """
Analyze this image and text together:

Image: [product photo]
Text: "This product broke after one day of use."

Provide:
1. Visual description of damage
2. Text sentiment analysis
3. Combined assessment
4. Recommended action
"""
```

## Quiz

<Quiz
  question="What makes Gemini unique compared to other models?"
  options={[
    "It's the fastest model",
    "It has multimodal capabilities",
    "It's the cheapest to use",
    "It only works with text"
  ]}
  correct={1}
/>
