import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageIcon, Camera, Award, Users, Building, Trophy } from "lucide-react"
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              <Camera className="h-4 w-4 mr-2" />
              Visual Journey
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">School Gallery</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Explore moments and memories from Kasikeu Boys High School - from academic achievements to sports
              victories and memorable events that shape our community
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Gallery Statistics */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <ImageIcon className="h-4 w-4 mr-2" />
              Gallery Overview
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Captured Moments</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A visual collection of our school's journey, achievements, and memorable moments
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center hover-lift bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ImageIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{images.length}</div>
                <p className="text-gray-600 font-medium">Total Photos</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">{imagesByCategory.academics?.length || 0}</div>
                <p className="text-gray-600 font-medium">Academic</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-red-600 mb-2">{imagesByCategory.sports?.length || 0}</div>
                <p className="text-gray-600 font-medium">Sports</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">{imagesByCategory.events?.length || 0}</div>
                <p className="text-gray-600 font-medium">Events</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Gallery Tabs */}
        <section>
          <Tabs defaultValue="all" className="space-y-8">
            <div className="flex justify-center">
              <TabsList className="grid grid-cols-5 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  All ({images.length})
                </TabsTrigger>
                <TabsTrigger value="academics" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Academic ({imagesByCategory.academics?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="sports" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Sports ({imagesByCategory.sports?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="events" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Events ({imagesByCategory.events?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="facilities" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Facilities ({imagesByCategory.facilities?.length || 0})
                </TabsTrigger>
              </TabsList>
            </div>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                {imagesByCategory[category]?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {imagesByCategory[category].map((image) => (
                      <Card key={image.id} className="overflow-hidden hover-lift group border-0 shadow-lg">
                        <div className="aspect-square relative">
                          <Image
                            src={image.imageUrl || "/placeholder.svg"}
                            alt={image.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <Camera className="h-6 w-6 text-white mb-2" />
                            </div>
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
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ImageIcon className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Images Found</h3>
                    <p className="text-gray-500">
                      No images in the {category === "all" ? "gallery" : category} category yet.
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Gallery Guidelines */}
        <section className="mt-20">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-4">
                <Building className="h-4 w-4 mr-2" />
                Guidelines
              </Badge>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Photo Guidelines</h3>
              <p className="text-gray-600">Important information about our gallery and photo submissions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-lg mb-4 flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <ImageIcon className="h-4 w-4 text-blue-600" />
                    </div>
                    Categories
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <strong className="text-gray-900">Academic:</strong> Classroom activities, graduations, awards
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <strong className="text-gray-900">Sports:</strong> Athletic events, competitions, training
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <strong className="text-gray-900">Events:</strong> School functions, celebrations, visits
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <strong className="text-gray-900">Facilities:</strong> School buildings, laboratories, grounds
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-lg mb-4 flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <Camera className="h-4 w-4 text-green-600" />
                    </div>
                    Photo Submissions
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>High-quality images preferred</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Include descriptive captions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Respect privacy and consent</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Contact admin for submissions</span>
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
