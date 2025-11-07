"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { SocialMediaPost } from "@/lib/types/social-media";
import { getPlatformColor, formatNumber } from "@/lib/utils";
import { PostActionsCell } from "./post-actions-cell";

export const createPostsColumns = (
  onDelete: () => void
): ColumnDef<SocialMediaPost>[] => [
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
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate">{row.getValue("content")}</div>
    ),
  },
  {
    accessorKey: "likes",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Likes
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const likes = row.getValue("likes") as number;
      return <div className="font-medium">{likes.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "comments",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Comments
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const comments = row.getValue("comments") as number;
      return <div>{comments.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "shares",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Shares
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const shares = row.getValue("shares") as number;
      return <div>{shares.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "reach",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Reach
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const reach = row.getValue("reach") as number;
      return <div className="font-medium">{formatNumber(reach)}</div>;
    },
  },
  {
    accessorKey: "engagementRate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Engagement
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rate = row.getValue("engagementRate") as number;
      return <div className="font-medium">{rate}%</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const post = row.original;
      return <PostActionsCell post={post} onDelete={onDelete} />;
    },
  },
];
