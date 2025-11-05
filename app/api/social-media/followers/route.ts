import { NextResponse } from "next/server";

const MOCK_API_URL = process.env.NEXT_PUBLIC_MOCK_API_URL;

export async function GET() {
    try {
        if (!MOCK_API_URL) {
            return NextResponse.json(
                { success: false, error: "Mock API URL not configured" },
                { status: 500 }
            );
        }

        const response = await fetch(`${MOCK_API_URL}/followers`, {
            cache: "no-store", // Always fetch fresh data
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch followers: ${response.statusText}`);
        }

        const data = await response.json();

        return NextResponse.json({
            success: true,
            data,
        });
    } catch (error) {
        console.error("Error fetching followers:", error);
        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error ? error.message : "Failed to fetch followers",
            },
            { status: 500 }
        );
    }
}

