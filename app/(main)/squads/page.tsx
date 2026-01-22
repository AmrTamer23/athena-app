"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Plus, Filter, MoreHorizontal, Users } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const MOCK_SQUADS = [
  {
    id: "1",
    name: "Alpha Mobile Team",
    description:
      "Building the next gen iOS and Android application for the main product.",
    leader: {
      name: "Sarah Connor",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
    },
    members: 8,
    maxMembers: 12,
    status: "active",
    progress: 65,
    techStack: ["React Native", "TypeScript", "Node.js"],
    createdAt: "2 days ago",
  },
  {
    id: "2",
    name: "Data Analytics Core",
    description:
      "Revamping the data pipeline and analytics dashboard infrastructure.",
    leader: {
      name: "John Wick",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces",
    },
    members: 4,
    maxMembers: 6,
    status: "recruiting",
    progress: 20,
    techStack: ["Python", "AWS", "Snowflake"],
    createdAt: "5 days ago",
  },
  {
    id: "3",
    name: "Design System Squad",
    description: "Standardizing UI components across all web properties.",
    leader: {
      name: "Ellen Ripley",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces",
    },
    members: 3,
    maxMembers: 5,
    status: "active",
    progress: 45,
    techStack: ["Figma", "React", "Storybook"],
    createdAt: "1 week ago",
  },
  {
    id: "4",
    name: "Marketing Website",
    description:
      "Redesigning the public facing marketing website for Q4 launch.",
    leader: {
      name: "Tony Stark",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=faces",
    },
    members: 6,
    maxMembers: 6,
    status: "completed",
    progress: 100,
    techStack: ["Next.js", "Tailwind", "Vercel"],
    createdAt: "2 weeks ago",
  },
];

export default function SquadsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredSquads = MOCK_SQUADS.filter((squad) => {
    const matchesSearch =
      squad.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      squad.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? squad.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen pb-24 bg-transparent animate-in fade-in duration-500">
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Squads
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your cross-functional teams and track progress.
            </p>
          </div>

          <Link href="/squads/create">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
              <Plus className="w-4 h-4 mr-2" />
              Create New Squad
            </Button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center bg-card/60 backdrop-blur-sm p-4 rounded-xl border border-border shadow-sm">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search squads..."
              className="pl-9 bg-background border-border/60 focus:border-accent h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <Button
              variant={statusFilter === null ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setStatusFilter(null)}
              className={
                statusFilter === null
                  ? "bg-background shadow-sm border border-border font-medium"
                  : "text-muted-foreground"
              }
            >
              All
            </Button>
            <Button
              variant={statusFilter === "active" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setStatusFilter("active")}
              className={
                statusFilter === "active"
                  ? "bg-background shadow-sm border border-border font-medium text-green-600 dark:text-green-400"
                  : "text-muted-foreground"
              }
            >
              Active
            </Button>
            <Button
              variant={statusFilter === "recruiting" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setStatusFilter("recruiting")}
              className={
                statusFilter === "recruiting"
                  ? "bg-background shadow-sm border border-border font-medium text-accent-foreground"
                  : "text-muted-foreground"
              }
            >
              Recruiting
            </Button>
            <Button
              variant={statusFilter === "completed" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setStatusFilter("completed")}
              className={
                statusFilter === "completed"
                  ? "bg-background shadow-sm border border-border font-medium text-blue-600 dark:text-blue-400"
                  : "text-muted-foreground"
              }
            >
              Completed
            </Button>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="shrink-0 border-dashed"
          >
            <Filter className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSquads.map((squad, index) => (
            <Link
              key={squad.id}
              href={`/squads/${squad.id}/edit`}
              className="block h-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
                transition={{ delay: index * 0.05 }}
                className="h-full"
              >
                <Card className="h-full border-none shadow-card hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm group cursor-pointer overflow-hidden relative">
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300 z-0" />

                  <CardHeader className="pb-3 relative z-10">
                    <div className="flex justify-between items-start mb-2">
                      <Badge
                        variant="outline"
                        className={`
                          border-0 px-2 py-0.5 uppercase text-[10px] tracking-wider font-bold
                          ${
                            squad.status === "active"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : ""
                          }
                          ${
                            squad.status === "recruiting"
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                              : ""
                          }
                          ${
                            squad.status === "completed"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              : ""
                          }
                        `}
                      >
                        {squad.status}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 -mr-2 text-muted-foreground hover:text-foreground"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>

                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {squad.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                      {squad.description}
                    </p>
                  </CardHeader>

                  <CardContent className="pb-3 space-y-4 relative z-10">
                    <div className="flex flex-wrap gap-1.5">
                      {squad.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-foreground/80 border border-border/50 group-hover:border-accent/30 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                      {squad.techStack.length > 3 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-foreground/80 border border-border/50">
                          +{squad.techStack.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-foreground/70 font-medium">
                          Progress
                        </span>
                        <span className="font-bold text-foreground">
                          {squad.progress}%
                        </span>
                      </div>
                      <Progress
                        value={squad.progress}
                        className="h-1.5 bg-muted"
                      />
                    </div>
                  </CardContent>

                  <CardFooter className="pt-3 border-t border-border/40 flex justify-between items-center bg-background/40 relative z-10">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6 border border-background shadow-sm">
                        <AvatarImage src={squad.leader.avatar} />
                        <AvatarFallback>
                          {squad.leader.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium text-foreground/80">
                        Lead:{" "}
                        <span className="text-foreground">
                          {squad.leader.name.split(" ")[0]}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <Users className="w-3.5 h-3.5" />
                      <span>
                        {squad.members}/{squad.maxMembers}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            </Link>
          ))}

          <Link href="/squads/create" className="block h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
              transition={{ delay: 0.3 }}
              className="h-full min-h-[300px] rounded-xl border-2 border-dashed border-muted-foreground/20 hover:border-accent hover:bg-accent/5 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center p-6 group bg-card/30"
            >
              <div className="w-12 h-12 rounded-full bg-muted group-hover:bg-accent/20 flex items-center justify-center mb-4 transition-colors">
                <Plus className="w-6 h-6 text-muted-foreground group-hover:text-accent-foreground" />
              </div>
              <h3 className="font-semibold text-lg text-foreground group-hover:text-accent-foreground mb-1">
                Create New Squad
              </h3>
              <p className="text-sm text-foreground/70 max-w-[200px]">
                Start a new cross-functional team for your next initiative.
              </p>
            </motion.div>
          </Link>
        </div>
      </main>
    </div>
  );
}
