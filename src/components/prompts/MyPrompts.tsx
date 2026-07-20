import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '../ui';
import { usePromptStore } from '../../stores';
import type { CustomPrompt } from '../../types';

export function MyPrompts() {
  const { prompts, deletePrompt, toggleFavorite, updatePrompt, exportPrompts, importPrompts } = usePromptStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [importJson, setImportJson] = useState('');
  const [showImport, setShowImport] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (prompt: CustomPrompt) => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopiedId(prompt.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy prompt:', error);
    }
  };

  const handleEdit = (prompt: CustomPrompt) => {
    setEditingId(prompt.id);
    setEditContent(prompt.content);
  };

  const handleSaveEdit = () => {
    if (editingId) {
      updatePrompt(editingId, { content: editContent });
      setEditingId(null);
      setEditContent('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  };

  const handleExport = () => {
    const json = exportPrompts();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `promptcraft-prompts-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (importJson.trim()) {
      importPrompts(importJson);
      setImportJson('');
      setShowImport(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'role-play': return 'bg-purple-100 text-purple-800';
      case 'code': return 'bg-blue-100 text-blue-800';
      case 'creative': return 'bg-pink-100 text-pink-800';
      case 'analysis': return 'bg-green-100 text-green-800';
      case 'general': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (prompts.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <svg className="w-12 h-12 mx-auto text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium">No saved prompts</h3>
          <p className="mt-2 text-muted-foreground">Create your first prompt using the generator or optimizer.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={handleExport}>
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export All ({prompts.length})
        </Button>
        
        <Button variant="outline" onClick={() => setShowImport(!showImport)}>
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Import
        </Button>
      </div>

      {/* Import Modal */}
      {showImport && (
        <Card>
          <CardHeader>
            <CardTitle>Import Prompts</CardTitle>
            <CardDescription>Paste your JSON prompt data below</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              value={importJson}
              onChange={(e) => setImportJson(e.target.value)}
              placeholder='[{"title": "My Prompt", "content": "...", "category": "general", "tags": ["custom"], "isFavorite": false}]'
              className="w-full h-32 p-3 border rounded-md bg-background resize-none font-mono text-sm"
            />
            <div className="flex gap-2">
              <Button onClick={handleImport} disabled={!importJson.trim()}>
                Import
              </Button>
              <Button variant="outline" onClick={() => setShowImport(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Prompts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prompts.map((prompt) => (
          <Card key={prompt.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <CardTitle className="text-lg">{prompt.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge className={getCategoryColor(prompt.category)}>
                      {prompt.category}
                    </Badge>
                    {prompt.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(prompt.id)}
                  className="text-muted-foreground hover:text-yellow-500"
                >
                  <svg
                    className={`w-5 h-5 ${prompt.isFavorite ? 'fill-yellow-500 text-yellow-500' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </button>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1">
                {editingId === prompt.id ? (
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full h-32 p-2 border rounded-md bg-background resize-none font-mono text-sm"
                  />
                ) : (
                  <div className="text-sm text-muted-foreground">
                    <pre className="whitespace-pre-wrap font-mono text-xs bg-muted p-3 rounded-md max-h-32 overflow-y-auto">
                      {prompt.content}
                    </pre>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                {editingId === prompt.id ? (
                  <>
                    <Button size="sm" onClick={handleSaveEdit}>
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant={copiedId === prompt.id ? 'primary' : 'outline'}
                      onClick={() => handleCopy(prompt)}
                    >
                      {copiedId === prompt.id ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(prompt)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => deletePrompt(prompt.id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
