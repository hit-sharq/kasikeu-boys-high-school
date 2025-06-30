import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"

export async function GET() {
  try {
    await requireAuth()

    const posts = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await requireAuth()
    const body = await request.json()

    if (!body.title || !body.content || !body.slug) {
      return NextResponse.json({ error: "Title, content, and slug are required" }, { status: 400 })
    }

    // Check if slug already exists
    const existingPost = await prisma.blog.findUnique({
      where: { slug: body.slug },
    })

    if (existingPost) {
      return NextResponse.json({ error: "A post with this slug already exists" }, { status: 400 })
    }

    const post = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        excerpt: body.excerpt || body.content.substring(0, 150) + "...",
        imageUrl: body.imageUrl,
        published: body.published || false,
        slug: body.slug,
        tags: body.tags || [],
        authorId: userId,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
