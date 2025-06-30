import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAuth()
    const body = await request.json()

    if (!body.title || !body.content || !body.requirements || !body.documents) {
      return NextResponse.json({ error: "Title, content, requirements, and documents are required" }, { status: 400 })
    }

    const admission = await prisma.admissionInfo.update({
      where: { id: params.id },
      data: {
        title: body.title,
        content: body.content,
        requirements: body.requirements,
        fees: body.fees,
        documents: body.documents,
        deadlines: body.deadlines,
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
    await requireAuth()

    await prisma.admissionInfo.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting admission info:", error)
    return NextResponse.json({ error: "Failed to delete admission info" }, { status: 500 })
  }
}
