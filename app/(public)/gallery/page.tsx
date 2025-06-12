import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageIcon, Camera } from "lucide-react"
import { prisma } from "@/lib/prisma"

async function getGalleryImages() {
  return await prisma.gallery.findMany({
    orderBy: { createdAt: "desc" },
  })
}

export default async function GalleryPage() {
  const images = await getGalleryImages()

  // Group images by category
  const categories = ["all", "academics", "sports", "events", "facilities"]
  const imagesByCategory = categories.reduce(
    (acc, category) => {
      if (category === "all") {
        acc[category] = images
      } else {
        acc[category] = images.filter((img) => img.category === category)
      }
      return acc
    },
    {} as Record<string, typeof images>,
  )

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">School Gallery</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore moments and memories from Kasikeu Boys High School - from academic achievements to sports victories
            and memorable events
          </p>
        </div>

        {/* Gallery Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">{images.length}</div>
              <p className="text-gray-600">Total Photos</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 mb-2">{imagesByCategory.academics?.length || 0}</div>
              <p className="text-gray-600">Academic</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-red-600 mb-2">{imagesByCategory.sports?.length || 0}</div>
              <p className="text-gray-600">Sports</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">{imagesByCategory.events?.length || 0}</div>
              <p className="text-gray-600">Events</p>
            </CardContent>
          </Card>
        </div>

        {/* Gallery Tabs */}
        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All ({images.length})</TabsTrigger>
            <TabsTrigger value="academics">Academic ({imagesByCategory.academics?.length || 0})</TabsTrigger>
            <TabsTrigger value="sports">Sports ({imagesByCategory.sports?.length || 0})</TabsTrigger>
            <TabsTrigger value="events">Events ({imagesByCategory.events?.length || 0})</TabsTrigger>
            <TabsTrigger value="facilities">Facilities ({imagesByCategory.facilities?.length || 0})</TabsTrigger>
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              {imagesByCategory[category]?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {imagesByCategory[category].map((image) => (
                    <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                      <div className="aspect-square relative">
                        <Image
                          src={image.imageUrl || "/placeholder.svg"}
                          alt={image.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                          <Camera className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{image.title}</h3>
                        {image.description && (
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{image.description}</p>
                        )}
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(image.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    No images in the {category === "all" ? "gallery" : category} category yet.
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Gallery Guidelines */}
        <div className="mt-16">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Photo Guidelines</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Categories:</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>
                      • <strong>Academic:</strong> Classroom activities, graduations, awards
                    </li>
                    <li>
                      • <strong>Sports:</strong> Athletic events, competitions, training
                    </li>
                    <li>
                      • <strong>Events:</strong> School functions, celebrations, visits
                    </li>
                    <li>
                      • <strong>Facilities:</strong> School buildings, laboratories, grounds
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Photo Submissions:</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• High-quality images preferred</li>
                    <li>• Include descriptive captions</li>
                    <li>• Respect privacy and consent</li>
                    <li>• Contact admin for submissions</li>
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
