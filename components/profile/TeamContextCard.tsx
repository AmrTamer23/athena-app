import type { EmployeeProfile } from "@/types/employee";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

import Link from "next/link";

interface TeamContextCardProps {
    team: EmployeeProfile['team'];
}

export function TeamContextCard({ team }: TeamContextCardProps) {
    const { squad, contact } = team;

    return (
        <Card className="h-full border-none shadow-card bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="w-5 h-5 text-blue-500" />
                    Team Context
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Squad Info */}
                {squad && (
                    <div>
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Current Squad</h3>
                        {/* Note: View-only squad page implementation pending, linking to edit/dashboard for now */}
                        <Link href={`/squads/${squad.id}/edit`} className="block group">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 transition-colors group-hover:bg-blue-100/50 dark:group-hover:bg-blue-900/20">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-800 text-blue-600 rounded-lg">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-foreground group-hover:underline">{squad.name}</div>
                                        <Badge variant="secondary" className="mt-1 text-xs">{squad.role}</Badge>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {/* Reporting Line */}
                {contact?.reportsTo && (
                    <div>
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Reports To</h3>
                        <Link href={`/employees/${contact.reportsTo.id}`} className="block group">
                            <div className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                                <Avatar className="h-10 w-10 border border-border">
                                    <AvatarImage src={contact.reportsTo.avatarUrl} />
                                    <AvatarFallback>{contact.reportsTo.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="font-medium text-foreground group-hover:underline">{contact.reportsTo.name}</div>
                                    <div className="text-xs text-muted-foreground">{contact.reportsTo.role}</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {/* Direct Reports */}
                {contact?.directReports && contact.directReports.length > 0 && (
                    <div>
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Direct Reports ({contact.directReports.length})</h3>
                        <div className="space-y-2">
                            {contact.directReports.map(report => (
                                <div key={report.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer">
                                    <Avatar className="h-8 w-8 border border-border">
                                        <AvatarImage src={report.avatarUrl} />
                                        <AvatarFallback>{report.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-foreground">{report.name}</div>
                                        <div className="text-[10px] text-muted-foreground">{report.role}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
