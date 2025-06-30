import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAuth()
    const body = await request.json()

    if (!body.title || !body.content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const post = await prisma.blog.update({
      where: { id: params.id },
      data: {
        title: body.title,
        content: body.content,
        excerpt: body.excerpt || body.content.substring(0, 150) + "...",
        imageUrl: body.imageUrl,
        published: body.published,
        tags: body.tags || [],
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAuth()

    await prisma.blog.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}
