---
title: "Gemini 3.5 Flash Prompt Engineering Guide"
description: "Master prompt engineering for Google's fast multimodal model"
modelType: "llms"
modelSlug: "gemini-3.5"
version: "3.5"
lastUpdated: 1753084800000
icon: "Bot"
color: "green"
---

# Gemini 3.5 Flash Prompt Engineering Guide

Gemini 3.5 Flash is Google's fast multimodal model with **1M token context** and excellent price-performance. Gemini 3.1 Pro offers deeper reasoning for complex tasks.

## Model Family (July 2026)

| Model | Best For | Price (Input/Output) |
|-------|----------|---------------------|
| **Gemini 3.5 Flash** | Fast, affordable multimodal | $1.50/$9 per 1M tokens |
| **Gemini 3.1 Pro** | Deep reasoning, code | $2/$12 per 1M tokens |
| **Gemini 3 Deep Think** | Complex analysis | Premium pricing |

## Key Features

- **1M Token Context**: Process entire codebases, long documents
- **Native Multimodal**: Text, images, video, audio, code
- **Fast Inference**: Quick responses for real-time applications
- **Grounded Generation**: Can search the web for current information
- **Code Understanding**: Strong at analysis and generation

## Best Practices

### 1. Be Specific About Tasks

**Example:**
```
Instead of: "Analyze this data"
Use: "Analyze the sales data in this spreadsheet. Identify the top 3 products by revenue, calculate month-over-month growth rates, and flag any products with declining trends."
```

### 2. Leverage Multimodal Capabilities

Gemini processes images, video, and audio natively.

**Example:**
```
[Attach image]
Analyze this chart and provide:
1. Key trends shown
2. Anomalies or outliers
3. A summary paragraph for a business report
```

### 3. Use Grounded Generation for Current Data

**Example:**
```
What are the latest developments in quantum computing? Use web search to find information from the past 3 months.
```

### 4. Structured Output

**Example:**
```
Analyze this code and return a JSON report:
{
  "issues": [{"type": "bug|security|performance", "severity": "high|medium|low", "description": "...", "fix": "..."}],
  "complexity_score": 1-10,
  "recommendations": ["..."]
}
```

### 5. Context Engineering with 1M Tokens

Leverage the massive context window:

**Example:**
```
I'm providing:
1. Full codebase (500 files attached)
2. API documentation
3. Error logs from production
4. User requirements document

Please analyze everything and identify the root cause of the production errors, then provide a fix.
```

## Advanced Techniques

### Video Analysis

```
[Attach video]
Summarize this 10-minute lecture on machine learning. Extract key concepts, code examples, and recommended resources.
```

### Audio Transcription + Analysis

```
[Attach audio]
Transcribe this meeting recording and create:
1. Summary of key decisions
2. Action items with owners
3. Follow-up questions
```

### Code Analysis with Multimodal

```
[Attach screenshot of error]
[Attach code file]
This code is producing the error shown in the screenshot. Analyze both and fix the issue.
```

## Model Comparison (July 2026)

| Feature | Gemini 3.5 Flash | GPT-5.5 | Claude Fable 5 |
|---------|------------------|---------|----------------|
| Context Window | 1M | 1M | 1M |
| Price (Input) | $1.50 | $5 | $10 |
| Speed | Fastest | Moderate | Fast |
| Multimodal | Best | Good | Good |
| Coding | Strong | Strong | Best |

## When to Use Gemini 3.5

- Budget-conscious applications requiring multimodal
- Real-time or high-volume requests
- Video/audio analysis tasks
- Tasks requiring current web information
- Long document processing

## When to Use Gemini 3.1 Pro

- Complex reasoning tasks
- Advanced code analysis
- Tasks requiring deeper analysis than Flash
