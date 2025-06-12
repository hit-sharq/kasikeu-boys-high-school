import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, User, PenTool, Star, TrendingUp } from "lucide-react"
import { prisma } from "@/lib/prisma"

async function getBlogPosts() {
  return await prisma.blog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  })
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              <PenTool className="h-4 w-4 mr-2" />
              Educational Content
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">School Blog</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Educational insights, study tips, school updates, and inspiring stories from the Kasikeu Boys High School
              community
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Blog Statistics */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <TrendingUp className="h-4 w-4 mr-2" />
              Blog Overview
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Educational Resources</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover valuable insights, study tips, and educational content to support your academic journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover-lift bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-indigo-600 mb-2">{posts.length}</div>
                <p className="text-gray-600 font-medium">Blog Posts</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
                <p className="text-gray-600 font-medium">Categories</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PenTool className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-pink-600 mb-2">Weekly</div>
                <p className="text-gray-600 font-medium">New Posts</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Featured Post */}
        {posts.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-4">
                <Star className="h-4 w-4 mr-2" />
                Featured Article
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900">Latest Post</h2>
            </div>

            <Card className="overflow-hidden hover-lift border-0 shadow-xl bg-gradient-to-r from-white to-indigo-50">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-video lg:aspect-square relative">
                  <Image
                    src={posts[0].imageUrl || "/placeholder.svg?height=400&width=600"}
                    alt={posts[0].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-indigo-500 text-white">Featured Post</Badge>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {posts[0].tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{posts[0].title}</h2>
                  <p className="text-gray-600 mb-6 line-clamp-3 text-lg leading-relaxed">{posts[0].excerpt}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {new Date(posts[0].createdAt).toLocaleDateString("en-US", {
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
                    <Link href={`/blog/${posts[0].slug}`}>Read Full Article</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section>
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <BookOpen className="h-4 w-4 mr-2" />
              All Articles
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Posts</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our collection of educational articles, study guides, and school insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post) => (
              <Card key={post.id} className="overflow-hidden hover-lift border-0 shadow-lg group">
                {post.imageUrl && (
                  <div className="aspect-video relative">
                    <Image
                      src={post.imageUrl || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="line-clamp-2 hover:text-indigo-600 transition-colors group-hover:text-indigo-600">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-indigo-600 hover:text-indigo-800 font-medium group-hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {posts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Blog Posts Available</h3>
            <p className="text-gray-500">No blog posts available at the moment. Check back soon for new content!</p>
          </div>
        )}

        {/* Blog Categories */}
        <section className="mt-20">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-4">
                <Star className="h-4 w-4 mr-2" />
                Popular Topics
              </Badge>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Explore Categories</h3>
              <p className="text-gray-600">Discover content organized by topics that matter to students</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Study Tips", color: "bg-blue-100 text-blue-800" },
                { name: "KCSE Preparation", color: "bg-green-100 text-green-800" },
                { name: "Career Guidance", color: "bg-purple-100 text-purple-800" },
                { name: "School Life", color: "bg-pink-100 text-pink-800" },
                { name: "Academic Excellence", color: "bg-indigo-100 text-indigo-800" },
                { name: "Student Success", color: "bg-yellow-100 text-yellow-800" },
                { name: "Educational Technology", color: "bg-red-100 text-red-800" },
                { name: "Character Development", color: "bg-teal-100 text-teal-800" },
              ].map((category, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={`${category.color} p-3 text-center justify-center hover:scale-105 transition-transform cursor-pointer`}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
