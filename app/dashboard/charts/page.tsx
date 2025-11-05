"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export default function ChartsPage() {
  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Charts</h1>
          <p className="text-muted-foreground mt-2">
            Visualize your social media performance with interactive charts
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Calendar className="size-4" />
          Last 30 Days
        </Button>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6">
        {/* Engagement Overview */}
        <div className="bg-background rounded-lg border p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Engagement Overview</h3>
            <div className="flex gap-2">
              <span className="bg-blue-100 text-blue-700 rounded px-2 py-1 text-xs font-medium">
                Instagram
              </span>
              <span className="bg-pink-100 text-pink-700 rounded px-2 py-1 text-xs font-medium">
                Facebook
              </span>
              <span className="bg-sky-100 text-sky-700 rounded px-2 py-1 text-xs font-medium">
                Twitter
              </span>
            </div>
          </div>
          <div className="text-muted-foreground flex h-80 items-center justify-center border-2 border-dashed rounded">
            Line Chart - Engagement over time (to be implemented)
          </div>
        </div>

        {/* Two Column Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Follower Growth */}
          <div className="bg-background rounded-lg border p-6">
            <h3 className="mb-4 text-lg font-semibold">Follower Growth</h3>
            <div className="text-muted-foreground flex h-64 items-center justify-center border-2 border-dashed rounded">
              Bar Chart - Monthly follower growth
            </div>
          </div>

          {/* Platform Distribution */}
          <div className="bg-background rounded-lg border p-6">
            <h3 className="mb-4 text-lg font-semibold">
              Platform Distribution
            </h3>
            <div className="text-muted-foreground flex h-64 items-center justify-center border-2 border-dashed rounded">
              Pie Chart - Followers by platform
            </div>
          </div>
        </div>

        {/* Post Performance */}
        <div className="bg-background rounded-lg border p-6">
          <h3 className="mb-4 text-lg font-semibold">Post Performance</h3>
          <div className="text-muted-foreground flex h-80 items-center justify-center border-2 border-dashed rounded">
            Scatter Chart - Posts engagement vs reach
          </div>
        </div>

        {/* Bottom Row Charts */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="bg-background rounded-lg border p-6">
            <h3 className="mb-4 text-lg font-semibold">Peak Hours</h3>
            <div className="text-muted-foreground flex h-48 items-center justify-center border-2 border-dashed rounded">
              Heatmap - Best posting times
            </div>
          </div>

          <div className="bg-background rounded-lg border p-6">
            <h3 className="mb-4 text-lg font-semibold">Content Types</h3>
            <div className="text-muted-foreground flex h-48 items-center justify-center border-2 border-dashed rounded">
              Donut Chart - Post types
            </div>
          </div>

          <div className="bg-background rounded-lg border p-6">
            <h3 className="mb-4 text-lg font-semibold">Engagement Rate</h3>
            <div className="text-muted-foreground flex h-48 items-center justify-center border-2 border-dashed rounded">
              Gauge Chart - Current rate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
