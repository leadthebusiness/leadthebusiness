import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, MessageCircle, Send, Phone } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  review: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Riya Verma",
    role: "BBA Student, Jaipur",
    review: "I was overwhelmed with business ideas and didn't know where to start. One free call with Chandrabhan Sir helped me break it all down into simple, actionable steps. It felt like someone finally understood the chaos in my mind.",
    rating: 5,
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'><text y='50' font-size='50'>🧑‍🎓</text></svg>"
  },
  {
    id: 2,
    name: "Karan Shah",
    role: "Freelancer, Pune",
    review: "I used to think hustle was the only way. But through Lead The Business, I learned how to create systems that actually save me time. I now run my work more confidently — with less stress.",
    rating: 5,
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'><text y='50' font-size='50'>🧑‍💻</text></svg>"
  },
  {
    id: 3,
    name: "Nikhil Taneja",
    role: "Small Business Owner, Agra",
    review: "Even without paid courses, the free content from LTB gave me more clarity than 100s of random YouTube videos. Their mindset + strategy posts helped me get unstuck and build my own roadmap.",
    rating: 5,
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'><text y='50' font-size='50'>👨‍💼</text></svg>"
  },
  {
    id: 4,
    name: "Sneha Ahuja",
    role: "Early-stage Founder, Delhi",
    review: "Every conversation with Chandrabhan Sir feels like a reality check — and I love that. No fluff, just pure guidance. Today, I finally feel confident calling myself an entrepreneur.",
    rating: 5,
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'><text y='50' font-size='50'>👩‍💼</text></svg>"
  },
  {
    id: 5,
    name: "Aditya Deshmukh",
    role: "Commerce Graduate, Indore",
    review: "Most people give motivation. Lead The Business gives direction. I didn't just feel inspired — I knew exactly what to do next.",
    rating: 5,
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'><text y='50' font-size='50'>🎓</text></svg>"
  }
];


const FloatingElement = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <div 
    className={`absolute ${className}`}
    style={{
      animation: `float 6s ease-in-out infinite`,
      animationDelay: `${delay}s`
    }}
  >
    {children}
  </div>
);

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 5000);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 5000);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 5000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'
        }`}
      />
    ));
  };

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(2deg); }
          50% { transform: translateY(-5px) rotate(-1deg); }
          75% { transform: translateY(-15px) rotate(1deg); }
        }
        
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 30px) scale(1.05); }
        }
        
        .blob-1 { animation: blob 15s infinite; }
        .blob-2 { animation: blob 20s infinite reverse; }
        .blob-3 { animation: blob 18s infinite 5s; }
      `}</style>
      
      <section className="bg-black relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large Blob Shapes */}
          <div className="blob-1 absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-600/20 to-yellow-400/10 rounded-full blur-3xl"></div>
          <div className="blob-2 absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-yellow-500/15 to-transparent rounded-full blur-3xl"></div>
          <div className="blob-3 absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-yellow-600/10 to-yellow-400/5 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Floating 3D Elements */}
        
        <FloatingElement className="top-32 right-20 hidden lg:block" delay={2}>
          <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full shadow-xl"></div>
        </FloatingElement>

       

        <FloatingElement className="bottom-20 right-10 hidden lg:block" delay={3}>
          <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl shadow-lg transform rotate-45"></div>
        </FloatingElement>

        <FloatingElement className="top-1/2 left-5 hidden lg:block" delay={1.5}>
          <div className="w-6 h-6 bg-yellow-500 rounded-full shadow-lg"></div>
        </FloatingElement>

        <FloatingElement className="top-1/3 right-5 hidden lg:block" delay={2.5}>
          <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-xl transform rotate-30"></div>
        </FloatingElement>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-yellow-400 font-semibold text-lg">TESTIMONIALS</span>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Your feedback and review
            </h2>
            <span className="text-4xl hidden lg:block sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-8">
              are important to us!
            </span>
          </div>

          {/* Main Carousel Container */}
          <div className="relative max-w-5xl mx-auto">
            {/* 3D Testimonial Card */}
            <div className="relative perspective-1000">
              <div 
                className="flex transition-all duration-700 ease-out transform-gpu"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    {/* Main Card with 3D Effect */}
                    <div className="relative mx-auto max-w-lg">
                      {/* Background Card Shadow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 to-transparent rounded-2xl transform translate-x-3 translate-y-3 blur-lg"></div>
                      
                      {/* Main Card */}
                      <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-700/50 transform hover:scale-105 transition-all duration-500">
                        {/* Glassmorphism overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>
                        
                        {/* Content */}
                        <div className="relative z-10">
                          {/* Profile Section */}
                          <div className="flex flex-col items-center mb-6">
                            {/* Profile Image with 3D Border */}
                            <div className="relative mb-4">
                             <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full" />
                              <div className="absolute inset-0 -z-50 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full transform scale-110 blur-sm"></div>

                              {/* Online indicator */}
                              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full border-3 border-black flex items-center justify-center shadow-lg">
                                <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                              </div>
                            </div>
                            
                            {/* Name and Role */}
                            <h4 className="text-xl font-bold text-white mb-1">{testimonial.name}</h4>
                            <p className="text-yellow-400 font-semibold text-base">{testimonial.role}</p>
                          </div>

                          {/* Rating */}
                          <div className="flex justify-center items-center gap-1 mb-4">
                            {renderStars(testimonial.rating)}
                          </div>

                          {/* Status */}
                          <div className="text-center mb-4">
                            <span className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-5 py-1.5 rounded-full font-bold text-base shadow-lg">
                              Fantastic!
                            </span>
                          </div>

                          {/* Review Text */}
                          <div className="relative">
                            <Quote className="absolute -top-3 -left-3 w-6 h-6 text-yellow-500/30" />
                            <p className="text-gray-100 text-base sm:text-lg leading-relaxed text-center italic">
                              {testimonial.review}
                            </p>
                          </div>
                        </div>

                        {/* Decorative Elements */}
                        <FloatingElement className="top-4 right-4" delay={0.5}>
                          <div className="w-4 h-4 bg-yellow-500 rounded-full opacity-60"></div>
                        </FloatingElement>
                        <FloatingElement className="bottom-4 left-4" delay={1}>
                          <div className="w-3 h-3 bg-gray-600 rounded-full opacity-40"></div>
                        </FloatingElement>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 hidden lg:block z-20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 hidden lg:block z-20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center gap-6 mt-12 lg:hidden">
            <button
              onClick={goToPrevious}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-12 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-12 h-4 bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-lg'
                    : 'w-4 h-4 bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          {/* <div className="text-center mt-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl px-8 py-4 border border-gray-700/50">
              <span className="text-gray-300 text-lg">Ready to join them?</span>
              <Send className="w-5 h-5 text-yellow-500" />
              <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black px-6 py-2 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg">
                Get Started
              </button>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
}