import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ isAdmin: false, isAuthenticated: false })
    }

    // Check if user is admin
    const adminIds = process.env.ADMIN_IDS?.split(",").map((id) => id.trim()) || []
    const isAdmin = adminIds.includes(userId)

    return NextResponse.json({
      isAdmin,
      isAuthenticated: true,
      userId,
    })
  } catch (error) {
    console.error("Error checking admin status:", error)
    return NextResponse.json({ isAdmin: false, isAuthenticated: false }, { status: 500 })
  }
}
