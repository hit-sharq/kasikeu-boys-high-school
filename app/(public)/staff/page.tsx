import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Staff</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our dedicated team of educators and administrators committed to providing quality education and
            nurturing student success
          </p>
        </div>

        {/* Staff Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">{staff.length}</div>
              <p className="text-gray-600">Total Staff Members</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 mb-2">{teachers.length}</div>
              <p className="text-gray-600">Teaching Staff</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">{administration.length}</div>
              <p className="text-gray-600">Administration</p>
            </CardContent>
          </Card>
        </div>

        {/* Administration */}
        {administration.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">School Administration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {administration.map((member) => (
                <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square relative">
                    <Image
                      src={member.imageUrl || "/placeholder.svg?height=300&width=300"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <Badge variant="secondary" className="w-fit">
                      {member.position}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    {member.subjects.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">Subjects:</p>
                        <div className="flex flex-wrap gap-1">
                          {member.subjects.map((subject, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {member.bio && <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.bio}</p>}

                    <div className="space-y-2">
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Teaching Staff */}
        {teachers.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Teaching Staff</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {teachers.map((member) => (
                <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square relative">
                    <Image
                      src={member.imageUrl || "/placeholder.svg?height=300&width=300"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <Badge variant="secondary" className="w-fit text-xs">
                      {member.position}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    {member.subjects.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">Subjects:</p>
                        <div className="flex flex-wrap gap-1">
                          {member.subjects.map((subject, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-1">
                      {member.email && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="h-4 w-4 mr-2" />
                          <a href={`mailto:${member.email}`} className="hover:text-blue-600 truncate">
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {staff.length === 0 && (
          <div className="text-center py-12">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No staff information available at the moment.</p>
          </div>
        )}

        {/* Contact Information */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Contact Our Staff</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">General Inquiries:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Academic matters: Contact subject teachers directly</li>
                    <li>• Administrative issues: Contact the Principal's office</li>
                    <li>• Student welfare: Contact the Deputy Principal</li>
                    <li>• Admissions: Contact the Admissions office</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Office Hours:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Monday - Friday: 8:00 AM - 5:00 PM</li>
                    <li>• Saturday: 8:00 AM - 12:00 PM</li>
                    <li>• Sunday: Closed</li>
                    <li>• School holidays: Limited hours</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
