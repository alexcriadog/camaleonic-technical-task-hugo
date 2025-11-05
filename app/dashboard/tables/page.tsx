"use client";

import { Button } from "@/components/ui/button";
import { useSocialMediaData } from "@/lib/hooks/use-social-media-data";
import { TableSkeleton } from "@/components/dashboard/table-skeleton";
import { DataTable } from "@/components/ui/data-table";
import { postsColumns } from "@/components/dashboard/posts-columns";
import { followersColumns } from "@/components/dashboard/followers-columns";
import { Plus, Download, RefreshCw } from "lucide-react";

export default function TablesPage() {
  const { posts, followers, isLoading, refetch, error } = useSocialMediaData();

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
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="size-4" />
            Export
          </Button>
          <Button size="sm" className="gap-2">
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
          data={posts}
          searchKey="content"
          searchPlaceholder="Search by content or platform..."
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
          data={followers}
          searchKey="platform"
          searchPlaceholder="Search by platform or date..."
        />
      </div>
    </div>
  );
}
