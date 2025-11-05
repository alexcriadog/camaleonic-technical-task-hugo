"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
    SocialMediaPost,
    FollowerData,
    DashboardStats,
    PlatformStats,
    EngagementMetric,
} from "@/lib/types/social-media";

interface SocialMediaData {
    posts: SocialMediaPost[];
    followers: FollowerData[];
    dashboardStats: DashboardStats | null;
    platformStats: PlatformStats[];
    engagementData: EngagementMetric[];
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

// Simple in-memory cache
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchWithCache(url: string) {
    // Check cache first
    const cached = cache.get(url);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }

    // Make new request
    const promise = fetch(url).then(async (res) => {
        if (!res.ok) throw new Error(`Failed to fetch ${url}`);
        const data = await res.json();

        // Cache the result
        cache.set(url, { data, timestamp: Date.now() });

        return data;
    });

    return promise;
}

export function useSocialMediaData(): SocialMediaData {
    const [data, setData] = useState<SocialMediaData>({
        posts: [],
        followers: [],
        dashboardStats: null,
        platformStats: [],
        engagementData: [],
        isLoading: true,
        error: null,
        refetch: () => { },
    });

    const abortControllerRef = useRef<AbortController | null>(null);

    const fetchData = useCallback(async (isRefetch = false) => {
        try {
            // Cancel previous request if it exists
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            abortControllerRef.current = new AbortController();

            setData((prev) => ({
                ...prev,
                isLoading: !isRefetch && prev.posts.length === 0,
                error: null
            }));

            // Fetch all data in parallel with caching
            const [postsData, followersData, statsData] = await Promise.all([
                fetchWithCache("/api/social-media/posts"),
                fetchWithCache("/api/social-media/followers"),
                fetchWithCache("/api/social-media/stats"),
            ]);

            setData((prev) => ({
                ...prev,
                posts: postsData.data,
                followers: followersData.data,
                dashboardStats: statsData.data.dashboard,
                platformStats: statsData.data.platforms,
                engagementData: statsData.data.engagement,
                isLoading: false,
                error: null,
            }));
        } catch (error) {
            // Ignore abort errors
            if (error instanceof Error && error.name === 'AbortError') return;

            setData((prev) => ({
                ...prev,
                isLoading: false,
                error: error instanceof Error ? error.message : "An error occurred",
            }));
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchData();

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [fetchData]);

    // Add refetch function to returned data
    const refetch = useCallback(() => {
        // Clear cache for fresh data
        cache.clear();
        fetchData(true);
    }, [fetchData]);

    return { ...data, refetch };
}

