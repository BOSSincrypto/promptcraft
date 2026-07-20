import React from 'react';
import { BookOpen, Target, Flame, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../ui/Card';
import { useProgressStore } from '../../stores';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color?: string;
}

function StatCard({ icon, label, value, color = 'text-primary' }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
      <div className={`p-2 rounded-lg bg-background ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export function ProgressOverview() {
  const { getTotalCompleted, getStreakDays, getAverageQuizScore, lessons } = useProgressStore();
  
  const totalCompleted = getTotalCompleted();
  const streakDays = getStreakDays();
  const averageScore = getAverageQuizScore();
  const totalLessons = Object.keys(lessons).length;
  
  const progressPercentage = totalLessons > 0 
    ? Math.round((totalCompleted / totalLessons) * 100) 
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
      </CardHeader>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-medium">{progressPercentage}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={<BookOpen className="h-5 w-5" />}
            label="Lessons Completed"
            value={totalCompleted}
          />
          <StatCard
            icon={<Target className="h-5 w-5" />}
            label="Avg Quiz Score"
            value={`${averageScore}%`}
            color="text-secondary"
          />
          <StatCard
            icon={<Flame className="h-5 w-5" />}
            label="Day Streak"
            value={streakDays}
            color="text-accent"
          />
          <StatCard
            icon={<Clock className="h-5 w-5" />}
            label="Total Lessons"
            value={totalLessons}
            color="text-muted-foreground"
          />
        </div>
      </div>
    </Card>
  );
}
