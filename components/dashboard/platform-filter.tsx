"use client";

import { Button } from "@/components/ui/button";
import { cn, getPlatformButtonColor } from "@/lib/utils";

interface PlatformFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const PLATFORM_OPTIONS = [
  { label: "Instagram", value: "instagram" },
  { label: "Facebook", value: "facebook" },
  { label: "Twitter", value: "twitter" },
];

export function PlatformFilter({ value, onChange }: PlatformFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Filter:</span>
      <div className="flex gap-1">
        <Button
          variant={!value ? "default" : "outline"}
          size="sm"
          onClick={() => onChange("")}
        >
          All
        </Button>
        {PLATFORM_OPTIONS.map((option) => {
          const isActive = value === option.value;
          return (
            <Button
              key={option.value}
              size="sm"
              onClick={() => onChange(option.value)}
              className={cn(
                "capitalize border transition-colors",
                getPlatformButtonColor(option.value, isActive)
              )}
            >
              {option.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
