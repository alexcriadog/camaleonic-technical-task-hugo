import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to get platform color classes
export const getPlatformColor = (platform: string): string => {
  const colors = {
    instagram: "bg-pink-100 text-pink-700",
    facebook: "bg-blue-100 text-blue-700",
    twitter: "bg-sky-100 text-sky-700",
  };
  return colors[platform as keyof typeof colors] || "bg-gray-100 text-gray-700";
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
