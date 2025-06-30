import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    const admission = await prisma.admissionInfo.update({
      where: { id: params.id },
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
    console.error("Error updating admission info:", error)
    return NextResponse.json({ error: "Failed to update admission info" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    await prisma.admissionInfo.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Admission info deleted successfully" })
  } catch (error) {
    console.error("Error deleting admission info:", error)
    return NextResponse.json({ error: "Failed to delete admission info" }, { status: 500 })
  }
}
