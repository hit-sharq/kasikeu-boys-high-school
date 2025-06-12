import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"

export async function GET() {
  try {
    await requireAuth()

    const notifications = await prisma.notification.findMany({
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
    })

    return NextResponse.json(notifications)
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await requireAuth()
    const body = await request.json()

    const notification = await prisma.notification.create({
      data: {
        ...body,
        authorId: userId,
      },
    })

    return NextResponse.json(notification)
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
