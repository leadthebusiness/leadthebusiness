import React from 'react';
import Link from 'next/link';

const MediaCoverage = () => {
  const mediaItems = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=400&h=200&fit=crop&crop=center",
      title: "Hindustan Times - In conversation with Mr.Basesh Gala, Business Mentor and Founder-39 Solutions Group",
      channel: "NewsHour Talk Show",
      link: "https://www.youtube.com/watch?v=rApkrq1ORNc"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=200&fit=crop&crop=center",
      title: "Zee News - Mr. Basesh Gala is the Chairman of 39 Solutions Group, Business Mentoring and Investment Organization",
      channel: "Business Special",
        link: "https://www.youtube.com/watch?v=GftXc6H6HRg"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop&crop=center",
      title: "Business Flourish or Vanish | Basesh Gala | TEDxGTBIT",
      channel: "TEDx Talk",
        link: "https://www.youtube.com/watch?v=iEs8dkQ6oG0"
    }
  ];

  return (
    <div className="bg-black text-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4">
            Media Coverage
          </h2>
          <div className="flex justify-center">
            <div className="w-16 h-1 bg-yellow-400 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full mx-1 mt-[-2px]"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full mx-1 mt-[-2px]"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full mx-1 mt-[-2px]"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left - Main Forbes Image */}
          
          <Link 
            href="https://drive.google.com/file/d/1pZIkUqRwOH_MrkBRLyCw5OH9JFQlWetI/view" 
            className="lg:col-span-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="relative group cursor-pointer overflow-hidden rounded-lg">
              {/* Main Forbes Image */}
              <div className="relative h-80 md:h-96 lg:h-[500px]">
                <img 
                  src="/forbes.jpg"
                  alt="Basesh Gala Forbes Feature"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay with Forbes branding */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                
                {/* Forbes Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-white">
                      <h3 className="text-4xl md:text-5xl font-bold mb-1">Forbes</h3>
                      <div className="text-yellow-400 text-lg font-semibold">INDIA</div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-400 text-black px-4 py-2 rounded-full inline-block mb-3">
                    <span className="font-bold text-sm md:text-base">
                      ICONS OF EXCELLENCE 2021
                    </span>
                  </div>
                  
                  <div className="text-yellow-400 text-lg md:text-xl font-bold">
                    FORBES INDIA - ICONS OF EXCELLENCE 2021
                  </div>
                </div>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </Link>

          {/* Right - Media Coverage Cards */}
          <div className="lg:col-span-2 space-y-4">
            {mediaItems.map((item) => (
              <Link
                href={item.link} // Replace with actual link 
                key={item.id}
                className="bg-gray-900  rounded-lg overflow-hidden hover:bg-gray-800 transition-all duration-300 cursor-pointer group hover:scale-105"
              >
                <div className="flex">
                  {/* Card Image */}
                  <div className="w-24 md:w-28 h-20 md:h-24 flex-shrink-0">
                    <img 
                      src={item.image}
                      alt={item.channel}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Card Content */}
                  <div className="flex-1 p-3 md:p-4">
                    <div className="text-yellow-400 text-xs font-semibold mb-1 uppercase tracking-wide">
                      {item.channel}
                    </div>
                    <p className="text-white text-sm leading-relaxed group-hover:text-yellow-100 transition-colors duration-300 line-clamp-3">
                      {item.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
            
            {/* View All Button */}
            <div className="pt-4">
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                View All Coverage
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        
      </div>
    </div>
  );
};

export default MediaCoverage;