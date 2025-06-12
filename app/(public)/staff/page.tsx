import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, User } from "lucide-react"
import { prisma } from "@/lib/prisma"

async function getStaff() {
  return await prisma.staff.findMany({
    orderBy: { order: "asc" },
  })
}

export default async function StaffPage() {
  const staff = await getStaff()

  // Group staff by position type
  const administration = staff.filter(
    (s) =>
      s.position.toLowerCase().includes("principal") ||
      s.position.toLowerCase().includes("deputy") ||
      s.position.toLowerCase().includes("head"),
  )

  const teachers = staff.filter(
    (s) =>
      !s.position.toLowerCase().includes("principal") &&
      !s.position.toLowerCase().includes("deputy") &&
      !s.position.toLowerCase().includes("head"),
  )

  return (
    <div>
      {/* Hero Section */}
      <section className="hero" style={{ minHeight: "60vh" }}>
        <div className="hero-content">
          <div className="animate-fade-in-up">
            <div className="badge badge-blue mb-6">Meet Our Team</div>
            <h1 className="hero-title" style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }}>
              Our Dedicated Staff
            </h1>
            <p className="hero-description" style={{ maxWidth: "48rem" }}>
              Meet our dedicated team of educators and administrators committed to providing quality education and
              nurturing student success
            </p>
          </div>
        </div>
      </section>

      {/* Staff Statistics */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-3">
            <div className="card hover-lift text-center">
              <div className="card-content">
                <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#2563eb", marginBottom: "1rem" }}>
                  {staff.length}
                </div>
                <h4 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>Total Staff Members</h4>
                <p style={{ color: "#6b7280" }}>Dedicated professionals</p>
              </div>
            </div>
            <div className="card hover-lift text-center">
              <div className="card-content">
                <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#059669", marginBottom: "1rem" }}>
                  {teachers.length}
                </div>
                <h4 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>Teaching Staff</h4>
                <p style={{ color: "#6b7280" }}>Expert educators</p>
              </div>
            </div>
            <div className="card hover-lift text-center">
              <div className="card-content">
                <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#7c3aed", marginBottom: "1rem" }}>
                  {administration.length}
                </div>
                <h4 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>Administration</h4>
                <p style={{ color: "#6b7280" }}>Leadership team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Administration */}
      {administration.length > 0 && (
        <section className="section bg-gray-50">
          <div className="container">
            <div className="section-header">
              <div className="badge badge-purple">Leadership</div>
              <h2 className="section-title">School Administration</h2>
              <p className="section-description">Our experienced leadership team guiding the school's vision</p>
            </div>

            <div className="grid grid-cols-3">
              {administration.map((member) => (
                <div key={member.id} className="card hover-lift">
                  <div className="aspect-square relative overflow-hidden" style={{ borderRadius: "1rem 1rem 0 0" }}>
                    <Image
                      src={member.imageUrl || "/placeholder.svg?height=300&width=300"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="card-content" style={{ padding: "1.5rem" }}>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>{member.name}</h3>
                    <Badge variant="secondary" className="mb-3">
                      {member.position}
                    </Badge>

                    {member.subjects.length > 0 && (
                      <div style={{ marginBottom: "1rem" }}>
                        <p
                          style={{ fontSize: "0.875rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem" }}
                        >
                          Subjects:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {member.subjects.map((subject, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {member.bio && (
                      <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "1rem", lineHeight: "1.6" }}>
                        {member.bio}
                      </p>
                    )}

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {member.email && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="h-4 w-4 mr-2" />
                          <a href={`mailto:${member.email}`} className="hover:text-blue-600">
                            {member.email}
                          </a>
                        </div>
                      )}
                      {member.phone && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="h-4 w-4 mr-2" />
                          <a href={`tel:${member.phone}`} className="hover:text-blue-600">
                            {member.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Teaching Staff */}
      {teachers.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <div className="badge badge-green">Educators</div>
              <h2 className="section-title">Teaching Staff</h2>
              <p className="section-description">Our qualified teachers dedicated to student success</p>
            </div>

            <div className="grid grid-cols-4">
              {teachers.map((member) => (
                <div key={member.id} className="card hover-lift">
                  <div className="aspect-square relative overflow-hidden" style={{ borderRadius: "1rem 1rem 0 0" }}>
                    <Image
                      src={member.imageUrl || "/placeholder.svg?height=300&width=300"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="card-content" style={{ padding: "1rem" }}>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "0.5rem" }}>{member.name}</h3>
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {member.position}
                    </Badge>

                    {member.subjects.length > 0 && (
                      <div style={{ marginBottom: "1rem" }}>
                        <p style={{ fontSize: "0.75rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem" }}>
                          Subjects:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {member.subjects.map((subject, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                      {member.email && (
                        <div className="flex items-center text-xs text-gray-500">
                          <Mail className="h-3 w-3 mr-2" />
                          <a href={`mailto:${member.email}`} className="hover:text-blue-600 truncate">
                            {member.email}
                          </a>
                        </div>
                      )}
                      {member.phone && (
                        <div className="flex items-center text-xs text-gray-500">
                          <Phone className="h-3 w-3 mr-2" />
                          <a href={`tel:${member.phone}`} className="hover:text-blue-600">
                            {member.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {staff.length === 0 && (
        <section className="section">
          <div className="container">
            <div className="text-center py-12">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No staff information available at the moment.</p>
            </div>
          </div>
        </section>
      )}

      {/* Contact Information */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="section-header">
            <div className="badge badge-orange">Get in Touch</div>
            <h2 className="section-title">Contact Our Staff</h2>
            <p className="section-description">How to reach our team for various inquiries</p>
          </div>

          <div className="grid grid-cols-2">
            <div className="card card-gradient-blue hover-lift">
              <div className="card-header">
                <div className="flex items-center">
                  <div className="icon-wrapper icon-wrapper-blue">📞</div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>General Inquiries</h3>
                </div>
              </div>
              <div className="card-content">
                <ul style={{ fontSize: "1.125rem", lineHeight: "1.8", color: "#374151" }}>
                  <li style={{ marginBottom: "0.75rem" }}>• Academic matters: Contact subject teachers directly</li>
                  <li style={{ marginBottom: "0.75rem" }}>• Administrative issues: Contact the Principal's office</li>
                  <li style={{ marginBottom: "0.75rem" }}>• Student welfare: Contact the Deputy Principal</li>
                  <li>• Admissions: Contact the Admissions office</li>
                </ul>
              </div>
            </div>

            <div className="card card-gradient-green hover-lift">
              <div className="card-header">
                <div className="flex items-center">
                  <div className="icon-wrapper icon-wrapper-green">🕒</div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>Office Hours</h3>
                </div>
              </div>
              <div className="card-content">
                <ul style={{ fontSize: "1.125rem", lineHeight: "1.8", color: "#374151" }}>
                  <li style={{ marginBottom: "0.75rem" }}>• Monday - Friday: 8:00 AM - 5:00 PM</li>
                  <li style={{ marginBottom: "0.75rem" }}>• Saturday: 8:00 AM - 12:00 PM</li>
                  <li style={{ marginBottom: "0.75rem" }}>• Sunday: Closed</li>
                  <li>• School holidays: Limited hours</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
