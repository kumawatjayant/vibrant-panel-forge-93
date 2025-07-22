// Reusable stats grid component with minimal props
import { Card, CardContent } from '@/components/ui/card';
import { StatCard } from '@/types';
import * as Icons from 'lucide-react';

interface StatsGridProps {
  stats: StatCard[];
  className?: string;
}

export function StatsGrid({ stats, className = '' }: StatsGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${Math.min(stats.length, 4)} gap-6 ${className}`}>
      {stats.map((stat, index) => {
        const IconComponent = (Icons as any)[stat.icon] || Icons.BarChart;
        
        return (
          <Card key={index} className="glass border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                  {stat.trend && (
                    <div className={`flex items-center gap-1 text-xs mt-1 ${
                      stat.trend.direction === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {stat.trend.direction === 'up' ? '↑' : '↓'} {stat.trend.value}%
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}