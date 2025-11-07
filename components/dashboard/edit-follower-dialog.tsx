"use client";

import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Platform, FollowerData } from "@/lib/types/social-media";

interface EditFollowerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  follower: FollowerData;
  onSuccess: () => void;
}

export function EditFollowerDialog({
  open,
  onOpenChange,
  follower,
  onSuccess,
}: EditFollowerDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    date: new Date(follower.date),
    platform: follower.platform as Platform,
    followers: follower.followers.toString(),
    newFollowers: follower.newFollowers.toString(),
    unfollows: follower.unfollows.toString(),
  });

  // Update form when follower changes
  useEffect(() => {
    setForm({
      date: new Date(follower.date),
      platform: follower.platform as Platform,
      followers: follower.followers.toString(),
      newFollowers: follower.newFollowers.toString(),
      unfollows: follower.unfollows.toString(),
    });
  }, [follower]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newFollowers = parseInt(form.newFollowers);
      const unfollows = parseInt(form.unfollows);
      const netGrowth = newFollowers - unfollows;

      const response = await fetch(
        `/api/social-media/followers?id=${follower.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: form.date.toISOString().split("T")[0],
            platform: form.platform,
            followers: parseInt(form.followers),
            newFollowers,
            unfollows,
            netGrowth,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to update follower record");
      }

      toast.success("Follower record updated successfully!", {
        description: `Record from ${form.platform} has been updated`,
      });

      onSuccess();
      onOpenChange(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      toast.error("Failed to update follower record", {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Follower Record</DialogTitle>
          <DialogDescription>
            Update the follower record details below. Click save when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-follower-date">Date</Label>
                <DatePicker
                  date={form.date}
                  onSelect={(date) => date && setForm({ ...form, date })}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-follower-platform">Platform</Label>
                <Select
                  value={form.platform}
                  onValueChange={(value: Platform) =>
                    setForm({ ...form, platform: value })
                  }
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-followers">Total Followers</Label>
              <Input
                id="edit-followers"
                type="number"
                placeholder="0"
                value={form.followers}
                onChange={(e) =>
                  setForm({ ...form, followers: e.target.value })
                }
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-new-followers">New Followers</Label>
                <Input
                  id="edit-new-followers"
                  type="number"
                  placeholder="0"
                  value={form.newFollowers}
                  onChange={(e) =>
                    setForm({ ...form, newFollowers: e.target.value })
                  }
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-unfollows">Unfollows</Label>
                <Input
                  id="edit-unfollows"
                  type="number"
                  placeholder="0"
                  value={form.unfollows}
                  onChange={(e) =>
                    setForm({ ...form, unfollows: e.target.value })
                  }
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>

            <div className="rounded-lg border p-3 bg-muted/50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Net Growth:</span>
                <span
                  className={`text-sm font-semibold ${
                    parseInt(form.newFollowers || "0") -
                      parseInt(form.unfollows || "0") >=
                    0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {parseInt(form.newFollowers || "0") -
                    parseInt(form.unfollows || "0") >=
                  0
                    ? "+"
                    : ""}
                  {parseInt(form.newFollowers || "0") -
                    parseInt(form.unfollows || "0")}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
