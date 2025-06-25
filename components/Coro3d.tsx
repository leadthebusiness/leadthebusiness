"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const images = [
    
    { src: "https://baseshgala.com/wp-content/uploads/2024/12/7.jpg", alt: "Image 1" },
    { src: "https://baseshgala.com/wp-content/uploads/2024/12/10.jpg", alt: "Image 1" },
    { src: "https://baseshgala.com/wp-content/uploads/2024/12/8.jpg", alt: "Image 1" },
    { src: "https://baseshgala.com/wp-content/uploads/2024/12/9.jpg", alt: "Image 1" },
   
  
]

export default function ImageCarousel3D() {
    const [currentIndex, setCurrentIndex] = useState(2)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    useEffect(() => {
        if (!isAutoPlaying) return
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length)
        }, 2000)
        return () => clearInterval(interval)
    }, [isAutoPlaying])

    const goToPrevious = () => {
        setIsAutoPlaying(false)
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    const goToNext = () => {
        setIsAutoPlaying(false)
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }

    const goToSlide = (index: number) => {
        setIsAutoPlaying(false)
        setCurrentIndex(index)
    }

    const getCardStyle = (index: number) => {
        const diff = index - currentIndex
        const absIndex = Math.abs(diff)
        if (absIndex === 0) {
            return {
                transform: "translateX(0) rotateY(0deg) scale(1)",
                zIndex: 3,
                opacity: 1,
            }
        } else if (absIndex === 1) {
            const rotateY = diff > 0 ? -35 : 35
            const translateX = diff > 0 ? "60%" : "-60%"
            return {
                transform: `translateX(${translateX}) rotateY(${rotateY}deg) scale(0.9)`,
                zIndex: 2,
                opacity: 1,
            }
        } else {
            return {
                transform: "translateX(0) rotateY(0deg) scale(0)",
                zIndex: 0,
                opacity: 0,
            }
        }
    }

    return (
        <div className="bg-black flex items-center justify-center">
            <div className="relative w-full max-w-3xl h-fit">
                {/* Navigation Buttons */}
                <h2 className="text-5xl lg:text-6xl font-bold mb-6">
                    <span className="text-white">Success </span>
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                        Stories
                    </span>
                </h2>
                <p className="text-gray-400 text-xl max-w-3xl mx-auto ">
                    Real transformations from real entrepreneurs who trusted us with their business journey
                </p>
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
                    onClick={goToPrevious}
                >
                    <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
                    onClick={goToNext}
                >
                    <ChevronRight className="h-8 w-8" />
                </Button>

                {/* Carousel Container */}
                <div className="relative h-[500px] lg:h-[500px] flex items-center justify-center perspective-1000">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="absolute w-80 h-96 lg:w-96 lg:h-[500px] transition-all duration-500 ease-in-out cursor-pointer"
                            style={getCardStyle(index)}
                            onClick={() => goToSlide(index)}
                        >
                            <div className="w-full h-full bg-black  rounded-lg flex items-center justify-center overflow-hidden p-2">
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    width={384}
                                    height={500}
                                    className="object-contain w-full h-full max-w-full max-h-full"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center mt-8 gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                index === currentIndex ? "bg-yellow-400" : "bg-gray-600"
                            }`}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}