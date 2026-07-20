import { Link } from 'react-router-dom';
import { Heart, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8 pb-20 md:pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">PromptCraft</h3>
            <p className="text-muted-foreground text-sm">
              Interactive platform to master prompt engineering for AI models.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/lessons" className="hover:text-foreground transition-colors">Lessons</Link></li>
              <li><Link to="/prompts" className="hover:text-foreground transition-colors">Prompts</Link></li>
              <li><Link to="/guides" className="hover:text-foreground transition-colors">Guides</Link></li>
              <li><Link to="/community" className="hover:text-foreground transition-colors">Community</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/settings" className="hover:text-foreground transition-colors">Settings</Link></li>
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4 text-danger" /> by PromptCraft Team
          </p>
        </div>
      </div>
    </footer>
  );
}
