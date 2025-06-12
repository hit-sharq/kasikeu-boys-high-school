"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Newspaper,
  Calendar,
  Users,
  ImageIcon,
  BookOpen,
  GraduationCap,
  MessageSquare,
  LogOut,
} from "lucide-react"
import { UserButton } from "@clerk/nextjs"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "News", href: "/admin/news", icon: Newspaper },
  { name: "Calendar", href: "/admin/calendar", icon: Calendar },
  { name: "Staff", href: "/admin/staff", icon: Users },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "Blog", href: "/admin/blog", icon: BookOpen },
  { name: "Admissions", href: "/admin/admissions", icon: GraduationCap },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900">
      <div className="flex h-16 items-center justify-center bg-gray-800">
        <h1 className="text-lg font-semibold text-white">Admin Panel</h1>
      </div>

      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                isActive ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0",
                  isActive ? "text-white" : "text-gray-400 group-hover:text-white",
                )}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="flex items-center justify-between p-4 border-t border-gray-700">
        <UserButton afterSignOutUrl="/" />
        <Link href="/" className="text-gray-300 hover:text-white text-sm flex items-center">
          <LogOut className="h-4 w-4 mr-2" />
          View Site
        </Link>
      </div>
    </div>
  )
}
