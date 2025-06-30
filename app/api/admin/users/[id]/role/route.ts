import type { NextRequest } from "next/server"
import { requireAdmin } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin()

    const { role } = await request.json()

    if (!["USER", "TEACHER", "EDITOR", "ADMIN", "SUPER_ADMIN"].includes(role)) {
      return Response.json({ error: "Invalid role" }, { status: 400 })
    }

    const user = await prisma.user.update({
      where: { id: params.id },
      data: { role },
    })

    return Response.json(user)
  } catch (error) {
    console.error("Error updating user role:", error)
    return Response.json({ error: "Failed to update user role" }, { status: 500 })
  }
}
