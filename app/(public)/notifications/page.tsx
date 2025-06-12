import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Info, CheckCircle, AlertTriangle, Clock, Users } from "lucide-react"
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
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">School Notifications</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest announcements, alerts, and important information from Kasikeu Boys High School
          </p>
        </div>

        {/* Urgent Notifications Banner */}
        {urgentNotifications.length > 0 && (
          <div className="mb-8">
            <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <h2 className="text-lg font-semibold text-red-800">Urgent Notifications</h2>
              </div>
              <div className="space-y-3">
                {urgentNotifications.slice(0, 3).map((notification) => (
                  <div key={notification.id} className="bg-white p-3 rounded border-l-2 border-red-400">
                    <h3 className="font-medium text-red-900">{notification.title}</h3>
                    <p className="text-red-700 text-sm mt-1">{notification.message}</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="destructive" className="text-xs">
                        {notification.targetAudience.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-red-600">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Notification Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              All ({allNotifications.length})
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              Students ({studentNotifications.length})
            </TabsTrigger>
            <TabsTrigger value="parents" className="flex items-center gap-2">
              Parents ({parentNotifications.length})
            </TabsTrigger>
            <TabsTrigger value="staff" className="flex items-center gap-2">
              Staff ({staffNotifications.length})
            </TabsTrigger>
          </TabsList>

          {/* All Notifications */}
          <TabsContent value="all" className="space-y-4">
            {allNotifications.length > 0 ? (
              allNotifications.map((notification) => (
                <Card key={notification.id} className={`border-l-4 ${getPriorityColor(notification.priority)}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getNotificationIcon(notification.type)}
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
                    <p className="text-gray-700 mb-3">{notification.message}</p>
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
              <div className="text-center py-12">
                <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No general notifications at the moment.</p>
              </div>
            )}
          </TabsContent>

          {/* Student Notifications */}
          <TabsContent value="students" className="space-y-4">
            {studentNotifications.length > 0 ? (
              studentNotifications.map((notification) => (
                <Card key={notification.id} className={`border-l-4 ${getPriorityColor(notification.priority)}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getNotificationIcon(notification.type)}
                        <CardTitle className="text-lg">{notification.title}</CardTitle>
                      </div>
                      <Badge variant={getNotificationBadgeVariant(notification.type)}>
                        {notification.type.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3">{notification.message}</p>
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
              <div className="text-center py-12">
                <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No student notifications at the moment.</p>
              </div>
            )}
          </TabsContent>

          {/* Parent Notifications */}
          <TabsContent value="parents" className="space-y-4">
            {parentNotifications.length > 0 ? (
              parentNotifications.map((notification) => (
                <Card key={notification.id} className={`border-l-4 ${getPriorityColor(notification.priority)}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getNotificationIcon(notification.type)}
                        <CardTitle className="text-lg">{notification.title}</CardTitle>
                      </div>
                      <Badge variant={getNotificationBadgeVariant(notification.type)}>
                        {notification.type.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3">{notification.message}</p>
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
              <div className="text-center py-12">
                <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No parent notifications at the moment.</p>
              </div>
            )}
          </TabsContent>

          {/* Staff Notifications */}
          <TabsContent value="staff" className="space-y-4">
            {staffNotifications.length > 0 ? (
              staffNotifications.map((notification) => (
                <Card key={notification.id} className={`border-l-4 ${getPriorityColor(notification.priority)}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getNotificationIcon(notification.type)}
                        <CardTitle className="text-lg">{notification.title}</CardTitle>
                      </div>
                      <Badge variant={getNotificationBadgeVariant(notification.type)}>
                        {notification.type.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3">{notification.message}</p>
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
              <div className="text-center py-12">
                <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No staff notifications at the moment.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Notification Guidelines */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Notification Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Notification Types:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span>
                        <strong>Urgent:</strong> Immediate attention required
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span>
                        <strong>Warning:</strong> Important information
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>
                        <strong>Success:</strong> Positive updates
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-blue-500" />
                      <span>
                        <strong>Info:</strong> General information
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Stay Connected:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Check notifications regularly for important updates</li>
                    <li>• Urgent notifications require immediate attention</li>
                    <li>• Some notifications may have expiration dates</li>
                    <li>• Contact the school office for clarification if needed</li>
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
