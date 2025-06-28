import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()
    const { id } = await params
    const body = await request.json()

    if (!body.name || !body.position || !body.department) {
      return NextResponse.json({ error: "Name, position, and department are required" }, { status: 400 })
    }

    const staff = await prisma.staff.update({
      where: { id },
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

    return NextResponse.json(staff)
  } catch (error) {
    console.error("Error updating staff member:", error)
    return NextResponse.json({ error: "Failed to update staff member" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()
    const { id } = await params

    await prisma.staff.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting staff member:", error)
    return NextResponse.json({ error: "Failed to delete staff member" }, { status: 500 })
  }
}
