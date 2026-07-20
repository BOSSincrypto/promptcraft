---
title: "GPT-4 Prompt Engineering Guide"
description: "Master prompt engineering for OpenAI's most capable language model"
modelType: "llm"
modelSlug: "gpt-4"
version: "4.0"
lastUpdated: 1690000000000
icon: "Bot"
color: "blue"
---

# GPT-4 Prompt Engineering Guide

GPT-4 is OpenAI's most advanced language model, offering improved reasoning, creativity, and instruction following. This guide will help you craft effective prompts to get the best results.

## Key Features

- **Enhanced Reasoning**: GPT-4 excels at complex logical tasks
- **Better Instruction Following**: More precise adherence to detailed instructions
- **Larger Context Window**: Can handle longer conversations and documents
- **Improved Creativity**: Better at generating creative content

## Best Practices

### 1. Be Specific and Clear

GPT-4 responds well to precise instructions. Avoid vague requests and provide clear context.

**Example:**
```
Instead of: "Write a story"
Use: "Write a 500-word science fiction story about a astronaut discovering an alien artifact on Mars. Include dialogue and descriptive language."
```

### 2. Use System Messages Effectively

System messages help set the context and behavior for the model.

**Example:**
```
System: You are a professional copywriter with 10 years of experience in tech marketing. Write concise, engaging copy that converts.

User: Write a product description for a new noise-cancelling headphone.
```

### 3. Provide Examples (Few-Shot Learning)

GPT-4 learns from examples you provide in the prompt.

**Example:**
```
Classify the sentiment of these reviews:
1. "This product is amazing!" -> Positive
2. "Terrible quality, broke after one day." -> Negative
3. "It's okay, nothing special." -> [Your classification here]
```

### 4. Use Chain-of-Thought Prompting

Ask the model to think step-by-step for complex reasoning tasks.

**Example:**
```
Solve this step by step:
A store has 15 apples. They sell 8 apples and then receive a shipment of 12 new apples. How many apples do they have now?
```

### 5. Set Temperature Based on Task

- **Temperature 0-0.3**: Factual, deterministic tasks
- **Temperature 0.4-0.7**: Balanced creativity and accuracy
- **Temperature 0.8-1.0**: Highly creative tasks

## Common Pitfalls

1. **Too Vague**: "Write something about AI" gives unpredictable results
2. **Overly Complex**: Too many constraints can confuse the model
3. **No Context**: Missing background information leads to generic responses
4. **Ignoring Model Limits**: GPT-4 can't access real-time data or browse the web

## Advanced Techniques

### Prompt Chaining
Break complex tasks into smaller, sequential prompts.

### Meta-Prompting
Ask the model to generate or improve prompts for you.

### Structured Output
Request specific formats like JSON, tables, or lists.

## Tips for Specific Use Cases

### Creative Writing
- Provide genre, tone, and style examples
- Use "continue from" to extend existing content
- Specify word count and structure

### Code Generation
- Specify programming language and framework
- Include error handling requirements
- Request comments and documentation

### Analysis and Research
- Provide source material or context
- Ask for citations and sources
- Request structured analysis formats

## Model Comparison

| Feature | GPT-4 | GPT-3.5 |
|---------|-------|---------|
| Reasoning | Excellent | Good |
| Creativity | High | Medium |
| Context Length | 128K tokens | 16K tokens |
| Cost | Higher | Lower |
| Speed | Slower | Faster |

## When to Use GPT-4

- Complex reasoning tasks
- Creative writing requiring nuance
- Multi-step problem solving
- Tasks requiring high accuracy
- Long document analysis

## When to Use Alternatives

- Simple, straightforward tasks (use GPT-3.5 for cost savings)
- Real-time data needs (use models with web access)
- Specialized domain tasks (use domain-specific models)
