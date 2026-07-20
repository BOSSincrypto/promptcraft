import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-background p-8 md:p-12">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Sparkles className="h-4 w-4" />
          Master Prompt Engineering
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Learn to craft effective prompts for AI models
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          Interactive lessons, real-world examples, and hands-on practice to help you
          become a prompt engineering expert.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <Link to="/lessons">
            <Button size="lg">
              Start Learning
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/guides">
            <Button variant="outline" size="lg">
              Browse Guides
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
