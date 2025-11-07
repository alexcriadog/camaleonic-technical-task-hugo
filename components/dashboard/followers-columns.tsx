"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, TrendingUp, TrendingDown } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { FollowerData } from "@/lib/types/social-media";
import { getPlatformColor } from "@/lib/utils";
import { FollowerActionsCell } from "./follower-actions-cell";

export const createFollowersColumns = (
  onDelete: () => void
): ColumnDef<FollowerData>[] => [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">
        {format(new Date(row.getValue("date")), "PPP")}
      </div>
    ),
  },
  {
    accessorKey: "platform",
    header: "Platform",
    cell: ({ row }) => {
      const platform = row.getValue("platform") as string;
      return (
        <span
          className={`rounded border px-2 py-1 text-xs font-medium capitalize ${getPlatformColor(
            platform
          )}`}
        >
          {platform}
        </span>
      );
    },
  },
  {
    accessorKey: "followers",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Followers
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const followers = row.getValue("followers") as number;
      return <div className="font-medium">{followers.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "newFollowers",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          New Followers
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const newFollowers = row.getValue("newFollowers") as number;
      return (
        <div className="flex items-center gap-1 text-green-600">
          <TrendingUp className="size-3" />
          <span>+{newFollowers}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "unfollows",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Unfollows
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const unfollows = row.getValue("unfollows") as number;
      return (
        <div className="flex items-center gap-1 text-red-600">
          <TrendingDown className="size-3" />
          <span>-{unfollows}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "netGrowth",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Net Growth
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const netGrowth = row.getValue("netGrowth") as number;
      const isPositive = netGrowth >= 0;
      return (
        <div
          className={`font-semibold ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? "+" : ""}
          {netGrowth}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const follower = row.original;
      return <FollowerActionsCell follower={follower} onDelete={onDelete} />;
    },
  },
];
