import React from 'react';
import { Youtube, Facebook, Instagram, Linkedin, ArrowUp } from 'lucide-react';

const SocialConnectSection = () => {
  const socialPlatforms = [
    {
      name: 'YOUTUBE',
      icon: Youtube,
      iconColor: 'text-red-500',
      followers: '56K+',
      action: 'Subscribe',
      link: '#'
    },
    {
      name: 'FACEBOOK',
      icon: Facebook,
      iconColor: 'text-blue-500',
      followers: '66K+',
      action: 'Follow',
      link: '#'
    },
    {
      name: 'INSTAGRAM',
      icon: Instagram,
      iconColor: 'text-pink-500',
      followers: '92K+',
      action: 'Follow',
      link: '#'
    },
    {
      name: 'LINKEDIN',
      icon: Linkedin,
      iconColor: 'text-blue-600',
      followers: '4K+',
      action: 'Follow',
      link: '#'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="bg-black py-16 px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-600  mb-4">
            Connect with Chandrabhan Singh Rajawat
          </h2>
          <div className="flex justify-center items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400"></div>
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
          </div>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {socialPlatforms.map((platform, index) => {
            const IconComponent = platform.icon;
            return (
              <div
                key={platform.name}
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gold border */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-0.5 group-hover:p-1 transition-all duration-300">
                  <div className="bg-gray-800 rounded-2xl h-full w-full"></div>
                </div>
                
                {/* Card content */}
                <div className="relative bg-gray-800 rounded-2xl p-6 h-full flex flex-col items-center text-center transform group-hover:scale-105 transition-all duration-300">
                  {/* Social Icon */}
                  <div className={`mb-4 p-3 rounded-full bg-gray-700 group-hover:bg-gray-600 transition-colors duration-300`}>
                    <IconComponent className={`w-8 h-8 ${platform.iconColor}`} />
                  </div>

                  {/* Platform Name */}
                  <h3 className="text-white font-semibold text-lg mb-6 tracking-wide">
                    {platform.name}
                  </h3>

                  {/* Follower Count */}
                  <div className="text-3xl font-bold text-yellow-600 mb-6">
                    {platform.followers}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => window.open(platform.link, '_blank')}
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold py-3 px-6 rounded-full hover:from-yellow-300 hover:to-orange-300 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {platform.action}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-yellow-400 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-orange-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-orange-300 rounded-full opacity-50 animate-pulse"></div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default SocialConnectSection;