import { NextResponse } from "next/server";
import type { SocialMediaPost, FollowerData } from "@/lib/types/social-media";

const MOCK_API_URL = process.env.NEXT_PUBLIC_MOCK_API_URL;

interface PlatformData {
    platform: string;
    totalPosts: number;
    totalEngagement: number;
    totalReach: number;
    totalFollowers: number;
}

export async function GET() {
    try {
        if (!MOCK_API_URL) {
            return NextResponse.json(
                { success: false, error: "Mock API URL not configured" },
                { status: 500 }
            );
        }

        // Fetch posts and followers to calculate stats
        const [postsResponse, followersResponse] = await Promise.all([
            fetch(`${MOCK_API_URL}/posts`, { cache: "no-store" }),
            fetch(`${MOCK_API_URL}/followers`, { cache: "no-store" }),
        ]);

        if (!postsResponse.ok || !followersResponse.ok) {
            throw new Error("Failed to fetch data for stats calculation");
        }

        const posts: SocialMediaPost[] = await postsResponse.json();
        const followers: FollowerData[] = await followersResponse.json();

        // Calculate dashboard stats from the data
        const totalFollowers = followers.reduce((sum: number, f: FollowerData) => {
            return sum + (f.followers || 0);
        }, 0);

        const avgEngagementRate = posts.length > 0
            ? posts.reduce((sum: number, p: SocialMediaPost) => sum + (p.engagementRate || 0), 0) / posts.length
            : 0;

        const totalReach = posts.reduce((sum: number, p: SocialMediaPost) => sum + (p.reach || 0), 0);

        const totalGrowth = followers.reduce((sum: number, f: FollowerData) => sum + (f.netGrowth || 0), 0);
        const growthRate = followers.length > 0 ? (totalGrowth / followers.length) * 0.1 : 0;

        // Calculate platform stats
        const platformData: { [key: string]: PlatformData } = {};

        posts.forEach((post: SocialMediaPost) => {
            if (!platformData[post.platform]) {
                platformData[post.platform] = {
                    platform: post.platform,
                    totalPosts: 0,
                    totalEngagement: 0,
                    totalReach: 0,
                    totalFollowers: 0,
                };
            }
            platformData[post.platform].totalPosts++;
            platformData[post.platform].totalEngagement += post.engagementRate || 0;
            platformData[post.platform].totalReach += post.reach || 0;
        });

        followers.forEach((follower: FollowerData) => {
            if (platformData[follower.platform]) {
                platformData[follower.platform].totalFollowers = follower.followers || 0;
            }
        });

        const platformStats = Object.values(platformData).map((p: PlatformData) => ({
            platform: p.platform,
            totalFollowers: p.totalFollowers,
            totalPosts: p.totalPosts,
            avgEngagement: p.totalPosts > 0 ? p.totalEngagement / p.totalPosts : 0,
            totalReach: p.totalReach,
        }));

        // Calculate growth trends (comparing recent vs older data)
        const sortedFollowers = [...followers].sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        const recentFollowerGrowth = sortedFollowers.slice(0, Math.ceil(sortedFollowers.length / 2));
        const olderFollowerGrowth = sortedFollowers.slice(Math.ceil(sortedFollowers.length / 2));

        const recentAvgGrowth = recentFollowerGrowth.length > 0
            ? recentFollowerGrowth.reduce((sum, f) => sum + (f.netGrowth || 0), 0) / recentFollowerGrowth.length
            : 0;
        const olderAvgGrowth = olderFollowerGrowth.length > 0
            ? olderFollowerGrowth.reduce((sum, f) => sum + (f.netGrowth || 0), 0) / olderFollowerGrowth.length
            : 0;

        const followerGrowthTrend = olderAvgGrowth > 0
            ? Math.round(((recentAvgGrowth - olderAvgGrowth) / olderAvgGrowth) * 100 * 10) / 10
            : 0;

        // Calculate engagement trend (recent vs older posts)
        const sortedPosts = [...posts].sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        const recentPosts = sortedPosts.slice(0, Math.ceil(sortedPosts.length / 2));
        const olderPosts = sortedPosts.slice(Math.ceil(sortedPosts.length / 2));

        const recentAvgEngagement = recentPosts.length > 0
            ? recentPosts.reduce((sum, p) => sum + (p.engagementRate || 0), 0) / recentPosts.length
            : 0;
        const olderAvgEngagement = olderPosts.length > 0
            ? olderPosts.reduce((sum, p) => sum + (p.engagementRate || 0), 0) / olderPosts.length
            : 0;

        const engagementTrend = olderAvgEngagement > 0
            ? Math.round(((recentAvgEngagement - olderAvgEngagement) / olderAvgEngagement) * 100 * 10) / 10
            : 0;

        // Calculate reach trend
        const recentTotalReach = recentPosts.reduce((sum, p) => sum + (p.reach || 0), 0);
        const olderTotalReach = olderPosts.reduce((sum, p) => sum + (p.reach || 0), 0);
        const reachTrend = olderTotalReach > 0
            ? Math.round(((recentTotalReach - olderTotalReach) / olderTotalReach) * 100 * 10) / 10
            : 0;

        const dashboardStats = {
            totalFollowers: Math.round(totalFollowers / followers.length) || 24563,
            engagementRate: Math.round(avgEngagementRate * 10) / 10,
            totalPosts: posts.length,
            totalReach,
            growthRate: Math.round(growthRate * 10) / 10,
            followerGrowthTrend,
            engagementTrend,
            reachTrend,
            postsThisMonth: recentPosts.length,
        };

        // Generate engagement data from posts grouped by date
        const engagementByDate: { [key: string]: { instagram: number; facebook: number; twitter: number } } = {};

        posts.forEach((post: SocialMediaPost) => {
            if (!engagementByDate[post.date]) {
                engagementByDate[post.date] = { instagram: 0, facebook: 0, twitter: 0 };
            }
            const engagement = post.likes + post.comments + post.shares;
            engagementByDate[post.date][post.platform as keyof typeof engagementByDate[typeof post.date]] += engagement;
        });

        const engagementData = Object.entries(engagementByDate)
            .map(([date, platforms]) => ({
                date,
                instagram: platforms.instagram,
                facebook: platforms.facebook,
                twitter: platforms.twitter,
            }))
            .sort((a, b) => a.date.localeCompare(b.date));

        return NextResponse.json({
            success: true,
            data: {
                dashboard: dashboardStats,
                platforms: platformStats,
                engagement: engagementData,
            },
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to fetch stats",
            },
            { status: 500 }
        );
    }
}

