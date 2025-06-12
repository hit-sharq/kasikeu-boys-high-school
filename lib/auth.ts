import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export async function requireAuth() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  // Check if user is admin
  const adminIds = process.env.ADMIN_IDS?.split(",").map((id) => id.trim()) || []
  const isAdmin = adminIds.includes(userId)

  if (!isAdmin) {
    redirect("/?error=unauthorized")
  }

  return userId
}

export async function getCurrentUser() {
  const { userId } = await auth()
  return userId
}

export async function isAdmin(userId?: string) {
  if (!userId) {
    const { userId: currentUserId } = await auth()
    if (currentUserId !== null) {
      userId = currentUserId
    }
  }

  if (!userId) return false

  const adminIds = process.env.ADMIN_IDS?.split(",").map((id) => id.trim()) || []
  return adminIds.includes(userId)
}
