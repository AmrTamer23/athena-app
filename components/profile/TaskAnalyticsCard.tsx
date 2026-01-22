import type { EmployeeProfile } from "@/types/employee";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { BarChart as BarIcon, Clock, CheckCircle2 } from "lucide-react";

interface TaskAnalyticsCardProps {
    analytics: EmployeeProfile['taskAnalytics'];
}

export function TaskAnalyticsCard({ analytics }: TaskAnalyticsCardProps) {
    const data = [
        { name: "Completed", value: analytics.totalTasksCompleted, color: "#10B981" },
        { name: "In Progress", value: analytics.tasksInProgress, color: "#3B82F6" },
        { name: "To Do", value: analytics.tasksToDo, color: "#94A3B8" },
        { name: "On Hold", value: analytics.tasksOnHold, color: "#F59E0B" },
    ];

    return (
        <Card className="h-full border-none shadow-card bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <BarIcon className="w-5 h-5 text-blue-500" />
                    Task Analytics
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Chart */}
                <div className="h-[180px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={4}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                itemStyle={{ fontSize: '12px', fontWeight: 500 }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-3xl font-bold text-foreground">{analytics.totalTasksCompleted}</span>
                        <span className="text-xs text-muted-foreground uppercase">Done</span>
                    </div>
                </div>

                {/* Legend & Extra Metrics */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        {data.map((item) => (
                            <div key={item.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-muted-foreground">{item.name}</span>
                                </div>
                                <span className="font-semibold">{item.value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 border-t border-border flex gap-4">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground">Avg Time</span>
                                <span className="font-semibold text-sm">{analytics.averageCompletionTimeDays}d</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground">Rate</span>
                                <span className="font-semibold text-sm">{analytics.completionRate}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
