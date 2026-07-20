import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '../ui';

interface OptimizationSuggestion {
  category: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  original: string;
  improved: string;
}

export function PromptOptimizer() {
  const [originalPrompt, setOriginalPrompt] = useState('');
  const [optimizedPrompt, setOptimizedPrompt] = useState('');
  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);

  const analyzePrompt = () => {
    if (!originalPrompt.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis with simple rule-based optimization
    setTimeout(() => {
      const newSuggestions: OptimizationSuggestion[] = [];
      let optimized = originalPrompt;
      
      // Check for clarity issues
      if (!originalPrompt.includes('.') && originalPrompt.length > 50) {
        newSuggestions.push({
          category: 'Clarity',
          description: 'Add punctuation to improve readability',
          impact: 'medium',
          original: originalPrompt,
          improved: originalPrompt + '.',
        });
        optimized += '.';
      }
      
      // Check for specificity
      if (originalPrompt.toLowerCase().includes('good') || 
          originalPrompt.toLowerCase().includes('nice') ||
          originalPrompt.toLowerCase().includes('better')) {
        newSuggestions.push({
          category: 'Specificity',
          description: 'Replace vague adjectives with specific criteria',
          impact: 'high',
          original: originalPrompt,
          improved: originalPrompt.replace(/\b(good|nice|better)\b/gi, 'high-quality, detailed, comprehensive'),
        });
        optimized = optimized.replace(/\b(good|nice|better)\b/gi, 'high-quality, detailed, comprehensive');
      }
      
      // Check for structure
      if (!originalPrompt.includes('\n') && originalPrompt.length > 100) {
        newSuggestions.push({
          category: 'Structure',
          description: 'Add line breaks to improve organization',
          impact: 'medium',
          original: originalPrompt,
          improved: originalPrompt.replace(/\. /g, '.\n\n'),
        });
        optimized = optimized.replace(/\. /g, '.\n\n');
      }
      
      // Check for role definition
      if (!originalPrompt.toLowerCase().includes('you are') && 
          !originalPrompt.toLowerCase().includes('act as') &&
          !originalPrompt.toLowerCase().includes('role')) {
        newSuggestions.push({
          category: 'Role',
          description: 'Add a role or persona to guide the AI response',
          impact: 'high',
          original: originalPrompt,
          improved: `You are an expert assistant. ${originalPrompt}`,
        });
        optimized = `You are an expert assistant. ${optimized}`;
      }
      
      // Check for examples
      if (!originalPrompt.toLowerCase().includes('example') && 
          !originalPrompt.toLowerCase().includes('for instance')) {
        newSuggestions.push({
          category: 'Examples',
          description: 'Add examples to clarify expectations',
          impact: 'medium',
          original: originalPrompt,
          improved: `${originalPrompt}\n\nExample:\n- Provide a clear, structured response`,
        });
        optimized = `${optimized}\n\nExample:\n- Provide a clear, structured response`;
      }
      
      // Check for format specification
      if (!originalPrompt.toLowerCase().includes('format') && 
          !originalPrompt.toLowerCase().includes('bullet') &&
          !originalPrompt.toLowerCase().includes('list')) {
        newSuggestions.push({
          category: 'Format',
          description: 'Specify the desired output format',
          impact: 'low',
          original: originalPrompt,
          improved: `${originalPrompt}\n\nPlease provide your response in a structured format with clear headings and bullet points.`,
        });
        optimized = `${optimized}\n\nPlease provide your response in a structured format with clear headings and bullet points.`;
      }
      
      setSuggestions(newSuggestions);
      setOptimizedPrompt(optimized);
      setIsAnalyzing(false);
    }, 1000);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(optimizedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy prompt:', error);
    }
  };

  const applySuggestion = (suggestion: OptimizationSuggestion) => {
    setOptimizedPrompt(suggestion.improved);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Original Prompt */}
      <Card>
        <CardHeader>
          <CardTitle>Original Prompt</CardTitle>
          <CardDescription>Enter your prompt to analyze and optimize</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            value={originalPrompt}
            onChange={(e) => setOriginalPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="w-full h-48 p-3 border rounded-md bg-background resize-none"
          />
          
          <Button 
            onClick={analyzePrompt} 
            disabled={!originalPrompt.trim() || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Analyze & Optimize
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Optimized Prompt */}
      <Card>
        <CardHeader>
          <CardTitle>Optimized Prompt</CardTitle>
          <CardDescription>Your improved prompt with suggestions applied</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="min-h-[200px] p-3 bg-muted rounded-md">
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {optimizedPrompt || 'Enter a prompt and click "Analyze & Optimize" to see improvements.'}
            </pre>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={copied ? 'primary' : 'outline'}
              onClick={handleCopy}
              disabled={!optimizedPrompt}
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Optimized
                </>
              )}
            </Button>
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Suggestions ({suggestions.length})</h3>
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="p-3 border rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getImpactColor(suggestion.impact)}>
                        {suggestion.impact}
                      </Badge>
                      <span className="font-medium text-sm">{suggestion.category}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{suggestion.description}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => applySuggestion(suggestion)}
                    >
                      Apply Suggestion
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
