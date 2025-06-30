import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"

export async function GET() {
  try {
    await requireAuth()

    const gallery = await prisma.gallery.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(gallery)
  } catch (error) {
    console.error("Error fetching gallery:", error)
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth()
    const body = await request.json()

    if (!body.title || !body.imageUrl || !body.category) {
      return NextResponse.json({ error: "Title, image URL, and category are required" }, { status: 400 })
    }

    const galleryItem = await prisma.gallery.create({
      data: {
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl,
        category: body.category,
      },
    })

    return NextResponse.json(galleryItem, { status: 201 })
  } catch (error) {
    console.error("Error creating gallery item:", error)
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 })
  }
}
