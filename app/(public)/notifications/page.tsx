import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Info, CheckCircle, AlertTriangle, Clock, Users, Bell, Megaphone } from "lucide-react"
import { prisma } from "@/lib/prisma"

async function getNotifications() {
  return await prisma.notification.findMany({
    where: {
      published: true,
      OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
    },
    orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
  })
}

function getNotificationIcon(type: string) {
  switch (type) {
    case "urgent":
      return <AlertCircle className="h-5 w-5 text-red-500" />
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />
    case "success":
      return <CheckCircle className="h-5 w-5 text-green-500" />
    default:
      return <Info className="h-5 w-5 text-blue-500" />
  }
}

function getNotificationBadgeVariant(type: string) {
  switch (type) {
    case "urgent":
      return "destructive"
    case "warning":
      return "secondary"
    case "success":
      return "default"
    default:
      return "outline"
  }
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case "urgent":
      return "border-l-red-500 bg-red-50"
    case "high":
      return "border-l-orange-500 bg-orange-50"
    case "normal":
      return "border-l-blue-500 bg-blue-50"
    default:
      return "border-l-gray-500 bg-gray-50"
  }
}

export default async function NotificationsPage() {
  const notifications = await getNotifications()

  // Group notifications by target audience
  const allNotifications = notifications.filter((n) => n.targetAudience === "all")
  const studentNotifications = notifications.filter(
    (n) => n.targetAudience === "students" || n.targetAudience === "all",
  )
  const parentNotifications = notifications.filter((n) => n.targetAudience === "parents" || n.targetAudience === "all")
  const staffNotifications = notifications.filter((n) => n.targetAudience === "staff" || n.targetAudience === "all")

  // Group by priority for urgent notifications
  const urgentNotifications = notifications.filter((n) => n.priority === "urgent" || n.type === "urgent")

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-red-600 via-orange-600 to-yellow-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              <Bell className="h-4 w-4 mr-2" />
              Stay Informed
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">School Notifications</h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
              Stay informed with the latest announcements, alerts, and important information from Kasikeu Boys High
              School
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Notification Statistics */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Megaphone className="h-4 w-4 mr-2" />
              Notification Center
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Important Updates</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              All important school announcements, alerts, and information in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center hover-lift bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-red-600 mb-2">{urgentNotifications.length}</div>
                <p className="text-gray-600 font-medium">Urgent</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{allNotifications.length}</div>
                <p className="text-gray-600 font-medium">General</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {
                    notifications.filter((n) => new Date(n.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000))
                      .length
                  }
                </div>
                <p className="text-gray-600 font-medium">Today</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Megaphone className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">{notifications.length}</div>
                <p className="text-gray-600 font-medium">Total</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Urgent Notifications Banner */}
        {urgentNotifications.length > 0 && (
          <section className="mb-12">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-6 text-white">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Urgent Notifications</h2>
              </div>
              <div className="space-y-4">
                {urgentNotifications.slice(0, 3).map((notification) => (
                  <div
                    key={notification.id}
                    className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20"
                  >
                    <h3 className="font-semibold text-lg mb-2">{notification.title}</h3>
                    <p className="text-red-100 mb-3">{notification.message}</p>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-white/20 text-white border-white/30">
                        {notification.targetAudience.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-red-100">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Notification Tabs */}
        <section>
          <Tabs defaultValue="all" className="space-y-6">
            <div className="flex justify-center">
              <TabsList className="grid grid-cols-4 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  value="all"
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <Users className="h-4 w-4" />
                  All ({allNotifications.length})
                </TabsTrigger>
                <TabsTrigger
                  value="students"
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Students ({studentNotifications.length})
                </TabsTrigger>
                <TabsTrigger
                  value="parents"
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Parents ({parentNotifications.length})
                </TabsTrigger>
                <TabsTrigger
                  value="staff"
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Staff ({staffNotifications.length})
                </TabsTrigger>
              </TabsList>
            </div>

            {/* All Notifications */}
            <TabsContent value="all" className="space-y-4">
              {allNotifications.length > 0 ? (
                allNotifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`border-l-4 hover-lift ${getPriorityColor(notification.priority)} border-0 shadow-lg`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <CardTitle className="text-lg">{notification.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getNotificationBadgeVariant(notification.type)}>
                            {notification.type.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">{notification.targetAudience.toUpperCase()}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4 leading-relaxed">{notification.message}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {new Date(notification.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          {notification.expiresAt && (
                            <span className="text-orange-600">
                              Expires: {new Date(notification.expiresAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          Priority: {notification.priority.toUpperCase()}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Info className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No General Notifications</h3>
                  <p className="text-gray-500">No general notifications at the moment. Check back soon!</p>
                </div>
              )}
            </TabsContent>

            {/* Student Notifications */}
            <TabsContent value="students" className="space-y-4">
              {studentNotifications.length > 0 ? (
                studentNotifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`border-l-4 hover-lift ${getPriorityColor(notification.priority)} border-0 shadow-lg`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <CardTitle className="text-lg">{notification.title}</CardTitle>
                        </div>
                        <Badge variant={getNotificationBadgeVariant(notification.type)}>
                          {notification.type.toUpperCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4 leading-relaxed">{notification.message}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {new Date(notification.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          Priority: {notification.priority.toUpperCase()}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Info className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Student Notifications</h3>
                  <p className="text-gray-500">No student notifications at the moment. Check back soon!</p>
                </div>
              )}
            </TabsContent>

            {/* Parent Notifications */}
            <TabsContent value="parents" className="space-y-4">
              {parentNotifications.length > 0 ? (
                parentNotifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`border-l-4 hover-lift ${getPriorityColor(notification.priority)} border-0 shadow-lg`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <CardTitle className="text-lg">{notification.title}</CardTitle>
                        </div>
                        <Badge variant={getNotificationBadgeVariant(notification.type)}>
                          {notification.type.toUpperCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4 leading-relaxed">{notification.message}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {new Date(notification.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          Priority: {notification.priority.toUpperCase()}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Info className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Parent Notifications</h3>
                  <p className="text-gray-500">No parent notifications at the moment. Check back soon!</p>
                </div>
              )}
            </TabsContent>

            {/* Staff Notifications */}
            <TabsContent value="staff" className="space-y-4">
              {staffNotifications.length > 0 ? (
                staffNotifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`border-l-4 hover-lift ${getPriorityColor(notification.priority)} border-0 shadow-lg`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <CardTitle className="text-lg">{notification.title}</CardTitle>
                        </div>
                        <Badge variant={getNotificationBadgeVariant(notification.type)}>
                          {notification.type.toUpperCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4 leading-relaxed">{notification.message}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {new Date(notification.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          Priority: {notification.priority.toUpperCase()}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Info className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Staff Notifications</h3>
                  <p className="text-gray-500">No staff notifications at the moment. Check back soon!</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>

        {/* Notification Guidelines */}
        <section className="mt-20">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-4">
                <Bell className="h-4 w-4 mr-2" />
                Guidelines
              </Badge>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Notification Guidelines</h3>
              <p className="text-gray-600">Understanding our notification system and staying connected</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-lg mb-4 flex items-center">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    </div>
                    Notification Types
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-center gap-3">
                      <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <span>
                        <strong className="text-gray-900">Urgent:</strong> Immediate attention required
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                      <span>
                        <strong className="text-gray-900">Warning:</strong> Important information
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>
                        <strong className="text-gray-900">Success:</strong> Positive updates
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Info className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      <span>
                        <strong className="text-gray-900">Info:</strong> General information
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-lg mb-4 flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <Bell className="h-4 w-4 text-blue-600" />
                    </div>
                    Stay Connected
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Check notifications regularly for important updates</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Urgent notifications require immediate attention</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Some notifications may have expiration dates</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Contact the school office for clarification if needed</span>
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
