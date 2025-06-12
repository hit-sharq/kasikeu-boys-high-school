import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"
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
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Academic Calendar</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed about important dates, term schedules, holidays, and school events throughout the academic
            year
          </p>
        </div>

        {/* Calendar Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
              <p className="text-gray-600">Terms per Year</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 mb-2">4</div>
              <p className="text-gray-600">Holiday Periods</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-red-600 mb-2">2</div>
              <p className="text-gray-600">Exam Periods</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">12+</div>
              <p className="text-gray-600">School Events</p>
            </CardContent>
          </Card>
        </div>

        {/* Event Legend */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Event Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">Term Dates</Badge>
                <Badge className="bg-green-100 text-green-800 border-green-200">Holidays</Badge>
                <Badge className="bg-red-100 text-red-800 border-red-200">Examinations</Badge>
                <Badge className="bg-purple-100 text-purple-800 border-purple-200">School Events</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events by Month */}
        <div className="space-y-8">
          {Object.entries(eventsByMonth).map(([month, monthEvents]) => (
            <div key={month}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-blue-600" />
                {month}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {monthEvents.map((event) => (
                  <Card key={event.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {event.description && <p className="text-gray-600 mb-3 line-clamp-2">{event.description}</p>}
                      <div className="space-y-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
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
                            <MapPin className="h-4 w-4 mr-2" />
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
        </div>

        {events.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No calendar events available at the moment.</p>
          </div>
        )}

        {/* Important Notes */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Important Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• All dates are subject to change. Please check for updates regularly.</li>
                <li>• Students must report on time for term opening dates.</li>
                <li>• Examination dates are final and cannot be rescheduled for individual students.</li>
                <li>• Holiday dates may be adjusted based on government directives.</li>
                <li>• For any clarifications, contact the school administration office.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
