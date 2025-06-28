import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"

export async function GET() {
  try {
    await requireAuth()

    const staff = await prisma.staff.findMany({
      orderBy: { name: "asc" },
    })

    return NextResponse.json(staff)
  } catch (error) {
    console.error("Error fetching staff:", error)
    return NextResponse.json({ error: "Failed to fetch staff" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth()
    const body = await request.json()

    if (!body.name || !body.position || !body.department) {
      return NextResponse.json({ error: "Name, position, and department are required" }, { status: 400 })
    }

    const staff = await prisma.staff.create({
      data: {
        name: body.name,
        position: body.position,
        department: body.department,
        email: body.email,
        phone: body.phone,
        bio: body.bio,
        imageUrl: body.imageUrl,
        qualifications: body.qualifications,
      },
    })

    return NextResponse.json(staff, { status: 201 })
  } catch (error) {
    console.error("Error creating staff member:", error)
    return NextResponse.json({ error: "Failed to create staff member" }, { status: 500 })
  }
}
