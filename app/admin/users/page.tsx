import { requireAdmin } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { UserManagement } from "@/components/admin/user-management"

export default async function UsersPage() {
  await requireAdmin()

  const users = await prisma.user.findMany({
    include: {
      permissions: true,
      _count: {
        select: {
          createdNews: true,
          createdEvents: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600">Manage user roles and permissions</p>
      </div>

      <UserManagement users={users} />
    </div>
  )
}
