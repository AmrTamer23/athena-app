import { Link } from '@tanstack/react-router';
import { 
  Users,
  Crown,
  Puzzle,
  UserPlus,
  ArrowLeft,
  Save,
  Check,
  Loader2,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { RoleBuilder } from "@/components/squad/role_builder";
import type { RoleDefinition } from "@/components/squad/role_builder";
import { TechStackSelect } from "@/components/squad/tech_stack_select";
import { UserSelect } from "@/components/squad/user_select";
import { SquadPreview } from "@/components/squad/preview_card";
import type { useForm } from '@tanstack/react-form';
import type { SquadFormValues } from '@/hooks/useSquadCreate';

interface SquadFormProps {
    form: ReturnType<typeof useForm<SquadFormValues, any>>;
    isEditing: boolean;
    roleDefinitions: readonly RoleDefinition[];
    roleColors: Record<string, string>;
}

export function SquadForm({ form, isEditing, roleDefinitions, roleColors }: SquadFormProps) {
  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="bg-background/50 backdrop-blur-md border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground cursor-pointer">Dashboard</Link>
            <span>/</span>
            <Link to="/" className="hover:text-foreground cursor-pointer">Squads</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{isEditing ? "Edit Squad" : "Create Squad"}</span>
          </div>

          {isEditing && (
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Squad
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-primary">{isEditing ? "Edit Squad" : "Create New Squad"}</h1>
            <p className="text-muted-foreground mt-2">
              {isEditing ? "Update team details, roles, and composition." : "Build a cross-functional team for your next big project."}
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Panel: Form */}
          <div className="lg:col-span-7 space-y-8">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="space-y-8"
            >
              
              {/* Section 1: Squad Basics */}
              <section className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-primary">Squad Basics</h2>
                </div>

                <Card className="border-none shadow-card bg-transparent">
                  <CardContent className="p-0">
                      {/* Squad Details Section */}
                      <section className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">1</span>
                          <h2 className="text-xl font-semibold tracking-tight">Squad Details</h2>
                        </div>
                        
                        <div className="grid gap-6 p-0 group">
                          <div className="grid gap-2">
                            <form.Field
                              name="squadName"
                              children={(field) => (
                             <div className="space-y-2">
                                <Label htmlFor="squadName">Squad Name</Label>
                                <Input 
                                    id="squadName" 
                                    placeholder="e.g., Mobile App Alpha Team" 
                                    className="h-12 bg-background/50"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                {field.state.meta.errors ? (
                                    <p className="text-sm text-destructive">{field.state.meta.errors.join(', ')}</p>
                                ) : null}
                            </div>
                        )}
                    />

                    <form.Field
                        name="techStack"
                        children={(field) => (
                            <div className="space-y-2">
                                <Label>Project / Technology Stack</Label>
                                <TechStackSelect 
                                    value={field.state.value} 
                                    onChange={field.handleChange} 
                                />
                                {field.state.meta.errors ? (
                                    <p className="text-sm text-destructive">{field.state.meta.errors.join(', ')}</p>
                                ) : null}
                            </div>
                        )}
                    />

                    <form.Field
                        name="squadDescription"
                        children={(field) => (
                            <div className="space-y-2">
                                <Label htmlFor="squadDescription">Squad Mission</Label>
                                <Textarea 
                                    id="squadDescription" 
                                    placeholder="Describe the squad's goals and objectives..." 
                                    className="min-h-[120px] resize-none bg-background/50"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground text-right">{field.state.value?.length || 0}/500 characters</p>
                            </div>
                        )}
                    />
                          </div>
                      </div>
                    </section>
                  </CardContent>
                </Card>
              </section>

              {/* Section 2: Leadership */}
              <section className="space-y-4">
                 <div className="flex items-center gap-3 mb-4">
                  <div className="p-2">
                    <Crown className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold text-primary">Squad Leadership</h2>
                </div>

                <Card className="border-none shadow-card bg-card/80 backdrop-blur-sm">
                  <CardContent className="pt-6">
                     <form.Field
                        name="squadLeader"
                        children={(field) => (
                            <div className="space-y-2">
                                <Label>Squad Lead / Tech Lead</Label>
                                <UserSelect 
                                    value={field.state.value} 
                                    onChange={field.handleChange} 
                                />
                                {field.state.meta.errors ? (
                                    <p className="text-sm text-destructive">{field.state.meta.errors.join(', ')}</p>
                                ) : null}
                            </div>
                        )}
                    />
                  </CardContent>
                </Card>
              </section>

              {/* Section 3: Team Composition */}
              <section className="space-y-4">
                 <div className="flex items-center gap-3 mb-4">
                  <div className="p-2">
                    <Puzzle className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-primary">Team Composition</h2>
                </div>

                <Card className="border-none shadow-card bg-card/80 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <Label>Required Roles</Label>
                      <p className="text-sm text-muted-foreground mb-4">Define the structure of your squad by adding role slots.</p>
                      
                      <form.Field
                        name="roles"
                        children={(field) => (
                            <RoleBuilder 
                                value={field.state.value} 
                                onChange={field.handleChange} 
                                roleDefinitions={roleDefinitions}
                            />
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Section 4: Member Assignment (Optional) */}
              <section className="space-y-4 opacity-60 hover:opacity-100 transition-opacity">
                 <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white p-2 rounded-lg shadow-sm border border-border">
                    <UserPlus className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-primary">Assign Members (Optional)</h2>
                </div>

                <Card className="border-none shadow-card border-dashed border-2 border-border bg-card/40 backdrop-blur-sm">
                  <CardContent className="pt-6 flex flex-col items-center justify-center py-12 text-center">
                    <div className="bg-muted/50 p-4 rounded-full mb-4">
                      <Users className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">Auto-Assignment Available</h3>
                    <p className="text-muted-foreground max-w-md mt-2 mb-6">
                      You can assign specific members later, or let our AI suggest the best team based on your requirements.
                    </p>
                    <Button type="button" variant="outline" className="border-accent text-accent-foreground hover:bg-accent/10">
                      Enable AI Auto-Assign
                    </Button>
                  </CardContent>
                </Card>
              </section>

            </form>
          </div>

          {/* Right Panel: Preview */}
          <div className="hidden lg:block lg:col-span-5">
             <form.Subscribe
                selector={(state: any) => state.values}
                children={(values: any) => (
                    <SquadPreview values={values} roleColors={roleColors} />
                )}
             />
          </div>
        </div>
      </main>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border z-50 py-4 shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground" asChild>
            <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Cancel
            </Link>
          </Button>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-accent text-accent-foreground hover:bg-accent/10">
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <form.Subscribe
                selector={(state: any) => state.isSubmitting}
                children={(isSubmitting: any) => (
                    <Button 
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[140px]"
                    >
                    {isSubmitting ? (
                        <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {isEditing ? "Updating..." : "Creating..."}
                        </>
                    ) : (
                        <>
                        <Check className="w-4 h-4 mr-2" />
                        {isEditing ? "Update Squad" : "Create Squad"}
                        </>
                    )}
                    </Button>
                )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
