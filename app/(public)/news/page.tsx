import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Newspaper, Clock, User, TrendingUp, Bell } from "lucide-react"
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              <Newspaper className="h-4 w-4 mr-2" />
              Latest Updates
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">News & Announcements</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest news, events, and announcements from Kasikeu Boys High School community
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* News Statistics */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <TrendingUp className="h-4 w-4 mr-2" />
              News Overview
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Informed</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get the latest updates on school activities, achievements, and important announcements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover-lift bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Newspaper className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{news.length}</div>
                <p className="text-gray-600 font-medium">Total Articles</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {news.filter((n) => new Date(n.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                </div>
                <p className="text-gray-600 font-medium">This Week</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <p className="text-gray-600 font-medium">Updates</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Featured Post */}
        {news.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-4">
                <TrendingUp className="h-4 w-4 mr-2" />
                Featured Story
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900">Latest News</h2>
            </div>

            <Card className="overflow-hidden hover-lift border-0 shadow-xl bg-gradient-to-r from-white to-gray-50">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-video lg:aspect-square relative">
                  <Image
                    src={news[0].imageUrl || "/placeholder.svg?height=400&width=600"}
                    alt={news[0].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-500 text-white">Featured</Badge>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{news[0].title}</h2>
                  <p className="text-gray-600 mb-6 line-clamp-3 text-lg leading-relaxed">{news[0].excerpt}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {new Date(news[0].createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      School Administration
                    </div>
                  </div>
                  <Button asChild size="lg" className="w-fit">
                    <Link href={`/news/${news[0].id}`}>Read Full Article</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* News Grid */}
        <section>
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Newspaper className="h-4 w-4 mr-2" />
              All Stories
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent News</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse through our latest news articles and stay connected with school activities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.slice(1).map((item) => (
              <Card key={item.id} className="overflow-hidden hover-lift border-0 shadow-lg group">
                {item.imageUrl && (
                  <div className="aspect-video relative">
                    <Image
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </Badge>
                  </div>
                  <CardTitle className="line-clamp-2 hover:text-blue-600 transition-colors group-hover:text-blue-600">
                    <Link href={`/news/${item.id}`}>{item.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3 mb-4">{item.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <User className="h-3 w-3 mr-1" />
                      Admin
                    </div>
                    <Link
                      href={`/news/${item.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm group-hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {news.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Newspaper className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No News Available</h3>
            <p className="text-gray-500">No news articles available at the moment. Check back soon!</p>
          </div>
        )}

        {/* Newsletter Signup */}
        <section className="mt-20">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <div className="max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bell className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-blue-100 mb-6">
                Never miss important school news and announcements. Get notified about the latest updates.
              </p>
              <Button variant="secondary" size="lg">
                Subscribe to Updates
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
