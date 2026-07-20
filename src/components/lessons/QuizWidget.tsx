import { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface QuizWidgetProps {
  question: string;
  options: string[];
  correct: number;
  onComplete?: (isCorrect: boolean) => void;
}

export function QuizWidget({ question, options, correct, onComplete }: QuizWidgetProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (selected === null) return;
    
    const correctAnswer = selected === correct;
    setIsCorrect(correctAnswer);
    setSubmitted(true);
    onComplete?.(correctAnswer);
  };

  const handleReset = () => {
    setSelected(null);
    setSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <Card className="my-6 border-2 border-dashed border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Quiz</Badge>
        </div>
        <CardTitle className="text-lg">{question}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => !submitted && setSelected(index)}
              disabled={submitted}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                selected === index
                  ? submitted
                    ? index === correct
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : 'bg-red-100 border-red-500 text-red-800'
                    : 'bg-primary/10 border-primary text-primary'
                  : submitted && index === correct
                  ? 'bg-green-100 border-green-500 text-green-800'
                  : 'bg-background border-border hover:bg-muted'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span>{option}</span>
                {submitted && index === correct && (
                  <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                )}
                {submitted && selected === index && index !== correct && (
                  <XCircle className="h-4 w-4 text-red-600 ml-auto" />
                )}
              </div>
            </button>
          ))}
        </div>
      </CardContent>
      
      <CardFooter>
        {!submitted ? (
          <Button
            onClick={handleSubmit}
            disabled={selected === null}
            className="w-full"
          >
            Submit Answer
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <div className="w-full space-y-3">
            <div className={`p-3 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {isCorrect ? (
                <p className="font-medium">Correct! Well done!</p>
              ) : (
                <p className="font-medium">Incorrect. The correct answer is {String.fromCharCode(65 + correct)}.</p>
              )}
            </div>
            <Button variant="outline" onClick={handleReset} className="w-full">
              Try Again
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
