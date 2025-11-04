"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSocialMediaData } from "@/lib/hooks/use-social-media-data";
import { getPlatformColor, formatNumber } from "@/lib/utils";
import { TableSkeleton } from "@/components/dashboard/table-skeleton";
import { Search, Plus, Download, RefreshCw } from "lucide-react";

export default function TablesPage() {
  const [searchTerm, setSearchTerm] = useState("");
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

  // Filter data based on search
  const filteredPosts = posts.filter(
    (post) =>
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.date.includes(searchTerm)
  );

  const filteredFollowers = followers.filter(
    (follower) =>
      follower.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
      follower.date.includes(searchTerm)
  );

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Data Tables</h1>
          <p className="text-muted-foreground mt-2">
            View and manage your social media data in tabular format
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="size-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="size-4" />
            Add Record
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-background mb-6 rounded-lg border p-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
            <Input
              placeholder="Search posts, platforms, or dates..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">Filters</Button>
        </div>
      </div>

      {/* Engagement Table */}
      <div className="bg-background mb-6 overflow-hidden rounded-lg border">
        <div className="border-b p-4">
          <h3 className="text-lg font-semibold">Engagement Metrics</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Likes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Comments
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Shares
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Reach
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-muted-foreground px-6 py-8 text-center text-sm"
                  >
                    No posts found
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-muted/50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      {post.date}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span
                        className={`rounded px-2 py-1 text-xs font-medium capitalize ${getPlatformColor(
                          post.platform
                        )}`}
                      >
                        {post.platform}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      {post.likes.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      {post.comments.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      {post.shares.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      {formatNumber(post.reach)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Followers Table */}
      <div className="bg-background overflow-hidden rounded-lg border">
        <div className="border-b p-4">
          <h3 className="text-lg font-semibold">Follower Growth</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Followers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  New
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Unfollows
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Net Growth
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredFollowers.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-muted-foreground px-6 py-8 text-center text-sm"
                  >
                    No follower data found
                  </td>
                </tr>
              ) : (
                filteredFollowers.map((follower) => (
                  <tr key={follower.id} className="hover:bg-muted/50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      {follower.date}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span
                        className={`rounded px-2 py-1 text-xs font-medium capitalize ${getPlatformColor(
                          follower.platform
                        )}`}
                      >
                        {follower.platform}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      {follower.followers.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      +{follower.newFollowers}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      -{follower.unfollows}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span className="text-green-600 font-medium">
                        +{follower.netGrowth}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
