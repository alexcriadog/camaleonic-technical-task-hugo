"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useSocialMediaData } from "@/lib/hooks/use-social-media-data";
import { TableSkeleton } from "@/components/dashboard/table-skeleton";
import { DataTable } from "@/components/ui/data-table";
import { createPostsColumns } from "@/components/dashboard/posts-columns";
import { createFollowersColumns } from "@/components/dashboard/followers-columns";
import { PlatformFilter } from "@/components/dashboard/platform-filter";
import { AddRecordDialog } from "@/components/dashboard/add-record-dialog";
import { ExportDialog } from "@/components/dashboard/export-dialog";
import { Plus, Download, RefreshCw } from "lucide-react";

export default function TablesPage() {
  const { posts, followers, isLoading, refetch, error } = useSocialMediaData();
  const [postsFilter, setPostsFilter] = useState("");
  const [followersFilter, setFollowersFilter] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);

  // Create columns with delete callback
  const postsColumns = useMemo(() => createPostsColumns(refetch), [refetch]);
  const followersColumns = useMemo(
    () => createFollowersColumns(refetch),
    [refetch]
  );

  // Filter data based on platform
  const filteredPosts = postsFilter
    ? posts.filter((post) => post.platform === postsFilter)
    : posts;

  const filteredFollowers = followersFilter
    ? followers.filter((follower) => follower.platform === followersFilter)
    : followers;

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto flex min-h-[400px] items-center justify-center p-6">
        <div className="text-center">
          <p className="text-destructive mb-4">Failed to load table data</p>
          <p className="text-muted-foreground text-sm mb-4">{error}</p>
          <Button onClick={refetch} variant="outline">
            <RefreshCw className="mr-2 size-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Data Tables</h1>
          <p className="text-muted-foreground mt-2">
            View and manage your social media data with advanced filtering,
            sorting, and pagination
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={refetch}
            className="gap-2"
          >
            <RefreshCw className="size-4" />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setIsExportDialogOpen(true)}
          >
            <Download className="size-4" />
            Export
          </Button>
          <Button
            size="sm"
            className="gap-2"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="size-4" />
            Add Record
          </Button>
        </div>
      </div>

      {/* Engagement Metrics Table */}
      <div className="mb-8 space-y-3">
        <div>
          <h2 className="text-xl font-semibold">Engagement Metrics</h2>
          <p className="text-muted-foreground text-sm">
            Track likes, comments, shares, and reach across all posts
          </p>
        </div>
        <DataTable
          columns={postsColumns}
          data={filteredPosts}
          searchKey="content"
          searchPlaceholder="Search by content..."
          customFilter={
            <PlatformFilter value={postsFilter} onChange={setPostsFilter} />
          }
          initialSorting={[{ id: "date", desc: true }]}
        />
      </div>

      {/* Follower Growth Table */}
      <div className="space-y-3">
        <div>
          <h2 className="text-xl font-semibold">Follower Growth</h2>
          <p className="text-muted-foreground text-sm">
            Monitor follower trends, new follows, and unfollows by platform
          </p>
        </div>
        <DataTable
          columns={followersColumns}
          data={filteredFollowers}
          customFilter={
            <PlatformFilter
              value={followersFilter}
              onChange={setFollowersFilter}
            />
          }
          initialSorting={[{ id: "date", desc: true }]}
        />
      </div>

      {/* Add Record Dialog */}
      <AddRecordDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSuccess={refetch}
      />

      {/* Export Dialog */}
      <ExportDialog
        open={isExportDialogOpen}
        onOpenChange={setIsExportDialogOpen}
        posts={filteredPosts}
        followers={filteredFollowers}
      />
    </div>
  );
}
