import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import type { News } from "@prisma/client"

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
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-logo animate-fade-in-up">K</div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="hero-title">
              Kasikeu Boys
              <span className="hero-subtitle">High School</span>
            </h1>
            <p className="hero-description">
              Shaping tomorrow's leaders through excellence in education, character development, and innovation
            </p>
          </div>

          <div className="hero-buttons animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Link href="/admissions" className="btn btn-primary btn-lg">
              Start Your Journey →
            </Link>
            <Link href="/about" className="btn btn-secondary btn-lg">
              Discover More
            </Link>
          </div>

          <div className="hero-stats animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <div className="hero-stat">
              <div className="hero-stat-number">800+</div>
              <div className="hero-stat-label">Students</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">45</div>
              <div className="hero-stat-label">Expert Teachers</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">38</div>
              <div className="hero-stat-label">Years of Excellence</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">95%</div>
              <div className="hero-stat-label">University Success</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="section-header">
            <div className="badge">Our Foundation</div>
            <h2 className="section-title">Built on Strong Values</h2>
            <p className="section-description">
              The principles that guide our educational excellence and shape future leaders
            </p>
          </div>

          <div className="grid grid-cols-2">
            <div className="card card-gradient-blue hover-lift">
              <div className="card-header">
                <div className="flex items-center">
                  <div className="icon-wrapper icon-wrapper-blue">🎯</div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>Our Mission</h3>
                </div>
              </div>
              <div className="card-content">
                <p style={{ color: "#374151", lineHeight: "1.7" }}>
                  To provide quality education that nurtures academic excellence, character development, and leadership
                  skills, preparing our students to become responsible citizens and future leaders who contribute
                  positively to society.
                </p>
              </div>
            </div>

            <div className="card card-gradient-purple hover-lift">
              <div className="card-header">
                <div className="flex items-center">
                  <div className="icon-wrapper icon-wrapper-purple">🏆</div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>Our Vision</h3>
                </div>
              </div>
              <div className="card-content">
                <p style={{ color: "#374151", lineHeight: "1.7" }}>
                  To be a leading institution of learning that produces well-rounded individuals equipped with
                  knowledge, skills, and values necessary for success in higher education and life, while maintaining
                  the highest standards of academic and moral excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="badge badge-purple">Excellence</div>
            <h2 className="section-title">Why Choose Kasikeu?</h2>
            <p className="section-description">Discover what makes us the premier choice for quality education</p>
          </div>

          <div className="grid grid-cols-3">
            <div className="card card-gradient-blue hover-lift">
              <div className="card-content">
                <div className="icon-wrapper icon-wrapper-blue">📚</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>Academic Excellence</h3>
                <p style={{ color: "#374151" }}>
                  Consistently high KCSE performance with experienced teachers and modern facilities that foster
                  learning.
                </p>
              </div>
            </div>

            <div className="card card-gradient-green hover-lift">
              <div className="card-content">
                <div className="icon-wrapper icon-wrapper-green">👥</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>Character Development</h3>
                <p style={{ color: "#374151" }}>
                  Holistic education focusing on moral values, discipline, and leadership skills for well-rounded
                  individuals.
                </p>
              </div>
            </div>

            <div className="card card-gradient-purple hover-lift">
              <div className="card-content">
                <div className="icon-wrapper icon-wrapper-purple">🏆</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>
                  Co-curricular Excellence
                </h3>
                <p style={{ color: "#374151" }}>
                  Diverse sports, clubs, and activities to develop talents, interests, and teamwork skills.
                </p>
              </div>
            </div>

            <div className="card card-gradient-orange hover-lift">
              <div className="card-content">
                <div className="icon-wrapper icon-wrapper-orange">⭐</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>Modern Facilities</h3>
                <p style={{ color: "#374151" }}>
                  State-of-the-art laboratories, library, and technology resources for enhanced learning experiences.
                </p>
              </div>
            </div>

            <div className="card card-gradient-red hover-lift">
              <div className="card-content">
                <div className="icon-wrapper icon-wrapper-red">🥇</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>Experienced Faculty</h3>
                <p style={{ color: "#374151" }}>
                  Dedicated and qualified teachers committed to nurturing each student's potential and success.
                </p>
              </div>
            </div>

            <div className="card card-gradient-indigo hover-lift">
              <div className="card-content">
                <div className="icon-wrapper icon-wrapper-indigo">📈</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>
                  University Preparation
                </h3>
                <p style={{ color: "#374151" }}>
                  Comprehensive programs designed to prepare students for higher education and career success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="section-header">
            <div className="badge badge-green">Latest Updates</div>
            <h2 className="section-title">News & Announcements</h2>
            <p className="section-description">Stay informed about our latest achievements and upcoming events</p>
          </div>

          {latestNews.length > 0 ? (
            <div className="grid grid-cols-3">
              {latestNews.map((news: News) => (
                <div key={news.id} className="card hover-lift">
                  {news.imageUrl && (
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={news.imageUrl || "/placeholder.svg?height=300&width=500"}
                        alt={news.title}
                        width={500}
                        height={300}
                        className="img-responsive"
                        style={{ transition: "transform 0.5s ease" }}
                      />
                    </div>
                  )}
                  <div className="card-header">
                    <div className="flex items-center gap-4 mb-4">
                      <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        📅{" "}
                        {new Date(news.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="line-clamp-2" style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#111827" }}>
                      {news.title}
                    </h3>
                  </div>
                  <div className="card-content">
                    <p className="line-clamp-3" style={{ color: "#6b7280", marginBottom: "1rem" }}>
                      {news.excerpt}
                    </p>
                    <Link href={`/news/${news.id}`} style={{ color: "#2563eb", fontWeight: "600" }}>
                      Read Full Story →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div
                style={{
                  width: "6rem",
                  height: "6rem",
                  background: "#f3f4f6",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                  fontSize: "3rem",
                }}
              >
                🌐
              </div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#111827", marginBottom: "1rem" }}>
                No News Available
              </h3>
              <p style={{ color: "#6b7280", fontSize: "1.125rem" }}>
                Check back soon for the latest updates and announcements.
              </p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/news" className="btn btn-primary btn-lg">
              View All News →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-cta">
        <div className="container">
          <div className="text-center" style={{ maxWidth: "64rem", margin: "0 auto", color: "white" }}>
            <h2 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
              Ready to Begin Your Journey?
            </h2>
            <p style={{ fontSize: "1.25rem", marginBottom: "3rem", opacity: "0.9" }}>
              Join our community of excellence and take the first step towards a bright future filled with opportunities
              and success.
            </p>

            <div className="hero-buttons">
              <Link
                href="/admissions"
                className="btn btn-lg"
                style={{
                  background: "white",
                  color: "#1e40af",
                  fontWeight: "600",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
              >
                Apply for Admission →
              </Link>
              <Link href="/contact" className="btn btn-secondary btn-lg">
                📍 Visit Our Campus
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
