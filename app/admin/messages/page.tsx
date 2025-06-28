"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Trash2, MessageSquare, Mail, Phone } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"

interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  read: boolean
  createdAt: string
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/admin/messages")
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      } else {
        toast.error("Failed to fetch messages")
      }
    } catch (error) {
      toast.error("Error fetching messages")
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: true }),
      })

      if (response.ok) {
        setMessages(messages.map((msg) => (msg.id === id ? { ...msg, read: true } : msg)))
      }
    } catch (error) {
      console.error("Error marking message as read:", error)
    }
  }

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message)
    setIsDialogOpen(true)
    if (!message.read) {
      markAsRead(message.id)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return

    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Message deleted successfully")
        fetchMessages()
      } else {
        toast.error("Failed to delete message")
      }
    } catch (error) {
      toast.error("Error deleting message")
    }
  }

  const unreadCount = messages.filter((msg) => !msg.read).length

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-gray-600">
            Contact form submissions and inquiries
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} unread
              </Badge>
            )}
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {messages.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
              <p className="text-gray-600 text-center">Contact form submissions will appear here</p>
            </CardContent>
          </Card>
        ) : (
          messages.map((message) => (
            <Card key={message.id} className={!message.read ? "border-blue-200 bg-blue-50" : ""}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      {message.subject}
                      {!message.read && <Badge variant="destructive">New</Badge>}
                    </CardTitle>
                    <CardDescription>
                      From: {message.name} ({message.email}){message.phone && ` • ${message.phone}`}
                    </CardDescription>
                    <p className="text-sm text-gray-500 mt-2">{new Date(message.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{message.message}</p>
                <div className="flex justify-end space-x-2">
                  <Dialog open={isDialogOpen && selectedMessage?.id === message.id} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => handleViewMessage(message)}>
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{selectedMessage?.subject}</DialogTitle>
                        <DialogDescription>Message from {selectedMessage?.name}</DialogDescription>
                      </DialogHeader>
                      {selectedMessage && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email
                              </h4>
                              <p className="text-sm text-gray-600">{selectedMessage.email}</p>
                            </div>
                            {selectedMessage.phone && (
                              <div>
                                <h4 className="font-semibold flex items-center gap-2">
                                  <Phone className="w-4 h-4" />
                                  Phone
                                </h4>
                                <p className="text-sm text-gray-600">{selectedMessage.phone}</p>
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Message</h4>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-sm whitespace-pre-wrap">{selectedMessage.message}</p>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            Received: {new Date(selectedMessage.createdAt).toLocaleString()}
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(message.id)}>
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
