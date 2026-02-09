import type { EmployeeProfile } from "@/types/employee";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, TrendingUp, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface PerformanceCardProps {
    performance: EmployeeProfile['performance'];
}

export function PerformanceCard({ performance }: PerformanceCardProps) {
    const { feedbackDistribution, fiveStarFeedbackCount, totalFeedbackCount, trend } = performance;

    return (
        <Card className="h-full border-none shadow-card bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    Performance & Feedback
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-900/30">
                    <div className="p-3 bg-white dark:bg-purple-900 rounded-full shadow-sm">
                        <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold">{performance.overallRating.toFixed(1)}</div>
                        <div className="text-xs text-muted-foreground font-medium">Average Rating</div>
                        {trend && (
                            <div className="flex items-center gap-1 text-xs text-green-600 font-medium mt-1">
                                <TrendingUp className="w-3 h-3" />
                                <span>{trend}</span>
                            </div>
                        )}
                    </div>
                    <div className="ml-auto text-right">
                        <div className="text-xl font-bold text-purple-700 dark:text-purple-400">{fiveStarFeedbackCount}</div>
                        <div className="text-xs text-muted-foreground">5-Star Reviews</div>
                    </div>
                </div>

                {/* Distribution Bars */}
                <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => {
                        const count = feedbackDistribution[rating.toString()] || 0;
                        const percentage = totalFeedbackCount > 0 ? (count / totalFeedbackCount) * 100 : 0;

                        return (
                            <div key={rating} className="flex items-center gap-3 text-sm">
                                <div className="flex items-center gap-1 w-12 font-medium">
                                    {rating} <Star className="w-3 h-3 text-muted-foreground" />
                                </div>
                                <Progress value={percentage} className="h-2 flex-1" indicatorClassName={rating >= 4 ? "bg-purple-500" : "bg-muted-foreground/30"} />
                                <div className="w-8 text-right text-muted-foreground text-xs">{count}</div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
