---
title: "Few-Shot Learning"
description: "Teach AI with examples for improved task performance"
category: techniques
difficulty: intermediate
estimatedTime: 12
order: 1
tags: ["examples", "learning", "few-shot"]
---

# Few-Shot Learning

Few-shot learning is a technique where you provide examples to teach the AI the pattern you want it to follow.

## How Few-Shot Works

By showing the AI a few examples, you establish a pattern that it can then apply to new inputs.

### Types of Few-Shot
- **Zero-shot**: No examples provided
- **One-shot**: One example provided
- **Few-shot**: Multiple examples provided (typically 2-5)

## Example

```python
# Few-shot example for sentiment analysis
prompt = """
Classify the sentiment of these reviews:

Review: "This product is amazing!"
Sentiment: Positive

Review: "Terrible quality, broke after one day."
Sentiment: Negative

Review: "It's okay, nothing special."
Sentiment: Neutral

Review: "Best purchase I've ever made!"
Sentiment: ?"""
```

## Best Practices

1. **Use diverse examples**: Show different scenarios
2. **Keep examples consistent**: Use the same format
3. **Include edge cases**: Cover different possibilities
4. **Order matters**: Start with clear examples

## Quiz

<Quiz
  question="How many examples are typically used in few-shot learning?"
  options={[
    "Exactly 1",
    "2-5 examples",
    "At least 10",
    "It doesn't matter"
  ]}
  correct={1}
/>

## Practice

Create a few-shot prompt for classifying emails as urgent or non-urgent.
