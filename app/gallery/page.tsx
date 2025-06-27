'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Calendar, Images } from 'lucide-react'

// Sanity client setup (you'll need to configure this)
import { client } from '@/lib/sanity' // Adjust import path as needed
import Footer from '@/components/Footer'
import Navigation from '@/components/Nav'

interface GalleryImage {
  _key: string
  asset: {
    _id: string
    url: string
    metadata: {
      dimensions: {
        width: number
        height: number
      }
      lqip?: string
      palette?: {
        dominant: {
          background: string
        }
      }
    }
  }
  alt?: string
}

interface Gallery {
  _id: string
  images: GalleryImage[]
  publishedAt: string
}

const GROQ_QUERY = `
  *[_type == "gallery"] | order(publishedAt desc) {
    _id,
    images[] {
      _key,
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip,
          palette
        }
      },
      alt
    },
    publishedAt
  }
`

export default function GalleryPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([])
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)
  const [allImages, setAllImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const data = await client.fetch(GROQ_QUERY)
        setGalleries(data)
        
        // Flatten all images for navigation
        const flatImages = data.reduce((acc: GalleryImage[], gallery: Gallery) => {
          return [...acc, ...gallery.images]
        }, [])
        setAllImages(flatImages)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch galleries')
        setLoading(false)
        console.error('Error fetching galleries:', err)
      }
    }

    fetchGalleries()
  }, [])

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image)
    const imageIndex = allImages.findIndex(img => img._key === image._key)
    setSelectedImageIndex(imageIndex)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImageIndex < allImages.length - 1) {
      const nextIndex = selectedImageIndex + 1
      setSelectedImageIndex(nextIndex)
      setSelectedImage(allImages[nextIndex])
    }
  }

  const prevImage = () => {
    if (selectedImageIndex > 0) {
      const prevIndex = selectedImageIndex - 1
      setSelectedImageIndex(prevIndex)
      setSelectedImage(allImages[prevIndex])
    }
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeModal()
    if (e.key === 'ArrowRight') nextImage()
    if (e.key === 'ArrowLeft') prevImage()
  }

  useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyPress)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage, selectedImageIndex])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-yellow-600 text-lg">Loading galleries...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-yellow-600 hover:bg-yellow-700 text-black px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white py-24">
        <Navigation />
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-sm border-b border-yellow-600/20  top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <Images className="h-8 w-8 text-yellow-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Gallery
            </h1>
          </div>
          <p className="mt-2 text-gray-400">
            Explore our collection of {allImages.length} stunning images
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {galleries.length === 0 ? (
          <div className="text-center py-16">
            <Images className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-400 mb-2">No galleries found</h2>
            <p className="text-gray-500">Check back later for new content</p>
          </div>
        ) : (
          <div className="space-y-12">
            {galleries.map((gallery) => (
              <section key={gallery._id} className="bg-gray-900/50 rounded-2xl p-6 border border-yellow-600/10">
                {/* Gallery Header */}
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="h-5 w-5 text-yellow-600" />
                  <span className="text-yellow-600 font-medium">
                    {new Date(gallery.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400">{gallery.images.length} images</span>
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {gallery.images.map((image) => (
                    <div
                      key={image._key}
                      className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-gray-800 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-600/25"
                      onClick={() => openModal(image)}
                    >
                      <Image
                        src={image.asset.url}
                        alt={image.alt || 'Gallery image'}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        placeholder={image.asset.metadata.lqip ? 'blur' : 'empty'}
                        blurDataURL={image.asset.metadata.lqip}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-yellow-600 text-black p-2 rounded-full">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-60 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation Buttons */}
          {selectedImageIndex > 0 && (
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-60 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {selectedImageIndex < allImages.length - 1 && (
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-60 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Image */}
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image
              src={selectedImage.asset.url}
              alt={selectedImage.alt || 'Gallery image'}
              width={selectedImage.asset.metadata.dimensions.width}
              height={selectedImage.asset.metadata.dimensions.height}
              className="max-w-full max-h-full object-contain rounded-lg"
              priority
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
            {selectedImageIndex + 1} of {allImages.length}
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}