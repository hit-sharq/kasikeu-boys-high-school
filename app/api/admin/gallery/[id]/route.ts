import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAuth()
    const body = await request.json()

    if (!body.title || !body.imageUrl || !body.category) {
      return NextResponse.json({ error: "Title, image URL, and category are required" }, { status: 400 })
    }

    const galleryItem = await prisma.gallery.update({
      where: { id: params.id },
      data: {
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl,
        category: body.category,
      },
    })

    return NextResponse.json(galleryItem)
  } catch (error) {
    console.error("Error updating gallery item:", error)
    return NextResponse.json({ error: "Failed to update gallery item" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAuth()

    await prisma.gallery.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting gallery item:", error)
    return NextResponse.json({ error: "Failed to delete gallery item" }, { status: 500 })
  }
}
