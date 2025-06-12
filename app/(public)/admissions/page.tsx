import { Button } from "@/components/ui/button"
import { CheckCircle, FileText, Phone, Mail } from "lucide-react"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

async function getAdmissionInfo() {
  return await prisma.admissionInfo.findFirst({
    orderBy: { createdAt: "desc" },
  })
}

export default async function AdmissionsPage() {
  const admissionInfo = await getAdmissionInfo()

  return (
    <div>
      {/* Hero Section */}
      <section className="hero" style={{ minHeight: "60vh" }}>
        <div className="hero-content">
          <div className="animate-fade-in-up">
            <div className="badge badge-green mb-6">Join Our Community</div>
            <h1 className="hero-title" style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }}>
              Admissions
            </h1>
            <p className="hero-description" style={{ maxWidth: "48rem" }}>
              Join the Kasikeu Boys High School family and embark on a journey of academic excellence and character
              development
            </p>
          </div>

          <div className="hero-buttons animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Apply Now →
            </Link>
            <Link href="/about" className="btn btn-secondary btn-lg">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-4">
            <div className="card hover-lift text-center">
              <div className="card-content">
                <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#2563eb", marginBottom: "1rem" }}>800+</div>
                <h4 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>Current Students</h4>
                <p style={{ color: "#6b7280" }}>Thriving community</p>
              </div>
            </div>
            <div className="card hover-lift text-center">
              <div className="card-content">
                <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#059669", marginBottom: "1rem" }}>95%</div>
                <h4 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>University Admission</h4>
                <p style={{ color: "#6b7280" }}>Success rate</p>
              </div>
            </div>
            <div className="card hover-lift text-center">
              <div className="card-content">
                <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#7c3aed", marginBottom: "1rem" }}>38</div>
                <h4 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>Years of Excellence</h4>
                <p style={{ color: "#6b7280" }}>Proven track record</p>
              </div>
            </div>
            <div className="card hover-lift text-center">
              <div className="card-content">
                <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#ea580c", marginBottom: "1rem" }}>45</div>
                <h4 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>Qualified Teachers</h4>
                <p style={{ color: "#6b7280" }}>Expert educators</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Admission Information */}
      {admissionInfo && (
        <div>
          {/* Overview */}
          <section className="section bg-gray-50">
            <div className="container">
              <div className="section-header">
                <div className="badge">Admission Information</div>
                <h2 className="section-title">{admissionInfo.title}</h2>
              </div>

              <div className="grid grid-cols-1">
                <div className="card card-gradient-blue hover-lift">
                  <div className="card-content" style={{ padding: "3rem" }}>
                    <div style={{ fontSize: "1.125rem", lineHeight: "1.8", color: "#374151", whiteSpace: "pre-wrap" }}>
                      {admissionInfo.content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Requirements */}
          <section className="section">
            <div className="container">
              <div className="section-header">
                <div className="badge badge-green">Requirements</div>
                <h2 className="section-title">Admission Requirements</h2>
                <p className="section-description">What you need to join our school community</p>
              </div>

              <div className="grid grid-cols-2">
                <div className="card card-gradient-green hover-lift">
                  <div className="card-header">
                    <div className="flex items-center">
                      <div className="icon-wrapper icon-wrapper-green">✅</div>
                      <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>Academic Requirements</h3>
                    </div>
                  </div>
                  <div className="card-content">
                    <ul style={{ fontSize: "1.125rem", lineHeight: "1.8", color: "#374151" }}>
                      {admissionInfo.requirements.map((req, index) => (
                        <li key={index} style={{ marginBottom: "0.75rem", display: "flex", alignItems: "flex-start" }}>
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="card card-gradient-purple hover-lift">
                  <div className="card-header">
                    <div className="flex items-center">
                      <div className="icon-wrapper icon-wrapper-purple">⭐</div>
                      <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>Additional Criteria</h3>
                    </div>
                  </div>
                  <div className="card-content">
                    <ul style={{ fontSize: "1.125rem", lineHeight: "1.8", color: "#374151" }}>
                      <li style={{ marginBottom: "0.75rem", display: "flex", alignItems: "flex-start" }}>
                        <CheckCircle className="h-5 w-5 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Good character and discipline record</span>
                      </li>
                      <li style={{ marginBottom: "0.75rem", display: "flex", alignItems: "flex-start" }}>
                        <CheckCircle className="h-5 w-5 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Commitment to school values</span>
                      </li>
                      <li style={{ marginBottom: "0.75rem", display: "flex", alignItems: "flex-start" }}>
                        <CheckCircle className="h-5 w-5 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Parental support and involvement</span>
                      </li>
                      <li style={{ display: "flex", alignItems: "flex-start" }}>
                        <CheckCircle className="h-5 w-5 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Interview performance (if applicable)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Required Documents */}
          <section className="section bg-gray-50">
            <div className="container">
              <div className="section-header">
                <div className="badge badge-blue">Documentation</div>
                <h2 className="section-title">Required Documents</h2>
                <p className="section-description">Essential paperwork for your application</p>
              </div>

              <div className="grid grid-cols-2">
                {admissionInfo.documents.map((doc, index) => (
                  <div key={index} className="card hover-lift">
                    <div className="card-content" style={{ padding: "1.5rem" }}>
                      <div className="flex items-center">
                        <FileText className="h-6 w-6 text-blue-500 mr-4" />
                        <span style={{ fontSize: "1.125rem", color: "#374151" }}>{doc}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <div
                  className="card"
                  style={{
                    background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
                    border: "1px solid #f59e0b",
                  }}
                >
                  <div className="card-content" style={{ padding: "1.5rem" }}>
                    <p style={{ color: "#92400e", fontSize: "1.125rem" }}>
                      <strong>Note:</strong> All documents must be original or certified copies. Incomplete applications
                      will not be processed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Fees and Timeline */}
          <section className="section">
            <div className="container">
              <div className="grid grid-cols-2">
                {/* Fees Information */}
                <div className="card card-gradient-green hover-lift">
                  <div className="card-header">
                    <div className="flex items-center">
                      <div className="icon-wrapper icon-wrapper-green">💰</div>
                      <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>Fees Information</h3>
                    </div>
                  </div>
                  <div className="card-content">
                    <p style={{ fontSize: "1.125rem", color: "#374151", marginBottom: "1.5rem" }}>
                      {admissionInfo.fees}
                    </p>
                    <div>
                      <h4 style={{ fontWeight: "600", marginBottom: "1rem" }}>What's Included:</h4>
                      <ul style={{ fontSize: "1rem", lineHeight: "1.6", color: "#374151" }}>
                        <li style={{ marginBottom: "0.5rem" }}>• Tuition and academic instruction</li>
                        <li style={{ marginBottom: "0.5rem" }}>• Boarding and accommodation</li>
                        <li style={{ marginBottom: "0.5rem" }}>• Meals (breakfast, lunch, dinner)</li>
                        <li style={{ marginBottom: "0.5rem" }}>• Learning materials and textbooks</li>
                        <li style={{ marginBottom: "0.5rem" }}>• Sports and co-curricular activities</li>
                        <li>• Medical care and first aid</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Application Timeline */}
                <div className="card card-gradient-orange hover-lift">
                  <div className="card-header">
                    <div className="flex items-center">
                      <div className="icon-wrapper icon-wrapper-orange">📅</div>
                      <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>Application Timeline</h3>
                    </div>
                  </div>
                  <div className="card-content">
                    <p style={{ fontSize: "1.125rem", color: "#374151", marginBottom: "1.5rem" }}>
                      {admissionInfo.deadlines}
                    </p>
                    <div>
                      <h4 style={{ fontWeight: "600", marginBottom: "1rem" }}>Key Dates:</h4>
                      <ul style={{ fontSize: "1rem", lineHeight: "1.6", color: "#374151" }}>
                        <li style={{ marginBottom: "0.5rem" }}>• Applications open: November</li>
                        <li style={{ marginBottom: "0.5rem" }}>• Application deadline: January 31st</li>
                        <li style={{ marginBottom: "0.5rem" }}>• Interviews: February</li>
                        <li style={{ marginBottom: "0.5rem" }}>• Admission decisions: March</li>
                        <li style={{ marginBottom: "0.5rem" }}>• Fee payment deadline: April</li>
                        <li>• Term 1 begins: January (following year)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Contact Information */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="section-header">
            <div className="badge badge-purple">Get in Touch</div>
            <h2 className="section-title">Contact Admissions Office</h2>
            <p className="section-description">We're here to help with your application process</p>
          </div>

          <div className="grid grid-cols-2">
            <div className="card card-gradient-blue hover-lift">
              <div className="card-header">
                <div className="flex items-center">
                  <div className="icon-wrapper icon-wrapper-blue">📞</div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>Get in Touch</h3>
                </div>
              </div>
              <div className="card-content">
                <div style={{ marginBottom: "1.5rem" }}>
                  <div className="flex items-center" style={{ marginBottom: "1rem" }}>
                    <Phone className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <p style={{ fontWeight: "600" }}>Phone</p>
                      <p style={{ color: "#6b7280" }}>+254 700 000 000</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <p style={{ fontWeight: "600" }}>Email</p>
                      <p style={{ color: "#6b7280" }}>admissions@kasikeuboys.ac.ke</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card card-gradient-purple hover-lift">
              <div className="card-header">
                <div className="flex items-center">
                  <div className="icon-wrapper icon-wrapper-purple">🏫</div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>Visit Us</h3>
                </div>
              </div>
              <div className="card-content">
                <p style={{ color: "#374151", marginBottom: "1.5rem", fontSize: "1.125rem" }}>
                  We encourage prospective students and parents to visit our campus to experience our learning
                  environment firsthand.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <Button asChild>
                    <Link href="/contact">Schedule a Visit</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/gallery">View Campus Photos</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-gradient-cta">
        <div className="container">
          <div className="text-center" style={{ maxWidth: "64rem", margin: "0 auto", color: "white" }}>
            <h2 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1.5rem" }}>Ready to Apply?</h2>
            <p style={{ fontSize: "1.25rem", marginBottom: "3rem", opacity: "0.9" }}>
              Take the first step towards joining our community of learners and leaders.
            </p>

            <div className="hero-buttons">
              <Link
                href="/contact"
                className="btn btn-lg"
                style={{
                  background: "white",
                  color: "#1e40af",
                  fontWeight: "600",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
              >
                Get Application Form →
              </Link>
              <Link href="/about" className="btn btn-secondary btn-lg">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
