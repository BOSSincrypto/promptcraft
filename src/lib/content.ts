import type { Lesson, LessonCategory, PromptTemplate, PromptCategory, Guide, ModelType } from '../types';

// Content manifests
import lessonsManifest from '../content/lessons/manifest.json';
import promptsManifest from '../content/examples/templates/manifest.json';
import guidesManifest from '../content/guides/manifest.json';

// Get all lessons for a category
export async function getLessonsByCategory(
  category: LessonCategory
): Promise<Lesson[]> {
  const categoryData = (lessonsManifest as { categories: Record<string, { lessons: string[] }> }).categories[category];
  if (!categoryData) return [];

  const lessons: Lesson[] = [];
  for (const slug of categoryData.lessons) {
    try {
      const content = await import(
        `../content/lessons/${category}/${slug}.md?raw`
      );
      lessons.push({
        slug,
        content: content.default,
        title: extractTitle(content.default),
        description: extractDescription(content.default),
        category,
        difficulty: extractDifficulty(content.default),
        estimatedTime: extractEstimatedTime(content.default),
        order: lessons.length + 1,
        tags: extractTags(content.default),
      });
    } catch (error) {
      console.error(`Failed to load lesson ${category}/${slug}:`, error);
    }
  }

  return lessons;
}

// Get a single lesson by slug
export async function getLesson(
  category: string,
  slug: string
): Promise<Lesson | null> {
  try {
    const content = await import(
      `../content/lessons/${category}/${slug}.md?raw`
    );
    return {
      slug,
      content: content.default,
      title: extractTitle(content.default),
      description: extractDescription(content.default),
      category: category as LessonCategory,
      difficulty: extractDifficulty(content.default),
      estimatedTime: extractEstimatedTime(content.default),
      order: 1,
      tags: extractTags(content.default),
    };
  } catch {
    return null;
  }
}

// Get all lessons across all categories
export async function getAllLessons(): Promise<Lesson[]> {
  const categories = Object.keys(
    (lessonsManifest as { categories: Record<string, unknown> }).categories
  ) as LessonCategory[];

  const allLessons: Lesson[] = [];
  for (const category of categories) {
    const categoryLessons = await getLessonsByCategory(category);
    allLessons.push(...categoryLessons);
  }

  return allLessons;
}

// Get all categories
export function getCategories() {
  return (lessonsManifest as { categories: Record<string, { title: string; description: string; lessons: string[] }> }).categories;
}

