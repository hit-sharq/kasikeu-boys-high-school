import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calculator, FlaskRoundIcon as Flask } from "lucide-react"

const subjects = [
  {
    category: "Core Subjects",
    icon: BookOpen,
    subjects: [
      "English Language",
      "Kiswahili",
      "Mathematics",
      "Biology",
      "Chemistry",
      "Physics",
      "History & Government",
      "Geography",
      "Christian Religious Education",
    ],
  },
  {
    category: "Optional Subjects",
    icon: Calculator,
    subjects: ["Business Studies", "Agriculture", "Computer Studies", "Art & Design", "Music", "French", "German"],
  },
  {
    category: "Technical Subjects",
    icon: Flask,
    subjects: [
      "Aviation Technology",
      "Building & Construction",
      "Electrical Installation",
      "Power Mechanics",
      "Woodwork",
      "Metalwork",
    ],
  },
]

const achievements = [
  {
    year: "2023",
    achievement: "Mean Score: 8.2",
    description: "85% of students qualified for university admission",
  },
  {
    year: "2022",
    achievement: "Mean Score: 7.9",
    description: "82% of students qualified for university admission",
  },
  {
    year: "2021",
    achievement: "Mean Score: 8.0",
    description: "80% of students qualified for university admission",
  },
]

export default function AcademicsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Academic Programs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive education following the Kenyan National Curriculum (8-4-4 System) preparing students for KCSE
            examinations
          </p>
        </div>

        {/* Curriculum Overview */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Kenyan National Curriculum (KCSE)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our academic program follows the Kenya Certificate of Secondary Education (KCSE) curriculum, designed to
                provide students with a broad-based education that prepares them for higher learning and various career
                paths.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Students study a combination of compulsory and optional subjects over four years (Forms 1-4),
                culminating in the national KCSE examinations. Our experienced teachers ensure comprehensive coverage of
                the syllabus while fostering critical thinking and practical application of knowledge.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Subjects Offered */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Subjects Offered</h2>
            <p className="text-xl text-gray-600">
              Comprehensive range of subjects to suit diverse interests and career goals
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {subjects.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <category.icon className="h-6 w-6 mr-2 text-blue-600" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.subjects.map((subject, subIndex) => (
                      <Badge key={subIndex} variant="secondary" className="text-sm">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Academic Performance */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Academic Performance</h2>
            <p className="text-xl text-gray-600">Consistent excellence in KCSE examinations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((item, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-blue-600">{item.year}</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-semibold mb-2">{item.achievement}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Academic Support */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Academic Support</h2>
            <p className="text-xl text-gray-600">Comprehensive support systems for student success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Learning Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Well-equipped library with extensive book collection</li>
                  <li>• Modern science laboratories for practical work</li>
                  <li>• Computer laboratory with internet access</li>
                  <li>• Audio-visual equipment for enhanced learning</li>
                  <li>• Sports facilities for physical education</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Support</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Qualified and experienced teaching staff</li>
                  <li>• Small class sizes for personalized attention</li>
                  <li>• Regular assessments and progress monitoring</li>
                  <li>• Career guidance and counseling services</li>
                  <li>• Remedial classes for struggling students</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
