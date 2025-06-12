import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calculator, FlaskRoundIcon as Flask, GraduationCap, Target } from "lucide-react"

const kcseSubjects = [
  {
    category: "Core Subjects (Compulsory)",
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
    description: "Essential subjects that all students must take for KCSE certification",
  },
  {
    category: "Optional Subjects",
    icon: Calculator,
    subjects: [
      "Business Studies",
      "Agriculture",
      "Computer Studies",
      "Art & Design",
      "Music",
      "French",
      "German",
      "Arabic",
    ],
    description: "Students choose from these subjects based on their interests and career goals",
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
      "Plumbing",
    ],
    description: "Practical subjects that prepare students for technical careers",
  },
]

const cbcPrograms = [
  {
    category: "Core Learning Areas",
    icon: BookOpen,
    subjects: [
      "English Language",
      "Kiswahili Language",
      "Mathematics",
      "Integrated Science",
      "Health Education",
      "Pre-Technical Studies",
      "Social Studies",
      "Religious Education",
      "Life Skills Education",
    ],
    description: "Fundamental learning areas for holistic development",
  },
  {
    category: "Optional Learning Areas",
    icon: GraduationCap,
    subjects: [
      "Foreign Languages (French, German, Arabic, Mandarin)",
      "Kenyan Sign Language",
      "Indigenous Languages",
      "Performing Arts (Music, Dance, Drama)",
      "Visual Arts",
      "Sports & Physical Education",
    ],
    description: "Additional subjects to nurture talents and interests",
  },
  {
    category: "Applied Learning Areas",
    icon: Target,
    subjects: [
      "Agriculture",
      "Business Studies",
      "Computer Science",
      "Home Science",
      "Art & Craft",
      "Woodwork",
      "Metalwork",
      "Building & Construction",
      "Electrical & Electronics",
      "Power Mechanics",
    ],
    description: "Practical subjects linking education to real-world applications",
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

const cbcReadiness = [
  {
    title: "Teacher Training",
    description: "Our staff are undergoing comprehensive CBC training programs",
    status: "In Progress",
  },
  {
    title: "Infrastructure Development",
    description: "Upgrading facilities to support competency-based learning",
    status: "Ongoing",
  },
  {
    title: "Learning Resources",
    description: "Acquiring CBC-aligned textbooks and digital resources",
    status: "In Progress",
  },
  {
    title: "Assessment Methods",
    description: "Implementing continuous assessment and competency evaluation",
    status: "Planning",
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
            Comprehensive education following both the current KCSE curriculum and preparing for the CBC transition
          </p>
        </div>

        {/* Curriculum Tabs */}
        <Tabs defaultValue="kcse" className="mb-16">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="kcse" className="text-lg">
              Current KCSE Program
            </TabsTrigger>
            <TabsTrigger value="cbc" className="text-lg">
              CBC Transition
            </TabsTrigger>
          </TabsList>

          {/* KCSE Content */}
          <TabsContent value="kcse" className="space-y-12">
            {/* KCSE Overview */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Kenya Certificate of Secondary Education (KCSE)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Our current academic program follows the Kenya Certificate of Secondary Education (KCSE) curriculum
                    under the 8-4-4 system. This well-established system has served Kenya for decades, providing
                    students with a broad-based education that prepares them for higher learning and various career
                    paths.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Students study a combination of compulsory and optional subjects over four years (Forms 1-4),
                    culminating in the national KCSE examinations. Our experienced teachers ensure comprehensive
                    coverage of the syllabus while fostering critical thinking and practical application of knowledge.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* KCSE Subjects */}
            <section>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">KCSE Subjects Offered</h2>
                <p className="text-xl text-gray-600">
                  Comprehensive range of subjects to suit diverse interests and career goals
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {kcseSubjects.map((category, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center text-xl">
                        <category.icon className="h-6 w-6 mr-2 text-blue-600" />
                        {category.category}
                      </CardTitle>
                      <p className="text-sm text-gray-600">{category.description}</p>
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
            <section>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">KCSE Performance</h2>
                <p className="text-xl text-gray-600">Consistent excellence in national examinations</p>
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
          </TabsContent>

          {/* CBC Content */}
          <TabsContent value="cbc" className="space-y-12">
            {/* CBC Overview */}
            <section>
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <GraduationCap className="h-6 w-6 mr-2 text-green-600" />
                    Competency-Based Curriculum (CBC) Transition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Kenya is transitioning from the 8-4-4 system to the Competency-Based Curriculum (CBC) under the
                    2-6-3-3-3 system. This new approach focuses on developing competencies rather than just academic
                    knowledge, emphasizing practical skills, creativity, and critical thinking.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    At Kasikeu Boys High School, we are actively preparing for this transition by training our teachers,
                    upgrading our facilities, and adapting our teaching methodologies to align with CBC principles.
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-green-800 font-medium">
                      <strong>Timeline:</strong> CBC will be fully implemented in secondary schools starting with Form 1
                      in 2026.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* CBC Learning Areas */}
            <section>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">CBC Learning Areas</h2>
                <p className="text-xl text-gray-600">Competency-focused subjects designed for holistic development</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {cbcPrograms.map((category, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <CardTitle className="flex items-center text-xl">
                        <category.icon className="h-6 w-6 mr-2 text-green-600" />
                        {category.category}
                      </CardTitle>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {category.subjects.map((subject, subIndex) => (
                          <Badge key={subIndex} variant="outline" className="text-sm border-green-200 text-green-700">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* CBC Readiness */}
            <section>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our CBC Readiness</h2>
                <p className="text-xl text-gray-600">Preparing for a smooth transition to the new curriculum</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cbcReadiness.map((item, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <Badge
                          variant={
                            item.status === "In Progress"
                              ? "default"
                              : item.status === "Ongoing"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* CBC Benefits */}
            <section>
              <Card className="bg-gradient-to-r from-green-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="text-2xl">Benefits of CBC</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-lg mb-3">For Students:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Develops practical life skills</li>
                        <li>• Encourages creativity and innovation</li>
                        <li>• Builds critical thinking abilities</li>
                        <li>• Promotes collaborative learning</li>
                        <li>• Prepares for 21st-century careers</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-3">For Society:</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Produces job creators, not just job seekers</li>
                        <li>• Addresses skills gap in the economy</li>
                        <li>• Promotes entrepreneurship</li>
                        <li>• Enhances national competitiveness</li>
                        <li>• Supports sustainable development</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>
        </Tabs>

        {/* Academic Support - Common to both systems */}
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
                  <li>• Workshop facilities for technical subjects</li>
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
                  <li>• Mentorship programs for academic excellence</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
