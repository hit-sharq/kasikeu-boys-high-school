import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, BookOpen, GraduationCap, Trophy, Users } from "lucide-react"
import { prisma } from "@/lib/prisma"

async function getCalendarEvents() {
  return await prisma.calendarEvent.findMany({
    orderBy: { startDate: "asc" },
  })
}

function getEventTypeColor(type: string) {
  switch (type) {
    case "term":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "holiday":
      return "bg-green-100 text-green-800 border-green-200"
    case "exam":
      return "bg-red-100 text-red-800 border-red-200"
    case "event":
      return "bg-purple-100 text-purple-800 border-purple-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

function getEventIcon(type: string) {
  switch (type) {
    case "term":
      return <BookOpen className="h-5 w-5" />
    case "holiday":
      return <Users className="h-5 w-5" />
    case "exam":
      return <GraduationCap className="h-5 w-5" />
    case "event":
      return <Trophy className="h-5 w-5" />
    default:
      return <Calendar className="h-5 w-5" />
  }
}

export default async function CalendarPage() {
  const events = await getCalendarEvents()

  // Group events by month
  const eventsByMonth = events.reduce(
    (acc, event) => {
      const month = new Date(event.startDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
      if (!acc[month]) {
        acc[month] = []
      }
      acc[month].push(event)
      return acc
    },
    {} as Record<string, typeof events>,
  )

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-teal-600 via-blue-600 to-indigo-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              <Calendar className="h-4 w-4 mr-2" />
              Academic Year
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Academic Calendar</h1>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
              Stay informed about important dates, term schedules, holidays, and school events throughout the academic
              year
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Calendar Overview */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Clock className="h-4 w-4 mr-2" />
              Calendar Overview
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Academic Year Structure</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our academic calendar is designed to provide optimal learning opportunities throughout the year
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center hover-lift bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
                <p className="text-gray-600 font-medium">Terms per Year</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">4</div>
                <p className="text-gray-600 font-medium">Holiday Periods</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-red-600 mb-2">2</div>
                <p className="text-gray-600 font-medium">Exam Periods</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">12+</div>
                <p className="text-gray-600 font-medium">School Events</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Event Legend */}
        <section className="mb-12">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
                  <Calendar className="h-4 w-4 text-teal-600" />
                </div>
                Event Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Term Dates</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <Users className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800">Holidays</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-red-600" />
                  <span className="font-medium text-red-800">Examinations</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Trophy className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-purple-800">School Events</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Events by Month */}
        <section className="space-y-12">
          {Object.entries(eventsByMonth).map(([month, monthEvents]) => (
            <div key={month}>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
                  <Calendar className="h-5 w-5 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{month}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {monthEvents.map((event) => (
                  <Card key={event.id} className="hover-lift border-0 shadow-lg group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${getEventTypeColor(event.type).replace("text-", "text-white bg-").split(" ")[2].replace("border-", "bg-").replace("-200", "-500")}`}
                          >
                            {getEventIcon(event.type)}
                          </div>
                          <div>
                            <CardTitle className="text-lg line-clamp-2 group-hover:text-teal-600 transition-colors">
                              {event.title}
                            </CardTitle>
                          </div>
                        </div>
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {event.description && <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>}
                      <div className="space-y-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-teal-500" />
                          <span>
                            {new Date(event.startDate).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        {event.endDate && event.endDate !== event.startDate && (
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-teal-500" />
                            <span>
                              Until{" "}
                              {new Date(event.endDate).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </section>

        {events.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Calendar Events</h3>
            <p className="text-gray-500">No calendar events available at the moment. Check back soon!</p>
          </div>
        )}

        {/* Important Notes */}
        <section className="mt-20">
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-4">
                <Clock className="h-4 w-4 mr-2" />
                Important Information
              </Badge>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Calendar Notes</h3>
              <p className="text-gray-600">
                Please keep these important points in mind regarding our academic calendar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-lg mb-4 flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    General Guidelines
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>All dates are subject to change. Please check for updates regularly.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Students must report on time for term opening dates.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Holiday dates may be adjusted based on government directives.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-lg mb-4 flex items-center">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                      <GraduationCap className="h-4 w-4 text-red-600" />
                    </div>
                    Examination Rules
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Examination dates are final and cannot be rescheduled for individual students.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>For any clarifications, contact the school administration office.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Students must be present for all scheduled examinations.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
