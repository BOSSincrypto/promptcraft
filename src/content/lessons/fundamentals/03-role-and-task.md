---
title: "Role and Task Definition"
description: "Master the art of assigning roles and defining tasks clearly"
category: fundamentals
difficulty: beginner
estimatedTime: 15
order: 3
tags: ["role", "task", "definition"]
---

# Role and Task Definition

Assigning a role to the AI and clearly defining the task are powerful techniques for getting better results.

## The Power of Roles

When you assign a role, you give the AI a perspective and expertise to draw from.

### Common Roles
- **Expert**: "You are an expert in..."
- **Teacher**: "You are a patient teacher explaining..."
- **Writer**: "You are a professional writer..."
- **Analyst**: "You are a data analyst..."

## Task Definition

Clearly define what you want the AI to accomplish.

### Good Task Definition
"Write a 500-word blog post about sustainable living tips for beginners"

### Poor Task Definition
"Write about sustainability"

## Example

```python
# Role and task combined
prompt = """
Role: You are a senior software engineer with 10 years of experience in Python.

Task: Review the following code and provide:
1. Bug identification
2. Performance improvements
3. Code style suggestions

Code to review:
def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
    return total / len(numbers)
"""
```

## Quiz

<Quiz
  question="What does assigning a role to the AI accomplish?"
  options={[
    "Makes the AI faster",
    "Gives the AI a perspective and expertise",
    "Reduces token usage",
    "Changes the AI's model"
  ]}
  correct={1}
/>

## Next Steps

Learn how to use few-shot learning to teach AI with examples.
