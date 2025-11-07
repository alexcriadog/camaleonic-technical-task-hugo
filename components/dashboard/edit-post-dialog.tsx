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
import { Platform, SocialMediaPost } from "@/lib/types/social-media";
import { Textarea } from "@/components/ui/textarea";

interface EditPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: SocialMediaPost;
  onSuccess: () => void;
}

export function EditPostDialog({
  open,
  onOpenChange,
  post,
  onSuccess,
}: EditPostDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    date: new Date(post.date),
    platform: post.platform as Platform,
    content: post.content,
    likes: post.likes.toString(),
    comments: post.comments.toString(),
    shares: post.shares.toString(),
    reach: post.reach.toString(),
    engagementRate: post.engagementRate.toString(),
  });

  // Update form when post changes
  useEffect(() => {
    setForm({
      date: new Date(post.date),
      platform: post.platform as Platform,
      content: post.content,
      likes: post.likes.toString(),
      comments: post.comments.toString(),
      shares: post.shares.toString(),
      reach: post.reach.toString(),
      engagementRate: post.engagementRate.toString(),
    });
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/social-media/posts?id=${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: form.date.toISOString().split("T")[0],
          platform: form.platform,
          content: form.content,
          likes: parseInt(form.likes),
          comments: parseInt(form.comments),
          shares: parseInt(form.shares),
          reach: parseInt(form.reach),
          engagementRate: parseFloat(form.engagementRate),
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to update post");
      }

      toast.success("Post updated successfully!", {
        description: `Post from ${form.platform} has been updated`,
      });

      onSuccess();
      onOpenChange(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      toast.error("Failed to update post", {
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
          <DialogTitle>Edit Post</DialogTitle>
          <DialogDescription>
            Update the post details below. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-date">Date</Label>
                <DatePicker
                  date={form.date}
                  onSelect={(date) => date && setForm({ ...form, date })}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-platform">Platform</Label>
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
              <Label htmlFor="edit-content">Content</Label>
              <Textarea
                id="edit-content"
                placeholder="Post content..."
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                disabled={isSubmitting}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-likes">Likes</Label>
                <Input
                  id="edit-likes"
                  type="number"
                  placeholder="0"
                  value={form.likes}
                  onChange={(e) => setForm({ ...form, likes: e.target.value })}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-comments">Comments</Label>
                <Input
                  id="edit-comments"
                  type="number"
                  placeholder="0"
                  value={form.comments}
                  onChange={(e) =>
                    setForm({ ...form, comments: e.target.value })
                  }
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-shares">Shares</Label>
                <Input
                  id="edit-shares"
                  type="number"
                  placeholder="0"
                  value={form.shares}
                  onChange={(e) => setForm({ ...form, shares: e.target.value })}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-reach">Reach</Label>
                <Input
                  id="edit-reach"
                  type="number"
                  placeholder="0"
                  value={form.reach}
                  onChange={(e) => setForm({ ...form, reach: e.target.value })}
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-engagement">Engagement Rate (%)</Label>
              <Input
                id="edit-engagement"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={form.engagementRate}
                onChange={(e) =>
                  setForm({ ...form, engagementRate: e.target.value })
                }
                disabled={isSubmitting}
                required
              />
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
