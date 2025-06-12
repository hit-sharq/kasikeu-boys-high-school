import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Trophy, Target } from "lucide-react"
import { prisma } from "@/lib/prisma"

async function getLatestNews() {
  return await prisma.news.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  })
}

export default async function HomePage() {
  const latestNews = await getLatestNews()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-4xl">K</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Kasikeu Boys High School</h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Excellence in Education, Character Development, and Leadership Training
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/admissions">Apply Now</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Target className="h-6 w-6 mr-2 text-blue-600" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  To provide quality education that nurtures academic excellence, character development, and leadership
                  skills, preparing our students to become responsible citizens and future leaders who contribute
                  positively to society.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Trophy className="h-6 w-6 mr-2 text-blue-600" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  To be a leading institution of learning that produces well-rounded individuals equipped with
                  knowledge, skills, and values necessary for success in higher education and life, while maintaining
                  the highest standards of academic and moral excellence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Kasikeu Boys High School?</h2>
            <p className="text-xl text-gray-600">Discover what makes us unique</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Academic Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Consistently high KCSE performance with experienced teachers and modern facilities.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Character Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Holistic education focusing on moral values, discipline, and leadership skills.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Trophy className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Co-curricular Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Diverse sports, clubs, and activities to develop talents and interests.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest News & Updates</h2>
            <p className="text-xl text-gray-600">Stay informed about school activities and achievements</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((news) => (
              <Card key={news.id} className="overflow-hidden">
                {news.imageUrl && (
                  <div className="aspect-video relative">
                    <Image src={news.imageUrl || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="line-clamp-2">{news.title}</CardTitle>
                  <CardDescription>{new Date(news.createdAt).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3">{news.excerpt}</p>
                  <Button asChild variant="link" className="p-0 mt-2">
                    <Link href={`/news/${news.id}`}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild>
              <Link href="/news">View All News</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
