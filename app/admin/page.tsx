import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Newspaper, Calendar, Users, ImageIcon, BookOpen, MessageSquare } from "lucide-react"
import { prisma } from "@/lib/prisma"

async function getDashboardStats() {
  const [newsCount, eventsCount, staffCount, galleryCount, blogCount, messagesCount] = await Promise.all([
    prisma.news.count(),
    prisma.calendarEvent.count(),
    prisma.staff.count(),
    prisma.gallery.count(),
    prisma.blog.count(),
    prisma.contact.count(),
  ])

  return {
    newsCount,
    eventsCount,
    staffCount,
    galleryCount,
    blogCount,
    messagesCount,
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  const cards = [
    {
      title: "News Articles",
      count: stats.newsCount,
      icon: Newspaper,
      description: "Published news articles",
    },
    {
      title: "Calendar Events",
      count: stats.eventsCount,
      icon: Calendar,
      description: "Academic calendar events",
    },
    {
      title: "Staff Members",
      count: stats.staffCount,
      icon: Users,
      description: "Teaching and support staff",
    },
    {
      title: "Gallery Images",
      count: stats.galleryCount,
      icon: ImageIcon,
      description: "Photos in gallery",
    },
    {
      title: "Blog Posts",
      count: stats.blogCount,
      icon: BookOpen,
      description: "Published blog posts",
    },
    {
      title: "Messages",
      count: stats.messagesCount,
      icon: MessageSquare,
      description: "Contact form submissions",
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to the Kasikeu Boys High School admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.count}</div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
