"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, BookOpen, Eye } from "lucide-react"
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
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt?: string
  imageUrl?: string
  published: boolean
  slug: string
  tags: string[]
  createdAt: string
  updatedAt: string
  authorId: string
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    imageUrl: "",
    published: false,
    tags: "",
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/admin/blog")
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      } else {
        toast.error("Failed to fetch blog posts")
      }
    } catch (error) {
      toast.error("Error fetching blog posts")
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const slug = editingPost ? editingPost.slug : generateSlug(formData.title)
    const tags = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)

    try {
      const url = editingPost ? `/api/admin/blog/${editingPost.id}` : "/api/admin/blog"
      const method = editingPost ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          slug,
          tags,
        }),
      })

      if (response.ok) {
        toast.success(editingPost ? "Blog post updated successfully" : "Blog post created successfully")
        setIsDialogOpen(false)
        setEditingPost(null)
        setFormData({ title: "", content: "", excerpt: "", imageUrl: "", published: false, tags: "" })
        fetchPosts()
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to save blog post")
      }
    } catch (error) {
      toast.error("Error saving blog post")
    }
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || "",
      imageUrl: post.imageUrl || "",
      published: post.published,
      tags: post.tags.join(", "),
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return

    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Blog post deleted successfully")
        fetchPosts()
      } else {
        toast.error("Failed to delete blog post")
      }
    } catch (error) {
      toast.error("Error deleting blog post")
    }
  }

  const resetForm = () => {
    setFormData({ title: "", content: "", excerpt: "", imageUrl: "", published: false, tags: "" })
    setEditingPost(null)
  }

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
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-gray-600">Create and manage school blog posts</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPost ? "Edit Blog Post" : "Create Blog Post"}</DialogTitle>
              <DialogDescription>
                {editingPost ? "Update the blog post" : "Create a new blog post for the school"}
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Input
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Brief summary (optional)"
                  />
                </div>
                <div>
                  <Label htmlFor="imageUrl">Featured Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="education, school life, academics"
                />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={12}
                  required
                  className="min-h-[300px]"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                />
                <Label htmlFor="published">Published</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingPost ? "Update" : "Create"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {posts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No blog posts yet</h3>
              <p className="text-gray-600 text-center mb-4">
                Create your first blog post to share school stories and updates
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Blog Post
              </Button>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      {post.title}
                      <Badge variant={post.published ? "default" : "secondary"}>
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{post.excerpt || post.content.substring(0, 150) + "..."}</CardDescription>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Created: {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl || "/placeholder.svg"}
                      alt={post.title}
                      className="w-20 h-20 object-cover rounded ml-4"
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(post)}>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(post.id)}>
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
