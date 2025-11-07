"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import { useSocialMediaData } from "@/lib/hooks/use-social-media-data";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
} from "recharts";

export default function ChartsPage() {
  const { posts, followers, platformStats, isLoading, refetch, error } =
    useSocialMediaData();

  // Process data for engagement overview (group posts by date and platform)
  const engagementData = useMemo(() => {
    type EngagementItem = {
      date: string;
      instagram: number;
      facebook: number;
      twitter: number;
    };

    return posts
      .reduce((acc: EngagementItem[], post) => {
        const existingDate = acc.find((item) => item.date === post.date);
        if (existingDate) {
          existingDate[post.platform] =
            (existingDate[post.platform] || 0) + post.engagementRate;
        } else {
          acc.push({
            date: post.date,
            instagram: post.platform === "instagram" ? post.engagementRate : 0,
            facebook: post.platform === "facebook" ? post.engagementRate : 0,
            twitter: post.platform === "twitter" ? post.engagementRate : 0,
          });
        }
        return acc;
      }, [])
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [posts]);

  // Aggregate follower growth by date (sum all platforms)
  const aggregatedFollowerGrowth = useMemo(() => {
    type FollowerItem = {
      date: string;
      instagram: number;
      facebook: number;
      twitter: number;
    };

    return followers
      .reduce((acc: FollowerItem[], item) => {
        const existing = acc.find((a) => a.date === item.date);
        if (existing) {
          existing.instagram =
            item.platform === "instagram" ? item.followers : existing.instagram;
          existing.facebook =
            item.platform === "facebook" ? item.followers : existing.facebook;
          existing.twitter =
            item.platform === "twitter" ? item.followers : existing.twitter;
        } else {
          acc.push({
            date: item.date,
            instagram: item.platform === "instagram" ? item.followers : 0,
            facebook: item.platform === "facebook" ? item.followers : 0,
            twitter: item.platform === "twitter" ? item.followers : 0,
          });
        }
        return acc;
      }, [])
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [followers]);

  // Platform distribution data
  const platformDistribution = platformStats.map((stat) => ({
    platform: stat.platform,
    followers: stat.totalFollowers,
  }));

  // Post performance data (engagement vs reach)
  const postPerformanceData = posts.map((post) => ({
    x: post.reach,
    y: post.engagementRate,
    platform: post.platform,
    content: post.content,
  }));

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto flex min-h-[400px] items-center justify-center p-6">
        <div className="text-center">
          <p className="text-destructive mb-4">Failed to load chart data</p>
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
      <div className="mb-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Analytics Charts
            </h1>
            <p className="text-muted-foreground text-base">
              Visualize your social media performance with interactive charts
              and insights
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
      </div>

      {/* Charts Grid */}
      <div className="grid gap-8">
        {/* Engagement Overview */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Engagement Overview</h3>
              <p className="text-muted-foreground text-sm">
                Engagement rate trends across all platforms
              </p>
            </div>
          </div>
          <ChartContainer
            config={{
              instagram: {
                label: "Instagram",
                color: "var(--chart-1)",
              },
              facebook: {
                label: "Facebook",
                color: "var(--chart-2)",
              },
              twitter: {
                label: "Twitter",
                color: "var(--chart-3)",
              },
            }}
            className="h-80"
          >
            <AreaChart data={engagementData}>
              <defs>
                <linearGradient id="fillInstagram" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-instagram)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-instagram)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillFacebook" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-facebook)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-facebook)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillTwitter" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-twitter)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-twitter)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => format(new Date(value), "MMM d")}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    labelFormatter={(value) => format(new Date(value), "PPP")}
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Area
                dataKey="instagram"
                type="natural"
                fill="url(#fillInstagram)"
                stroke="var(--color-instagram)"
                stackId="a"
              />
              <Area
                dataKey="facebook"
                type="natural"
                fill="url(#fillFacebook)"
                stroke="var(--color-facebook)"
                stackId="a"
              />
              <Area
                dataKey="twitter"
                type="natural"
                fill="url(#fillTwitter)"
                stroke="var(--color-twitter)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </Card>

        {/* Two Column Charts */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Follower Growth */}
          <Card className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Follower Growth</h3>
              <p className="text-muted-foreground text-sm">
                Follower count over time by platform
              </p>
            </div>
            <ChartContainer
              config={{
                instagram: {
                  label: "Instagram",
                  color: "var(--chart-1)",
                },
                facebook: {
                  label: "Facebook",
                  color: "var(--chart-2)",
                },
                twitter: {
                  label: "Twitter",
                  color: "var(--chart-3)",
                },
              }}
              className="h-64"
            >
              <LineChart
                accessibilityLayer
                data={aggregatedFollowerGrowth}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => format(new Date(value), "MMM d")}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => format(new Date(value), "PPP")}
                    />
                  }
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Line
                  dataKey="instagram"
                  type="monotone"
                  stroke="var(--color-instagram)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="facebook"
                  type="monotone"
                  stroke="var(--color-facebook)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="twitter"
                  type="monotone"
                  stroke="var(--color-twitter)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </Card>

          {/* Platform Distribution */}
          <Card className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Platform Distribution</h3>
              <p className="text-muted-foreground text-sm">
                Total followers by platform
              </p>
            </div>
            <ChartContainer
              config={{
                instagram: {
                  label: "Instagram",
                  color: "var(--chart-1)",
                },
                facebook: {
                  label: "Facebook",
                  color: "var(--chart-2)",
                },
                twitter: {
                  label: "Twitter",
                  color: "var(--chart-3)",
                },
              }}
              className="h-64"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel indicator="line" />}
                />
                <Pie
                  data={platformDistribution}
                  dataKey="followers"
                  nameKey="platform"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  label={(entry) =>
                    entry.platform.charAt(0).toUpperCase() +
                    entry.platform.slice(1)
                  }
                >
                  {platformDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`var(--color-${entry.platform})`}
                    />
                  ))}
                </Pie>
                <ChartLegend content={<ChartLegendContent />} />
              </PieChart>
            </ChartContainer>
          </Card>
        </div>

        {/* Post Performance */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Post Performance</h3>
            <p className="text-muted-foreground text-sm">
              Engagement rate vs reach for all posts
            </p>
          </div>
          <ChartContainer
            config={{
              instagram: {
                label: "Instagram",
                color: "var(--chart-1)",
              },
              facebook: {
                label: "Facebook",
                color: "var(--chart-2)",
              },
              twitter: {
                label: "Twitter",
                color: "var(--chart-3)",
              },
            }}
            className="h-80"
          >
            <ScatterChart>
              <CartesianGrid vertical={false} />
              <XAxis
                type="number"
                dataKey="x"
                name="Reach"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                label={{ value: "Reach", position: "insideBottom", offset: -5 }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Engagement Rate"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                label={{
                  value: "Engagement Rate (%)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <ChartTooltip
                content={<ChartTooltipContent indicator="dot" />}
                cursor={false}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Scatter
                name="instagram"
                data={postPerformanceData.filter(
                  (p) => p.platform === "instagram"
                )}
                fill="var(--color-instagram)"
              />
              <Scatter
                name="facebook"
                data={postPerformanceData.filter(
                  (p) => p.platform === "facebook"
                )}
                fill="var(--color-facebook)"
              />
              <Scatter
                name="twitter"
                data={postPerformanceData.filter(
                  (p) => p.platform === "twitter"
                )}
                fill="var(--color-twitter)"
              />
            </ScatterChart>
          </ChartContainer>
        </Card>
      </div>
    </div>
  );
}
