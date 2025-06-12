import { auth } from "@clerk/nextjs/server"

export async function requireAuth() {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  // Check if user is admin
  const adminIds = process.env.ADMIN_IDS?.split(",") || []
  if (!adminIds.includes(userId)) {
    throw new Error("Forbidden: Admin access required")
  }

  return userId
}

export async function isAdmin() {
  try {
    await requireAuth()
    return true
  } catch {
    return false
  }
}
