import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export async function requireAuth() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return userId
}

export async function getCurrentUser() {
  const { userId } = await auth()
  return userId
}

export async function requireAdmin() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const adminIds = process.env.ADMIN_IDS?.split(",").map((id) => id.trim()) || []
  const isUserAdmin = adminIds.includes(userId)

  if (!isUserAdmin) {
    redirect("/?error=unauthorized")
  }

  return userId
}

export async function isAdmin(userId?: string) {
  if (!userId) {
    const { userId: currentUserId } = await auth()
    if (!currentUserId) return false
    userId = currentUserId
  }

  const adminIds = process.env.ADMIN_IDS?.split(",").map((id) => id.trim()) || []
  return adminIds.includes(userId)
}

export async function getCurrentUserRole() {
  const { userId } = await auth()

  if (!userId) {
    return { userId: null, isAdmin: false, isAuthenticated: false }
  }

  const adminIds = process.env.ADMIN_IDS?.split(",").map((id) => id.trim()) || []
  const isUserAdmin = adminIds.includes(userId)

  return {
    userId,
    isAdmin: isUserAdmin,
    isAuthenticated: true,
  }
}
