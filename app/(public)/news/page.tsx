import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { prisma } from "@/lib/prisma"

async function getNews() {
  return await prisma.news.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  })
}

export default async function NewsPage() {
  const news = await getNews()

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">News & Announcements</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest news, events, and announcements from Kasikeu Boys High School
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {item.imageUrl && (
                <div className="aspect-video relative">
                  <Image src={item.imageUrl || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>
              )}
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{new Date(item.createdAt).toLocaleDateString()}</Badge>
                </div>
                <CardTitle className="line-clamp-2 hover:text-blue-600 transition-colors">
                  <Link href={`/news/${item.id}`}>{item.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-3 mb-4">{item.excerpt}</p>
                <Link href={`/news/${item.id}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  Read More →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {news.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No news articles available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}
