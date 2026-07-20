---
title: "Chain of Thought Prompting"
description: "Guide AI through step-by-step reasoning for better results"
category: techniques
difficulty: intermediate
estimatedTime: 15
order: 2
tags: ["reasoning", "logic", "chain-of-thought"]
---

# Chain of Thought Prompting

Chain of Thought (CoT) prompting encourages AI models to show their reasoning process step by step.

## Why CoT Works

When AI models explain their thinking, they're more likely to arrive at correct answers, especially for complex reasoning tasks.

## Basic CoT

```python
# Without CoT
prompt = "What is 15% of 230?"

# With CoT
prompt = """
Calculate 15% of 230.
Show your work step by step."""
```

## Advanced CoT

```python
# Structured CoT
prompt = """
Problem: A store offers 20% off on all items. If a jacket originally 
costs $85, and there's an additional 10% tax, what's the final price?

Let's think through this step by step:
1. Calculate the discount amount
2. Apply the discount to find the sale price
3. Calculate the tax on the sale price
4. Add tax to find the final price

Show all your calculations."""
```

## When to Use CoT

- Mathematical problems
- Logic puzzles
- Multi-step reasoning
- Complex analysis
- Decision-making scenarios

## Quiz

<Quiz
  question="What does Chain of Thought prompting primarily improve?"
  options={[
    "Response speed",
    "Accuracy on complex reasoning tasks",
    "Token efficiency",
    "Model selection"
  ]}
  correct={1}
/>

## Practice

Use CoT to solve this problem: "If a car travels 60 mph for 2.5 hours, then 45 mph for 1.5 hours, what's the total distance?"
