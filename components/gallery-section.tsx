"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const galleryImages = [
  {
    id: 3,
    src: "/hot-towel-shave-barbershop-experience.jpg",
    alt: "Barba com toalha quente",
    category: "shaves",
  },
  {
    id: 4,
    src: "/modern-fade-haircut-styling.jpg",
    alt: "Corte degradê moderno",
    category: "haircuts",
  },
  {
    id: 5,
    src: "/professional-pompadour-haircut-styling-result.jpg",
    alt: "Corte pompadour clássico",
    category: "haircuts",
  },
  {
    id: 6,
    src: "/precision-beard-sculpting-transformation.jpg",
    alt: "Escultura de barba profissional",
    category: "beards",
  },
]

const categories = [
  { id: "all", label: "Todos os Trabalhos" },
  { id: "haircuts", label: "Cortes" },
  { id: "beards", label: "Barbas" },
  { id: "shaves", label: "Navalha" },
]

export function GallerySection() {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [lightboxImage, setLightboxImage] = useState<number | null>(null)

  const filteredImages =
    selectedCategory === "all" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  const openLightbox = (imageId: number) => {
    setLightboxImage(imageId)
  }

  const closeLightbox = () => {
    setLightboxImage(null)
  }

  const navigateLightbox = (direction: "prev" | "next") => {
    if (!lightboxImage) return
    const currentIndex = filteredImages.findIndex((img) => img.id === lightboxImage)
    let newIndex
    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
    }
    setLightboxImage(filteredImages[newIndex].id)
  }

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-card/30 to-transparent relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/5 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Nossos Trabalhos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Veja as transformações e o artesanato que definem a Classic Cuts
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "transition-all duration-300 min-h-[44px]",
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-lg shadow-yellow-500/30"
                  : "hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-700",
              )}
            >
              <Filter className="h-4 w-4 mr-2" />
              {category.label}
            </Button>
          ))}
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="break-inside-avoid relative overflow-hidden rounded-lg group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={() => openLightbox(image.id)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-300 animate-pulse rounded-lg" />

              <img
                src={image.src || "/placeholder.svg?height=400&width=300&query=" + encodeURIComponent(image.alt)}
                alt={image.alt}
                className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-110 relative z-10"
                loading="lazy"
              />

              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center transition-all duration-500",
                  hoveredImage === image.id ? "opacity-100" : "opacity-0",
                )}
              >
                <div className="text-center">
                  <p className="text-white font-semibold text-lg capitalize mb-2 bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                    {image.category}
                  </p>
                  <div className="w-8 h-8 mx-auto bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {lightboxImage && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <img
                src={filteredImages.find((img) => img.id === lightboxImage)?.src || "/placeholder.svg"}
                alt={filteredImages.find((img) => img.id === lightboxImage)?.alt}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />

              {/* Close button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white hover:bg-yellow-500/20 bg-black/50 backdrop-blur-sm"
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Navigation buttons */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateLightbox("prev")}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-yellow-500/20 bg-black/50 backdrop-blur-sm"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateLightbox("next")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-yellow-500/20 bg-black/50 backdrop-blur-sm"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
