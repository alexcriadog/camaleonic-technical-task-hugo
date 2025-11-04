export type Platform = "instagram" | "facebook" | "twitter";

export interface SocialMediaPost {
    id: string;
    date: string;
    platform: Platform;
    likes: number;
    comments: number;
    shares: number;
    reach: number;
    content: string;
    engagementRate: number;
}

export interface FollowerData {
    id: string;
    date: string;
    platform: Platform;
    followers: number;
    newFollowers: number;
    unfollows: number;
    netGrowth: number;
}

export interface PlatformStats {
    platform: Platform;
    totalFollowers: number;
    totalPosts: number;
    avgEngagement: number;
    totalReach: number;
}

export interface DashboardStats {
    totalFollowers: number;
    engagementRate: number;
    totalPosts: number;
    totalReach: number;
    growthRate: number;
    followerGrowthTrend: number;
    engagementTrend: number;
    reachTrend: number;
    postsThisMonth: number;
}

export interface EngagementMetric {
    date: string;
    instagram: number;
    facebook: number;
    twitter: number;
}

