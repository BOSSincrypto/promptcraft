import { Link } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';
import { Button } from '../ui/Button';
import { useUIStore } from '../../stores';
import { cn } from '../../lib/utils';
import { OfflineIndicator } from './OfflineIndicator';

const navLinks = [
  { to: '/lessons', label: 'Lessons' },
  { to: '/prompts', label: 'Prompts' },
  { to: '/guides', label: 'Guides' },
  { to: '/community', label: 'Community' },
];

export function Header() {
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="hidden md:flex"
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">PromptCraft</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <OfflineIndicator />
          <Link to="/settings">
            <Button variant="ghost" size="sm">
              Settings
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
