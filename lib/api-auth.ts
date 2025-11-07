import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/**
 * Verify if the request is authenticated
 * Returns the session if authenticated, or null if not
 */
export async function verifyAuth() {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        return session;
    } catch (error) {
        console.error("Auth verification error:", error);
        return null;
    }
}

/**
 * Middleware to check authentication for API routes
 * Returns an error response if not authenticated
 */
export async function requireAuth() {
    const session = await verifyAuth();

    if (!session) {
        return NextResponse.json(
            {
                success: false,
                error: "Unauthorized",
                message: "You must be logged in to access this resource",
            },
            { status: 401 }
        );
    }

    return { session };
}

/**
 * Higher-order function to wrap API route handlers with authentication
 */
export function withAuth<T extends unknown[]>(
    handler: (
        request: NextRequest,
        session: NonNullable<Awaited<ReturnType<typeof verifyAuth>>>,
        ...args: T
    ) => Promise<NextResponse>
) {
    return async (request: NextRequest, ...args: T) => {
        const authResult = await requireAuth();

        // If authResult is a NextResponse, it means auth failed
        if (authResult instanceof NextResponse) {
            return authResult;
        }

        // Otherwise, call the handler with the session
        return handler(request, authResult.session, ...args);
    };
}

