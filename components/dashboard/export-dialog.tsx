"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SocialMediaPost, FollowerData } from "@/lib/types/social-media";
import { exportToCSV, ExportableTable } from "@/lib/utils/export-csv";
import { FileSpreadsheet } from "lucide-react";

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  posts: SocialMediaPost[];
  followers: FollowerData[];
}

export function ExportDialog({
  open,
  onOpenChange,
  posts,
  followers,
}: ExportDialogProps) {
  const [selectedTable, setSelectedTable] = useState<ExportableTable>("posts");

  const handleExport = () => {
    try {
      if (selectedTable === "posts") {
        if (posts.length === 0) {
          toast.error("No data to export", {
            description: "The Engagement Metrics table is empty.",
          });
          return;
        }
        exportToCSV(posts, "posts");
        toast.success("Export successful!", {
          description: `Exported ${posts.length} engagement metrics records.`,
        });
      } else {
        if (followers.length === 0) {
          toast.error("No data to export", {
            description: "The Follower Growth table is empty.",
          });
          return;
        }
        exportToCSV(followers, "followers");
        toast.success("Export successful!", {
          description: `Exported ${followers.length} follower growth records.`,
        });
      }
      onOpenChange(false);
    } catch (error) {
      toast.error("Export failed", {
        description:
          error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Table Data</DialogTitle>
          <DialogDescription>
            Select which table you want to export as a CSV file.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <RadioGroup
            value={selectedTable}
            onValueChange={(value) =>
              setSelectedTable(value as ExportableTable)
            }
            className="space-y-3"
          >
            <Label
              htmlFor="posts"
              className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-accent/50 cursor-pointer transition-colors"
            >
              <RadioGroupItem value="posts" id="posts" className="mt-1" />
              <div className="flex-1">
                <div className="text-base font-medium">Engagement Metrics</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Export posts with likes, comments, shares, reach, and
                  engagement rates ({posts.length} records)
                </p>
              </div>
            </Label>

            <Label
              htmlFor="followers"
              className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-accent/50 cursor-pointer transition-colors"
            >
              <RadioGroupItem
                value="followers"
                id="followers"
                className="mt-1"
              />
              <div className="flex-1">
                <div className="text-base font-medium">Follower Growth</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Export follower data with new followers, unfollows, and net
                  growth ({followers.length} records)
                </p>
              </div>
            </Label>
          </RadioGroup>
        </div>

        <DialogFooter className="flex-row justify-between sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleExport} className="gap-2">
            <FileSpreadsheet className="size-4" />
            Export CSV
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
