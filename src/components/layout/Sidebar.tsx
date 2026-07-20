import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  Lightbulb, 
  MessageSquare, 
  Compass,
  Settings,
  HelpCircle
} from 'lucide-react';
import { useUIStore } from '../../stores';
import { cn } from '../../lib/utils';

const sidebarLinks = [
  { to: '/lessons', label: 'Lessons', icon: BookOpen },
  { to: '/prompts', label: 'Prompts', icon: Lightbulb },
  { to: '/guides', label: 'Guides', icon: Compass },
  { to: '/community', label: 'Community', icon: MessageSquare },
];

const bottomLinks = [
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/about', label: 'About', icon: HelpCircle },
];

export function Sidebar() {
  const { sidebarOpen } = useUIStore();
  const location = useLocation();

  return (
    <aside
      className={cn(
        'fixed left-0 top-16 bottom-0 z-40 w-64 bg-background border-r border-border transition-transform duration-300',
        'hidden md:block',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <nav className="flex flex-col h-full p-4">
        <div className="flex-1 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname.startsWith(link.to);
            
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="border-t border-border pt-4 space-y-1">
          {bottomLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
