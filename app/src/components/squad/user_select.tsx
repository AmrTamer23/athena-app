import { useState } from "react";
import { Check, ChevronsUpDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const users = [
  {
    id: "1",
    name: "Sarah Connor",
    role: "Senior Engineer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
    status: "active"
  },
  {
    id: "2",
    name: "John Wick",
    role: "Tech Lead",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces",
    status: "active"
  },
  {
    id: "3",
    name: "Ellen Ripley",
    role: "Project Manager",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces",
    status: "active"
  },
  {
    id: "4",
    name: "Tony Stark",
    role: "Senior Engineer",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=faces",
    status: "active"
  },
  {
    id: "5",
    name: "Natasha Romanoff",
    role: "Product Owner",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=faces",
    status: "active"
  }
];

interface UserSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function UserSelect({ value, onChange }: UserSelectProps) {
  const [open, setOpen] = useState(false);

  const selectedUser = users.find((user) => user.id === value);

  return (
    <div className="flex gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="flex-1 justify-between bg-white/50 border-border/60 hover:bg-white hover:border-accent/50 h-14 px-4"
          >
            {selectedUser ? (
              <div className="flex items-center gap-3 text-left">
                <Avatar className="h-8 w-8 border border-border">
                  <AvatarImage src={selectedUser.avatar} />
                  <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium leading-none text-foreground">{selectedUser.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{selectedUser.role}</div>
                </div>
              </div>
            ) : (
              <span className="text-muted-foreground">Search for a team member...</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search name or role..." />
            <CommandList>
              <CommandEmpty>No user found.</CommandEmpty>
              <CommandGroup heading="Available Leaders">
                {users.map((user) => (
                  <CommandItem
                    key={user.id}
                    value={user.name}
                    onSelect={() => {
                      onChange(user.id === value ? "" : user.id);
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 p-2 cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "h-4 w-4",
                        value === user.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.role}</div>
                    </div>
                    {value === user.id && (
                        <Badge variant="outline" className="ml-auto text-xs border-accent text-accent-foreground">Selected</Badge>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Button 
        type="button" 
        variant="outline" 
        className="h-14 px-4 border-accent/30 hover:border-accent hover:bg-accent/5 text-foreground/80 hover:text-foreground"
      >
        <Sparkles className="w-4 h-4 mr-2 text-accent-foreground" />
        AI Recommend
      </Button>
    </div>
  );
}
