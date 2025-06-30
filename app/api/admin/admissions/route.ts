import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"

export async function GET() {
  try {
    await requireAuth()

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
    await requireAuth()
    const body = await request.json()

    if (!body.title || !body.content || !body.requirements || !body.documents) {
      return NextResponse.json({ error: "Title, content, requirements, and documents are required" }, { status: 400 })
    }

    const admission = await prisma.admissionInfo.create({
      data: {
        title: body.title,
        content: body.content,
        requirements: body.requirements,
        fees: body.fees,
        documents: body.documents,
        deadlines: body.deadlines,
      },
    })

    return NextResponse.json(admission, { status: 201 })
  } catch (error) {
    console.error("Error creating admission info:", error)
    return NextResponse.json({ error: "Failed to create admission info" }, { status: 500 })
  }
}
