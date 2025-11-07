import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api-auth";

const MOCK_API_URL = process.env.NEXT_PUBLIC_MOCK_API_URL;

export async function GET(request: NextRequest) {
    // Check authentication
    const authResult = await requireAuth();
    if (authResult instanceof NextResponse) {
        return authResult;
    }

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

        return NextResponse.json(
            {
                success: true,
                data,
            },
            { status: 200 }
        );
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

export async function POST(request: NextRequest) {
    // Check authentication
    const authResult = await requireAuth();
    if (authResult instanceof NextResponse) {
        return authResult;
    }

    try {
        if (!MOCK_API_URL) {
            return NextResponse.json(
                { success: false, error: "Mock API URL not configured" },
                { status: 500 }
            );
        }

        const body = await request.json();

        const response = await fetch(`${MOCK_API_URL}/followers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Failed to create follower record: ${response.statusText}`);
        }

        const data = await response.json();

        return NextResponse.json(
            {
                success: true,
                data,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating follower record:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to create follower record",
            },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    // Check authentication
    const authResult = await requireAuth();
    if (authResult instanceof NextResponse) {
        return authResult;
    }

    try {
        if (!MOCK_API_URL) {
            return NextResponse.json(
                { success: false, error: "Mock API URL not configured" },
                { status: 500 }
            );
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { success: false, error: "Follower record ID is required" },
                { status: 400 }
            );
        }

        const body = await request.json();

        const response = await fetch(`${MOCK_API_URL}/followers/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Failed to update follower record: ${response.statusText}`);
        }

        const data = await response.json();

        return NextResponse.json(
            {
                success: true,
                data,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating follower record:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to update follower record",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    // Check authentication
    const authResult = await requireAuth();
    if (authResult instanceof NextResponse) {
        return authResult;
    }

    try {
        if (!MOCK_API_URL) {
            return NextResponse.json(
                { success: false, error: "Mock API URL not configured" },
                { status: 500 }
            );
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { success: false, error: "Follower record ID is required" },
                { status: 400 }
            );
        }

        const response = await fetch(`${MOCK_API_URL}/followers/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Failed to delete follower record: ${response.statusText}`);
        }

        return NextResponse.json(
            {
                success: true,
                message: "Follower record deleted successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting follower record:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to delete follower record",
            },
            { status: 500 }
        );
    }
}

