import { Badge } from "@/components/ui/badge"
import { BookOpen, Calculator, FlaskRoundIcon as Flask } from "lucide-react"

const subjects = [
  {
    category: "Core Subjects",
    icon: BookOpen,
    subjects: [
      "English",
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
    <div>
      {/* Hero Section */}
      <section className="hero" style={{ minHeight: "60vh" }}>
        <div className="hero-content">
          <div className="animate-fade-in-up">
            <div className="badge badge-green mb-6">Academic Excellence</div>
            <h1 className="hero-title" style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }}>
              Academic Programs
            </h1>
            <p className="hero-description" style={{ maxWidth: "48rem" }}>
              Comprehensive education following the Kenyan National Curriculum preparing students for KCSE examinations
              and beyond
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="badge">KCSE Curriculum</div>
            <h2 className="section-title">Kenyan National Curriculum</h2>
            <p className="section-description">
              Comprehensive education designed for academic excellence and character development
            </p>
          </div>

          <div className="grid grid-cols-1">
            <div className="card card-gradient-blue hover-lift">
              <div className="card-content" style={{ padding: "3rem" }}>
                <div className="flex items-center mb-6">
                  <div className="icon-wrapper icon-wrapper-blue">🎓</div>
                  <h3 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0 }}>KCSE Program</h3>
                </div>
                <div style={{ fontSize: "1.125rem", lineHeight: "1.8", color: "#374151" }}>
                  <p style={{ marginBottom: "1.5rem" }}>
                    Our academic program follows the Kenya Certificate of Secondary Education (KCSE) curriculum,
                    designed to provide students with a broad-based education that prepares them for higher learning and
                    various career paths.
                  </p>
                  <p>
                    Students study a combination of compulsory and optional subjects over four years (Forms 1-4),
                    culminating in the national KCSE examinations. Our experienced teachers ensure comprehensive
                    coverage of the syllabus while fostering critical thinking and practical application of knowledge.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Offered */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="section-header">
            <div className="badge badge-purple">Curriculum</div>
            <h2 className="section-title">Subjects Offered</h2>
            <p className="section-description">
              Comprehensive range of subjects to suit diverse interests and career goals
            </p>
          </div>

          <div className="grid grid-cols-3">
            {subjects.map((category, index) => (
              <div key={index} className="card card-gradient-blue hover-lift">
                <div className="card-header">
                  <div className="flex items-center">
                    <div className="icon-wrapper icon-wrapper-blue">
                      {category.category === "Core Subjects"
                        ? "📚"
                        : category.category === "Optional Subjects"
                          ? "🎯"
                          : "🔧"}
                    </div>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>{category.category}</h3>
                  </div>
                </div>
                <div className="card-content">
                  <div className="flex flex-wrap gap-2">
                    {category.subjects.map((subject, subIndex) => (
                      <Badge key={subIndex} variant="secondary" className="text-sm">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Performance */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="badge badge-green">Excellence</div>
            <h2 className="section-title">Academic Performance</h2>
            <p className="section-description">Consistent excellence in KCSE examinations</p>
          </div>

          <div className="grid grid-cols-3">
            {achievements.map((item, index) => (
              <div key={index} className="card hover-lift text-center">
                <div className="card-content">
                  <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#2563eb", marginBottom: "1rem" }}>
                    {item.year}
                  </div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", color: "#059669" }}>
                    {item.achievement}
                  </h3>
                  <p style={{ color: "#6b7280", fontSize: "1.125rem" }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Support */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="section-header">
            <div className="badge badge-orange">Support Systems</div>
            <h2 className="section-title">Academic Support</h2>
            <p className="section-description">Comprehensive support systems for student success</p>
          </div>

          <div className="grid grid-cols-2">
            <div className="card card-gradient-green hover-lift">
              <div className="card-header">
                <div className="flex items-center">
                  <div className="icon-wrapper icon-wrapper-green">📖</div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>Learning Resources</h3>
                </div>
              </div>
              <div className="card-content">
                <ul style={{ fontSize: "1.125rem", lineHeight: "1.8", color: "#374151" }}>
                  <li style={{ marginBottom: "0.75rem" }}>• Well-equipped library with extensive book collection</li>
                  <li style={{ marginBottom: "0.75rem" }}>• Modern science laboratories for practical work</li>
                  <li style={{ marginBottom: "0.75rem" }}>• Computer laboratory with internet access</li>
                  <li style={{ marginBottom: "0.75rem" }}>• Audio-visual equipment for enhanced learning</li>
                  <li>• Sports facilities for physical education</li>
                </ul>
              </div>
            </div>

            <div className="card card-gradient-purple hover-lift">
              <div className="card-header">
                <div className="flex items-center">
                  <div className="icon-wrapper icon-wrapper-purple">👨‍🏫</div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>Student Support</h3>
                </div>
              </div>
              <div className="card-content">
                <ul style={{ fontSize: "1.125rem", lineHeight: "1.8", color: "#374151" }}>
                  <li style={{ marginBottom: "0.75rem" }}>• Qualified and experienced teaching staff</li>
                  <li style={{ marginBottom: "0.75rem" }}>• Small class sizes for personalized attention</li>
                  <li style={{ marginBottom: "0.75rem" }}>• Regular assessments and progress monitoring</li>
                  <li style={{ marginBottom: "0.75rem" }}>• Career guidance and counseling services</li>
                  <li>• Remedial classes for struggling students</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
