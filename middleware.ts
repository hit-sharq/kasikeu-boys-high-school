import { authMiddleware, getAuth } from "@clerk/nextjs/server"
import { type NextRequest, NextResponse } from "next/server"

// Helper function to match routes using regex patterns
function matchRoute(pathname: string, patterns: string[]): boolean {
  return patterns.some((pattern) => {
    const regex = new RegExp(`^${pattern}$`)
    return regex.test(pathname)
  })
}

// Define route patterns
const publicRoutePatterns = [
  "/",
  "/about",
  "/academics",
  "/admissions",
  "/staff",
  "/gallery",
  "/news.*",
  "/blog.*",
  "/calendar",
  "/contact",
  "/notifications",
  "/sign-in.*",
  "/sign-up.*",
  "/api/contact",
  "/api/webhooks.*",
]

const adminRoutePatterns = ["/admin.*"]
const adminApiRoutePatterns = ["/api/admin.*"]

function customAuthMiddleware(req: NextRequest) {
  const { userId } = getAuth(req)
  const { pathname } = req.nextUrl

  // Get admin IDs from environment variable
  const adminIds = process.env.ADMIN_IDS?.split(",").map((id) => id.trim()) || []

  // Check if user is admin
  const isAdmin = userId ? adminIds.includes(userId) : false

  // Handle admin routes
  if (matchRoute(pathname, adminRoutePatterns)) {
    // Redirect to sign-in if not authenticated
    if (!userId) {
      const signInUrl = new URL("/sign-in", req.url)
      signInUrl.searchParams.set("redirect_url", req.url)
      return NextResponse.redirect(signInUrl)
    }

    // Check if user is admin
      if (!isAdmin) {
        // Redirect non-admin users to sign-in page with error
        const signInUrl = new URL("/sign-in", req.url)
        signInUrl.searchParams.set("error", "unauthorized")
        return NextResponse.redirect(signInUrl)
      }
  }

  // Handle admin API routes
  if (matchRoute(pathname, adminApiRoutePatterns)) {
    // Return 401 if not authenticated
    if (!userId) {
      return new NextResponse(JSON.stringify({ error: "Authentication required" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Return 403 if not admin
    if (!isAdmin) {
      return new NextResponse(JSON.stringify({ error: "Admin access required" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      })
    }
  }

  // Protect non-public routes (require authentication)
  if (!matchRoute(pathname, publicRoutePatterns)) {
    if (!userId) {
      const signInUrl = new URL("/sign-in", req.url)
      signInUrl.searchParams.set("redirect_url", req.url)
      return NextResponse.redirect(signInUrl)
    }
  }

  // No redirect, continue middleware chain
  return undefined
}

import type { NextFetchEvent } from "next/server"

export default function middleware(req: NextRequest, ev: NextFetchEvent) {
  const authResponse = authMiddleware()(req, ev)
  if (authResponse) {
    return authResponse
  }
  return customAuthMiddleware(req) || NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
