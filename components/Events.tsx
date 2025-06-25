import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const UpcomingEventsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample events data - replace with your actual events
  const events = [
    {
      id: 1,
      title: "RiSE GROW",
      subtitle: "Workshop",
      rating: 4.0,
      description: "This is a 6-month intense program where Basesh sir, his team, and you as an entrepreneur work together to find out the actual issues and loopholes in your business. This will help you to increase your turnover and profit.",
      image: "/home-rise-grow.jpg", // Replace with actual image
      buttonText: "JOIN NOW"
    },
    {
      id: 2,
      title: "RiSE FAME",
      subtitle: "Intensive Course",
      rating: 4.8,
      description: "Master the art of business growth with proven strategies and hands-on techniques. Learn from industry experts and transform your business approach.",
      image: "/fame-2.jpg", // Replace with actual image
      buttonText: "ENROLL NOW"
    },
    {
      id: 3,
      title: "RiSE HABIT",
      subtitle: "Annual Event",
      rating: 4.5,
      description: "Join top leaders and entrepreneurs for an exclusive summit focused on leadership development and business innovation strategies.",
      image: "/rise-habit.png", // Replace with actual image
      buttonText: "REGISTER"
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % events.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [events.length]);

  const goToSlide = (index:any) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 py-16 px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400/20 rounded-full -translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-400/20 rounded-full translate-x-48 translate-y-48"></div>
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-600 mb-4">
            Upcoming Events
          </h2>
          <div className="flex justify-center items-center gap-2 mb-6">
            <div className="w-12 h-0.5 bg-yellow-600"></div>
            <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
            <div className="w-12 h-0.5 bg-yellow-600"></div>
          </div>
          <p className="text-gray-700 text-lg max-w-4xl mx-auto leading-relaxed">
            The RiSE Workshop will target business managers/owners and, indeed any entrepreneur, seeking practical tools and solutions to thrive in their competitive space. This very practical course prepares you to grow your business while, at the same time, developing yourself.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-2xl">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {events.map((event, index) => (
                <div key={event.id} className="w-full flex-shrink-0">
                  <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 min-h-[400px]">
                    {/* Left Content */}
                    <div className="flex-1 text-white">
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${i < Math.floor(event.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} 
                          />
                        ))}
                        <span className="text-yellow-400 font-bold ml-2">({event.rating})</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-4xl md:text-5xl font-bold mb-2">
                        {event.title}
                      </h3>
                      <p className="text-xl text-gray-300 mb-6">{event.subtitle}</p>

                      {/* Description */}
                      <p className="text-gray-300 text-lg leading-relaxed mb-8">
                        {event.description}
                      </p>
                    </div>

                    {/* Right Content - Event Card */}
                    <div className="flex-shrink-0 w-full md:w-96">
                      <div className="bg-blue-600 rounded-2xl overflow-hidden shadow-xl">

                        <div className=" bg-gray-300 relative overflow-hidden">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* <div className="p-6 text-white">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="text-2xl font-bold">RiSE</div>
                            <div className="text-3xl font-bold">HABIT</div>
                          </div>
                          <p className="text-sm mb-6 opacity-90">
                            {event.description.length > 120 
                              ? event.description.substring(0, 120) + "..." 
                              : event.description}
                          </p>
                          <button className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-3 px-8 rounded-lg transition-colors duration-300 w-full">
                            {event.buttonText}
                          </button>
                        </div> */}
                        
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentSlide 
                    ? 'bg-yellow-600' 
                    : 'bg-gray-400 hover:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventsCarousel;