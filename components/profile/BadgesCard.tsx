import type { EmployeeProfile } from "@/types/employee";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge as UiBadge } from "@/components/ui/badge";
import { Award } from "lucide-react";

interface BadgesCardProps {
    badges: EmployeeProfile['gamification']['badges'];
}

export function BadgesCard({ badges }: BadgesCardProps) {
    return (
        <Card className="h-full border-none shadow-card bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Award className="w-5 h-5 text-amber-500" />
                    Recent Badges
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {badges.length > 0 ? (
                        badges.map((badge: { id: string; name: string; description: string; unlockedAt: string }) => (
                            <div key={badge.id} className="flex items-start gap-4 p-3 rounded-lg bg-muted/40 border border-border/50 transition-colors hover:bg-muted/60">
                                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg">
                                    <Award className="w-6 h-6" /> {/* Placeholder for badge icon */}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-semibold text-foreground">{badge.name}</h4>
                                        <UiBadge variant="outline" className="text-[10px] h-5 border-amber-200 text-amber-700 bg-amber-50">
                                            New
                                        </UiBadge>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{badge.description}</p>
                                    <p className="text-xs text-muted-foreground mt-1">Earned on {new Date(badge.unlockedAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-muted-foreground italic">
                            No badges earned yet.
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
