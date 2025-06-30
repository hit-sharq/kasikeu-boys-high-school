import { Webhook } from "svix"
import { headers } from "next/headers"
import type { WebhookEvent } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local")
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error("Error verifying webhook:", err)
    return new Response("Error occured", {
      status: 400,
    })
  }

  const { id } = evt.data
  const eventType = evt.type

  if (eventType === "user.created") {
    try {
      await prisma.user.create({
        data: {
          clerkId: id!,
          email: evt.data.email_addresses[0]?.email_address || "",
          firstName: evt.data.first_name || "",
          lastName: evt.data.last_name || "",
          role: "USER", // Default role
        },
      })
    } catch (error) {
      console.error("Error creating user:", error)
    }
  }

  if (eventType === "user.updated") {
    try {
      await prisma.user.update({
        where: { clerkId: id! },
        data: {
          email: evt.data.email_addresses[0]?.email_address || "",
          firstName: evt.data.first_name || "",
          lastName: evt.data.last_name || "",
        },
      })
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  if (eventType === "user.deleted") {
    try {
      await prisma.user.delete({
        where: { clerkId: id! },
      })
    } catch (error) {
      console.error("Error deleting user:", error)
    }
  }

  return new Response("", { status: 200 })
}
