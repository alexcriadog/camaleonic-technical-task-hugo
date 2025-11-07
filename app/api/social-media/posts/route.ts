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

        const response = await fetch(`${MOCK_API_URL}/posts`, {
            cache: "no-store", // Always fetch fresh data
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }

        const data = await response.json();

        return NextResponse.json(
            {
                success: true,
                data,
            }
        );
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to fetch posts",
            },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        if (!MOCK_API_URL) {
            return NextResponse.json(
                { success: false, error: "Mock API URL not configured" },
                { status: 500 }
            );
        }

        const body = await request.json();

        const response = await fetch(`${MOCK_API_URL}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Failed to create post: ${response.statusText}`);
        }

        const data = await response.json();

        return NextResponse.json({
            success: true,
            data,
        });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to create post",
            },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
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
                { success: false, error: "Post ID is required" },
                { status: 400 }
            );
        }

        const body = await request.json();

        const response = await fetch(`${MOCK_API_URL}/posts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Failed to update post: ${response.statusText}`);
        }

        const data = await response.json();

        return NextResponse.json({
            success: true,
            data,
        });
    } catch (error) {
        console.error("Error updating post:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to update post",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
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
                { success: false, error: "Post ID is required" },
                { status: 400 }
            );
        }

        const response = await fetch(`${MOCK_API_URL}/posts/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Failed to delete post: ${response.statusText}`);
        }

        return NextResponse.json(
            {
                success: true,
                message: "Post deleted successfully",
            }
        );
    } catch (error) {
        console.error("Error deleting post:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to delete post",
            },
            { status: 500 }
        );
    }
}

