import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '../ui';
import { usePromptStore } from '../../stores';
import type { PromptTemplate } from '../../types';
import { getPromptTemplates } from '../../lib/content';

export function PromptGeneratorForm() {
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { addPrompt } = usePromptStore();

  useEffect(() => {
    async function loadTemplates() {
      try {
        const data = await getPromptTemplates();
        setTemplates(data);
        if (data.length > 0) {
          setSelectedTemplate(data[0] || null);
        }
      } catch (error) {
        console.error('Failed to load templates:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadTemplates();
  }, []);

  useEffect(() => {
    if (selectedTemplate) {
      // Initialize variable values with defaults
      const initialValues: Record<string, string> = {};
      selectedTemplate.variables.forEach((variable) => {
        initialValues[variable.name] = variable.defaultValue || '';
      });
      setVariableValues(initialValues);
    }
  }, [selectedTemplate]);

  useEffect(() => {
    if (selectedTemplate) {
      // Generate prompt by replacing variables
      let prompt = selectedTemplate.content;
      Object.entries(variableValues).forEach(([name, value]) => {
        const regex = new RegExp(`\\{\\{${name}\\}\\}`, 'g');
        prompt = prompt.replace(regex, value || `{{${name}}}`);
      });
      setGeneratedPrompt(prompt);
    }
  }, [selectedTemplate, variableValues]);

  const handleTemplateSelect = (template: PromptTemplate) => {
    setSelectedTemplate(template);
  };

  const handleVariableChange = (name: string, value: string) => {
    setVariableValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy prompt:', error);
    }
  };

  const handleSave = () => {
    if (!generatedPrompt.trim()) return;
    
    addPrompt({
      title: `Generated from ${selectedTemplate?.title || 'custom'}`,
      content: generatedPrompt,
      category: selectedTemplate?.category || 'general',
      tags: selectedTemplate?.tags || ['generated'],
      isFavorite: false,
    });
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-muted rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 bg-muted rounded"></div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-muted rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-muted rounded"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Template Selection and Variables */}
      <Card>
        <CardHeader>
          <CardTitle>Template Selection</CardTitle>
          <CardDescription>Choose a template and fill in the variables</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Template Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-2">Select Template</label>
            <select
              value={selectedTemplate?.id || ''}
              onChange={(e) => {
                const template = templates.find((t) => t.id === e.target.value);
                if (template) handleTemplateSelect(template);
              }}
              className="w-full p-2 border rounded-md bg-background"
            >
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.title} ({template.category})
                </option>
              ))}
            </select>
          </div>

          {/* Template Info */}
          {selectedTemplate && (
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm">{selectedTemplate.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline">{selectedTemplate.model}</Badge>
                {selectedTemplate.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Variables */}
          {selectedTemplate && selectedTemplate.variables.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Variables</h3>
              {selectedTemplate.variables.map((variable) => (
                <div key={variable.name}>
                  <label className="block text-sm mb-1">
                    {variable.name}
                    {variable.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <p className="text-xs text-muted-foreground mb-1">{variable.description}</p>
                  <input
                    type="text"
                    value={variableValues[variable.name] || ''}
                    onChange={(e) => handleVariableChange(variable.name, e.target.value)}
                    placeholder={variable.defaultValue || `Enter ${variable.name}`}
                    className="w-full p-2 border rounded-md bg-background"
                  />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generated Prompt */}
      <Card>
        <CardHeader>
          <CardTitle>Generated Prompt</CardTitle>
          <CardDescription>Preview and copy your generated prompt</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="min-h-[200px] p-4 bg-muted rounded-md">
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {generatedPrompt || 'Select a template and fill in variables to generate a prompt.'}
            </pre>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={copied ? 'primary' : 'outline'}
              onClick={handleCopy}
              disabled={!generatedPrompt}
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
                  Copy to Clipboard
                </>
              )}
            </Button>
            
            <Button
              onClick={handleSave}
              disabled={!generatedPrompt}
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save to My Prompts
            </Button>
          </div>

          {/* Examples */}
          {selectedTemplate && selectedTemplate.examples.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Example</h3>
              <div className="p-3 bg-muted rounded-md text-sm">
                <pre className="whitespace-pre-wrap font-mono text-xs">
                  {selectedTemplate.examples[0]}
                </pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
