import { useMemo } from 'react';
import { CodeBlock } from '../lessons/CodeBlock';
import type { Guide } from '../../types';

interface GuideContentProps {
  guide: Guide;
}

interface ParsedBlock {
  type: 'heading' | 'paragraph' | 'code' | 'list' | 'table';
  content: string;
  level?: number;
  language?: string;
  items?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export function GuideContent({ guide }: GuideContentProps) {
  const parsedContent = useMemo(() => {
    return parseMarkdown(guide.content);
  }, [guide.content]);

  return (
    <div className="prose prose-lg max-w-none">
      {parsedContent.map((block, index) => (
        <RenderBlock key={index} block={block} />
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
    
    // Table
    if (line.includes('|') && line.trim().startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i]!.includes('|') && lines[i]!.trim().startsWith('|')) {
        tableLines.push(lines[i]!);
        i++;
      }
      
      if (tableLines.length >= 2) {
        const headers = tableLines[0]!.split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim());
        const rows = tableLines.slice(2).map(row => 
          row.split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim())
        );
        
        blocks.push({
          type: 'table',
          content: '',
          table: { headers, rows },
        });
      }
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
    while (i < lines.length && lines[i]!.trim() !== '' && !lines[i]!.trim().startsWith('#') && !lines[i]!.trim().startsWith('```') && !lines[i]!.trim().startsWith('|')) {
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

function RenderBlock({ block }: { block: ParsedBlock }) {
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
    
    case 'table':
      if (!block.table) return null;
      return (
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border border-border">
            <thead>
              <tr className="bg-muted">
                {block.table.headers.map((header, index) => (
                  <th key={index} className="px-4 py-2 text-left font-medium border-b border-border">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.table.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-border">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    
    default:
      return null;
  }
}
