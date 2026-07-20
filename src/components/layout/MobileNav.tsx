import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Lightbulb, Compass, MessageSquare } from 'lucide-react';
import { cn } from '../../lib/utils';

const navLinks = [
  { to: '/lessons', label: 'Lessons', icon: BookOpen },
  { to: '/prompts', label: 'Prompts', icon: Lightbulb },
  { to: '/guides', label: 'Guides', icon: Compass },
  { to: '/community', label: 'Community', icon: MessageSquare },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname.startsWith(link.to);
          
          return (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
