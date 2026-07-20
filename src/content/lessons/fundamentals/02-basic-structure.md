---
title: "Basic Structure of a Prompt"
description: "Learn the essential components of an effective prompt"
category: fundamentals
difficulty: beginner
estimatedTime: 12
order: 2
tags: ["structure", "components", "basics"]
---

# Basic Structure of a Prompt

Every effective prompt contains several key components that work together to guide the AI's response.

## The Four Pillars of Prompting

### 1. Context
Provide background information that helps the AI understand the situation.

### 2. Task
Clearly state what you want the AI to do.

### 3. Format
Specify how you want the response formatted.

### 4. Constraints
Set boundaries and requirements for the response.

## Example

```python
# Basic prompt
prompt = "Write a story"

# Structured prompt
prompt = """
Context: You are a creative writer for a children's magazine.
Task: Write a short story about a friendly robot.
Format: 3 paragraphs, simple language suitable for 8-year-olds.
Constraints: 
- Must have a happy ending
- Include a lesson about friendship
- No scary elements
"""
```

## Why Structure Matters

Structured prompts lead to more predictable and useful responses. They help the AI understand exactly what you need.

## Quiz

<Quiz
  question="Which component provides background information to the AI?"
  options={[
    "Task",
    "Format",
    "Context",
    "Constraints"
  ]}
  correct={2}
/>

## Practice

Try writing a structured prompt for a recipe generation task.
