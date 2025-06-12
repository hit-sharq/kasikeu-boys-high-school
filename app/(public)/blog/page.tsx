import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, User } from "lucide-react"
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
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">School Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Educational insights, study tips, school updates, and inspiring stories from the Kasikeu Boys High School
            community
          </p>
        </div>

        {/* Featured Post */}
        {posts.length > 0 && (
          <section className="mb-16">
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-video lg:aspect-square relative">
                  <Image
                    src={posts[0].imageUrl || "/placeholder.svg?height=400&width=600"}
                    alt={posts[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <Badge variant="secondary" className="w-fit mb-4">
                    Featured Post
                  </Badge>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{posts[0].title}</h2>
                  <p className="text-gray-600 mb-6 line-clamp-3">{posts[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(posts[0].createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      Admin
                    </div>
                  </div>
                  <Button asChild>
                    <Link href={`/blog/${posts[0].slug}`}>Read Full Article</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {post.imageUrl && (
                  <div className="aspect-video relative">
                    <Image src={post.imageUrl || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
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
                  <CardTitle className="line-clamp-2 hover:text-blue-600 transition-colors">
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
                    <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800 font-medium">
                      Read More →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No blog posts available at the moment.</p>
          </div>
        )}

        {/* Blog Categories */}
        <section className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Popular Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Study Tips</Badge>
                <Badge variant="secondary">KCSE Preparation</Badge>
                <Badge variant="secondary">Career Guidance</Badge>
                <Badge variant="secondary">School Life</Badge>
                <Badge variant="secondary">Academic Excellence</Badge>
                <Badge variant="secondary">Student Success</Badge>
                <Badge variant="secondary">Educational Technology</Badge>
                <Badge variant="secondary">Character Development</Badge>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
