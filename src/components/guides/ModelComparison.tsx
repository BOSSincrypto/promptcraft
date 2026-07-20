import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import type { ModelComparison as ModelComparisonType } from '../../types';

interface ModelComparisonProps {
  comparisons: ModelComparisonType[];
}

export function ModelComparison({ comparisons }: ModelComparisonProps) {
  if (comparisons.length === 0) return null;

  return (
    <section className="space-y-4">
      <h3 className="text-xl font-semibold">Model Comparison</h3>
      <div className="grid gap-6">
        {comparisons.map((comparison, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {comparison.modelA} vs {comparison.modelB}
                </CardTitle>
                <div className="flex gap-2">
                  <Badge variant="primary">{comparison.modelA}</Badge>
                  <Badge variant="secondary">{comparison.modelB}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {comparison.criteria.map((criterion, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="font-medium">{criterion.name}</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {comparison.modelA}:
                        </span>
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${criterion.scoreA * 10}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{criterion.scoreA}/10</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {comparison.modelB}:
                        </span>
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div
                            className="bg-secondary h-2 rounded-full"
                            style={{ width: `${criterion.scoreB * 10}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{criterion.scoreB}/10</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
