import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const admissions = await prisma.admissionInfo.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(admissions)
  } catch (error) {
    console.error("Error fetching admissions:", error)
    return NextResponse.json({ error: "Failed to fetch admissions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is admin
    const adminIds = process.env.ADMIN_IDS?.split(",").map((id) => id.trim()) || []
    if (!adminIds.includes(userId)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const { title, content, requirements, fees, documents, deadlines } = body

    if (!title || !content || !requirements || !documents) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const admission = await prisma.admissionInfo.create({
      data: {
        title,
        content,
        requirements,
        fees,
        documents,
        deadlines,
      },
    })

    return NextResponse.json(admission)
  } catch (error) {
    console.error("Error creating admission info:", error)
    return NextResponse.json({ error: "Failed to create admission info" }, { status: 500 })
  }
}
