import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to get platform color classes (matches chart colors)
export const getPlatformColor = (platform: string): string => {
  const colors = {
    instagram: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    facebook: "bg-chart-2/10 text-chart-2 border-chart-2/20",
    twitter: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  };
  return colors[platform as keyof typeof colors] || "bg-gray-100 text-gray-700 border-gray-200";
};

// Helper function to get platform button colors for filters
export const getPlatformButtonColor = (platform: string, isActive: boolean): string => {
  const activeColors = {
    instagram: "bg-chart-1 text-white border-chart-1 hover:bg-chart-1/90",
    facebook: "bg-chart-2 text-white border-chart-2 hover:bg-chart-2/90",
    twitter: "bg-chart-3 text-white border-chart-3 hover:bg-chart-3/90",
  };

  const inactiveColors = {
    instagram: "bg-chart-1/10 text-chart-1 border-chart-1/30 hover:bg-chart-1/20",
    facebook: "bg-chart-2/10 text-chart-2 border-chart-2/30 hover:bg-chart-2/20",
    twitter: "bg-chart-3/10 text-chart-3 border-chart-3/30 hover:bg-chart-3/20",
  };

  if (isActive) {
    return activeColors[platform as keyof typeof activeColors] || "";
  }
  return inactiveColors[platform as keyof typeof inactiveColors] || "";
};

// Helper function to get platform badge colors (for dashboard cards)
export const getPlatformBadgeColor = (platform: string): string => {
  const colors = {
    instagram: "bg-chart-1/10 text-chart-1",
    facebook: "bg-chart-2/10 text-chart-2",
    twitter: "bg-chart-3/10 text-chart-3",
  };
  return colors[platform as keyof typeof colors] || "bg-gray-100 text-gray-700";
};

// Helper function to get platform text color
export const getPlatformTextColor = (platform: string): string => {
  const colors = {
    instagram: "text-chart-1",
    facebook: "text-chart-2",
    twitter: "text-chart-3",
  };
  return colors[platform as keyof typeof colors] || "text-gray-700";
};

// Helper function to format numbers with K/M suffixes
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};
