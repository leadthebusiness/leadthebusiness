import React from 'react';

const InfiniteCarousel = () => {
  // Sample images - you can replace these with your actual image URLs
  const images = [
    "1-1.png",
    "2-2.png",
    "aajtak.png",
    "cnn.png",
    "Mask-group-1.png",
    "Mask-group-2.png",
    "Mask-group-3.png",
    "Mask-group.png",
  ];

  // Double the images for seamless infinite scroll
  const duplicatedImages = [...images, ...images];

  return (
    <div className="w-full h-fit bg-black flex items-center justify-center overflow-hidden">
      <div className="w-full overflow-hidden">
        <div 
          className="flex animate-scroll"
          style={{
            width: `${duplicatedImages.length * 320}px`,
          }}
        >
          {duplicatedImages.map((image, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 mx-2"
              style={{ width: '300px' }}
            >
              <div className="overflow-hidden rounded-lg shadow-xl">
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${images.length * 320}px);
          }
        }

        .animate-scroll {
          animation: scroll ${images.length * 1}s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default InfiniteCarousel;