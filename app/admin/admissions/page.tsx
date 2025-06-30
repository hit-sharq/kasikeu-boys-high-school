"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, GraduationCap, FileText } from "lucide-react"
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

interface AdmissionInfo {
  id: string
  title: string
  content: string
  requirements: string[]
  fees?: string
  documents: string[]
  deadlines?: string
  createdAt: string
  updatedAt: string
}

export default function AdminAdmissionsPage() {
  const [admissions, setAdmissions] = useState<AdmissionInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAdmission, setEditingAdmission] = useState<AdmissionInfo | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    requirements: "",
    fees: "",
    documents: "",
    deadlines: "",
  })

  useEffect(() => {
    fetchAdmissions()
  }, [])

  const fetchAdmissions = async () => {
    try {
      const response = await fetch("/api/admin/admissions")
      if (response.ok) {
        const data = await response.json()
        setAdmissions(data)
      } else {
        toast.error("Failed to fetch admission information")
      }
    } catch (error) {
      toast.error("Error fetching admissions")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const requirements = formData.requirements.split("\n").filter(Boolean)
    const documents = formData.documents.split("\n").filter(Boolean)

    try {
      const url = editingAdmission ? `/api/admin/admissions/${editingAdmission.id}` : "/api/admin/admissions"
      const method = editingAdmission ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          requirements,
          documents,
        }),
      })

      if (response.ok) {
        toast.success(editingAdmission ? "Admission info updated successfully" : "Admission info created successfully")
        setIsDialogOpen(false)
        setEditingAdmission(null)
        setFormData({ title: "", content: "", requirements: "", fees: "", documents: "", deadlines: "" })
        fetchAdmissions()
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to save admission information")
      }
    } catch (error) {
      toast.error("Error saving admission information")
    }
  }

  const handleEdit = (admission: AdmissionInfo) => {
    setEditingAdmission(admission)
    setFormData({
      title: admission.title,
      content: admission.content,
      requirements: admission.requirements.join("\n"),
      fees: admission.fees || "",
      documents: admission.documents.join("\n"),
      deadlines: admission.deadlines || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this admission information?")) return

    try {
      const response = await fetch(`/api/admin/admissions/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Admission information deleted successfully")
        fetchAdmissions()
      } else {
        toast.error("Failed to delete admission information")
      }
    } catch (error) {
      toast.error("Error deleting admission information")
    }
  }

  const resetForm = () => {
    setFormData({ title: "", content: "", requirements: "", fees: "", documents: "", deadlines: "" })
    setEditingAdmission(null)
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
          <h1 className="text-3xl font-bold">Admissions Management</h1>
          <p className="text-gray-600">Manage admission requirements and information</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Admission Info
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingAdmission ? "Edit Admission Information" : "Add Admission Information"}</DialogTitle>
              <DialogDescription>
                {editingAdmission ? "Update admission information" : "Add new admission requirements and information"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Form 1 Admission Requirements"
                  required
                />
              </div>
              <div>
                <Label htmlFor="content">Description</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={4}
                  placeholder="General information about the admission process"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fees">Fees</Label>
                  <Input
                    id="fees"
                    value={formData.fees}
                    onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
                    placeholder="e.g., KSh 50,000 per term"
                  />
                </div>
                <div>
                  <Label htmlFor="deadlines">Application Deadlines</Label>
                  <Input
                    id="deadlines"
                    value={formData.deadlines}
                    onChange={(e) => setFormData({ ...formData, deadlines: e.target.value })}
                    placeholder="e.g., December 15th, 2024"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="requirements">Requirements (one per line)</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  rows={6}
                  placeholder="KCPE certificate&#10;Birth certificate&#10;Passport photos&#10;Medical certificate"
                  required
                />
              </div>
              <div>
                <Label htmlFor="documents">Required Documents (one per line)</Label>
                <Textarea
                  id="documents"
                  value={formData.documents}
                  onChange={(e) => setFormData({ ...formData, documents: e.target.value })}
                  rows={6}
                  placeholder="Original KCPE certificate&#10;Copy of birth certificate&#10;4 passport photos&#10;Medical report"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingAdmission ? "Update" : "Create"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {admissions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No admission information</h3>
              <p className="text-gray-600 text-center mb-4">
                Add admission requirements and information for prospective students
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Admission Info
              </Button>
            </CardContent>
          </Card>
        ) : (
          admissions.map((admission) => (
            <Card key={admission.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {admission.title}
                </CardTitle>
                <CardDescription>{admission.content}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {admission.fees && (
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">Fees</h4>
                      <p className="text-sm">{admission.fees}</p>
                    </div>
                  )}
                  {admission.deadlines && (
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">Deadlines</h4>
                      <p className="text-sm">{admission.deadlines}</p>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Requirements</h4>
                    <ul className="text-sm space-y-1">
                      {admission.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Required Documents</h4>
                    <ul className="text-sm space-y-1">
                      {admission.documents.map((doc, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(admission)}>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(admission.id)}>
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
