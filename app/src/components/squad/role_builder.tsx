import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

export type RoleType = "Project Manager" | "Senior Engineer" | "Junior Engineer" | "QA Engineer" | "UI/UX Designer" | "DevOps Engineer";

export interface RoleDefinition {
  role: RoleType;
  icon: React.ElementType;
  color: string;
  max: number;
}

interface RoleBuilderProps {
  value: Record<string, number>;
  onChange: (value: Record<string, number>) => void;
  roleDefinitions: readonly RoleDefinition[];
}

export function RoleBuilder({ value, onChange, roleDefinitions }: RoleBuilderProps) {
  const handleIncrement = (role: string, max: number) => {
    const current = value[role] || 0;
    if (current < max) {
      onChange({ ...value, [role]: current + 1 });
    }
  };

  const handleDecrement = (role: string) => {
    const current = value[role] || 0;
    if (current > 0) {
      const next = { ...value };
      if (current === 1) {
        delete next[role];
      } else {
        next[role] = current - 1;
      }
      onChange(next);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {roleDefinitions.map((def) => {
        const count = value[def.role] || 0;
        const isSelected = count > 0;
        const Icon = def.icon;

        return (
          <div
            key={def.role}
            className={cn(
              "relative flex items-center justify-between p-4 rounded-xl border transition-all duration-200",
              isSelected
                ? "border-accent bg-white shadow-md ring-1 ring-accent"
                : "border-border bg-white/50 hover:border-accent/50 hover:bg-white"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "p-2.5 rounded-lg flex items-center justify-center transition-colors",
                  isSelected ? `bg-${def.color}-100 text-${def.color}-700` : "bg-muted text-muted-foreground"
                )}
                style={isSelected ? { backgroundColor: def.color + '20', color: def.color } : {}}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-sm text-foreground">{def.role}</div>
                <div className="text-xs text-muted-foreground">Max {def.max} members</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isSelected ? (
                 <div className="flex items-center gap-3 bg-muted/30 rounded-lg p-1 border border-border">
                   <button
                     type="button"
                     onClick={() => handleDecrement(def.role)}
                     className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all text-muted-foreground hover:text-foreground"
                   >
                     <Minus className="w-3.5 h-3.5" />
                   </button>
                   <span className="font-mono font-bold text-sm w-3 text-center">{count}</span>
                   <button
                     type="button"
                     onClick={() => handleIncrement(def.role, def.max)}
                     className={cn(
                       "h-6 w-6 flex items-center justify-center rounded-md transition-all",
                       count >= def.max 
                         ? "opacity-50 cursor-not-allowed text-muted-foreground"
                         : "hover:bg-white hover:shadow-sm text-muted-foreground hover:text-foreground"
                     )}
                     disabled={count >= def.max}
                   >
                     <Plus className="w-3.5 h-3.5" />
                   </button>
                 </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full border-dashed border-muted-foreground/40 hover:border-accent hover:text-accent-foreground hover:bg-accent/10"
                  onClick={() => handleIncrement(def.role, def.max)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
