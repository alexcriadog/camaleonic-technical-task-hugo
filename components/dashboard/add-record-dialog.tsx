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
import { Platform } from "@/lib/types/social-media";

interface AddRecordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

type RecordType = "post" | "follower";

export function AddRecordDialog({
  open,
  onOpenChange,
  onSuccess,
}: AddRecordDialogProps) {
  const [recordType, setRecordType] = useState<RecordType>("post");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Post form state
  const [postForm, setPostForm] = useState({
    date: new Date(),
    platform: "instagram" as Platform,
    content: "",
    likes: "",
    comments: "",
    shares: "",
    reach: "",
    engagementRate: "",
  });

  // Follower form state
  const [followerForm, setFollowerForm] = useState({
    date: new Date(),
    platform: "instagram" as Platform,
    followers: "",
    newFollowers: "",
    unfollows: "",
  });

  const resetForms = () => {
    setPostForm({
      date: new Date(),
      platform: "instagram",
      content: "",
      likes: "",
      comments: "",
      shares: "",
      reach: "",
      engagementRate: "",
    });
    setFollowerForm({
      date: new Date(),
      platform: "instagram",
      followers: "",
      newFollowers: "",
      unfollows: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (recordType === "post") {
        const response = await fetch("/api/social-media/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: postForm.date.toISOString().split("T")[0],
            platform: postForm.platform,
            content: postForm.content,
            likes: parseInt(postForm.likes),
            comments: parseInt(postForm.comments),
            shares: parseInt(postForm.shares),
            reach: parseInt(postForm.reach),
            engagementRate: parseFloat(postForm.engagementRate),
          }),
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to create post");
        }

        toast.success("Post created successfully!", {
          description: `New post added for ${postForm.platform}`,
        });
      } else {
        const newFollowers = parseInt(followerForm.newFollowers);
        const unfollows = parseInt(followerForm.unfollows);
        const netGrowth = newFollowers - unfollows;

        const response = await fetch("/api/social-media/followers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: followerForm.date.toISOString().split("T")[0],
            platform: followerForm.platform,
            followers: parseInt(followerForm.followers),
            newFollowers,
            unfollows,
            netGrowth,
          }),
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to create follower record");
        }

        toast.success("Follower record created successfully!", {
          description: `New record added for ${followerForm.platform}`,
        });
      }

      resetForms();
      onSuccess();
      onOpenChange(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      toast.error("Failed to create record", {
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
          <DialogTitle>Add New Record</DialogTitle>
          <DialogDescription>
            Create a new post or follower record. Fill in the details below.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 mb-4">
          <Button
            type="button"
            variant={recordType === "post" ? "default" : "outline"}
            onClick={() => setRecordType("post")}
            className="flex-1"
          >
            Post
          </Button>
          <Button
            type="button"
            variant={recordType === "follower" ? "default" : "outline"}
            onClick={() => setRecordType("follower")}
            className="flex-1"
          >
            Follower
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {recordType === "post" ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="post-date">Date</Label>
                    <DatePicker
                      date={postForm.date}
                      onSelect={(date) =>
                        setPostForm({ ...postForm, date: date || new Date() })
                      }
                      placeholder="Select date"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="post-platform">Platform</Label>
                    <Select
                      value={postForm.platform}
                      onValueChange={(value) =>
                        setPostForm({
                          ...postForm,
                          platform: value as Platform,
                        })
                      }
                    >
                      <SelectTrigger id="post-platform" className="w-full">
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
                  <Label htmlFor="post-content">Content</Label>
                  <Input
                    id="post-content"
                    required
                    placeholder="Post content or description"
                    value={postForm.content}
                    onChange={(e) =>
                      setPostForm({ ...postForm, content: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="post-likes">Likes</Label>
                    <Input
                      id="post-likes"
                      type="number"
                      required
                      min="0"
                      placeholder="0"
                      value={postForm.likes}
                      onChange={(e) =>
                        setPostForm({ ...postForm, likes: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="post-comments">Comments</Label>
                    <Input
                      id="post-comments"
                      type="number"
                      required
                      min="0"
                      placeholder="0"
                      value={postForm.comments}
                      onChange={(e) =>
                        setPostForm({ ...postForm, comments: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="post-shares">Shares</Label>
                    <Input
                      id="post-shares"
                      type="number"
                      required
                      min="0"
                      placeholder="0"
                      value={postForm.shares}
                      onChange={(e) =>
                        setPostForm({ ...postForm, shares: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="post-reach">Reach</Label>
                    <Input
                      id="post-reach"
                      type="number"
                      required
                      min="0"
                      placeholder="0"
                      value={postForm.reach}
                      onChange={(e) =>
                        setPostForm({ ...postForm, reach: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="post-engagement">Engagement Rate (%)</Label>
                  <Input
                    id="post-engagement"
                    type="number"
                    required
                    min="0"
                    max="100"
                    step="0.1"
                    placeholder="0.0"
                    value={postForm.engagementRate}
                    onChange={(e) =>
                      setPostForm({
                        ...postForm,
                        engagementRate: e.target.value,
                      })
                    }
                  />
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="follower-date">Date</Label>
                    <DatePicker
                      date={followerForm.date}
                      onSelect={(date) =>
                        setFollowerForm({
                          ...followerForm,
                          date: date || new Date(),
                        })
                      }
                      placeholder="Select date"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="follower-platform">Platform</Label>
                    <Select
                      value={followerForm.platform}
                      onValueChange={(value) =>
                        setFollowerForm({
                          ...followerForm,
                          platform: value as Platform,
                        })
                      }
                    >
                      <SelectTrigger id="follower-platform" className="w-full">
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
                  <Label htmlFor="follower-total">Total Followers</Label>
                  <Input
                    id="follower-total"
                    type="number"
                    required
                    min="0"
                    placeholder="0"
                    value={followerForm.followers}
                    onChange={(e) =>
                      setFollowerForm({
                        ...followerForm,
                        followers: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="follower-new">New Followers</Label>
                    <Input
                      id="follower-new"
                      type="number"
                      required
                      min="0"
                      placeholder="0"
                      value={followerForm.newFollowers}
                      onChange={(e) =>
                        setFollowerForm({
                          ...followerForm,
                          newFollowers: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="follower-unfollows">Unfollows</Label>
                    <Input
                      id="follower-unfollows"
                      type="number"
                      required
                      min="0"
                      placeholder="0"
                      value={followerForm.unfollows}
                      onChange={(e) =>
                        setFollowerForm({
                          ...followerForm,
                          unfollows: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Net Growth (Calculated)</Label>
                  <div className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm">
                    {followerForm.newFollowers && followerForm.unfollows
                      ? parseInt(followerForm.newFollowers) -
                        parseInt(followerForm.unfollows)
                      : "0"}
                  </div>
                </div>
              </>
            )}
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
              {isSubmitting ? "Creating..." : "Create Record"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
