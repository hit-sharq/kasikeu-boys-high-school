import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { prisma } from "@/lib/prisma"

async function getNewsItem(id: string) {
  return await prisma.news.findUnique({
    where: { id, published: true },
  })
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const newsItem = await getNewsItem(id)

  if (!newsItem) {
    notFound()
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button asChild variant="ghost">
            <Link href="/news" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to News
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4">
            {new Date(newsItem.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{newsItem.title}</h1>
          {newsItem.excerpt && <p className="text-xl text-gray-600 leading-relaxed">{newsItem.excerpt}</p>}
        </div>

        {/* Featured Image */}
        {newsItem.imageUrl && (
          <div className="mb-8">
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image src={newsItem.imageUrl || "/placeholder.svg"} alt={newsItem.title} fill className="object-cover" />
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="prose max-w-none">
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{newsItem.content}</div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Published on {new Date(newsItem.createdAt).toLocaleDateString()}</p>
            <Button asChild>
              <Link href="/news">View All News</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
