import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const contact = await prisma.contact.create({
      data: body,
    })

    return NextResponse.json(contact)
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit message" }, { status: 500 })
  }
}
