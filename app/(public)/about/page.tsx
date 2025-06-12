import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, Trophy, Target } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Kasikeu Boys High School</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about our rich history, values, and commitment to educational excellence
          </p>
        </div>

        {/* School History */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Our History</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed mb-4">
                Kasikeu Boys High School was established in 1985 with a vision to provide quality secondary education to
                boys in the region. Founded by a group of visionary community leaders and educators, the school began
                with just 120 students and has grown to become one of the leading secondary schools in the area.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Over the years, we have maintained our commitment to academic excellence while adapting to modern
                educational needs. Our graduates have gone on to excel in various fields, including medicine,
                engineering, law, business, and public service, making significant contributions to society.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, Kasikeu Boys High School stands as a beacon of educational excellence, character development, and
                leadership training, continuing to shape young minds for a better tomorrow.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Core Values */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We strive for the highest standards in academics, character, and all endeavors.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Integrity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We uphold honesty, transparency, and moral uprightness in all our actions.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Respect</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We value diversity, treat everyone with dignity, and foster inclusive community.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Trophy className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We embrace creativity, critical thinking, and modern approaches to learning.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* School Statistics */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">School at a Glance</h2>
            <p className="text-xl text-gray-600">Key facts and figures about our institution</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">800+</div>
                <p className="text-gray-600">Students Enrolled</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">45</div>
                <p className="text-gray-600">Teaching Staff</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">38</div>
                <p className="text-gray-600">Years of Excellence</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
                <p className="text-gray-600">University Admission Rate</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
