import { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
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
import { Badge } from "../ui/badge";

const techOptions = [
  "React Frontend",
  "Vue Frontend",
  "Angular Frontend",
  "Node.js Backend",
  "Python Backend",
  "Data Analytics",
  "Mobile App (iOS)",
  "Mobile App (Android)",
  "DevOps",
  "QA Automation",
  "UI/UX Design",
  "Custom"
];

interface TechStackSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function TechStackSelect({ value = [], onChange }: TechStackSelectProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (currentValue: string) => {
    if (value.includes(currentValue)) {
      onChange(value.filter((item) => item !== currentValue));
    } else {
      onChange([...value, currentValue]);
    }
  };

  const handleRemove = (itemToRemove: string) => {
    onChange(value.filter((item) => item !== itemToRemove));
  };

  return (
    <div className="space-y-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-background border-input hover:bg-accent hover:text-accent-foreground h-12"
          >
            <span className="text-muted-foreground">Select technologies...</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search framework or language..." />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {techOptions.map((tech) => (
                  <CommandItem
                    key={tech}
                    value={tech}
                    onSelect={() => handleSelect(tech)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.includes(tech) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {tech}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((item) => (
            <Badge
              key={item}
              variant="secondary"
              className="pl-3 pr-1 py-1 h-8 bg-accent/20 text-foreground hover:bg-accent/30 border-transparent"
            >
              {item}
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 ml-1 rounded-full hover:bg-accent/40 hover:text-foreground"
                onClick={() => handleRemove(item)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
