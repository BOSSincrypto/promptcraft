import { useMemo } from 'react';
import { CodeBlock } from './CodeBlock';
import { QuizWidget } from './QuizWidget';
import type { Lesson } from '../../types';

interface LessonContentProps {
  lesson: Lesson;
  onQuizComplete?: (isCorrect: boolean) => void;
}

interface ParsedBlock {
  type: 'heading' | 'paragraph' | 'code' | 'quiz' | 'list' | 'try-prompt';
  content: string;
  level?: number;
  language?: string;
  quiz?: {
    question: string;
    options: string[];
    correct: number;
  };
  items?: string[];
}

export function LessonContent({ lesson, onQuizComplete }: LessonContentProps) {
  const parsedContent = useMemo(() => {
    return parseMarkdown(lesson.content);
  }, [lesson.content]);

  return (
    <div className="prose prose-lg max-w-none">
      {parsedContent.map((block, index) => (
        <RenderBlock key={index} block={block} onQuizComplete={onQuizComplete} />
      ))}
    </div>
  );
}

function parseMarkdown(content: string): ParsedBlock[] {
  // Remove frontmatter
  const withoutFrontmatter = content.replace(/^---[\s\S]*?---\s*/m, '');
  const lines = withoutFrontmatter.split('\n');
  const blocks: ParsedBlock[] = [];
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i]!;
    
    // Empty line
    if (line.trim() === '') {
      i++;
      continue;
    }
    
    // Heading
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({
        type: 'heading',
        content: headingMatch[2]!,
        level: headingMatch[1]!.length,
      });
      i++;
      continue;
    }
    
    // Code block
    if (line.trim().startsWith('```')) {
      const language = line.trim().slice(3).trim() || 'text';
      const codeLines: string[] = [];
      i++;
      
      while (i < lines.length && !lines[i]!.trim().startsWith('```')) {
        codeLines.push(lines[i]!);
        i++;
      }
      
      blocks.push({
        type: 'code',
        content: codeLines.join('\n'),
        language,
      });
      
      i++; // Skip closing ```
      continue;
    }
    
    // Quiz component
    if (line.trim().startsWith('<Quiz')) {
      const quizContent: string[] = [];
      let quizDepth = 1;
      
      // Check if the opening tag is also self-closing (e.g., <Quiz ... />)
      if (line.trim().endsWith('/>')) {
        quizContent.push(line);
        quizDepth = 0;
      } else {
        i++;
      }
      
      while (i < lines.length && quizDepth > 0) {
        const currentLine = lines[i]!;
        if (currentLine.includes('<Quiz')) quizDepth++;
        if (currentLine.includes('</Quiz>')) quizDepth--;
        if (currentLine.trim().endsWith('/>')) quizDepth--;
        if (quizDepth > 0) quizContent.push(currentLine);
        i++;
      }
      
      const quizText = quizContent.join('\n');
      const questionMatch = quizText.match(/question="([^"]+)"/);
      
      // Extract options - handle multiline arrays
      const optionsMatch = quizText.match(/options=\{?\[([\s\S]*?)\]\}/);
      const correctMatch = quizText.match(/correct=\{?(\d+)\}?/);
      
      if (questionMatch && optionsMatch && correctMatch) {
        const optionsStr = optionsMatch[1]!;
        const options = optionsStr.split(',').map(opt => 
          opt.trim().replace(/["']/g, '').replace(/\n/g, '')
        ).filter(opt => opt.length > 0);
        
        blocks.push({
          type: 'quiz',
          content: '',
          quiz: {
            question: questionMatch[1]!,
            options,
            correct: parseInt(correctMatch[1]!),
          },
        });
      }
      continue;
    }
    
    // TryPrompt component (simplified as a block)
    if (line.trim().startsWith('<TryPrompt')) {
      blocks.push({
        type: 'try-prompt',
        content: 'Interactive prompt example',
      });
      i++;
      continue;
    }
    
    // List items
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const items: string[] = [];
      while (i < lines.length && (lines[i]!.trim().startsWith('- ') || lines[i]!.trim().startsWith('* '))) {
        items.push(lines[i]!.trim().slice(2));
        i++;
      }
      blocks.push({
        type: 'list',
        content: '',
        items,
      });
      continue;
    }
    
    // Regular paragraph
    const paragraphLines: string[] = [];
    while (i < lines.length && lines[i]!.trim() !== '' && !lines[i]!.trim().startsWith('#') && !lines[i]!.trim().startsWith('```')) {
      paragraphLines.push(lines[i]!);
      i++;
    }
    
    if (paragraphLines.length > 0) {
      blocks.push({
        type: 'paragraph',
        content: paragraphLines.join(' '),
      });
    }
  }
  
  return blocks;
}

function RenderBlock({ block, onQuizComplete }: { block: ParsedBlock; onQuizComplete?: (isCorrect: boolean) => void }) {
  switch (block.type) {
    case 'heading': {
      const headingClass = `font-bold mt-8 mb-4 ${
        block.level === 1 ? 'text-3xl' :
        block.level === 2 ? 'text-2xl' :
        block.level === 3 ? 'text-xl' : 'text-lg'
      }`;
      
      if (block.level === 1) {
        return <h1 className={headingClass}>{block.content}</h1>;
      } else if (block.level === 2) {
        return <h2 className={headingClass}>{block.content}</h2>;
      } else if (block.level === 3) {
        return <h3 className={headingClass}>{block.content}</h3>;
      } else if (block.level === 4) {
        return <h4 className={headingClass}>{block.content}</h4>;
      } else if (block.level === 5) {
        return <h5 className={headingClass}>{block.content}</h5>;
      } else {
        return <h6 className={headingClass}>{block.content}</h6>;
      }
    }
    
    case 'paragraph':
      return <p className="mb-4 text-foreground leading-relaxed">{block.content}</p>;
    
    case 'code':
      return <CodeBlock code={block.content} language={block.language} />;
    
    case 'quiz':
      if (!block.quiz) return null;
      return (
        <QuizWidget
          question={block.quiz.question}
          options={block.quiz.options}
          correct={block.quiz.correct}
          onComplete={onQuizComplete}
        />
      );
    
    case 'list':
      return (
        <ul className="mb-4 space-y-2 pl-6">
          {block.items?.map((item, index) => (
            <li key={index} className="text-foreground list-disc">
              {item}
            </li>
          ))}
        </ul>
      );
    
    case 'try-prompt':
      return (
        <div className="my-6 p-4 bg-muted rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">Interactive prompt example would go here</p>
        </div>
      );
    
    default:
      return null;
  }
}
