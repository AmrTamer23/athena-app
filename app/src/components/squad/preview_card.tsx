import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Lightbulb, Star, Zap, Users, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SquadPreviewProps {
  values: {
    squadName: string;
    techStack: string[];
    squadLeader: string;
    roles: Record<string, number>;
  };
  roleColors: Record<string, string>;
}

export function SquadPreview({ values, roleColors }: SquadPreviewProps) {
  const { squadName, techStack, roles } = values;
  
  const totalMembers = Object.values(roles).reduce((a, b) => a + b, 0) + (values.squadLeader ? 1 : 0);
  
  // Prepare chart data
  const chartData = Object.entries(roles).map(([name, value]) => ({
    name,
    value,
    color: roleColors[name] || "#ccc"
  }));

  if (values.squadLeader) {
    chartData.push({ name: "Lead", value: 1, color: "#FFD666" }); // Accent color for lead
  }

  const hasData = totalMembers > 0;

  return (
    <div className="space-y-6 sticky top-6">
      <Card className="border-none shadow-card overflow-hidden bg-card/80 backdrop-blur-sm">
        <CardHeader className="bg-muted/30 pb-4">
          <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex justify-between items-center h-8">
            <span className="flex items-center">Squad Preview</span>
            <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">Live Update</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Header Info */}
          <div>
            <h3 className="text-2xl font-bold text-primary leading-tight">
              {squadName || <span className="text-muted-foreground/30 italic">Untitled Squad</span>}
            </h3>
            
            <div className="flex flex-wrap gap-2 mt-3 min-h-[32px]">
              {techStack.length > 0 ? (
                 techStack.map(tech => (
                   <Badge key={tech} variant="outline" className="bg-background border-accent/40 shadow-sm">
                     {tech}
                   </Badge>
                 ))
              ) : (
                <div className="text-sm text-muted-foreground/40 italic">No tech stack selected</div>
              )}
            </div>
          </div>

          <Separator />

          {/* Composition Chart */}
          <div className="flex items-center gap-4 h-[120px]">
            {hasData ? (
                <>
                    <div className="h-[120px] w-[120px] flex-shrink-0 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={35}
                            outerRadius={55}
                            paddingAngle={2}
                            dataKey="value"
                            stroke="none"
                        >
                            {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            itemStyle={{ fontSize: '12px', fontWeight: 500 }}
                        />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                        <span className="text-2xl font-bold text-foreground">{totalMembers}</span>
                    </div>
                    </div>
                    
                    <div className="flex-1 space-y-1.5 overflow-y-auto max-h-[120px] pr-2 scrollbar-thin">
                        {chartData.map((item) => (
                            <div key={item.name} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-muted-foreground">{item.name}</span>
                                </div>
                                <span className="font-medium">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 text-sm italic border-2 border-dashed border-muted rounded-xl">
                    Add members to see composition
                </div>
            )}
          </div>

          {/* Leader Preview */}
          {values.squadLeader && (
             <div className="bg-muted/30 p-3 rounded-xl flex items-center gap-3 border border-border/50">
               <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                  {/* Mocking the user image since we only have ID in props - in real app we'd look it up */}
                 <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces" />
                 <AvatarFallback>L</AvatarFallback>
               </Avatar>
               <div>
                 <div className="text-xs text-muted-foreground uppercase font-semibold tracking-wide">Squad Lead</div>
                 <div className="font-medium text-foreground">John Wick</div>
               </div>
             </div>
          )}
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="border-none shadow-subtle bg-amber-50/50">
        <CardHeader className="pb-2 pt-4">
            <div className="flex items-center gap-2 text-amber-600 font-semibold text-sm">
                <Lightbulb className="w-4 h-4" />
                AI Insights
            </div>
        </CardHeader>
        <CardContent className="space-y-3 pb-4">
            <AnimatePresence mode="wait">
                {totalMembers === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="text-sm text-muted-foreground"
                    >
                        Start building your team to get recommendations.
                    </motion.div>
                ) : (
                    <motion.div className="space-y-2">
                        {roles["Senior Engineer"] > 0 && roles["Junior Engineer"] > 0 && (
                             <div className="flex gap-2 text-sm text-foreground/80 bg-card/60 p-2 rounded-md border border-amber-100/50">
                                <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                <span>Good mix of senior and junior talent for mentorship.</span>
                             </div>
                        )}
                        {roles["QA Engineer"] === 0 && totalMembers > 3 && (
                            <div className="flex gap-2 text-sm text-foreground/80 bg-card/60 p-2 rounded-md border border-amber-100/50">
                                <span className="text-amber-500 font-bold shrink-0">!</span>
                                <span>Consider adding a QA Engineer for this team size.</span>
                            </div>
                        )}
                         <div className="flex gap-2 text-sm text-foreground/80 bg-card/60 p-2 rounded-md border border-amber-100/50">
                            <span className="text-blue-500 font-bold shrink-0">i</span>
                            <span>Current capacity estimation: {totalMembers * 40} hours/week</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </CardContent>
      </Card>

       {/* Quick Stats */}
       <div className="grid grid-cols-3 gap-2">
         <div className="bg-card p-3 rounded-xl shadow-sm border border-border/50 flex flex-col items-center justify-center text-center">
            <Users className="w-4 h-4 text-muted-foreground mb-1" />
            <span className="text-xl font-bold text-foreground">{totalMembers}</span>
            <span className="text-[10px] text-muted-foreground uppercase">Members</span>
         </div>
         <div className="bg-card p-3 rounded-xl shadow-sm border border-border/50 flex flex-col items-center justify-center text-center">
            <Star className="w-4 h-4 text-muted-foreground mb-1" />
            <span className="text-xl font-bold text-foreground">4.5</span>
            <span className="text-[10px] text-muted-foreground uppercase">Avg Exp (Y)</span>
         </div>
         <div className="bg-card p-3 rounded-xl shadow-sm border border-border/50 flex flex-col items-center justify-center text-center">
            <Zap className="w-4 h-4 text-muted-foreground mb-1" />
            <span className="text-xl font-bold text-foreground">High</span>
            <span className="text-[10px] text-muted-foreground uppercase">Velocity</span>
         </div>
       </div>
    </div>
  );
}
