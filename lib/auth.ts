import { auth } from "@clerk/nextjs/server"

export async function requireAuth() {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  return userId
}

export async function requireAdmin() {
  const userId = await requireAuth()

  // Check if user is admin via environment variable
  const adminIds = process.env.ADMIN_IDS?.split(",").map((id) => id.trim()) || []
  const isAdmin = adminIds.includes(userId)

  if (!isAdmin) {
    throw new Error("Admin access required")
  }

  return userId
}

export async function getCurrentUserWithRole() {
  const { userId } = await auth()

  if (!userId) return null

  // Check environment admin IDs
  const adminIds = process.env.ADMIN_IDS?.split(",").map((id) => id.trim()) || []
  const isEnvAdmin = adminIds.includes(userId)

  return {
    userId,
    isAdmin: isEnvAdmin,
    canEdit: isEnvAdmin,
  }
}
