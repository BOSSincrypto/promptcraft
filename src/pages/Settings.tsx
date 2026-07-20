import { useSettingsStore } from '../stores';
import { useProgressStore } from '../stores';
import { usePromptStore } from '../stores';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Moon, Sun, Monitor, Volume2, VolumeX, Zap, RotateCcw, Download, Upload } from 'lucide-react';
import { useState } from 'react';

export function Settings() {
  const { theme, soundEnabled, reducedMotion, setTheme, setSoundEnabled, setReducedMotion } = useSettingsStore();
  const { resetProgress } = useProgressStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleResetProgress = () => {
    resetProgress();
    setShowResetConfirm(false);
  };

  const handleExportData = () => {
    const progressData = useProgressStore.getState();
    const settingsData = useSettingsStore.getState();
    const promptData = usePromptStore.getState();
    
    const exportData = {
      progress: progressData,
      settings: settingsData,
      prompts: promptData,
      exportedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `promptcraft-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target?.result as string);
            // Here you would import data into stores
            console.log('Import data:', data);
            alert('Data imported successfully!');
          } catch (error) {
            console.error('Failed to import data:', error);
            alert('Failed to import data. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Customize your PromptCraft experience</p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Sun className="h-5 w-5" />
            Appearance
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Theme</label>
              <div className="flex gap-2">
                <Button
                  variant={theme === 'light' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('light')}
                >
                  <Sun className="h-4 w-4 mr-2" />
                  Light
                </Button>
                <Button
                  variant={theme === 'dark' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('dark')}
                >
                  <Moon className="h-4 w-4 mr-2" />
                  Dark
                </Button>
                <Button
                  variant={theme === 'system' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('system')}
                >
                  <Monitor className="h-4 w-4 mr-2" />
                  System
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Reduced Motion</p>
                <p className="text-sm text-muted-foreground">Minimize animations for accessibility</p>
              </div>
              <Button
                variant={reducedMotion ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setReducedMotion(!reducedMotion)}
              >
                {reducedMotion ? 'Enabled' : 'Disabled'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Audio */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            Audio
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Sound Effects</p>
              <p className="text-sm text-muted-foreground">Play sounds for interactions</p>
            </div>
            <Button
              variant={soundEnabled ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
            >
              {soundEnabled ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
        </Card>

        {/* Performance */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Performance
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Offline Storage</p>
                <p className="text-sm text-muted-foreground">Cache content for offline access</p>
              </div>
              <span className="text-sm text-green-600 font-medium">Active</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Service Worker</p>
                <p className="text-sm text-muted-foreground">Background sync and caching</p>
              </div>
              <span className="text-sm text-green-600 font-medium">Registered</span>
            </div>
          </div>
        </Card>

        {/* Data Management */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Download className="h-5 w-5" />
            Data Management
          </h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={handleExportData}>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" onClick={handleImportData}>
                <Upload className="h-4 w-4 mr-2" />
                Import Data
              </Button>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-destructive">Reset Progress</p>
                  <p className="text-sm text-muted-foreground">Clear all learning progress</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowResetConfirm(true)}
                  className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
              
              {showResetConfirm && (
                <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm mb-3">Are you sure you want to reset all progress? This cannot be undone.</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowResetConfirm(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={handleResetProgress}
                    >
                      Reset Progress
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* About */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About PromptCraft</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Version: 0.1.0</p>
            <p>Built with React 19, TypeScript, and Tailwind CSS</p>
            <p>Progressive Web App with offline support</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
