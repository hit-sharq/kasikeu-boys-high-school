"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, ImageIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface GalleryItem {
  id: string
  title: string
  description?: string
  imageUrl: string
  category: string
  createdAt: string
  updatedAt: string
}

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    category: "events",
  })

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    try {
      const response = await fetch("/api/admin/gallery")
      if (response.ok) {
        const data = await response.json()
        setGallery(data)
      } else {
        toast.error("Failed to fetch gallery items")
      }
    } catch (error) {
      toast.error("Error fetching gallery")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingItem ? `/api/admin/gallery/${editingItem.id}` : "/api/admin/gallery"
      const method = editingItem ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success(editingItem ? "Gallery item updated successfully" : "Gallery item added successfully")
        setIsDialogOpen(false)
        setEditingItem(null)
        setFormData({ title: "", description: "", imageUrl: "", category: "events" })
        fetchGallery()
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to save gallery item")
      }
    } catch (error) {
      toast.error("Error saving gallery item")
    }
  }

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      description: item.description || "",
      imageUrl: item.imageUrl,
      category: item.category,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return

    try {
      const response = await fetch(`/api/admin/gallery/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Gallery item deleted successfully")
        fetchGallery()
      } else {
        toast.error("Failed to delete gallery item")
      }
    } catch (error) {
      toast.error("Error deleting gallery item")
    }
  }

  const resetForm = () => {
    setFormData({ title: "", description: "", imageUrl: "", category: "events" })
    setEditingItem(null)
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
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
          <h1 className="text-3xl font-bold">Gallery Management</h1>
          <p className="text-gray-600">Manage school photos and media gallery</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Photo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Gallery Item" : "Add Gallery Item"}</DialogTitle>
              <DialogDescription>
                {editingItem ? "Update the gallery item" : "Add a new photo to the school gallery"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="events">Events</option>
                  <option value="sports">Sports</option>
                  <option value="academics">Academics</option>
                  <option value="facilities">Facilities</option>
                  <option value="graduation">Graduation</option>
                  <option value="cultural">Cultural</option>
                </select>
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  placeholder="Brief description of the photo"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingItem ? "Update" : "Add"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No photos in gallery</h3>
                <p className="text-gray-600 text-center mb-4">
                  Add your first photo to showcase school activities and facilities
                </p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Photo
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          gallery.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={item.imageUrl || "/placeholder.svg?height=200&width=300"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2" variant="secondary">
                  {item.category}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                {item.description && <CardDescription className="line-clamp-2">{item.description}</CardDescription>}
              </CardHeader>
              <CardContent>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
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
