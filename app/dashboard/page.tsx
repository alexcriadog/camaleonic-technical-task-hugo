"use client";

import { useAuthStore } from "@/lib/store/auth-store";
import { useSocialMediaData } from "@/lib/hooks/use-social-media-data";
import {
  formatNumber,
  getPlatformBadgeColor,
  getPlatformTextColor,
} from "@/lib/utils";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { format } from "date-fns";
import {
  BarChart3,
  TrendingUp,
  Users,
  Activity,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardHomePage() {
  const { user } = useAuthStore();
  const { dashboardStats, posts, platformStats, isLoading, refetch, error } =
    useSocialMediaData();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto flex min-h-[400px] items-center justify-center p-6">
        <div className="text-center">
          <p className="text-destructive mb-4">Failed to load dashboard data</p>
          <p className="text-muted-foreground text-sm mb-4">{error}</p>
          <Button onClick={refetch} variant="outline">
            <RefreshCw className="mr-2 size-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Get recent posts for activity feed (sorted by date)
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  // Helper to format trend
  const formatTrend = (value: number) => {
    const sign = value > 0 ? "+" : "";
    return `${sign}${value}%`;
  };

  // Helper to get trend color
  const getTrendColor = (value: number) => {
    if (value > 0) return "text-green-600";
    if (value < 0) return "text-red-600";
    return "text-muted-foreground";
  };

  return (
    <div className="container mx-auto p-6">
      {/* Welcome Section with Refresh */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.name || "User"}!
          </h1>
          <p className="text-muted-foreground mt-2">
            Here&apos;s what&apos;s happening with your social media accounts
            today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={refetch}
            className="gap-2"
          >
            <RefreshCw className="size-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-background rounded-lg border p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Total Followers
              </p>
              <h3 className="mt-2 text-3xl font-bold">
                {formatNumber(dashboardStats?.totalFollowers || 0)}
              </h3>
              <p
                className={`mt-1 text-sm ${getTrendColor(
                  dashboardStats?.followerGrowthTrend || 0
                )}`}
              >
                {formatTrend(dashboardStats?.followerGrowthTrend || 0)} from
                previous period
              </p>
            </div>
            <div className="bg-blue-100 text-blue-600 flex size-12 items-center justify-center rounded-lg">
              <Users className="size-6" />
            </div>
          </div>
        </div>

        <div className="bg-background rounded-lg border p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Engagement Rate
              </p>
              <h3 className="mt-2 text-3xl font-bold">
                {dashboardStats?.engagementRate || 0}%
              </h3>
              <p
                className={`mt-1 text-sm ${getTrendColor(
                  dashboardStats?.engagementTrend || 0
                )}`}
              >
                {formatTrend(dashboardStats?.engagementTrend || 0)} from
                previous period
              </p>
            </div>
            <div className="bg-pink-100 text-pink-600 flex size-12 items-center justify-center rounded-lg">
              <Activity className="size-6" />
            </div>
          </div>
        </div>

        <div className="bg-background rounded-lg border p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Total Posts
              </p>
              <h3 className="mt-2 text-3xl font-bold">
                {dashboardStats?.totalPosts || 0}
              </h3>
              <p className="text-muted-foreground mt-1 text-sm">
                {dashboardStats?.postsThisMonth || 0} recent posts
              </p>
            </div>
            <div className="bg-purple-100 text-purple-600 flex size-12 items-center justify-center rounded-lg">
              <BarChart3 className="size-6" />
            </div>
          </div>
        </div>

        <div className="bg-background rounded-lg border p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Total Reach
              </p>
              <h3 className="mt-2 text-3xl font-bold">
                {formatNumber(dashboardStats?.totalReach || 0)}
              </h3>
              <p
                className={`mt-1 text-sm ${getTrendColor(
                  dashboardStats?.reachTrend || 0
                )}`}
              >
                {formatTrend(dashboardStats?.reachTrend || 0)} from previous
                period
              </p>
            </div>
            <div className="bg-green-100 text-green-600 flex size-12 items-center justify-center rounded-lg">
              <TrendingUp className="size-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Platform Performance */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Platform Performance</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {platformStats.map((platform) => (
            <div
              key={platform.platform}
              className="bg-background rounded-lg border p-4 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-medium capitalize">
                  {platform.platform}
                </h3>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${getPlatformBadgeColor(
                    platform.platform
                  )}`}
                >
                  {platform.totalPosts} posts
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Followers</span>
                  <span className="font-medium">
                    {formatNumber(platform.totalFollowers)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Avg. Engagement</span>
                  <span className="font-medium">
                    {Math.round(platform.avgEngagement * 10) / 10}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Reach</span>
                  <span className="font-medium">
                    {formatNumber(platform.totalReach)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-background rounded-lg border p-6">
          <h3 className="mb-4 text-lg font-semibold">Recent Activity</h3>
          <div className="space-y-4">
            {recentPosts.map((post, index) => (
              <div
                key={post.id}
                className={`flex items-center justify-between ${
                  index < recentPosts.length - 1 ? "border-b pb-3" : ""
                }`}
              >
                <div>
                  <p className="font-medium">{post.content}</p>
                  <p className="text-muted-foreground text-sm capitalize">
                    {post.platform} • {format(new Date(post.date), "PPP")}
                  </p>
                </div>
                <span className="text-green-600 text-sm">
                  +{formatNumber(post.likes)} likes
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-background rounded-lg border p-6">
          <h3 className="mb-4 text-lg font-semibold">Top Performing Posts</h3>
          <div className="space-y-4">
            {posts
              .sort((a, b) => b.reach - a.reach)
              .slice(0, 3)
              .map((post, index) => (
                <div
                  key={post.id}
                  className={`flex items-center justify-between ${
                    index < 2 ? "border-b pb-3" : ""
                  }`}
                >
                  <div>
                    <p className="font-medium">{post.content}</p>
                    <p className="text-muted-foreground text-sm capitalize">
                      {post.platform}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-semibold ${getPlatformTextColor(
                      post.platform
                    )}`}
                  >
                    {formatNumber(post.reach)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
