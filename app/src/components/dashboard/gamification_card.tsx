import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { GamificationData } from "@/services/dashboard";
import { Trophy, Target } from "lucide-react";

interface GamificationCardProps {
  gamification: GamificationData;
  delay?: number;
}

export function GamificationCard({
  gamification,
  delay = 0,
}: GamificationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="min-h-[250px] border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Gamification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-1">Current Level</p>
              <p className="text-3xl font-bold">{gamification.level}</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary">
              <p className="text-sm text-muted-foreground mb-1">Total XP</p>
              <p className="text-3xl font-bold">
                {gamification.xp.toLocaleString()}
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Badges Earned</span>
              <Badge variant="secondary">{gamification.badges.length}</Badge>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {gamification.badges.length > 0 ? (
                gamification.badges.map((badge) => (
                  <Badge
                    key={badge.id}
                    variant="default"
                    className="text-sm py-1 px-3"
                  >
                    <span className="mr-1">{badge.icon}</span>
                    {badge.name}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Complete tasks to earn badges!
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Achievements</span>
            </div>
            <div className="space-y-2">
              {gamification.achievements.map((achievement) => {
                const progressPercentage =
                  achievement.target > 0
                    ? (achievement.progress / achievement.target) * 100
                    : 0;
                return (
                  <div key={achievement.id} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">{achievement.name}</span>
                      <span className="text-muted-foreground">
                        {achievement.progress} / {achievement.target}
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          achievement.completed
                            ? "bg-green-500"
                            : "bg-primary"
                        }`}
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

