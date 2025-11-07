import { SocialMediaPost, FollowerData } from "@/lib/types/social-media";
import { format } from "date-fns";

export type ExportableTable = "posts" | "followers";

/**
 * Converts an array of objects to CSV format
 */
function convertToCSV(data: Record<string, unknown>[]): string {
    if (data.length === 0) return "";

    // Get headers from the first object
    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(",");

    // Convert each row to CSV format
    const csvRows = data.map((row) => {
        return headers
            .map((header) => {
                const value = row[header];
                // Handle values that might contain commas or quotes
                if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
                    return `"${value.replace(/"/g, '""')}"`;
                }
                return value;
            })
            .join(",");
    });

    return [csvHeaders, ...csvRows].join("\n");
}

/**
 * Formats posts data for export
 */
export function formatPostsForExport(posts: SocialMediaPost[]): Record<string, unknown>[] {
    return posts.map((post) => ({
        Date: format(new Date(post.date), "yyyy-MM-dd"),
        Platform: post.platform,
        Content: post.content,
        Likes: post.likes,
        Comments: post.comments,
        Shares: post.shares,
        Reach: post.reach,
        "Engagement Rate (%)": post.engagementRate,
    }));
}

/**
 * Formats followers data for export
 */
export function formatFollowersForExport(followers: FollowerData[]): Record<string, unknown>[] {
    return followers.map((follower) => ({
        Date: format(new Date(follower.date), "yyyy-MM-dd"),
        Platform: follower.platform,
        "Total Followers": follower.followers,
        "New Followers": follower.newFollowers,
        Unfollows: follower.unfollows,
        "Net Growth": follower.netGrowth,
    }));
}

/**
 * Exports data to CSV and triggers download
 */
export function exportToCSV(
    data: SocialMediaPost[] | FollowerData[],
    tableType: ExportableTable
): void {
    let formattedData: Record<string, unknown>[];
    let filename: string;

    if (tableType === "posts") {
        formattedData = formatPostsForExport(data as SocialMediaPost[]);
        filename = `engagement-metrics-${format(new Date(), "yyyy-MM-dd")}.csv`;
    } else {
        formattedData = formatFollowersForExport(data as FollowerData[]);
        filename = `follower-growth-${format(new Date(), "yyyy-MM-dd")}.csv`;
    }

    const csv = convertToCSV(formattedData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

