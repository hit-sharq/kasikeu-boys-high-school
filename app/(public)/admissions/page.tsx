import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, FileText, Calendar, DollarSign, Phone, Mail } from "lucide-react"
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
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Admissions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join the Kasikeu Boys High School family and embark on a journey of academic excellence and character
            development
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">800+</div>
              <p className="text-gray-600">Current Students</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <p className="text-gray-600">University Admission</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">38</div>
              <p className="text-gray-600">Years of Excellence</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-red-600 mb-2">45</div>
              <p className="text-gray-600">Qualified Teachers</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Admission Information */}
        {admissionInfo && (
          <div className="space-y-12">
            {/* Overview */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{admissionInfo.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{admissionInfo.content}</div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Requirements */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <CheckCircle className="h-6 w-6 mr-2 text-green-600" />
                    Admission Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Academic Requirements:</h4>
                      <ul className="space-y-2">
                        {admissionInfo.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Additional Criteria:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          Good character and discipline record
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          Commitment to school values
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          Parental support and involvement
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          Interview performance (if applicable)
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Required Documents */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <FileText className="h-6 w-6 mr-2 text-blue-600" />
                    Required Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {admissionInfo.documents.map((doc, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <FileText className="h-5 w-5 text-blue-500 mr-3" />
                        <span className="text-gray-700">{doc}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                      <strong>Note:</strong> All documents must be original or certified copies. Incomplete applications
                      will not be processed.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Fees Information */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <DollarSign className="h-6 w-6 mr-2 text-green-600" />
                    Fees Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-700">{admissionInfo.fees}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">What's Included:</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li>• Tuition and academic instruction</li>
                          <li>• Boarding and accommodation</li>
                          <li>• Meals (breakfast, lunch, dinner)</li>
                          <li>• Learning materials and textbooks</li>
                          <li>• Sports and co-curricular activities</li>
                          <li>• Medical care and first aid</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Payment Options:</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li>• Full payment at term beginning</li>
                          <li>• Installment plans available</li>
                          <li>• Bank transfers accepted</li>
                          <li>• Mobile money payments</li>
                          <li>• Bursary programs for needy students</li>
                          <li>• Scholarships for exceptional students</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Application Timeline */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Calendar className="h-6 w-6 mr-2 text-purple-600" />
                    Application Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-700">{admissionInfo.deadlines}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Key Dates:</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li>• Applications open: November</li>
                          <li>• Application deadline: January 31st</li>
                          <li>• Interviews: February</li>
                          <li>• Admission decisions: March</li>
                          <li>• Fee payment deadline: April</li>
                          <li>• Term 1 begins: January (following year)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Application Process:</h4>
                        <ol className="space-y-2 text-gray-700">
                          <li>1. Obtain application form</li>
                          <li>2. Complete form with required documents</li>
                          <li>3. Submit to school office</li>
                          <li>4. Attend interview (if shortlisted)</li>
                          <li>5. Await admission decision</li>
                          <li>6. Pay fees upon acceptance</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        )}

        {/* Contact Information */}
        <section className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Contact Admissions Office</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4">Get in Touch:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-gray-600">+254 700 000 000</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-gray-600">admissions@kasikeuboys.ac.ke</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Visit Us:</h4>
                  <p className="text-gray-700 mb-4">
                    We encourage prospective students and parents to visit our campus to experience our learning
                    environment firsthand.
                  </p>
                  <div className="space-y-2">
                    <Button asChild>
                      <Link href="/contact">Schedule a Visit</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/gallery">View Campus Photos</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Apply?</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Take the first step towards joining our community of learners and leaders.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">Get Application Form</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">Learn More About Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
