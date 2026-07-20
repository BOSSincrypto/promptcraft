import { AlertTriangle, Lightbulb, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import type { GuideTip } from '../../types';

interface TipSectionProps {
  tips: GuideTip[];
}

const tipIcons = {
  'best-practice': <CheckCircle className="h-5 w-5 text-green-500" />,
  'warning': <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  'tip': <Lightbulb className="h-5 w-5 text-blue-500" />,
};

const tipColors = {
  'best-practice': 'border-l-green-500',
  'warning': 'border-l-yellow-500',
  'tip': 'border-l-blue-500',
};

const categoryLabels = {
  'best-practice': 'Best Practices',
  'warning': 'Warnings',
  'tip': 'Tips',
};

export function TipSection({ tips }: TipSectionProps) {
  if (tips.length === 0) return null;

  // Group tips by category
  const groupedTips = tips.reduce<Record<string, GuideTip[]>>((acc, tip) => {
    if (!acc[tip.category]) {
      acc[tip.category] = [];
    }
    acc[tip.category]!.push(tip);
    return acc;
  }, {});

  // Define display order
  const categoryOrder: Array<'best-practice' | 'warning' | 'tip'> = ['best-practice', 'warning', 'tip'];

  return (
    <section className="space-y-6">
      <h3 className="text-xl font-semibold">Best Practices & Tips</h3>
      {categoryOrder.map((category) => {
        const categoryTips = groupedTips[category];
        if (!categoryTips || categoryTips.length === 0) return null;
        
        return (
          <div key={category} className="space-y-3">
            <h4 className="text-lg font-medium flex items-center gap-2">
              {tipIcons[category]}
              {categoryLabels[category]}
            </h4>
            <div className="grid gap-4">
              {categoryTips.map((tip, index) => (
                <Card key={index} className={`border-l-4 ${tipColors[tip.category]}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      {tipIcons[tip.category]}
                      <CardTitle className="text-base">{tip.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{tip.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
