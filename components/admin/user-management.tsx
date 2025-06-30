"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

interface User {
  id: string
  clerkId: string
  email: string
  firstName: string
  lastName: string
  role: string
  createdAt: Date
  permissions: { name: string }[]
  _count: {
    createdNews: number
    createdEvents: number
  }
}

interface UserManagementProps {
  users: User[]
}

export function UserManagement({ users: initialUsers }: UserManagementProps) {
  const [users, setUsers] = useState(initialUsers)
  const [loading, setLoading] = useState<string | null>(null)

  const updateUserRole = async (userId: string, newRole: string) => {
    setLoading(userId)
    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      })

      if (!response.ok) throw new Error("Failed to update role")

      setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))

      toast.success("User role updated successfully")
    } catch (error) {
      toast.error("Failed to update user role")
    } finally {
      setLoading(null)
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "bg-red-100 text-red-800"
      case "ADMIN":
        return "bg-blue-100 text-blue-800"
      case "EDITOR":
        return "bg-green-100 text-green-800"
      case "TEACHER":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <Card key={user.id}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">
                  {user.firstName} {user.lastName}
                </CardTitle>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <Badge className={getRoleBadgeColor(user.role)}>{user.role}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <p>News Articles: {user._count.createdNews}</p>
                <p>Events Created: {user._count.createdEvents}</p>
                <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>

              <div className="flex items-center gap-2">
                <Select
                  value={user.role}
                  onValueChange={(newRole) => updateUserRole(user.id, newRole)}
                  disabled={loading === user.id}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">User</SelectItem>
                    <SelectItem value="TEACHER">Teacher</SelectItem>
                    <SelectItem value="EDITOR">Editor</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