// Helper functions to extract metadata from markdown frontmatter
function extractTitle(content: string): string {
  const titleMatch = content.match(/^title:\s*["'](.+?)["']/m);
  return titleMatch?.[1] ?? 'Untitled Lesson';
}

function extractDescription(content: string): string {
  const descMatch = content.match(/^description:\s*["'](.+?)["']/m);
  return descMatch?.[1] ?? '';
}

function extractDifficulty(content: string): 'beginner' | 'intermediate' | 'advanced' {
  const diffMatch = content.match(/^difficulty:\s*(\w+)/m);
  if (diffMatch?.[1]) {
    const diff = diffMatch[1].toLowerCase();
    if (diff === 'beginner' || diff === 'intermediate' || diff === 'advanced') {
      return diff;
    }
  }
  return 'beginner';
}

function extractEstimatedTime(content: string): number {
  const timeMatch = content.match(/^estimatedTime:\s*(\d+)/m);
  return timeMatch?.[1] ? parseInt(timeMatch[1]) : 10;
}

function extractTags(content: string): string[] {
  const tagsMatch = content.match(/^tags:\s*\[(.+?)\]/m);
  if (tagsMatch?.[1]) {
    return tagsMatch[1].split(',').map(tag => tag.trim().replace(/['"]/g, ''));
  }
  return [];
}

// Content caching for offline support
const contentCache = new Map<string, Lesson>();

export function cacheLesson(lesson: Lesson): void {
  contentCache.set(`${lesson.category}/${lesson.slug}`, lesson);
}

export function getCachedLesson(category: string, slug: string): Lesson | undefined {
  return contentCache.get(`${category}/${slug}`);
}

export function clearCache(): void {
  contentCache.clear();
}

// Prompt template functions
export async function getPromptTemplates(category?: PromptCategory): Promise<PromptTemplate[]> {
  const categories = category ? [category] : Object.keys(promptsManifest.categories) as PromptCategory[];
  const templates: PromptTemplate[] = [];
  
  for (const cat of categories) {
    const categoryData = (promptsManifest.categories as Record<string, { templates: string[] }>)[cat];
    if (!categoryData) continue;
    
    for (const templateId of categoryData.templates) {
      try {
        const templateData = await import(
          `../content/examples/templates/${cat}.json`
        );
        const template = templateData.default.templates.find(
          (t: PromptTemplate) => t.id === templateId
        );
        if (template) {
          templates.push(template);
        }
      } catch (error) {
        console.error(`Failed to load prompt template ${cat}/${templateId}:`, error);
      }
    }
  }
  
  return templates;
}

export async function getPromptTemplateById(id: string): Promise<PromptTemplate | null> {
  const categories = Object.keys(promptsManifest.categories) as PromptCategory[];
  
  for (const category of categories) {
    try {
      const templateData = await import(
        `../content/examples/templates/${category}.json`
      );
      const template = templateData.default.templates.find(
        (t: PromptTemplate) => t.id === id
      );
      if (template) {
        return template;
      }
    } catch (error) {
      console.error(`Failed to load prompt template ${category}/${id}:`, error);
    }
  }
  
  return null;
}

export function getPromptCategories() {
  return promptsManifest.categories;
}

// Guide functions
export async function getGuidesByType(modelType: ModelType): Promise<Guide[]> {
  const typeData = (guidesManifest as Record<string, { guides: string[] }>)[modelType];
  if (!typeData) return [];

  const guides: Guide[] = [];
  for (const slug of typeData.guides) {
    try {
      const content = await import(
        `../content/guides/${modelType}/${slug}.md?raw`
      );
      const guide = parseGuideContent(content.default, modelType, slug);
      if (guide) {
        guides.push(guide);
      }
    } catch (error) {
      console.error(`Failed to load guide ${modelType}/${slug}:`, error);
    }
  }

  return guides;
}

export async function getGuide(slug: string): Promise<Guide | null> {
  // Search through all model types
  const modelTypes: ModelType[] = ['llms', 'image-generators', 'code-models', 'specialized'];
  
  for (const modelType of modelTypes) {
    const typeData = (guidesManifest as Record<string, { guides: string[] }>)[modelType];
    if (typeData?.guides.includes(slug)) {
      try {
        const content = await import(
          `../content/guides/${modelType}/${slug}.md?raw`
        );
        return parseGuideContent(content.default, modelType, slug);
      } catch (error) {
        console.error(`Failed to load guide ${modelType}/${slug}:`, error);
      }
    }
  }
  
  return null;
}

export async function getAllGuides(): Promise<Guide[]> {
  const modelTypes: ModelType[] = ['llms', 'image-generators', 'code-models', 'specialized'];
  const allGuides: Guide[] = [];
  
  for (const modelType of modelTypes) {
    const typeGuides = await getGuidesByType(modelType);
    allGuides.push(...typeGuides);
  }
  
  return allGuides;
}

export function getGuideTypes() {
  return guidesManifest;
}

function parseGuideContent(content: string, modelType: ModelType, slug: string): Guide | null {
  try {
    const title = extractGuideTitle(content);
    const description = extractGuideDescription(content);
    const lastUpdated = extractGuideLastUpdated(content);
    const tips = extractGuideTips(content);
    const examples = extractGuideExamples(content);
    const comparisons = extractGuideComparisons(content);
    
    return {
      title,
      description,
      modelType,
      modelSlug: slug,
      lastUpdated,
      icon: extractGuideIcon(content),
      color: extractGuideColor(content),
      content,
      tips,
      examples,
      comparisons,
    };
  } catch (error) {
    console.error(`Failed to parse guide content for ${slug}:`, error);
    return null;
  }
}

function extractGuideTitle(content: string): string {
  const titleMatch = content.match(/^title:\s*["'](.+?)["']/m);
  return titleMatch?.[1] ?? 'Untitled Guide';
}

function extractGuideDescription(content: string): string {
  const descMatch = content.match(/^description:\s*["'](.+?)["']/m);
  return descMatch?.[1] ?? '';
}

function extractGuideLastUpdated(content: string): number {
  const timeMatch = content.match(/^lastUpdated:\s*(\d+)/m);
  return timeMatch?.[1] ? parseInt(timeMatch[1]) : Date.now();
}

function extractGuideIcon(content: string): string {
  const iconMatch = content.match(/^icon:\s*["'](.+?)["']/m);
  return iconMatch?.[1] ?? 'Book';
}

function extractGuideColor(content: string): string {
  const colorMatch = content.match(/^color:\s*["'](.+?)["']/m);
  return colorMatch?.[1] ?? 'primary';
}

function extractGuideTips(content: string): Guide['tips'] {
  const tips: Guide['tips'] = [];
  
  // Extract tips from ## sections that contain ### subheadings
  // Categories: "Best Practices" -> best-practice, "Common Pitfalls"/"Warnings" -> warning, others -> tip
  
  // First, find all ## section positions
  const sectionPositions: Array<{ title: string; start: number; end: number }> = [];
  const sectionStartRegex = /^##\s+(.+?)$/gm;
  let match;
  
  while ((match = sectionStartRegex.exec(content)) !== null) {
    sectionPositions.push({
      title: match[1]?.trim() ?? '',
      start: match.index + match[0].length + 1,
      end: content.length, // Will be updated
    });
  }
  
  // Update end positions
  for (let i = 0; i < sectionPositions.length - 1; i++) {
    sectionPositions[i]!.end = sectionPositions[i + 1]!.start - 3; // -3 for "## " prefix
  }
  
  // Process each section
  for (const section of sectionPositions) {
    const sectionContent = content.substring(section.start, section.end);
    const sectionTitle = section.title;
    
    // Determine category based on section title
    let category: 'best-practice' | 'warning' | 'tip' = 'tip';
    const lowerSection = sectionTitle.toLowerCase();
    if (lowerSection.includes('best practice') || lowerSection.includes('do')) {
      category = 'best-practice';
    } else if (lowerSection.includes('warning') || lowerSection.includes('pitfall') || lowerSection.includes('avoid') || lowerSection.includes('common mistake')) {
      category = 'warning';
    } else if (lowerSection.includes('tip')) {
      category = 'tip';
    }
    
    // Extract ### subheadings within this section using position-based approach
    const tipPositions: Array<{ title: string; contentStart: number; end: number }> = [];
    const tipStartRegex = /^###\s+(.+?)$/gm;
    let tipMatch;
    
    while ((tipMatch = tipStartRegex.exec(sectionContent)) !== null) {
      tipPositions.push({
        title: tipMatch[1]?.trim() ?? '',
        contentStart: tipMatch.index + tipMatch[0].length + 1,
        end: sectionContent.length, // Will be updated
      });
    }
    
    // Update end positions: each tip ends where the next tip's heading starts or next ## section starts
    for (let i = 0; i < tipPositions.length - 1; i++) {
      const nextTipStart = sectionContent.indexOf('\n### ', tipPositions[i]!.contentStart);
      const nextSectionStart = sectionContent.indexOf('\n## ', tipPositions[i]!.contentStart);
      // Use whichever comes first
      let endPos = sectionContent.length;
      if (nextTipStart !== -1) endPos = Math.min(endPos, nextTipStart);
      if (nextSectionStart !== -1) endPos = Math.min(endPos, nextSectionStart);
      tipPositions[i]!.end = endPos;
    }
    
    // Extract tip content
    for (const tip of tipPositions) {
      const tipContent = sectionContent.substring(tip.contentStart, tip.end).trim();
      if (tip.title && tipContent) {
        tips.push({ title: tip.title, content: tipContent, category });
      }
    }
  }
  
  // If no tips found with ## sections, fallback to extracting all ### headings
  if (tips.length === 0) {
    // Find all ### positions in the entire content
    const allTipPositions: Array<{ title: string; contentStart: number; end: number }> = [];
    const tipStartRegex = /^###\s+(.+?)$/gm;
    let match;
    
    while ((match = tipStartRegex.exec(content)) !== null) {
      allTipPositions.push({
        title: match[1]?.trim() ?? '',
        contentStart: match.index + match[0].length + 1,
        end: content.length,
      });
    }
    
    // Update end positions: each tip ends where the next tip's heading starts
    for (let i = 0; i < allTipPositions.length - 1; i++) {
      const nextTipStart = content.indexOf('\n### ', allTipPositions[i]!.contentStart);
      allTipPositions[i]!.end = nextTipStart !== -1 ? nextTipStart : content.length;
    }
    
    // Extract tip content
    for (const tip of allTipPositions) {
      const title = tip.title;
      const tipContent = content.substring(tip.contentStart, tip.end).trim();
      
      // Determine category based on title/content
      let category: 'best-practice' | 'warning' | 'tip' = 'tip';
      if (title.toLowerCase().includes('warning') || title.toLowerCase().includes('avoid')) {
        category = 'warning';
      } else if (title.toLowerCase().includes('best practice') || title.toLowerCase().includes('do')) {
        category = 'best-practice';
      }
      
      if (title && tipContent) {
        tips.push({ title, content: tipContent, category });
      }
    }
  }
  
  return tips;
}

function extractGuideExamples(content: string): Guide['examples'] {
  const examples: Guide['examples'] = [];
  const exampleRegex = /```[\s\S]*?```/g;
  let match;
  
  while ((match = exampleRegex.exec(content)) !== null) {
    const codeBlock = match[0];
    const lines = codeBlock.split('\n');
    const language = lines[0]?.replace('```', '').trim() ?? 'text';
    const code = lines.slice(1, -1).join('\n');
    
    if (code && language) {
      examples.push({
        title: `Example ${examples.length + 1}`,
        description: `Code example in ${language}`,
        prompt: code,
        model: language,
      });
    }
  }
  
  return examples;
}

function extractGuideComparisons(content: string): Guide['comparisons'] {
  const comparisons: Guide['comparisons'] = [];
  
  // Look for comparison tables
  const tableRegex = /\|(.+)\|(.+)\|(.+)\|/g;
  let match;
  
  while ((match = tableRegex.exec(content)) !== null) {
    const headers = match[1]?.split('|').map(h => h.trim()).filter(Boolean) ?? [];
    const row1 = match[2]?.split('|').map(r => r.trim()).filter(Boolean) ?? [];
    const row2 = match[3]?.split('|').map(r => r.trim()).filter(Boolean) ?? [];
    
    if (headers.length >= 2 && row1.length >= 2 && row2.length >= 2) {
      const criteria = headers.slice(1).map((header, index) => ({
        name: header,
        scoreA: parseFloat(row1[index + 1] ?? '0') || 5,
        scoreB: parseFloat(row2[index + 1] ?? '0') || 5,
      }));
      
      if (criteria.length > 0) {
        comparisons.push({
          modelA: row1[0] ?? 'Model A',
          modelB: row2[0] ?? 'Model B',
          criteria,
        });
      }
    }
  }
  
  return comparisons;
}

// Community example functions
import communityManifest from '../content/examples/patterns/manifest.json';
import techniqueExamples from '../content/examples/patterns/technique.json';
import rolePlayExamples from '../content/examples/patterns/role-play.json';
import codeExamples from '../content/examples/patterns/code.json';
import creativeExamples from '../content/examples/patterns/creative.json';
import analysisExamples from '../content/examples/patterns/analysis.json';
import generalExamples from '../content/examples/patterns/general.json';
import type { CommunityExample, CommunityCategory, CommunityFilter, CommunityStats } from '../types';

// Combine all examples from all categories
const allCommunityExamples: CommunityExample[] = [
  ...techniqueExamples.examples as CommunityExample[],
  ...rolePlayExamples.examples as CommunityExample[],
  ...codeExamples.examples as CommunityExample[],
  ...creativeExamples.examples as CommunityExample[],
  ...analysisExamples.examples as CommunityExample[],
  ...generalExamples.examples as CommunityExample[],
];

export async function getCommunityExamples(filter?: CommunityFilter): Promise<CommunityExample[]> {
  let filteredExamples = [...allCommunityExamples];
  
  // Apply category filter
  if (filter?.category) {
    filteredExamples = filteredExamples.filter(example => example.category === filter.category);
  }
  
  // Apply search filter
  if (filter?.search) {
    const searchLower = filter.search.toLowerCase();
    filteredExamples = filteredExamples.filter(example => 
      example.title.toLowerCase().includes(searchLower) ||
      example.description.toLowerCase().includes(searchLower) ||
      example.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }
  
  // Apply difficulty filter
  if (filter?.difficulty) {
    filteredExamples = filteredExamples.filter(example => 
      example.difficulty === filter.difficulty
    );
  }
  
  // Sort
  if (filter?.sortBy === 'popular') {
    filteredExamples.sort((a, b) => b.likes - a.likes);
  } else if (filter?.sortBy === 'featured') {
    filteredExamples.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  } else {
    // Default: newest first
    filteredExamples.sort((a, b) => b.createdAt - a.createdAt);
  }
  
  return filteredExamples;
}

export async function getCommunityExampleById(id: string): Promise<CommunityExample | null> {
  return allCommunityExamples.find(example => example.id === id) || null;
}

export async function getFeaturedCommunityExamples(): Promise<CommunityExample[]> {
  return allCommunityExamples.filter(example => example.isFeatured);
}

export async function getCommunityCategories() {
  return communityManifest.categories;
}

export async function getCommunityStats(): Promise<CommunityStats> {
  const categoryCounts: Record<CommunityCategory, number> = {
    'role-play': 0,
    'code': 0,
    'creative': 0,
    'analysis': 0,
    'general': 0,
    'technique': 0,
  };
  
  const authors = new Set<string>();
  let totalLikes = 0;
  
  for (const example of allCommunityExamples) {
    categoryCounts[example.category]++;
    authors.add(example.author);
    totalLikes += example.likes;
  }
  
  return {
    totalExamples: allCommunityExamples.length,
    totalAuthors: authors.size,
    totalLikes,
    categoryCounts,
  };
}
