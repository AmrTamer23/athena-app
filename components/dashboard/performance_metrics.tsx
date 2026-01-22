import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Clock, Flame, CheckCircle2 } from "lucide-react";

interface PerformanceMetricsProps {
  completionRate: number;
  averageCompletionTime: number;
  currentStreak: number;
  needsReviewCount: number;
  isManager?: boolean;
}

export function PerformanceMetrics({
  completionRate,
  averageCompletionTime,
  currentStreak,
  needsReviewCount,
  isManager = false,
}: PerformanceMetricsProps) {
  const metrics = [
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      description: "Tasks completed successfully",
      icon: <Target className="h-6 w-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      delay: 0.1,
    },
    {
      title: "Avg Completion",
      value: `${averageCompletionTime.toFixed(1)} days`,
      description: "Average time per task",
      icon: <Clock className="h-6 w-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      delay: 0.2,
    },
    {
      title: "Current Streak",
      value: `${currentStreak} days`,
      description: "Days with completed tasks",
      icon: <Flame className="h-6 w-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      delay: 0.3,
    },
    ...(isManager && needsReviewCount > 0
      ? [
          {
            title: "Awaiting Review",
            value: `${needsReviewCount}`,
            description: "Tasks to review",
            icon: <CheckCircle2 className="h-6 w-6" />,
            color: "text-amber-600",
            bgColor: "bg-amber-500/10",
            borderColor: "border-amber-500/30",
            delay: 0.4,
          },
        ]
      : []),
  ];

  return (
    <div className="flex flex-col gap-4">
      {metrics.map((metric) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: metric.delay }}
        >
          <Card
            className={`min-h-[140px] border-2 ${metric.bgColor} ${metric.borderColor}`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {metric.title}
                  </p>
                  <p className="text-3xl font-bold">{metric.value}</p>
                </div>
                <div
                  className={`p-3 rounded-full ${metric.bgColor} ${metric.color}`}
                >
                  {metric.icon}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
