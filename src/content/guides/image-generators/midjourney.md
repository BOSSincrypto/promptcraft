---
title: "Midjourney Prompt Engineering Guide"
description: "Create stunning images with effective Midjourney prompts"
modelType: "image"
modelSlug: "midjourney"
version: "5.2"
lastUpdated: 1690000000000
icon: "Palette"
color: "purple"
---

# Midjourney Prompt Engineering Guide

Midjourney is an AI image generation tool that creates stunning visuals from text descriptions. This guide will help you craft prompts that produce the images you envision.

## Key Features

- **Artistic Style**: excels at creating artistic and stylized images
- **Detail Control**: Fine-tune image details with specific parameters
- **Style References**: Use existing images as style references
- **Aspect Ratio Control**: Customize image dimensions

## Prompt Structure

A well-structured Midjourney prompt typically includes:

1. **Subject**: What you want to see
2. **Medium**: Art style (photograph, illustration, painting)
3. **Style**: Artistic style (impressionist, cyberpunk, minimalist)
4. **Details**: Colors, lighting, composition
5. **Parameters**: Technical settings

**Basic Format:**
```
[Subject] [Medium] [Style] [Details] [Parameters]
```

**Example:**
```
A majestic mountain landscape at sunset, digital painting, dramatic lighting, vibrant orange and purple sky, 4k, highly detailed --ar 16:9
```

## Essential Parameters

### Aspect Ratio
```
--ar 16:9    (widescreen)
--ar 1:1     (square)
--ar 9:16    (portrait)
--ar 4:3     (standard)
```

### Quality
```
--q 0.25    (fast, lower quality)
--q 0.5     (balanced)
--q 1       (highest quality)
```

### Stylize
```
--s 50      (minimal artistic interpretation)
--s 100     (balanced)
--s 750     (highly artistic)
```

### Chaos
```
--c 0       (consistent results)
--c 25      (some variation)
--c 100     (maximum variation)
```

## Best Practices

### 1. Be Descriptive
Provide rich, detailed descriptions of your subject.

**Example:**
```
Instead of: "a cat"
Use: "a fluffy orange tabby cat sitting on a windowsill, looking out at the rain, soft natural lighting, cozy atmosphere"
```

### 2. Use Reference Images
Include URLs to reference images for style or composition guidance.

**Example:**
```
A portrait of a cyberpunk character in the style of [image URL] --iw 1.5
```

### 3. Experiment with Styles
Try different artistic styles and mediums.

**Examples:**
```
Digital art, concept art
Oil painting, impressionist style
Photograph, cinematic lighting
Watercolor illustration
3D render, octane render
```

### 4. Use Prompts and Prompts
Combine multiple concepts for unique results.

**Example:**
```
A steampunk robot reading a book in a library, Victorian architecture, warm candlelight --v 5
```

## Advanced Techniques

### Negative Prompts
Use `--no` to exclude unwanted elements.

**Example:**
```
A serene forest landscape --no people, cars, buildings
```

### Multi-Prompts
Use `::` to weight different concepts.

**Example:**
```
Forest::2 Mountain::1 Lake::1
```

### Style References
Use `--sref` to reference existing images.

**Example:**
```
A portrait of a woman --sref [image URL] --sw 100
```

## Common Pitfalls

1. **Too Vague**: "A picture of something cool" gives unpredictable results
2. **Conflicting Styles**: Mixing too many styles creates muddled images
3. **Ignoring Parameters**: Default parameters may not suit your needs
4. **No Iteration**: First results are rarely perfect; iterate and refine

## Tips for Specific Use Cases

### Portraits
- Specify lighting conditions
- Include emotional expression
- Reference art styles for consistency

### Landscapes
- Describe time of day and weather
- Include atmospheric details
- Specify camera lens for perspective

### Concept Art
- Include design specifications
- Reference existing concepts
- Use `--style raw` for less interpretation

## Model Comparison

| Feature | Midjourney v5 | DALL-E 3 | Stable Diffusion |
|---------|---------------|----------|------------------|
| Artistic Quality | Excellent | Good | Variable |
| Prompt Understanding | High | Medium | Low-Medium |
| Customization | High | Low | Very High |
| Speed | Medium | Fast | Variable |
| Cost | Subscription | Per image | Free/Open Source |

## When to Use Midjourney

- Artistic and stylized images
- Concept art and illustrations
- Creative visual projects
- Social media content
- Marketing visuals

## When to Use Alternatives

- Photorealistic images (consider DALL-E 3)
- Specific technical diagrams (consider Stable Diffusion)
- High-volume generation (consider Stable Diffusion with local setup)
